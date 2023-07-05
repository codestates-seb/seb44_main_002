package project.server.domain.user;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

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

    @Embedded
    private RatedCocktails ratedCocktails = new RatedCocktails();

    public boolean isAlreadyRated(long cocktailId) {
        return ratedCocktails.containCocktail(cocktailId);
    }

    public int getOldRate(long cocktailId) {
        return ratedCocktails.findValue(cocktailId);
    }

    public void putRatedCocktail(long cocktailId, int value) {
        ratedCocktails.put(cocktailId, value);
    }
}
