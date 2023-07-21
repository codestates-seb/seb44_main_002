package project.server.domain.comment.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import project.server.domain.reply.entity.Reply;
import project.server.domain.user.User;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

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
    private User user;

    @CreatedDate
    @Column(name = "created_at", updatable = false)
    LocalDateTime createdAt = LocalDateTime.now();

    @LastModifiedDate
    @Column(name = "last_modified_at")
    LocalDateTime modifiedAt = LocalDateTime.now();

    @OneToMany(cascade = CascadeType.ALL)
    List<Reply> replies = new ArrayList<>();

    public void addReply(Reply reply) {
        replies.add(reply);
    }

    public void deleteReply(Reply reply) {
        replies.remove(reply);
    }

    public long getUserId() {
        return user.getUserId();
    }

    public String getUserName() {
        return user.getName();
    }

    public boolean isActiveUserWritten() {
        return user.isActiveUser();
    }
}