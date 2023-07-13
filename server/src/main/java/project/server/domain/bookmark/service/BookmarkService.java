package project.server.domain.bookmark.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import project.server.domain.bookmark.BookmarkDto;
import project.server.domain.bookmark.entity.Bookmark;
import project.server.domain.cocktail.entity.Cocktail;
import project.server.domain.cocktail.service.CocktailReadService;
import project.server.domain.user.User;
import project.server.domain.user.UserService;

import java.util.List;

@Service
@Transactional
public class BookmarkService {

    private final CocktailReadService cocktailReadService;
    private final UserService userService;
    private final BookmarkCreateService bookmarkCreateService;
    private final BookmarkDeleteService bookmarkDeleteService;
    private final BookmarkReadService bookmarkReadService;

    public BookmarkService(CocktailReadService cocktailReadService, UserService userService, BookmarkCreateService bookmarkCreateService, BookmarkDeleteService bookmarkDeleteService, BookmarkReadService bookmarkReadService) {
        this.cocktailReadService = cocktailReadService;
        this.userService = userService;
        this.bookmarkCreateService = bookmarkCreateService;
        this.bookmarkDeleteService = bookmarkDeleteService;
        this.bookmarkReadService = bookmarkReadService;
    }

    public void createBookmark(String email, long cocktailId) {
        User user = userService.findUserByEmail(email);
        Cocktail cocktail = cocktailReadService.readCocktail(cocktailId);

        bookmarkCreateService.create(user, cocktail);
    }

    public void deleteBookmark(String email, long cocktailId){
        User user = userService.findUserByEmail(email);
        Bookmark bookmark = bookmarkReadService.findBookmarkByCocktailId(cocktailId);

        bookmarkDeleteService.delete(user, bookmark);
    }

    public BookmarkDto.UnsignedResponse readRecommendCocktailsForUnsignedUser() {
        List<Bookmark> bestCocktails = bookmarkReadService.readBestCocktails();
        return new BookmarkDto.UnsignedResponse(bestCocktails);
    }

    public BookmarkDto.SignedResponse readRecommendCocktailsForSignedUser(String email) {
        List<Bookmark> bestCocktails = bookmarkReadService.readBestCocktails();
        List<Bookmark> recommends = bookmarkReadService.readRecommendCocktails(email);
        return new BookmarkDto.SignedResponse(bestCocktails, recommends);
    }
}
