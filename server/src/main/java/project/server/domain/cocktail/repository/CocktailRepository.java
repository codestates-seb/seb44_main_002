package project.server.domain.cocktail.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import project.server.domain.cocktail.embed.tag.Tag;
import project.server.domain.cocktail.entity.Cocktail;

import java.util.List;

public interface CocktailRepository extends JpaRepository<Cocktail, Long> {

//    @Query("select distinct c from cocktails c where c.cocktailId != :id order by c.rating.rate desc")
//    List<Cocktail> findRecommendedCocktails(@Param("id")long id);

    List<Cocktail> findDistinctTop5ByTagsTagsContainingAndCocktailIdNotOrderByRatingRateDesc(Tag tag, long id);


}
