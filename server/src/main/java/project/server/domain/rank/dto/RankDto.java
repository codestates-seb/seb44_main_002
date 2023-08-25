package project.server.domain.rank.dto;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import lombok.AllArgsConstructor;
import lombok.Getter;
import project.server.domain.rank.vo.Rank;

import java.util.List;
import java.util.stream.Collectors;

public class RankDto {
    @Getter
    public static class UnsignedResponse {
        private final List<RankDto.Response> totalRank;

        public UnsignedResponse(List<Rank> totalRank) {
            this.totalRank = totalRank.stream()
                    .map(cocktail -> new RankDto.Response(cocktail.getCocktailId(), cocktail.getName(), cocktail.getImageUrl()))
                    .collect(Collectors.toList());
        }
    }

    @Getter
    public static class SignedResponse {
        private final List<RankDto.Response> totalRank;
        private final List<RankDto.Response> signedUserRank;

        public SignedResponse(List<Rank> totalRank, List<Rank> signedUserRank){
            this.totalRank = totalRank.stream()
                    .map(cocktail -> new RankDto.Response(cocktail.getCocktailId(), cocktail.getName(), cocktail.getImageUrl()))
                    .collect(Collectors.toList());

            this.signedUserRank = signedUserRank.stream()
                    .map(cocktail -> new RankDto.Response(cocktail.getCocktailId(), cocktail.getName(), cocktail.getImageUrl()))
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
