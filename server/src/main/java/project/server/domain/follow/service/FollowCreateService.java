package project.server.domain.follow.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import project.server.domain.follow.repository.FollowRepository;
import project.server.domain.follow.entity.Follow;
import project.server.domain.user.entity.User;

@Service
public class FollowCreateService {

    private final FollowRepository followRepository;

    public FollowCreateService(FollowRepository followRepository) {
        this.followRepository = followRepository;
    }

    @Transactional
    public void createFollow(User follower, User following) {
        Follow follow = Follow.builder()
                .follower(follower)
                .following(following)
                .build();

        Follow savedFollower = followRepository.save(follow);
        follower.addFollow(savedFollower);
        following.addSubscriberCount();
    }
}
