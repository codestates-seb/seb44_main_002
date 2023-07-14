package project.server.domain.user;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

public class UserDto {

    @Getter
    @Setter
    public static class post {
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
    }

    @Getter
    @Setter
    public static class Patch {
        private long userId;
        private String password;
    }
}
