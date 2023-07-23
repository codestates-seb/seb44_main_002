package project.server.domain.recommend.repository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import project.server.domain.cocktail.entity.Cocktail;
import project.server.domain.recommend.entity.Recommend;

import java.util.List;

public interface RecommendRepository extends JpaRepository<Cocktail, Long> {

    @Query(value = "select distinct b.cocktail_id as cocktailId, cocktail_name as name, cocktail_image_url as imageUrl " +
            "from cocktails c " +
            "right join bookmarks b on b.cocktail_id = c.cocktail_id " +
            "group by b.cocktail_id, b.gender, b.age " +
            "order by COUNT(b.cocktail_id) desc", nativeQuery = true)
    List<Recommend> findBestCocktails(Pageable pageable);

    @Query(value = "select distinct b.cocktail_id as cocktailId, cocktail_name as name, cocktail_image_url as imageUrl " +
            "from cocktails c " +
            "right join bookmarks b on b.cocktail_id = c.cocktail_id " +
            "where b.age=:age and b.gender=:gender " +
            "group by b.cocktail_id, b.gender, b.age " +
            "order by COUNT(b.cocktail_id) desc ", nativeQuery = true)
    List<Recommend> findRecommendCocktails(@Param(value = "age") int userAgeGroup,
                                           @Param(value = "gender") String gender,
                                           Pageable pageable);
}
