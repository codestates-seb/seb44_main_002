package project.server.domain.cocktail.embed.recipe;

import lombok.Getter;
import lombok.Setter;

public class RecipeDto {

    @Getter
    @Setter
    public static class Post{
        private String process;
    }

    @Getter
    public static class Response{
        private final String process;


        public Response(String process) {
            this.process = process;
        }
    }
}
