package project.server.domain.cocktail.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import project.server.domain.cocktail.entity.Cocktail;
import project.server.domain.cocktail.repository.CocktailRepository;

@Service
public class CocktailDeleteService {

    private final CocktailRepository cocktailRepository;

    public CocktailDeleteService(CocktailRepository cocktailRepository) {
        this.cocktailRepository = cocktailRepository;
    }

    @Transactional
    public void delete(Cocktail cocktail) {
        cocktailRepository.delete(cocktail);
    }
}
