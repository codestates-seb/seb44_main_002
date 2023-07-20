package project.server.domain.follow.embed;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@Embeddable
@AllArgsConstructor
@NoArgsConstructor
public class Follower {

    @Column(name = "follower")
    private long followerId;
}
