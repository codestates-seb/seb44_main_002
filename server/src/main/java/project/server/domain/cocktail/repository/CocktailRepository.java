package project.server.domain.cocktail.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import project.server.domain.cocktail.embed.category.Category;
import project.server.domain.cocktail.embed.tag.Tag;
import project.server.domain.cocktail.entity.Cocktail;

import java.util.List;

public interface CocktailRepository extends JpaRepository<Cocktail, Long> {

//    @Query("select distinct c from cocktails c where c.cocktailId != :id order by c.rating.rate desc")
//    List<Cocktail> findRecommendedCocktails(@Param("id")long id);

    List<Cocktail> findDistinctTop3ByTagsTagsContainingAndCocktailIdNotOrderByRatingRateDesc(Tag tag, long id);

    Page<Cocktail> findByTagsTagsIn(List<Tag>tags, Pageable pageable);

    Page<Cocktail> findByCategory(Category category, Pageable pageable);

    Page<Cocktail> findByCategoryAndTagsTagsIn(Category category, List<Tag> tags, Pageable pageable);
}
