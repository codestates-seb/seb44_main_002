package project.server.domain.cocktail.utils;

import project.server.domain.bookmark.entity.Bookmark;
import project.server.domain.cocktail.dto.CocktailDto;
import project.server.domain.cocktail.entity.Cocktail;
import project.server.domain.comment.CommentSerializer;
import project.server.domain.user.User;

import java.util.stream.Collectors;

public class CocktailSerializer {

    public static CocktailDto.Response entityToSignedUserResponse(User readUser, Cocktail cocktail, boolean isBookmark, int rate) {
        User author = cocktail.getUser();
        return entityToResponse(cocktail, isBookmark, author)
                .recommends(cocktail.getRecommends().stream()
                        .map(recommendedCocktail
                                -> entityToSimpleResponse(readUser.isBookmarked(recommendedCocktail.getCocktailId()), recommendedCocktail))
                        .collect(Collectors.toList()))
                .userRate(rate)
                .build();
    }

    public static CocktailDto.Response entityToUnsignedResponse(Cocktail cocktail, boolean unsignedUserBookmark, int unsignedUserRate) {
        User author = cocktail.getUser();
        return entityToResponse(cocktail, unsignedUserBookmark, author)
                .recommends(cocktail.getRecommends().stream()
                        .map(recommendedCocktail
                                -> entityToSimpleResponse(unsignedUserBookmark, recommendedCocktail))
                        .collect(Collectors.toList()))
                .userRate(unsignedUserRate)
                .build();
    }

    public static CocktailDto.SimpleResponse entityToSimpleResponse(boolean isBookmarked, Cocktail cocktail) {
        return CocktailDto.SimpleResponse.builder()
                .cocktailId(cocktail.getCocktailId())
                .name(cocktail.getName())
                .imageUrl(cocktail.getImageUrl())
                .isBookmarked(isBookmarked)
                .userRate(cocktail.getRatedScore())
                .viewCount(cocktail.getViewCount())
                .build();
    }

    public static CocktailDto.SimpleResponse bookmarkEntityToSimpleResponse(boolean isBookmarked, Bookmark bookmark) {
        return CocktailDto.SimpleResponse.builder()
                .cocktailId(bookmark.getCocktailId())
                .name(bookmark.getCocktailName())
                .imageUrl(bookmark.getCocktailImageUrl())
                .isBookmarked(isBookmarked)
                .build();
    }

    private static CocktailDto.Response.ResponseBuilder entityToResponse(Cocktail cocktail, boolean isBookmark, User author) {
        return CocktailDto.Response.builder()
                .cocktailId(cocktail.getCocktailId())
                .isAdminWritten(author.isAdmin())
                .userId(author.getUserId())
                .userName(author.getName())
                .name(cocktail.getName())
                .imageUrl(cocktail.getImageUrl())
                .liquor(cocktail.getLiquor().getLiquor())
                .ingredients(cocktail.getIngredients().createResponseDtoList())
                .recipe(cocktail.getRecipe().createResponseDtoList())
                .tags(cocktail.getTags().createResponseDtoList())
                .rating(cocktail.getRate().getRate())
                .viewCount(cocktail.getViewCount())
                .createdAt(cocktail.getCreatedAt())
                .modifiedAt(cocktail.getModifiedAt())
                .comments(cocktail.getComments().stream()
                        .map(CommentSerializer::entityToResponse)
                        .collect(Collectors.toList()))
                .isBookmarked(isBookmark)
                .isActiveUserWritten(author.isActiveUser());
    }
}
