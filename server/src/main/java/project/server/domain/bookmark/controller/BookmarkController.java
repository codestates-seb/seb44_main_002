package project.server.domain.bookmark.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import project.server.domain.bookmark.service.BookmarkService;
import project.server.domain.user.AuthManager;

@RestController
@RequestMapping("/bookmark")
public class BookmarkController {

    private static final boolean PERMIT_UNSIGNED_USER = true;
    private static final boolean NOT_PERMIT_UNSIGNED_USER = false;

    private final BookmarkService bookmarkService;

    public BookmarkController(BookmarkService bookmarkService) {
        this.bookmarkService = bookmarkService;
    }


    @PostMapping("/create/{cocktail-id}")
    public ResponseEntity postBookmark(Authentication authentication,
                                       @PathVariable("cocktail-id") long cocktailId) {
        String email = AuthManager.getEmailFromAuthentication(authentication, NOT_PERMIT_UNSIGNED_USER);
        bookmarkService.createBookmark(email, cocktailId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/delete/{cocktail-id}")
    public ResponseEntity deleteBookmark(Authentication authentication,
                                         @PathVariable("cocktail-id") long cocktailId){
        String email = AuthManager.getEmailFromAuthentication(authentication, NOT_PERMIT_UNSIGNED_USER);
        bookmarkService.deleteBookmark(email, cocktailId);
        return ResponseEntity.noContent().build();
    }
}
