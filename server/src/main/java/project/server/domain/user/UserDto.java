package project.server.domain.user;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

public class UserDto {

    @Getter
    @Setter
    @AllArgsConstructor
    public static class post {
        private String email;
        private String password;
        private String name;
        private String gender;
        private int age;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    public static class Response {
        private String name;
        private String profileImageUrl;
        private String gender;
        private int age;
        private String email;
        private long subscriberCount;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    public static class Patch {
        private long userId;
        private String password;
    }
}
