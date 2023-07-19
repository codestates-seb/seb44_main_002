package project.server.domain.cocktail.entity;

import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import project.server.domain.cocktail.dto.CocktailDto;
import project.server.domain.cocktail.embed.ingredient.Ingredients;
import project.server.domain.cocktail.embed.liquor.Liquor;
import project.server.domain.cocktail.embed.category.Category;
import project.server.domain.cocktail.embed.rate.Rate;
import project.server.domain.cocktail.embed.recipe.Recipe;
import project.server.domain.cocktail.embed.tag.Tag;
import project.server.domain.cocktail.embed.tag.Tags;
import project.server.domain.comment.entity.Comment;
import project.server.domain.user.User;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity(name = "cocktails")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Cocktail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long cocktailId;

    private String name;

    private String imageUrl;

    private int viewCount = 0;

    @CreatedDate
    @Column(name = "CREATED_AT", updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @LastModifiedDate
    @Column(name = "LAST_MODIFIED_AT")
    private LocalDateTime modifiedAt = LocalDateTime.now();

    @ManyToOne
    private User user;

    @OneToMany
    private List<Comment> comments = new ArrayList<>();

    @Embedded
    private Recipe recipe;

    @Embedded
    private Tags tags;

    @Embedded
    private Rate rate;

    @Enumerated(value = EnumType.STRING)
    private Category category;

    @Enumerated(value = EnumType.STRING)
    private Liquor liquor;

    @Embedded
    private Ingredients ingredients;

    @Transient
    private List<Cocktail> recommends;

    @Builder
    public Cocktail(String name, String imageUrl, Recipe recipe, Tags tags,
                    Rate rate, Category category, Liquor liquor, Ingredients ingredients){
        this.name = name;
        this.imageUrl = imageUrl;
        this.recipe = recipe;
        this.tags = tags;
        this.rate = rate;
        this.category = category;
        this.liquor = liquor;
        this.ingredients = ingredients;
    }

    public boolean containsAll(List<Tag> tags) {
        return this.tags.containsAll(tags);
    }

    public void assignRecommends(List<Cocktail> recommends) {
        this.recommends = recommends;
    }

    public void incrementViewCount() {
        viewCount++;
    }

    public void modify(CocktailDto.Patch patch, List<Tag> tags) {
        this.name = patch.getName();
        this.imageUrl = patch.getImageUrl();
        this.ingredients = new Ingredients(patch.getBaseIngredients(), patch.getAdditionalIngredients());
        this.recipe = new Recipe(patch.getRecipe());
        this.tags = new Tags(tags);
        this.modifiedAt = LocalDateTime.now();
    }

    public void rate(int value) {
        rate.calculate(value);
    }

    public void reRate(int oldValue, int value) {
        rate.reCalculate(oldValue, value);
    }

    public double getRatedScore() {
        return rate.getRate();
    }

    public void assignUser(User user) {
        this.user = user;
    }

    public long getUserId() {
        return user.getUserId();
    }

    public void addComment(Comment comment) {
        comments.add(comment);
    }

    public void removeComment(Comment comment) {
        comments.remove(comment);
    }
}
