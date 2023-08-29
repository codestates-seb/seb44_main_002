package project.server.domain.user.service;

import org.springframework.stereotype.Service;
import project.server.domain.cocktail.utils.CocktailConverter;
import project.server.domain.follow.entity.Follow;
import project.server.domain.user.dto.UserDto;
import project.server.domain.user.entity.User;

import java.util.stream.Collectors;

@Service
public class UserSerializer {

    private final CocktailConverter cocktailConverter;

    public UserSerializer(CocktailConverter cocktailConverter) {
        this.cocktailConverter = cocktailConverter;
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
                        .map(cocktail -> cocktailConverter.convertEntityToSimpleResponseDto(false, cocktail))
                        .collect(Collectors.toList()))
                .bookmarkedCocktails(user.getBookmarks().stream()
                        .map(bookmark -> cocktailConverter.bookmarkEntityToSimpleResponseDto(false, bookmark))
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
                        .map(cocktail -> cocktailConverter.convertEntityToSimpleResponseDto(readUser.isBookmarked(cocktail.getCocktailId()), cocktail))
                        .collect(Collectors.toList()))
                .bookmarkedCocktails(user.getBookmarks().stream()
                        .map(bookmark -> cocktailConverter.bookmarkEntityToSimpleResponseDto(readUser.isBookmarked(bookmark.getCocktailId()), bookmark))
                        .collect(Collectors.toList()))
                .follows(user.getFollows().stream()
                        .map(Follow::getFollowing)
                        .collect(Collectors.toList()))
                .isSubscribed(readUser.following(user))
                .build();
    }
}
