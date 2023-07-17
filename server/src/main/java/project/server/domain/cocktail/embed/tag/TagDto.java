package project.server.domain.cocktail.embed.tag;

import lombok.AllArgsConstructor;
import lombok.Getter;

public class TagDto {

    @Getter
    @AllArgsConstructor
    public static class Post{
        private String tag;
    }

    @Getter
    public static class Response{
        private final String tag;

        public Response(String tag) {
            this.tag = tag;
        }
    }
}
