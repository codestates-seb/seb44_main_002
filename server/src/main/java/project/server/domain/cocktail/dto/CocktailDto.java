package project.server.domain.cocktail.dto;

import lombok.*;
import project.server.domain.cocktail.embed.ingredient.IngredientDto;
import project.server.domain.cocktail.embed.recipe.RecipeDto;
import project.server.domain.cocktail.embed.tag.TagDto;
import project.server.domain.comment.dto.CommentDto;

import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.List;

public class CocktailDto {

    @Getter
    @Setter
    public static class Post {
        @NotNull
        private String name;
        @NotNull
        private String imageUrl;
        @NotNull
        private String liquor;
        @NotNull
        private List<IngredientDto.Post> ingredients;
        @NotNull
        private List<RecipeDto.Post> recipe;
        @NotNull
        private String degree;
        @NotNull
        private List<TagDto.Post> flavor;
    }

    @Getter
    @Builder
    public static class SimpleResponse {
        private final long cocktailId;
        private final String name;
        private final String imageUrl;
        private final boolean isBookmarked;
        private final double userRate;
        private final int viewCount;
    }

    @Getter
    @Builder
    public static class Response {
        private final long cocktailId;
        private final boolean isAdminWritten;
        private final long userId;
        private final String userName;
        private final String name;
        private final String imageUrl;
        private final String liquor;
        private final List<IngredientDto.Response> ingredients;
        private final List<RecipeDto.Response> recipe;
        private final List<TagDto.Response> tags;
        private final double rating;
        private final int viewCount;
        private final LocalDateTime createdAt;
        private final LocalDateTime modifiedAt;
        private final List<CommentDto.Response> comments;
        private final List<CocktailDto.SimpleResponse> recommends;
        private final boolean isBookmarked;
        private final int userRate;
        private final boolean isActiveUserWritten;
    }

    @Getter
    public static class Patch {
        @NotNull
        private String name;
        @NotNull
        private String imageUrl;
        @NotNull
        private List<IngredientDto.Post> ingredients;
        @NotNull
        private List<RecipeDto.Post> recipe;
        @NotNull
        private String degree;
        @NotNull
        private List<TagDto.Post> flavor;
    }
}
