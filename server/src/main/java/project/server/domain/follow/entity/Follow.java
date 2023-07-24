package project.server.domain.follow.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import project.server.domain.follow.embed.Follower;
import project.server.domain.follow.embed.Following;
import project.server.domain.user.entity.User;

import javax.persistence.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Follow {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long followId;

    @Embedded
    private Following following;

    @Embedded
    private Follower follower;

    @Builder
    public Follow(User follower, User following) {
        this.follower = new Follower(follower.getUserId());
        this.following = new Following(following.getUserId(),
                following.getName(),
                following.getProfileImageUrl());
    }

    public boolean contains(long userId) {
        return following.getFollowingUserId() == userId;
    }
}
