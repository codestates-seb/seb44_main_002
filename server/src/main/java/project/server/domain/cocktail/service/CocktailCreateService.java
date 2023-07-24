package project.server.domain.cocktail.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import project.server.domain.cocktail.entity.Cocktail;
import project.server.domain.cocktail.repository.CocktailRepository;
import project.server.domain.user.entity.User;

@Service
public class CocktailCreateService {

    private final CocktailRepository cocktailRepository;

    public CocktailCreateService(CocktailRepository cocktailRepository) {
        this.cocktailRepository = cocktailRepository;
    }

    @Transactional
    public Cocktail create(User user, Cocktail cocktail) {
        cocktail.assignUser(user);
        user.write(cocktail);
        return cocktailRepository.save(cocktail);
    }
}
