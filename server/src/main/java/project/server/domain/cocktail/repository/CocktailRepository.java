package project.server.domain.cocktail.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import project.server.domain.cocktail.embed.category.Category;
import project.server.domain.cocktail.embed.tag.Tag;
import project.server.domain.cocktail.entity.Cocktail;

import java.util.List;

public interface CocktailRepository extends JpaRepository<Cocktail, Long> {

    List<Cocktail> findDistinctTop3ByTagsTagsContainingAndCocktailIdNotOrderByRateRateDesc(Tag tag, long id);

    Page<Cocktail> findDistinctByTagsTagsIn(List<Tag>tags, Pageable pageable);

    Page<Cocktail> findByCategory(Category category, Pageable pageable);

    Page<Cocktail> findDistinctByCategoryAndTagsTagsIn(Category category, List<Tag> tags, Pageable pageable);

    @Query("select distinct c from cocktails c " +
            "left join bookmarks b on b.cocktailInfo.cocktailId = c.cocktailId " +
            "group by b.userInfo")
    List<Cocktail> findBestCocktails();

    @Query("select distinct c from cocktails c " +
            "left join bookmarks b on b.cocktailInfo.cocktailId = c.cocktailId " +
            "where b.userInfo.gender = :gender and b.userInfo.age = :age ")
    List<Cocktail> findRecommendCocktails(@Param(value = "age") int userAgeGroup,
                                          @Param(value = "gender") String gender,
                                          Pageable pageable);
}
