package project.server.domain.recommend.service;

import org.springframework.stereotype.Service;
import project.server.domain.recommend.dto.RecommendDto;
import project.server.domain.recommend.entity.Recommend;
import project.server.domain.user.entity.User;
import project.server.domain.user.service.UserService;

import java.util.List;

@Service
public class RecommendService {

    private final RecommendReadService recommendReadService;
    private final UserService userService;

    public RecommendService(RecommendReadService recommendReadService, UserService userService) {
        this.recommendReadService = recommendReadService;
        this.userService = userService;
    }


    public RecommendDto.UnsignedResponse readRecommendCocktailsForUnsignedUser() {
        List<Recommend> bestCocktails =  recommendReadService.readBestCocktails();
        return new RecommendDto.UnsignedResponse(bestCocktails);
    }

    public RecommendDto.SignedResponse readRecommendCocktailsForSignedUser(String email) {
        User user = userService.findUserByEmail(email);
        List<Recommend> bestCocktails = recommendReadService.readBestCocktails();
        List<Recommend> recommends = recommendReadService.readRecommendCocktails(user);
        return new RecommendDto.SignedResponse(bestCocktails, recommends);
    }
}
