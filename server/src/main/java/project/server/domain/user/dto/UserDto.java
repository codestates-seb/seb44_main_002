package project.server.domain.user.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import project.server.domain.cocktail.dto.CocktailDto;
import project.server.domain.follow.embed.Following;
import project.server.domain.user.entity.User;
import project.server.global.validator.Password;

import java.util.List;

public class UserDto {

    private static final String USER_DEFAULT_PROFILE_IMAGE_URL = "https://cocktail-project.s3.ap-northeast-2.amazonaws.com/%E1%84%80%E1%85%B5%E1%84%87%E1%85%A9%E1%86%AB+%E1%84%91%E1%85%B3%E1%84%85%E1%85%A9%E1%84%91%E1%85%B5%E1%86%AF.jpeg";

    @Getter
    @Setter
    public static class Post {
        private String email;
        @Password
        private String password;
        private String name;
        private String gender;
        private int age;
        private String profileImageUrl;

        public User postToEntity() {
            User user = new User();
            user.setEmail(email);
            user.setPassword(password);
            user.setName(name);
            user.setGender(gender);
            user.setAge(age);
            user.setProfileImageUrl(profileImageUrl);
            if (profileImageUrl.equals("")) {
                user.setProfileImageUrl(USER_DEFAULT_PROFILE_IMAGE_URL);
            }

            return user;
        }
    }

    @Getter
    @Builder
    public static class Response {
        private long userId;
        private String name;
        private String profileImageUrl;
        private String gender;
        private int age;
        private String email;
        private long subscriberCount;
        private List<CocktailDto.SimpleResponse> cocktails;
        private List<CocktailDto.SimpleResponse> bookmarkedCocktails;
        private List<Following> follows;
        private boolean isSubscribed;
    }

    @Getter
    @Setter
    public static class Patch {
        @Password
        private String password;
    }
}
