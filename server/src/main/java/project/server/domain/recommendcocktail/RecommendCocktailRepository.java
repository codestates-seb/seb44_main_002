package project.server.domain.recommendcocktail;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RecommendCocktailRepository extends JpaRepository<RecommendCocktail, Long> {

    Optional<RecommendCocktail> findByCocktailInfoAndUserInfo(CocktailInfo cocktailInfo, UserInfo userInfo);
}
