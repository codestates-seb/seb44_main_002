package project.server.domain.recommend;

import org.springframework.stereotype.Service;
import project.server.domain.cocktail.entity.Cocktail;
import project.server.domain.cocktail.service.CocktailReadService;
import project.server.domain.user.User;
import project.server.domain.user.UserService;

import java.util.List;

@Service
public class RecommendService {

    private final CocktailReadService cocktailReadService;
    private final UserService userService;

    public RecommendService(CocktailReadService cocktailReadService, UserService userService) {
        this.cocktailReadService = cocktailReadService;
        this.userService = userService;
    }


    public RecommendDto.UnsignedResponse readRecommendCocktailsForUnsignedUser() {
        List<Cocktail> bestCocktails = cocktailReadService.readBestCocktails();
        return new RecommendDto.UnsignedResponse(bestCocktails);
    }

    public RecommendDto.SignedResponse readRecommendCocktailsForSignedUser(String email) {
        User user = userService.findUserByEmail(email);
        List<Cocktail> bestCocktails = cocktailReadService.readBestCocktails();
        List<Cocktail> recommends = cocktailReadService.readRecommendCocktails(user);
        return new RecommendDto.SignedResponse(bestCocktails, recommends);
    }
}
