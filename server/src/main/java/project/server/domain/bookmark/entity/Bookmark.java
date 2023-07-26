package project.server.domain.bookmark.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import project.server.domain.bookmark.embed.UserInfo;
import project.server.domain.cocktail.entity.Cocktail;

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

    @ManyToOne
    private Cocktail cocktail;

    @Builder
    public Bookmark(UserInfo userInfo, Cocktail cocktail) {
        this.userInfo = userInfo;
        this.cocktail = cocktail;
    }

    public long getUserId() {
        return userInfo.getUserId();
    }

    public long getCocktailId() {
        return cocktail.getCocktailId();
    }

    public String getCocktailName(){
        return cocktail.getName();
    }

    public String getCocktailImageUrl(){
        return cocktail.getImageUrl();
    }
}
