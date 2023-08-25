package project.server.domain.follow.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import project.server.domain.follow.entity.Follow;
import project.server.domain.user.entity.User;
import project.server.domain.user.service.UserService;
import project.server.global.exception.BusinessLogicException;
import project.server.global.exception.ExceptionCode;

@Service
@Slf4j
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
    public void follow(String followerEmail, long followingUserId) {
        User follower = userService.findUserByEmail(followerEmail);
        User following = userService.findUserByUserId(followingUserId);
        verifyFollowTarget(follower, following);
        followCreateService.create(follower, following);
        log.info("# followerUserId : {}, followingUserId : {} FollowService#createFollow 성공", follower.getUserId(), followingUserId);
    }

    @Transactional
    public void unfollow(String followerEmail, long followingUserId) {
        User follower = userService.findUserByEmail(followerEmail);
        Follow follow = followReadService.findFollowByFollowerIdAndFollowingId(follower.getUserId(), followingUserId);
        User following = userService.findUserByUserId(followingUserId);
        followDeleteService.delete(follower, follow, following);
        log.info("# followerUserId : {}, followingUserId : {} FollowService#deleteFollow 성공", follower.getUserId(), followingUserId);
    }

    private void verifyFollowTarget(User follower, User following) {
        if(follower == following || following.isAdmin() || follower.following(following)){
            throw new BusinessLogicException(ExceptionCode.INVALID_FOLLOW_TARGET);
        }
    }
}
