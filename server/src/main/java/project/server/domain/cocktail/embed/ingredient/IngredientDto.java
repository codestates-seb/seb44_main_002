package project.server.domain.cocktail.embed.ingredient;

import lombok.AllArgsConstructor;
import lombok.Getter;

public class IngredientDto {

    @Getter
    @AllArgsConstructor
    public static class Post{
        private String ingredient;
    }

    @Getter
    @AllArgsConstructor
    public static class Response{
        private String ingredient;
    }
}
