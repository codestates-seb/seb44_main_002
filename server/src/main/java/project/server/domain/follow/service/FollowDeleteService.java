package project.server.domain.follow.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import project.server.domain.follow.repository.FollowRepository;
import project.server.domain.follow.entity.Follow;
import project.server.domain.user.User;

@Service
public class FollowDeleteService {

    private final FollowRepository followRepository;

    public FollowDeleteService(FollowRepository followRepository) {
        this.followRepository = followRepository;
    }

    @Transactional
    public void cancelFollow(User follower, Follow follow, User following) {
        follower.cancelFollow(follow);
        following.subtractSubscriberCount();
        followRepository.delete(follow);
    }
}
