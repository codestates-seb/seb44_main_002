package project.server.domain.rank.repository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import project.server.domain.bookmark.entity.Bookmark;
import project.server.domain.rank.vo.Rank;

import java.util.List;

public interface RankRepository extends JpaRepository<Bookmark, Long> {

    @Query(value = "select distinct c.cocktail_id as cocktailId, c.name as name, c.image_url as imageUrl, count(c.cocktail_id) as cocktail_count " +
            "from cocktails c " +
            "right join bookmarks b on b.cocktail_cocktail_id = c.cocktail_id " +
            "group by cocktail_id " +
            "order by cocktail_count desc", nativeQuery = true)
    List<Rank> findBestCocktails(Pageable pageable);

    @Query(value = "select distinct c.cocktail_id as cocktailId, c.name as name, c.image_url as imageUrl, count(c.cocktail_id) as cocktail_count " +
            "from cocktails c " +
            "right join bookmarks b on b.cocktail_cocktail_id = c.cocktail_id " +
            "where b.age = :age and b.gender = :gender " +
            "group by cocktail_id, gender, age " +
            "order by cocktail_count desc", nativeQuery = true)
    List<Rank> findRecommendCocktails(@Param(value = "age") int userAgeGroup,
                                      @Param(value = "gender") String gender,
                                      Pageable pageable);
}
