package project.server.domain.recommendcocktail.service;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import project.server.domain.cocktail.entity.Cocktail;
import project.server.domain.recommendcocktail.embed.CocktailInfo;
import project.server.domain.recommendcocktail.dto.RecommendCocktailDto;
import project.server.domain.recommendcocktail.repository.RecommendCocktailRepository;
import project.server.domain.recommendcocktail.embed.UserInfo;
import project.server.domain.recommendcocktail.entity.RecommendCocktail;
import project.server.domain.user.User;
import project.server.domain.user.UserService;
import project.server.exception.BusinessLogicException;
import project.server.exception.ExceptionCode;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class RecommendCocktailService {

    private final RecommendCocktailRepository recommendCocktailRepository;
    private final UserService userService;

    public RecommendCocktailService(RecommendCocktailRepository recommendCocktailRepository, UserService userService) {
        this.recommendCocktailRepository = recommendCocktailRepository;
        this.userService = userService;
    }
    public void createRecommendCocktail(Cocktail cocktail, User user) {
        RecommendCocktail recommendCocktail = new RecommendCocktail();
        CocktailInfo cocktailInfo = new CocktailInfo(cocktail.getCocktailId(), cocktail.getName(), cocktail.getImageUrl());
        UserInfo userInfo = new UserInfo(getAgeGroup(user), user.getGender());
        recommendCocktail.assignInfo(cocktailInfo, userInfo);
        recommendCocktailRepository.save(recommendCocktail);
    }

    public void addBookmarkCount(User user, Cocktail cocktail) {
        RecommendCocktail recommendCocktail = findRecommendCocktail(user, cocktail);
        recommendCocktail.addBookmarkCount();
    }

    public void subtractBookmarkCount(User user, Cocktail cocktail) {
        RecommendCocktail recommendCocktail = findRecommendCocktail(user, cocktail);
        recommendCocktail.subtractBookmarkCount();
    }

    public RecommendCocktailDto.UnsignedResponse readRecommendCocktailsForUnsignedUser() {
        List<RecommendCocktail> bestCocktails = recommendCocktailRepository.findDistinctTop5ByOrderByBookmarkCountDesc();
        return new RecommendCocktailDto.UnsignedResponse(bestCocktails);
    }

    public RecommendCocktailDto.SignedResponse readRecommendCocktailsForSignedUser(Authentication authentication) {
        User user = userService.findUserByAuthentication(authentication);
        Pageable pageable = PageRequest.ofSize(5).withPage(0);
        List<RecommendCocktail> bestCocktails = recommendCocktailRepository.findDistinctTop5ByOrderByBookmarkCountDesc();
        List<RecommendCocktail> recommendCocktails =
                recommendCocktailRepository.findSignedUserRecommendCocktails(getAgeGroup(user),
                        user.getGender(),
                        pageable);
        return new RecommendCocktailDto.SignedResponse(bestCocktails, recommendCocktails);
    }

    private RecommendCocktail findRecommendCocktail(User user, Cocktail cocktail) {
        Optional<RecommendCocktail> optionalRecommendCocktail =
                recommendCocktailRepository.findRecommendCocktail(getAgeGroup(user),
                        user.getGender(),
                        cocktail.getCocktailId(),
                        cocktail.getName());

        return optionalRecommendCocktail.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.COCKTAIL_NOT_FOUND));
    }

    private int getAgeGroup(User user) {
        return user.getAge() / 10 * 10;
    }
}
