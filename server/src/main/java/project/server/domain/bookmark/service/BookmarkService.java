package project.server.domain.bookmark.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import project.server.domain.bookmark.entity.Bookmark;
import project.server.domain.cocktail.entity.Cocktail;
import project.server.domain.cocktail.service.CocktailQueryService;
import project.server.domain.user.entity.User;
import project.server.domain.user.service.UserService;

@Service
@Transactional
@Slf4j
public class BookmarkService {

    private final CocktailQueryService cocktailQueryService;
    private final UserService userService;
    private final BookmarkCreateService bookmarkCreateService;
    private final BookmarkDeleteService bookmarkDeleteService;
    private final BookmarkReadService bookmarkReadService;

    public BookmarkService(CocktailQueryService cocktailQueryService, UserService userService, BookmarkCreateService bookmarkCreateService, BookmarkDeleteService bookmarkDeleteService, BookmarkReadService bookmarkReadService) {
        this.cocktailQueryService = cocktailQueryService;
        this.userService = userService;
        this.bookmarkCreateService = bookmarkCreateService;
        this.bookmarkDeleteService = bookmarkDeleteService;
        this.bookmarkReadService = bookmarkReadService;
    }

    public void createBookmark(String email, long cocktailId) {
        User user = userService.findUserByEmail(email);
        Cocktail cocktail = cocktailQueryService.readCocktail(cocktailId);
        bookmarkCreateService.create(user, cocktail);
        log.info("# userId : {}, cocktailId : {} BookmarkService#createBookmark 성공", user.getUserId(), cocktailId);
    }

    public void deleteBookmark(String email, long cocktailId){
        User user = userService.findUserByEmail(email);
        Bookmark bookmark = bookmarkReadService.findBookmarkByUserIdAndCocktailId(user.getUserId(), cocktailId);
        bookmarkDeleteService.delete(user, bookmark);
        log.info("# userId : {}, cocktailId : {} BookmarkService#deleteBookmark 성공", user.getUserId(), cocktailId);
    }
}
