package project.server.domain.recommendcocktail.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import project.server.domain.recommendcocktail.embed.CocktailInfo;
import project.server.domain.recommendcocktail.embed.UserInfo;

import javax.persistence.*;

@Entity(name = "recommend_cocktails")
@Getter
@NoArgsConstructor
public class RecommendCocktail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Embedded
    private CocktailInfo cocktailInfo;

    @Embedded
    private UserInfo userInfo;

    private long bookmarkCount = 0;

    public void addBookmarkCount() {
        bookmarkCount++;
    }

    public void assignInfo(CocktailInfo cocktailInfo, UserInfo userInfo) {
        this.cocktailInfo = cocktailInfo;
        this.userInfo = userInfo;
    }

    public void subtractBookmarkCount() {
        bookmarkCount--;
    }
}
