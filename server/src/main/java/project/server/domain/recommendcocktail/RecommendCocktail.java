package project.server.domain.recommendcocktail;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity(name = "recommend_cocktails")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
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
    }
}
