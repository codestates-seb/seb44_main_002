package project.server.domain.reply.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import project.server.domain.reply.TaggedUserInfo;
import project.server.domain.user.User;

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

    @ManyToOne
    private User user;

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
