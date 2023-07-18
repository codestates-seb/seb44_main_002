package project.server.domain.user;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import project.server.domain.cocktail.dto.CocktailDto;
import project.server.domain.follow.embed.Following;

import java.util.List;

public class UserDto {

    @Getter
    @Setter
    public static class Post {
        private String email;
        private String password;
        private String name;
        private String gender;
        private int age;

        public User postToEntity() {
            User user = new User();
            user.setEmail(email);
            user.setPassword(password);
            user.setName(name);
            user.setGender(gender);
            user.setAge(age);

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
    }

    @Getter
    public static class Patch {
        private long userId;
        private String password;
    }
}
