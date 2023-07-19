package project.server.domain.user;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import project.server.domain.bookmark.entity.Bookmark;
import project.server.domain.cocktail.entity.Cocktail;
import project.server.domain.cocktail.service.CocktailSerializer;
import project.server.domain.follow.entity.Follow;

import javax.persistence.*;
import javax.validation.constraints.Email;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Entity(name = "users")
@Getter
@Setter
@NoArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long userId;

    @Column(nullable = false)
    private String name;

    @Email
    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    private String gender;

    private int age;

    private long subscriberCount = 0;

    private String profileImageUrl;

    @OneToMany(mappedBy = "user")
    private Set<Cocktail> cocktails = new HashSet<>();

    @OneToMany
    private Set<Bookmark> bookmarks = new HashSet<>();

    @Embedded
    private RatedCocktails ratedCocktails = new RatedCocktails();

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();

    @OneToMany
    private Set<Follow> follows = new HashSet<>();

    private boolean isActiveUser = true;

    public UserDto.Response entityToResponse() {
        return UserDto.Response.builder()
                .userId(userId)
                .email(email)
                .name(name)
                .gender(gender)
                .age(age)
                .profileImageUrl(profileImageUrl)
                .subscriberCount(subscriberCount)
                .cocktails(cocktails.stream()
                        .map(cocktail -> CocktailSerializer.entityToSimpleResponse(this.isBookmarked(cocktail.getCocktailId()), cocktail))
                        .collect(Collectors.toList()))
                .bookmarkedCocktails(bookmarks.stream()
                        .map(bookmark -> CocktailSerializer.bookmarkEntityToSimpleResponse(true, bookmark))
                        .collect(Collectors.toList()))
                .follows(follows.stream()
                        .map(Follow::getFollowing)
                        .collect(Collectors.toList()))
                .build();
    }

    public boolean isAlreadyRated(long cocktailId) {
        return ratedCocktails.containCocktail(cocktailId);
    }

    public boolean isBookmarked(long cocktailId){
        for(Bookmark bookmark : bookmarks){
            if(bookmark.getCocktailId() == cocktailId){
                return true;
            }
        }
        return false;
    }

    public int getRate(long cocktailId) {
        return ratedCocktails.findValue(cocktailId);
    }

    public void putRatedCocktail(long cocktailId, int value) {
        ratedCocktails.put(cocktailId, value);
    }

    public boolean hasAuthority(Cocktail cocktail) {
        if(isAdmin()){
            return true;
        }
        return cocktails.contains(cocktail);
    }

    public boolean isAdmin() {
        return roles.contains("ADMIN");
    }

    public void bookmark(Bookmark bookmark) {
        bookmarks.add(bookmark);
    }

    public void cancelBookmark(Bookmark bookmark) {
        bookmarks.remove(bookmark);
    }

    public void write(Cocktail cocktail) {
        cocktails.add(cocktail);
    }

    public void addFollow(Follow follow) {
        follows.add(follow);
    }

    public void cancelFollow(Follow follow) {
        follows.remove(follow);
    }

    public boolean following(User following) {
        for(Follow follow : follows){
            if(follow.contains(following.getUserId())){
                return true;
            }
        }
        return false;
    }

    public void addSubscriberCount() {
        subscriberCount++;
    }

    public void subtractSubscriberCount() {
        subscriberCount--;
    }
}
