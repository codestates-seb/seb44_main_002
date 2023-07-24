package project.server.domain.cocktail.embed.ingredient;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

public class IngredientDto {

    @Getter
    @Setter
    public static class Post{
        private String ingredient;
    }

    @Getter
    @AllArgsConstructor
    public static class Response{
        private String ingredient;
    }
}
