package project.server.domain.cocktail.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import project.server.domain.cocktail.entity.Cocktail;

public interface CocktailRepository extends JpaRepository<Cocktail, Long> {
}
