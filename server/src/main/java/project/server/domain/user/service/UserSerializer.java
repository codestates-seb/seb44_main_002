package project.server.domain.user.service;

import org.springframework.stereotype.Service;
import project.server.domain.cocktail.utils.CocktailSerializer;
import project.server.domain.follow.entity.Follow;
import project.server.domain.user.dto.UserDto;
import project.server.domain.user.entity.User;

import java.util.stream.Collectors;

@Service
public class UserSerializer {

    private final CocktailSerializer cocktailSerializer;

    public UserSerializer(CocktailSerializer cocktailSerializer) {
        this.cocktailSerializer = cocktailSerializer;
    }

    public UserDto.Response entityToUnsignedResponse(User user){
        return UserDto.Response.builder()
                .userId(user.getUserId())
                .email(user.getEmail())
                .name(user.getName())
                .gender(user.getGender())
                .age(user.getAge())
                .profileImageUrl(user.getProfileImageUrl())
                .subscriberCount(user.getSubscriberCount())
                .cocktails(user.getCocktails().stream()
                        .map(cocktail -> cocktailSerializer.entityToSimpleResponse(false, cocktail))
                        .collect(Collectors.toList()))
                .bookmarkedCocktails(user.getBookmarks().stream()
                        .map(bookmark -> cocktailSerializer.bookmarkEntityToSimpleResponse(false, bookmark))
                        .collect(Collectors.toList()))
                .follows(user.getFollows().stream()
                        .map(Follow::getFollowing)
                        .collect(Collectors.toList()))
                .isSubscribed(false)
                .build();
    }

    public UserDto.Response entityToSignedResponse(User user, User readUser){
        return UserDto.Response.builder()
                .userId(user.getUserId())
                .email(user.getEmail())
                .name(user.getName())
                .gender(user.getGender())
                .age(user.getAge())
                .profileImageUrl(user.getProfileImageUrl())
                .subscriberCount(user.getSubscriberCount())
                .cocktails(user.getCocktails().stream()
                        .map(cocktail -> cocktailSerializer.entityToSimpleResponse(readUser.isBookmarked(cocktail.getCocktailId()), cocktail))
                        .collect(Collectors.toList()))
                .bookmarkedCocktails(user.getBookmarks().stream()
                        .map(bookmark -> cocktailSerializer.bookmarkEntityToSimpleResponse(readUser.isBookmarked(bookmark.getCocktailId()), bookmark))
                        .collect(Collectors.toList()))
                .follows(user.getFollows().stream()
                        .map(Follow::getFollowing)
                        .collect(Collectors.toList()))
                .isSubscribed(readUser.following(user))
                .build();
    }
}
