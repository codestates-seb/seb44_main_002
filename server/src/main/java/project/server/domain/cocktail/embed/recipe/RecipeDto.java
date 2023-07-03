package project.server.domain.cocktail.embed.recipe;

import lombok.Getter;

public class RecipeDto {

    @Getter
    public static class Post{
        private String process;
    }

    @Getter
    public static class Response{
        private final String process;

        public Response(String process) {
            this.process =process;
        }
    }
}
