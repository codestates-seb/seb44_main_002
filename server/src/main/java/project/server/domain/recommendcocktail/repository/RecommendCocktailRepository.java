package project.server.domain.recommendcocktail.repository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import project.server.domain.recommendcocktail.entity.RecommendCocktail;

import java.util.List;
import java.util.Optional;

public interface RecommendCocktailRepository extends JpaRepository<RecommendCocktail, Long> {

    @Query("select r from recommend_cocktails r " +
            "where r.userInfo.age = :age and r.userInfo.gender = :gender " +
            "order by r.bookmarkCount desc ")
    List<RecommendCocktail> findSignedUserRecommendCocktails(@Param(value = "age")int age,
                                                             @Param(value = "gender") String gender,
                                                             Pageable pageable);


    List<RecommendCocktail> findDistinctTop5ByOrderByBookmarkCountDesc();

    @Query("select r from recommend_cocktails r " +
            "where r.userInfo.age = :age and r.userInfo.gender = :gender " +
            "and r.cocktailInfo.cocktailId = :cocktailId and r.cocktailInfo.cocktailName = :cocktailName")
    Optional<RecommendCocktail> findRecommendCocktail(@Param(value = "age")int age,
                                                   @Param(value = "gender") String gender,
                                                   @Param(value = "cocktailId") long cocktailId,
                                                   @Param(value = "cocktailName") String cocktailName);
}
