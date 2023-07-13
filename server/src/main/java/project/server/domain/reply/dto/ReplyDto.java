package project.server.domain.reply.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import project.server.domain.reply.TaggedUserInfo;
import project.server.domain.reply.entity.Reply;

import java.time.LocalDateTime;


@NoArgsConstructor
public class ReplyDto {

    @Getter
    public static class Post {
        private long userId;
        private long taggedUserId;
        private String taggedUserName;
        private String content;

        public Reply postToEntity() {
            Reply reply = new Reply();
            reply.setTaggedUserInfo(new TaggedUserInfo(taggedUserId, taggedUserName));
            reply.setContent(content);

            return reply;
        }
    }

    @Getter
    @Builder
    public static class Response {
        private long replyId;
        private long userId;
        private String userName;
        private TaggedUserInfo taggedUserInfo;
        private String content;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;
    }

    @Getter
    public static class Patch {
        private long replyId;
        private TaggedUserInfo taggedUserInfo;
        private String content;
    }
//
}
