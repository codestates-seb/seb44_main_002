package project.server.domain.recommend;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RecommendRepository extends JpaRepository<Recommend, Long> {

    @Query(value = "select new project.server.domain.recommend.Recommend(c.cocktailId, c.name, c.imageUrl, COUNT(c.cocktailId))" +
            "from cocktails c " +
            "right join bookmarks b on b.cocktailInfo.cocktailId = c.cocktailId " +
            "group by c.cocktailId, b.userInfo.gender, b.userInfo.age")
    List<Recommend> findBestCocktails(Pageable pageable);

    @Query("select new project.server.domain.recommend.Recommend(c.cocktailId, c.name, c.imageUrl, COUNT(c.cocktailId))" +
            "from cocktails c " +
            "right join bookmarks b on b.cocktailInfo.cocktailId = c.cocktailId " +
            "where b.userInfo.gender = :gender and b.userInfo.age = :age " +
            "group by c.cocktailId, c.name, c.imageUrl, b.userInfo.gender, b.userInfo.age")
    List<Recommend> findRecommendCocktails(@Param(value = "age") int userAgeGroup,
                                           @Param(value = "gender") String gender,
                                           Pageable pageable);
}
