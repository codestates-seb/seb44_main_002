package project.server.domain.comment.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import project.server.domain.cocktail.entity.Cocktail;
import project.server.domain.comment.dto.CommentDto;
import project.server.domain.reply.entity.Reply;
import project.server.domain.user.User;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Entity(name = "comments")
@Getter
@Setter
@NoArgsConstructor
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long commentId;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;

    @ManyToOne
    @JoinColumn(name = "cocktail_id")
    private Cocktail cocktail;

    private long userId;

    private String userName;

    @CreatedDate
    @Column(name = "created_at", updatable = false)
    LocalDateTime createdAt = LocalDateTime.now();

    @LastModifiedDate
    @Column(name = "last_modified_at")
    LocalDateTime modifiedAt = LocalDateTime.now();

    @OneToMany
    List<Reply> replies = new ArrayList<>();

    public CommentDto.Response entityToResponse() {
        return CommentDto.Response.builder()
                .commentId(commentId)
                .userId(userId)
                .userName(userName)
                .content(content)
                .createdAt(createdAt)
                .replies(replies.stream()
                        .map(Reply::entityToResponse)
                        .collect(Collectors.toList()))
                .build();
    }

    public void addReply(Reply reply) {
        replies.add(reply);
    }
}
