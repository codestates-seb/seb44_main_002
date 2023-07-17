package project.server.domain.reply.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import project.server.domain.reply.TaggedUserInfo;
import project.server.domain.reply.dto.ReplyDto;
import project.server.domain.user.User;
import project.server.domain.comment.entity.Comment;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity(name = "replies")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Setter
public class Reply {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long replyId;

    private long userId;

    private String userName;

    private long commentId;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;

    private TaggedUserInfo taggedUserInfo;

    @CreatedDate
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @LastModifiedDate
    @Column(name = "modified_at")
    private LocalDateTime modifiedAt = LocalDateTime.now();

    public ReplyDto.Response entityToResponse() {
        return ReplyDto.Response.builder()
                .replyId(replyId)
                .userId(userId)
                .userName(userName)
                .taggedUserInfo(taggedUserInfo)
                .content(content)
                .createdAt(createdAt)
                .modifiedAt(modifiedAt)
                .build();
    }
}
