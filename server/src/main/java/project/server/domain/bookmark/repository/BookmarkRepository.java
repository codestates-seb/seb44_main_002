package project.server.domain.bookmark.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import project.server.domain.bookmark.entity.Bookmark;

import java.util.Optional;

public interface BookmarkRepository extends JpaRepository<Bookmark, Long> {
    @Query("select b from bookmarks b where b.userInfo.userId = :userId and b.cocktail.cocktailId = :cocktailId")
    Optional<Bookmark> findByUserIdAndCocktailId(@Param(value = "userId") long userId,
                                                 @Param(value = "cocktailId") long cocktailId);
}
