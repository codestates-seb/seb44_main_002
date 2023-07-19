package project.server.domain.reply;

import project.server.domain.reply.dto.ReplyDto;
import project.server.domain.reply.entity.Reply;

public class ReplySerializer {

    public static ReplyDto.Response entityToResponse(Reply reply) {
        return ReplyDto.Response.builder()
                .replyId(reply.getReplyId())
                .userId(reply.getUserId())
                .userName(reply.getUserName())
                .taggedUserInfo(reply.getTaggedUserInfo())
                .content(reply.getContent())
                .createdAt(reply.getCreatedAt())
                .modifiedAt(reply.getModifiedAt())
                .isActiveUserWritten(reply.isActiveUserWritten())
                .build();
    }
}
