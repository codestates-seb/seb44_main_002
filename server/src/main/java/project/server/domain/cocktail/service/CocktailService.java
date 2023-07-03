package project.server.domain.cocktail.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import project.server.domain.cocktail.embed.tag.Tags;
import project.server.domain.cocktail.repository.CocktailRepository;
import project.server.domain.cocktail.dto.CocktailDto;
import project.server.domain.cocktail.entity.Cocktail;
import project.server.exception.BusinessLogicException;
import project.server.exception.ExceptionCode;

import java.util.List;

@Service
@Transactional
public class CocktailService {

    private final CocktailRepository cocktailRepository;

    public CocktailService(CocktailRepository cocktailRepository) {
        this.cocktailRepository = cocktailRepository;
    }

    /**
     * 칵테일에 유저 정보 담는 로직 필요
     */
    public CocktailDto.Response createCocktail(CocktailDto.Post post) {
        Cocktail cocktail = post.postToEntity();
        Cocktail savedCocktail = cocktailRepository.save(cocktail);
        savedCocktail.setRecommends(createRecommendCocktails(savedCocktail.getTags(), savedCocktail.getCocktailId()));
        return savedCocktail.entityToResponse();
    }

    public CocktailDto.Response readCocktail(long cocktailId) {
        Cocktail cocktail = findCocktailById(cocktailId);
        cocktail.setRecommends(createRecommendCocktails(cocktail.getTags(), cocktail.getCocktailId()));
        cocktail.setViewCount(cocktail.getViewCount()+1);
        return cocktail.entityToResponse();
    }

    private Cocktail findCocktailById(long cocktailId) {
        return cocktailRepository.findById(cocktailId).orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.COCKTAIL_NOT_FOUND));
    }

    private List<Cocktail> createRecommendCocktails(Tags tags, long cocktailId) {
        return cocktailRepository.findDistinctTop5ByTagsTagsContainingAndCocktailIdNotOrderByRatingRateDesc(tags.getRandomTag(), cocktailId);
    }
}
