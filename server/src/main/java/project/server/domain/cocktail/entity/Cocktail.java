package project.server.domain.cocktail.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import project.server.domain.cocktail.dto.CocktailDto;
import project.server.domain.cocktail.embed.category.Category;
import project.server.domain.cocktail.embed.rating.Rating;
import project.server.domain.cocktail.embed.recipe.Recipe;
import project.server.domain.cocktail.embed.tag.Tag;
import project.server.domain.cocktail.embed.tag.Tags;
import project.server.domain.coment.Comment;
import project.server.domain.user.User;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * 유저가 작성한 칵테일과 관리자가 작성한 칵테일을 구분하는 로직 필요
 */

@Entity(name = "cocktails")
@Getter
@Setter
@NoArgsConstructor
public class Cocktail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long cocktailId;

    private String name;

    private String imageUrl;

    private int viewCount = 0;

    @Column(name = "CREATED_AT")
    private LocalDateTime createdAt = LocalDateTime.now();

//    @Column(name = "LAST_MODIFIED_AT")
//    private LocalDateTime modifiedAt;

    @ManyToOne
    private User user;

    @OneToMany(mappedBy = "cocktail")
    private List<Comment> comments = new ArrayList<>();

    @Embedded
    private Recipe recipe;

    @Embedded
    private Tags tags;

    @Embedded
    private Rating rating;

    @Enumerated(value = EnumType.STRING)
    private Category category;

    @Transient
    private List<Cocktail> recommends;

    /**
     * 유저 정보 담는 로직 생성 해야함.
     * 북마크 체크도 해야함. 유저가 하면 될 듯?
     */
    public CocktailDto.Response entityToResponse() {
        return CocktailDto.Response.builder()
                .cocktailId(cocktailId)
                .userId(1)
                .userName("kim")
                .name(name)
                .imageUrl(imageUrl)
                .recipe(recipe.createResponseList())
                .tags(tags.createResponseList())
                .viewCount(viewCount)
                .createdAt(createdAt)
                .comments(comments)
                .isBookmarked(false)
                .recommends(recommends.stream()
                        .map(this::entityToSimpleResponse)
                        .collect(Collectors.toList()))
                .build();
    }

    public CocktailDto.SimpleResponse entityToSimpleResponse(Cocktail cocktail) {
        CocktailDto.SimpleResponse response = new CocktailDto.SimpleResponse();
        response.setCocktailId(cocktail.cocktailId);
        response.setName(cocktail.name);
        response.setImageUrl(cocktail.imageUrl);
        response.setBookmarked(false);
        return response;
    }

    public boolean containsAll(List<Tag> tags) {
        return this.tags.containsAll(tags);
    }
}
