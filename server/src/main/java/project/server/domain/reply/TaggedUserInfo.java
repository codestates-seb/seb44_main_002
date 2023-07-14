package project.server.domain.reply;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Embeddable;

@Embeddable
@NoArgsConstructor
@Getter
public class TaggedUserInfo {
    private Long taggedUserId;

    private String taggedUserName;

    public TaggedUserInfo(Long taggedUserId, String taggedUserName) {
        this.taggedUserId = taggedUserId;
        this.taggedUserName = taggedUserName;
    }
}