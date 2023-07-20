package project.server.domain.bookmark.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import project.server.domain.bookmark.embed.CocktailInfo;
import project.server.domain.bookmark.embed.UserInfo;

import javax.persistence.*;

@Entity(name = "bookmarks")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Bookmark {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long bookmarkId;

    @Embedded
    private UserInfo userInfo;

    @Embedded
    private CocktailInfo cocktailInfo;

    @Builder
    public Bookmark(UserInfo userInfo, CocktailInfo cocktailInfo) {
        this.userInfo = userInfo;
        this.cocktailInfo = cocktailInfo;
    }

    public long getUserId() {
        return userInfo.getUserId();
    }

    public long getCocktailId() {
        return cocktailInfo.getCocktailId();
    }

    public String getCocktailName(){
        return cocktailInfo.getCocktailName();
    }

    public String getCocktailImageUrl(){
        return cocktailInfo.getCocktailImageUrl();
    }
}
