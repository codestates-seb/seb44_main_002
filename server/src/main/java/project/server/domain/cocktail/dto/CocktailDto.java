package project.server.domain.cocktail.dto;

import lombok.Builder;
import lombok.Getter;
import project.server.domain.cocktail.embed.category.CategoryMapper;
import project.server.domain.cocktail.embed.ingredient.IngredientDto;
import project.server.domain.cocktail.embed.ingredient.Ingredients;
import project.server.domain.cocktail.embed.liquor.LiquorMapper;
import project.server.domain.cocktail.embed.rating.Rating;
import project.server.domain.cocktail.entity.Cocktail;
import project.server.domain.cocktail.embed.recipe.Recipe;
import project.server.domain.cocktail.embed.recipe.RecipeDto;
import project.server.domain.cocktail.embed.tag.TagDto;
import project.server.domain.cocktail.embed.tag.Tags;
import project.server.domain.comment.dto.CommentDto;

import java.time.LocalDateTime;
import java.util.List;

public class CocktailDto {

    @Getter
    public static class Post {
        private String name;
        private String imageUrl;
        private String liquor;
        private List<IngredientDto.Post> ingredients;
        private List<RecipeDto.Post> recipe;
        private List<TagDto.Post> tags;

        public Cocktail postToEntity() {
            return Cocktail.builder()
                    .name(name)
                    .imageUrl(imageUrl)
                    .recipe(new Recipe(recipe))
                    .tags(new Tags(tags))
                    .category(CategoryMapper.map(liquor))
                    .rating(new Rating())
                    .liquor(LiquorMapper.map(liquor))
                    .ingredients(new Ingredients(ingredients))
                    .build();
        }
    }

    @Getter
    @Builder
    public static class SimpleResponse {
        private final long cocktailId;
        private final String name;
        private final String imageUrl;
        private final boolean isBookmarked;
    }

    @Getter
    @Builder
    public static class Response {
        private final long cocktailId;
        private final long userId;
        private final String userName;
        private final String name;
        private final String imageUrl;
        private final String liquor;
        private final List<IngredientDto.Response> ingredients;
        private final List<RecipeDto.Response> recipe;
        private final List<TagDto.Response> tags;
        private final int viewCount;
        private final LocalDateTime createdAt;
        private final LocalDateTime modifiedAt;
        private final List<CommentDto.Response> comments;
        private final List<CocktailDto.SimpleResponse> recommends;
        private final boolean isBookmarked;
    }

    @Getter
    public static class Patch {
        private String name;
        private String imageUrl;
        private List<IngredientDto.Post> ingredients;
        private List<RecipeDto.Post> recipe;
        private List<TagDto.Post> tags;
    }
}