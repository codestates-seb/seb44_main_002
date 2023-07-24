package project.server.domain.cocktail.repository;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import project.server.domain.cocktail.embed.category.Category;
import project.server.domain.cocktail.embed.tag.Tag;
import project.server.domain.cocktail.entity.Cocktail;

import java.util.List;

public interface CocktailRepository extends JpaRepository<Cocktail, Long> {

    List<Cocktail> findDistinctTop3ByTagsTagsContainingAndCocktailIdNotOrderByRateRateDesc(Tag tag, long id);

    List<Cocktail> findDistinctByTagsTagsIn(List<Tag> tags, Sort sort);

    List<Cocktail> findByCategory(Category category, Sort sort);

    List<Cocktail> findDistinctByCategoryAndTagsTagsIn(Category category, List<Tag> tags, Sort sort);
}
