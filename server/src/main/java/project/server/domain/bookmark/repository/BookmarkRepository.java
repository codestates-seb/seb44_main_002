package project.server.domain.bookmark.repository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import project.server.domain.bookmark.entity.Bookmark;

import java.util.List;
import java.util.Optional;

public interface BookmarkRepository extends JpaRepository<Bookmark, Long> {
    @Query("select b from Bookmarks b where b.cocktailInfo.cocktailId = :cocktailId")
    Optional<Bookmark> findByCocktailId(@Param(value = "cocktailId") long cocktailId);

    @Query("select b from Bookmarks b where b.userInfo.userId = :userId")
    Optional<Bookmark> findByUserId(@Param(value = "userId") long userId);

    @Query("select b from Bookmarks b group by b.userInfo")
    List<Bookmark> findBestCocktails();

    @Query("select b from Bookmarks b " +
            "where b.userInfo.age = :age and b.userInfo.gender = :gender " +
            "group by b.userInfo ")
    List<Bookmark> findRecommendCocktails(@Param(value = "age") int age,
                                          @Param(value = "gender") String gender,
                                          Pageable pageable);
}
