package project.server.domain.follow.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import project.server.domain.follow.entity.Follow;
import project.server.domain.follow.repository.FollowRepository;
import project.server.global.exception.BusinessLogicException;
import project.server.global.exception.ExceptionCode;

@Service
public class FollowReadService {

    private final FollowRepository followRepository;

    public FollowReadService(FollowRepository followRepository) {
        this.followRepository = followRepository;
    }

    @Transactional(readOnly = true)
    public Follow findFollowByFollowerIdAndFollowingId(long followerId, long followingId) {
        return followRepository.findByFollowerIdAndFollowingId(followerId, followingId).orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.FOLLOW_NOT_FOUND));
    }
}
