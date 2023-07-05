package project.server.domain.cocktail.embed.tag;

import lombok.Getter;
import lombok.Setter;

public class TagDto {

    @Getter
    @Setter
    public static class Post {
        String tag;
    }

    @Getter
    @Setter
    public static class Response {
        String tag;

        public Response(String tag) {
            this.tag = tag;
        }
    }
}
