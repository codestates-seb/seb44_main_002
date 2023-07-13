package project.server.domain.cocktail.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import project.server.domain.cocktail.dto.CocktailDto;
import project.server.domain.cocktail.entity.Cocktail;
import project.server.domain.cocktail.repository.CocktailRepository;
import project.server.domain.user.User;

@Service
public class CocktailCreateService {

    public static final boolean DEFAULT_BOOKMARK = false;
    public static final int DEFAULT_RATE = 0;
    private final CocktailRepository cocktailRepository;

    public CocktailCreateService(CocktailRepository cocktailRepository) {
        this.cocktailRepository = cocktailRepository;
    }

    @Transactional
    public Cocktail create(User user, Cocktail cocktail) {
        cocktail.assignUser(user);
        return cocktailRepository.save(cocktail);
    }
}
