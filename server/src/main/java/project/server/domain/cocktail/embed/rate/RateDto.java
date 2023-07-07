package project.server.domain.cocktail.embed.rate;

import lombok.AllArgsConstructor;
import lombok.Getter;

public class RateDto {

    @Getter
    @AllArgsConstructor
    public static class Response{
        private double rating;
    }
}
