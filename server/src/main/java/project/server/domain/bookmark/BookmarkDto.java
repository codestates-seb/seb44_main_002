package project.server.domain.bookmark;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import lombok.Getter;
import project.server.domain.bookmark.embed.CocktailInfo;
import project.server.domain.bookmark.entity.Bookmark;

import java.util.List;
import java.util.stream.Collectors;

public class BookmarkDto {
    @Getter
    public static class UnsignedResponse {
        private final List<BookmarkDto.Response> bestCocktails;

        public UnsignedResponse(List<Bookmark> bestCocktails) {
            this.bestCocktails = bestCocktails.stream()
                    .map(bookmark -> new BookmarkDto.Response(bookmark.getCocktailInfo()))
                    .collect(Collectors.toList());
        }
    }

    @Getter
    public static class SignedResponse {
        private final List<BookmarkDto.Response> bestCocktails;
        private final List<BookmarkDto.Response> recommendedCocktails;

        public SignedResponse(List<Bookmark> bestCocktails, List<Bookmark> recommendedCocktails){
            this.bestCocktails = bestCocktails.stream()
                    .map(bookmark -> new BookmarkDto.Response(bookmark.getCocktailInfo()))
                    .collect(Collectors.toList());

            this.recommendedCocktails = recommendedCocktails.stream()
                    .map(bookmark -> new BookmarkDto.Response(bookmark.getCocktailInfo()))
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
