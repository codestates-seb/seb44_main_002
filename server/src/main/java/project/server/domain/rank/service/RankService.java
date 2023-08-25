package project.server.domain.rank.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import project.server.domain.rank.dto.RankDto;
import project.server.domain.rank.repository.RankRepository;
import project.server.domain.rank.vo.Rank;
import project.server.domain.user.entity.User;
import project.server.domain.user.service.UserService;

import java.util.List;

@Service
@Slf4j
public class RankService {

    private static final int DEFAULT_ELEMENTS_COUNT = 5;
    private static final int DEFAULT_PAGE_NUMBER = 0;
    private static final Pageable pageable = PageRequest.ofSize(DEFAULT_ELEMENTS_COUNT).withPage(DEFAULT_PAGE_NUMBER);

    private final RankRepository rankRepository;
    private final UserService userService;

    public RankService(RankRepository rankRepository, UserService userService) {
        this.rankRepository = rankRepository;
        this.userService = userService;
    }

    public RankDto.UnsignedResponse readRankForUnsignedUser() {
        List<Rank> totalRank =  rankRepository.findBestCocktails(pageable);
        log.info("# RankService#readRankForUnsignedUser 성공");
        return new RankDto.UnsignedResponse(totalRank);
    }

    public RankDto.SignedResponse readRankForSignedUser(String email) {
        User user = userService.findUserByEmail(email);
        List<Rank> totalRank = rankRepository.findBestCocktails(pageable);
        List<Rank> signedUserRank = rankRepository.findRecommendCocktails(getUserAgeGroup(user), user.getGender(), pageable);
        log.info("# userId : {}, userAge : {}, userGender : {} RankService#readRankForSignedUser 성공", user.getUserId(), user.getAge(), user.getGender());
        return new RankDto.SignedResponse(totalRank, signedUserRank);
    }

    private int getUserAgeGroup(User user) {
        return user.getAge() / 10 * 10;
    }
}
