package project.server.domain.cocktail.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import project.server.domain.cocktail.dto.CocktailDto;
import project.server.domain.cocktail.entity.Cocktail;

@Service
public class CocktailUpdateService {

    @Transactional
    public void modify(Cocktail cocktail, CocktailDto.Patch patch) {
        cocktail.modify(patch);
    }
}
