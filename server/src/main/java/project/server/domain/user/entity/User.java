package project.server.domain.user.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import project.server.domain.bookmark.entity.Bookmark;
import project.server.domain.cocktail.entity.Cocktail;
import project.server.domain.follow.entity.Follow;
import project.server.domain.user.RatedCocktails;

import javax.persistence.*;
import javax.validation.constraints.Email;
import java.util.*;

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

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    private Set<Cocktail> cocktails = new HashSet<>();

    @OneToMany(cascade = CascadeType.REMOVE)
    private Set<Bookmark> bookmarks = new HashSet<>();

    @Embedded
    private RatedCocktails ratedCocktails = new RatedCocktails();

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();

    @OneToMany(fetch = FetchType.LAZY)
    private Set<Follow> follows = new HashSet<>();

    private boolean isActiveUser = true;

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

    public boolean hasAuthority(long userId) {
        if(isAdmin()){
            return true;
        }
        return isActiveUser && this.userId == userId;
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

    public void deleteAllBookmarks() {
        bookmarks.clear();
    }
}
