package project.server.domain.recommend.dto;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import lombok.AllArgsConstructor;
import lombok.Getter;
import project.server.domain.recommend.entity.Recommend;

import java.util.List;
import java.util.stream.Collectors;

public class RecommendDto {
    @Getter
    public static class UnsignedResponse {
        private final List<RecommendDto.Response> bestCocktails;

        public UnsignedResponse(List<Recommend> bestCocktails) {
            this.bestCocktails = bestCocktails.stream()
                    .map(cocktail -> new RecommendDto.Response(cocktail.getCocktailId(), cocktail.getName(), cocktail.getImageUrl()))
                    .collect(Collectors.toList());
        }
    }

    @Getter
    public static class SignedResponse {
        private final List<RecommendDto.Response> bestCocktails;
        private final List<RecommendDto.Response> recommendedCocktails;

        public SignedResponse(List<Recommend> bestCocktails, List<Recommend> recommendedCocktails){
            this.bestCocktails = bestCocktails.stream()
                    .map(cocktail -> new RecommendDto.Response(cocktail.getCocktailId(), cocktail.getName(), cocktail.getImageUrl()))
                    .collect(Collectors.toList());

            this.recommendedCocktails = recommendedCocktails.stream()
                    .map(cocktail -> new RecommendDto.Response(cocktail.getCocktailId(), cocktail.getName(), cocktail.getImageUrl()))
                    .collect(Collectors.toList());
        }
    }

    @JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
    @AllArgsConstructor
    private static class Response{
        private final long cocktailId;
        private final String cocktailName;
        private final String cocktailImageUrl;
    }
}
