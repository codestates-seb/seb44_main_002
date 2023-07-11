package project.server.image;

import lombok.AllArgsConstructor;
import lombok.Getter;

public class ImageDto {

    @Getter
    @AllArgsConstructor
    public static class Response{
        String url;
    }
}
