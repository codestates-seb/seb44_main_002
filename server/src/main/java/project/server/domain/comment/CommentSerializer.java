package project.server.domain.comment;

import org.springframework.stereotype.Service;
import project.server.domain.comment.dto.CommentDto;
import project.server.domain.comment.entity.Comment;
import project.server.domain.reply.ReplySerializer;

import java.util.stream.Collectors;

@Service
public class CommentSerializer {

    private final ReplySerializer replySerializer;

    public CommentSerializer(ReplySerializer replySerializer) {
        this.replySerializer = replySerializer;
    }

    public CommentDto.Response entityToResponse(Comment comment) {
        return CommentDto.Response.builder()
                .commentId(comment.getCommentId())
                .userId(comment.getUserId())
                .userName(comment.getUserName())
                .content(comment.getContent())
                .createdAt(comment.getCreatedAt())
                .replies(comment.getReplies().stream()
                        .map(replySerializer::entityToResponse)
                        .collect(Collectors.toList()))
                .isActiveUserWritten(comment.isActiveUserWritten())
                .build();
    }
}
