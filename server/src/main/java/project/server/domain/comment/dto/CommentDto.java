package project.server.domain.comment.dto;

import lombok.*;
import project.server.domain.cocktail.entity.Cocktail;
import project.server.domain.comment.entity.Comment;
import project.server.domain.reply.dto.ReplyDto;
import project.server.domain.reply.entity.Reply;

import java.time.LocalDateTime;
import java.util.List;

public class CommentDto {
    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
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
        List<ReplyDto.Response> replies;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    public static class Patch {
        private String content;
    }
}
