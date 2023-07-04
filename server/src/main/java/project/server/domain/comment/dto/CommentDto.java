package project.server.domain.comment.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import project.server.domain.cocktail.entity.Cocktail;
import project.server.domain.comment.entity.Comment;

import java.time.LocalDateTime;

public class CommentDto {
    @Getter
    @Setter
    public static class Post {
        private String content;

        public Comment postToEntity() {
            Comment comment = new Comment();
            comment.setContent(content);

            return comment;
        }
    }

    @Getter
    @Builder
    public static class Response{
        private long commentId;
        private long userId;
        private String userName;
        private String content;
        private LocalDateTime createdAt;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    public static class Patch {
        private long commentId;
        private String content;
    }
}
