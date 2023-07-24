package project.server.domain.recommend.repository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import project.server.domain.bookmark.entity.Bookmark;
import project.server.domain.recommend.entity.Recommend;

import java.util.List;

public interface RecommendRepository extends JpaRepository<Bookmark, Long> {

    @Query(value = "select distinct cocktail_id as cocktailId, cocktail_name as name, cocktail_image_url as imageUrl " +
            "from bookmarks b " +
            "group by cocktail_id, gender, age " +
            "order by COUNT(cocktail_id) desc", nativeQuery = true)
    List<Recommend> findBestCocktails(Pageable pageable);

    @Query(value = "select distinct cocktail_id as cocktailId, cocktail_name as name, cocktail_image_url as imageUrl " +
            "from bookmarks b " +
            "where age=:age and gender=:gender " +
            "group by cocktail_id, gender, age " +
            "order by COUNT(cocktail_id) desc ", nativeQuery = true)
    List<Recommend> findRecommendCocktails(@Param(value = "age") int userAgeGroup,
                                           @Param(value = "gender") String gender,
                                           Pageable pageable);
}
