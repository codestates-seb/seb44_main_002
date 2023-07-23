package project.server.domain.recommend.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import project.server.domain.recommend.dto.RecommendDto;
import project.server.domain.recommend.entity.Recommend;
import project.server.domain.user.entity.User;
import project.server.domain.user.service.UserService;

import java.util.List;

@Service
@Slf4j
public class RecommendService {

    private final RecommendReadService recommendReadService;
    private final UserService userService;

    public RecommendService(RecommendReadService recommendReadService, UserService userService) {
        this.recommendReadService = recommendReadService;
        this.userService = userService;
    }


    public RecommendDto.UnsignedResponse readRecommendCocktailsForUnsignedUser() {
        List<Recommend> bestCocktails =  recommendReadService.readBestCocktails();
        log.info("# 비로그인 사용자용 추천 칵테일 조회 성공");
        return new RecommendDto.UnsignedResponse(bestCocktails);
    }

    public RecommendDto.SignedResponse readRecommendCocktailsForSignedUser(String email) {
        User user = userService.findUserByEmail(email);
        List<Recommend> bestCocktails = recommendReadService.readBestCocktails();
        List<Recommend> recommends = recommendReadService.readRecommendCocktails(user);
        log.info("# userId : {}, userAge : {}, userGender : {} 추천 칵테일 조회 성공", user.getUserId(), user.getAge(), user.getGender());
        return new RecommendDto.SignedResponse(bestCocktails, recommends);
    }
}
