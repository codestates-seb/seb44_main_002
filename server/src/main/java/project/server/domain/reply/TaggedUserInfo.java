package project.server.domain.reply;

import javax.persistence.Embeddable;

@Embeddable
public class TaggedUserInfo {

    private long taggedUserId;

    private String taggedUserName;
}
