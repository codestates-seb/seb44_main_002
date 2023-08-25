package project.server.domain.cocktail.utils;

import org.springframework.stereotype.Service;
import project.server.domain.bookmark.entity.Bookmark;
import project.server.domain.cocktail.dto.CocktailDto;
import project.server.domain.cocktail.embed.category.CategoryMapper;
import project.server.domain.cocktail.embed.ingredient.Ingredients;
import project.server.domain.cocktail.embed.liquor.LiquorMapper;
import project.server.domain.cocktail.embed.rate.Rate;
import project.server.domain.cocktail.embed.recipe.Recipe;
import project.server.domain.cocktail.embed.tag.Tag;
import project.server.domain.cocktail.embed.tag.TagDto;
import project.server.domain.cocktail.embed.tag.TagMapper;
import project.server.domain.cocktail.embed.tag.Tags;
import project.server.domain.cocktail.entity.Cocktail;
import project.server.domain.comment.CommentSerializer;
import project.server.domain.user.entity.User;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CocktailConverter {

    private final CommentSerializer commentSerializer;

    public CocktailConverter(CommentSerializer commentSerializer) {
        this.commentSerializer = commentSerializer;
    }

    public CocktailDto.Response convertEntityToSignedUserResponseDto(User readUser, Cocktail cocktail, int rate) {
        User author = cocktail.getUser();
        return convertEntityToResponseDto(cocktail, readUser.isBookmarked(cocktail.getCocktailId()), author)
                .recommends(cocktail.getRecommends().stream()
                        .map(recommendedCocktail
                                -> convertEntityToSimpleResponseDto(readUser.isBookmarked(recommendedCocktail.getCocktailId()), recommendedCocktail))
                        .collect(Collectors.toList()))
                .userRate(rate)
                .build();
    }

    public CocktailDto.Response convertEntityToUnsignedResponseDto(Cocktail cocktail, boolean unsignedUserBookmark, int unsignedUserRate) {
        User author = cocktail.getUser();
        return convertEntityToResponseDto(cocktail, unsignedUserBookmark, author)
                .recommends(cocktail.getRecommends().stream()
                        .map(recommendedCocktail
                                -> convertEntityToSimpleResponseDto(unsignedUserBookmark, recommendedCocktail))
                        .collect(Collectors.toList()))
                .userRate(unsignedUserRate)
                .build();
    }

    public CocktailDto.SimpleResponse convertEntityToSimpleResponseDto(boolean isBookmarked, Cocktail cocktail) {
        return CocktailDto.SimpleResponse.builder()
                .cocktailId(cocktail.getCocktailId())
                .name(cocktail.getName())
                .imageUrl(cocktail.getImageUrl())
                .isBookmarked(isBookmarked)
                .userRate(cocktail.getRatedScore())
                .viewCount(cocktail.getViewCount())
                .build();
    }

    public CocktailDto.SimpleResponse bookmarkEntityToSimpleResponse(boolean isBookmarked, Bookmark bookmark) {
        return CocktailDto.SimpleResponse.builder()
                .cocktailId(bookmark.getCocktailId())
                .name(bookmark.getCocktailName())
                .imageUrl(bookmark.getCocktailImageUrl())
                .isBookmarked(isBookmarked)
                .build();
    }

    public Cocktail convertPostDtoToEntity(CocktailDto.Post dto) {
        List<Tag> tags =dto.getFlavor().stream()
                .map(TagDto.Post::getTag)
                .map(TagMapper::map)
                .collect(Collectors.toList());
        tags.add(TagMapper.map(dto.getDegree()));

        return Cocktail.builder()
                .name(dto.getName())
                .imageUrl(dto.getImageUrl())
                .recipe(new Recipe(dto.getRecipe()))
                .tags(new Tags(tags))
                .category(CategoryMapper.map(dto.getLiquor()))
                .rate(new Rate())
                .liquor(LiquorMapper.map(dto.getLiquor()))
                .ingredients(new Ingredients(dto.getIngredients()))
                .build();
    }

    private CocktailDto.Response.ResponseBuilder convertEntityToResponseDto(Cocktail cocktail, boolean isBookmark, User author) {
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
                        .map(commentSerializer::entityToResponse)
                        .collect(Collectors.toList()))
                .isBookmarked(isBookmark)
                .isActiveUserWritten(author.isActiveUser());
    }
}
