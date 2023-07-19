package project.server.domain.user;

import project.server.domain.cocktail.utils.CocktailSerializer;
import project.server.domain.follow.entity.Follow;

import java.util.stream.Collectors;

public class UserSerializer {

    public static UserDto.Response entityToUnsignedResponse(User user){
        return UserDto.Response.builder()
                .userId(user.getUserId())
                .email(user.getEmail())
                .name(user.getName())
                .gender(user.getGender())
                .age(user.getAge())
                .profileImageUrl(user.getProfileImageUrl())
                .subscriberCount(user.getSubscriberCount())
                .cocktails(user.getCocktails().stream()
                        .map(cocktail -> CocktailSerializer.entityToSimpleResponse(false, cocktail))
                        .collect(Collectors.toList()))
                .bookmarkedCocktails(user.getBookmarks().stream()
                        .map(bookmark -> CocktailSerializer.bookmarkEntityToSimpleResponse(false, bookmark))
                        .collect(Collectors.toList()))
                .follows(user.getFollows().stream()
                        .map(Follow::getFollowing)
                        .collect(Collectors.toList()))
                .isSubscribed(false)
                .build();
    }

    public static UserDto.Response entityToSignedResponse(User user, User readUser){
        return UserDto.Response.builder()
                .userId(user.getUserId())
                .email(user.getEmail())
                .name(user.getName())
                .gender(user.getGender())
                .age(user.getAge())
                .profileImageUrl(user.getProfileImageUrl())
                .subscriberCount(user.getSubscriberCount())
                .cocktails(user.getCocktails().stream()
                        .map(cocktail -> CocktailSerializer.entityToSimpleResponse(readUser.isBookmarked(cocktail.getCocktailId()), cocktail))
                        .collect(Collectors.toList()))
                .bookmarkedCocktails(user.getBookmarks().stream()
                        .map(bookmark -> CocktailSerializer.bookmarkEntityToSimpleResponse(readUser.isBookmarked(bookmark.getCocktailId()), bookmark))
                        .collect(Collectors.toList()))
                .follows(user.getFollows().stream()
                        .map(Follow::getFollowing)
                        .collect(Collectors.toList()))
                .isSubscribed(readUser.following(user))
                .build();
    }
}
