package project.server.domain.cocktail.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import project.server.domain.cocktail.embed.category.CategoryMapper;
import project.server.domain.cocktail.embed.rating.Rating;
import project.server.domain.cocktail.embed.tag.TagMapper;
import project.server.domain.cocktail.entity.Cocktail;
import project.server.domain.cocktail.embed.recipe.Recipe;
import project.server.domain.cocktail.embed.recipe.RecipeDto;
import project.server.domain.cocktail.embed.tag.TagDto;
import project.server.domain.cocktail.embed.tag.Tags;
import project.server.domain.coment.Comment;

import java.time.LocalDateTime;
import java.util.List;

public class CocktailDto {

    @Getter
    @Setter
    public static class Post {
        private String name;
        private String imageUrl;
        private List<RecipeDto.Post> recipe;
        private List<TagDto.Post> tags;
        private String category;

        public Cocktail postToEntity(){
            Cocktail cocktail = new Cocktail();
            cocktail.setName(name);
            cocktail.setImageUrl(imageUrl);
            cocktail.setRecipe(new Recipe(recipe));
            cocktail.setTags(new Tags(tags));
            cocktail.setCategory(CategoryMapper.map(category));
            cocktail.setRating(new Rating());

            return cocktail;
        }
    }

    @Getter
    @Setter
    public static class SimpleResponse{
        private long cocktailId;
        private String name;
        private String imageUrl;
        private boolean isBookmarked;
    }

    @Getter
    @Builder
    public static class Response{
        private long cocktailId;
        private long userId;
        private String userName;
        private String name;
        private String imageUrl;
        private List<RecipeDto.Response> recipe;
        private List<TagDto.Response> tags;
        private int viewCount;
        private LocalDateTime createdAt;
        private List<Comment> comments;
        private List<CocktailDto.SimpleResponse> recommends;
        private boolean isBookmarked;
    }
}
