package project.server.domain.cocktail.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import project.server.domain.cocktail.repository.CocktailRepository;
import project.server.domain.cocktail.RecommendedCocktailsCreator;
import project.server.domain.cocktail.dto.CocktailDto;
import project.server.domain.cocktail.entity.Cocktail;

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
        cocktail.setRecommends(RecommendedCocktailsCreator.create());
        Cocktail savedCocktail = cocktailRepository.save(cocktail);
        return savedCocktail.entityToResponse();
    }
}
