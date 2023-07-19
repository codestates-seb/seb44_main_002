package project.server.domain.follow.embed;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Embeddable
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class Following {

    private long followingUserId;

    private String followingUserName;

    private String followingUserProfileImageUrl;
}
