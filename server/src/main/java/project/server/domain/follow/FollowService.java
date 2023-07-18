package project.server.domain.follow;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import project.server.domain.follow.entity.Follow;
import project.server.domain.follow.service.FollowCreateService;
import project.server.domain.follow.service.FollowDeleteService;
import project.server.domain.follow.service.FollowReadService;
import project.server.domain.user.User;
import project.server.domain.user.UserService;
import project.server.exception.BusinessLogicException;
import project.server.exception.ExceptionCode;

@Service
public class FollowService {

    private final UserService userService;
    private final FollowCreateService followCreateService;
    private final FollowDeleteService followDeleteService;
    private final FollowReadService followReadService;

    public FollowService(UserService userService, FollowCreateService followCreateService, FollowDeleteService followDeleteService, FollowReadService followReadService) {
        this.userService = userService;
        this.followCreateService = followCreateService;
        this.followDeleteService = followDeleteService;
        this.followReadService = followReadService;
    }

    @Transactional
    public void createFollow(String followerEmail, long followingUserId) {
        User follower = userService.findUserByEmail(followerEmail);
        User following = userService.findUserByUserId(followingUserId);
        verifyFollowTarget(follower, following);
        followCreateService.createFollow(follower, following);
    }

    @Transactional
    public void removeFollow(String followerEmail, long followingUserId) {
        User follower = userService.findUserByEmail(followerEmail);
        Follow follow = followReadService.findFollowByFollowerIdAndFollowingId(follower.getUserId(), followingUserId);
        followDeleteService.cancelFollow(follower, follow);
    }

    private void verifyFollowTarget(User follower, User following) {
        if(follower == following || following.isAdmin() || follower.following(following)){
            throw new BusinessLogicException(ExceptionCode.INVALID_FOLLOW_TARGET);
        }
    }
}
