package project.server.domain.reply;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import net.bytebuddy.utility.nullability.MaybeNull;
import project.server.domain.comment.entity.Comment;
import project.server.domain.user.User;

import javax.persistence.*;

@Entity(name = "replies")
@Getter
@Setter
@NoArgsConstructor
public class Reply {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long replyId;

    @ManyToOne
    private User user;

    @ManyToOne
    private Comment comment;

    private String content;

    @Embedded
    private TaggedUserInfo taggedUserInfo;
}
