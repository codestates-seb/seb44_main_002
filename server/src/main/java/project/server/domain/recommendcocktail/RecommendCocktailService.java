package project.server.domain.recommendcocktail;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import project.server.domain.cocktail.entity.Cocktail;
import project.server.domain.user.User;

import java.util.Optional;

@Service
@Transactional
public class RecommendCocktailService {

    private final RecommendCocktailRepository recommendCocktailRepository;

    public RecommendCocktailService(RecommendCocktailRepository recommendCocktailRepository) {
        this.recommendCocktailRepository = recommendCocktailRepository;
    }

    public void addBookmarkCount(User user, Cocktail cocktail) {
        UserInfo userInfo = new UserInfo(user.getAge(), user.getGender());
        CocktailInfo cocktailInfo = new CocktailInfo(cocktail.getCocktailId(), cocktail.getName(), cocktail.getImageUrl());
        RecommendCocktail recommendCocktail = findRecommendCocktail(userInfo, cocktailInfo);
        recommendCocktail.addBookmarkCount();
    }

    public void subtractBookmarkCount(User user, Cocktail cocktail) {
        UserInfo userInfo = new UserInfo(user.getAge(), user.getGender());
        CocktailInfo cocktailInfo = new CocktailInfo(cocktail.getCocktailId(), cocktail.getName(), cocktail.getImageUrl());
        RecommendCocktail recommendCocktail = findRecommendCocktail(userInfo, cocktailInfo);
        recommendCocktail.subtractBookmarkCount();
    }

    private RecommendCocktail findRecommendCocktail(UserInfo userInfo, CocktailInfo cocktailInfo) {
        Optional<RecommendCocktail> optionalRecommendCocktail =
                recommendCocktailRepository.findByCocktailInfoAndUserInfo(cocktailInfo, userInfo);

        return optionalRecommendCocktail.orElseGet(()
                -> createRecommendCocktail(cocktailInfo, userInfo));
    }

    private RecommendCocktail createRecommendCocktail(CocktailInfo cocktailInfo, UserInfo userInfo) {
        RecommendCocktail recommendCocktail = new RecommendCocktail();
        recommendCocktail.assignInfo(cocktailInfo, userInfo);
        return recommendCocktailRepository.save(recommendCocktail);
    }
}
