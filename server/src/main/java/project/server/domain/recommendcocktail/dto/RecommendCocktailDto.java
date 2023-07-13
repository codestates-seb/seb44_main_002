package project.server.domain.recommendcocktail.dto;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import lombok.Getter;
import project.server.domain.recommendcocktail.embed.CocktailInfo;
import project.server.domain.recommendcocktail.entity.RecommendCocktail;

import java.util.List;
import java.util.stream.Collectors;

public class RecommendCocktailDto {

    @Getter
    public static class UnsignedResponse {
        private final List<Response> bestCocktails;

        public UnsignedResponse(List<RecommendCocktail> bestCocktails) {
            this.bestCocktails = bestCocktails.stream()
                    .map(cocktail -> new Response(cocktail.getCocktailInfo()))
                    .collect(Collectors.toList());
        }
    }

    @Getter
    public static class SignedResponse {
        private final List<Response> bestCocktails;
        private final List<Response> recommendedCocktails;

        public SignedResponse(List<RecommendCocktail> bestCocktails, List<RecommendCocktail> recommendedCocktails){
            this.bestCocktails = bestCocktails.stream()
                    .map(cocktail -> new Response(cocktail.getCocktailInfo()))
                    .collect(Collectors.toList());

            this.recommendedCocktails = recommendedCocktails.stream()
                    .map(cocktail -> new Response(cocktail.getCocktailInfo()))
                    .collect(Collectors.toList());
        }
    }

    @JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
    private static class Response{
        private final long cocktailId;
        private final String cocktailName;
        private final String cocktailImageUrl;

        public Response(CocktailInfo cocktailInfo){
            this.cocktailId = cocktailInfo.getCocktailId();
            this.cocktailName = cocktailInfo.getCocktailName();
            this.cocktailImageUrl = cocktailInfo.getCocktailImageUrl();
        }
    }
}
