package project.server.domain.rank.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import project.server.domain.rank.dto.RankDto;
import project.server.domain.rank.vo.Rank;
import project.server.domain.user.entity.User;
import project.server.domain.user.service.UserService;

import java.util.List;

@Service
@Slf4j
public class RankService {

    private final RankReadService rankReadService;
    private final UserService userService;

    public RankService(RankReadService rankReadService, UserService userService) {
        this.rankReadService = rankReadService;
        this.userService = userService;
    }


    public RankDto.UnsignedResponse readRankForUnsignedUser() {
        List<Rank> totalRank =  rankReadService.readTotalRank();
        log.info("# RankService#readRankForUnsignedUser 성공");
        return new RankDto.UnsignedResponse(totalRank);
    }

    public RankDto.SignedResponse readRankForSignedUser(String email) {
        User user = userService.findUserByEmail(email);
        List<Rank> totalRank = rankReadService.readTotalRank();
        List<Rank> signedUserRank = rankReadService.readSignedUserRank(user);
        log.info("# userId : {}, userAge : {}, userGender : {} RankService#readRankForSignedUser 성공", user.getUserId(), user.getAge(), user.getGender());
        return new RankDto.SignedResponse(totalRank, signedUserRank);
    }
}
