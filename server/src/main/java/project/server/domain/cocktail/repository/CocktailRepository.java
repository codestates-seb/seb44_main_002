package project.server.domain.cocktail.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import project.server.domain.cocktail.embed.category.Category;
import project.server.domain.cocktail.embed.tag.Tag;
import project.server.domain.cocktail.entity.Cocktail;

import java.util.List;

public interface CocktailRepository extends JpaRepository<Cocktail, Long> {

    List<Cocktail> findDistinctTop3ByTagsTagsContainingAndCocktailIdNotOrderByRateRateDesc(Tag tag, long id);

    Page<Cocktail> findDistinctByTagsTagsIn(List<Tag>tags, Pageable pageable);

    Page<Cocktail> findByCategory(Category category, Pageable pageable);

    Page<Cocktail> findDistinctByCategoryAndTagsTagsIn(Category category, List<Tag> tags, Pageable pageable);
//
//    @Query("SELECT DISTINCT c from cocktails c order by c.rate.rate desc")
//    List<Cocktail> findTop5RatedCocktails();

    List<Cocktail> findDistinctTop5ByOrderByRateRateDesc();
}
