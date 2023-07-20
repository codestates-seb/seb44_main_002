package project.server.domain.follow.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import project.server.domain.follow.entity.Follow;

import java.util.Optional;

public interface FollowRepository extends JpaRepository<Follow, Long> {

    @Query("select f from Follow f where f.follower.followerId = :followerId and f.following.followingUserId = :followingId")
    Optional<Follow> findByFollowerIdAndFollowingId(@Param("followerId") long followerId, @Param("followingId") long followingId);
}
