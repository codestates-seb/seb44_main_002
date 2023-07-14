package project.server.domain.user;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import project.server.domain.cocktail.entity.Cocktail;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

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

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    private String gender;

    private int age;

    private long subscriberCount;

    private String profileImageUrl;

    @OneToMany(mappedBy = "user")
    private Set<Cocktail> cocktails;

    @Embedded
    private BookmarkedCocktails bookmarkedCocktails = new BookmarkedCocktails();

    @Embedded
    private RatedCocktails ratedCocktails = new RatedCocktails();

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();

    public UserDto.Response entityToResponse() {
        return UserDto.Response.builder()
                .userId(userId)
                .email(email)
                .name(name)
                .gender(gender)
                .age(age)
                .profileImageUrl(profileImageUrl)
                .subscriberCount(subscriberCount)
                .build();
    }

    public boolean isAlreadyRated(long cocktailId) {
        return ratedCocktails.containCocktail(cocktailId);
    }

    public boolean isBookmarked(long cocktailId) {
        return bookmarkedCocktails.containCocktail(cocktailId);
    }

    public void cancelBookmark(long cocktailId) {
        bookmarkedCocktails.remove(cocktailId);
    }

    public void bookmark(long cocktailId) {
        bookmarkedCocktails.add(cocktailId);
    }

    public int getRate(long cocktailId) {
        return ratedCocktails.findValue(cocktailId);
    }

    public void putRatedCocktail(long cocktailId, int value) {
        ratedCocktails.put(cocktailId, value);
    }

    public boolean hasAuthority(Cocktail cocktail) {
        if (isAdmin()) {
            return true;
        }
        return cocktails.contains(cocktail);
    }

    public boolean isAdmin() {
        return roles.contains("ADMIN");
    }

}
