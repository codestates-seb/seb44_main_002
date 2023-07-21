package project.server.domain.bookmark.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import project.server.domain.bookmark.service.BookmarkService;
import project.server.domain.user.AuthManager;
import project.server.utils.UnsignedPermission;

@RestController
@RequestMapping("/bookmark")
public class BookmarkController {

    private final BookmarkService bookmarkService;
    private final AuthManager authManager;

    public BookmarkController(BookmarkService bookmarkService, AuthManager authManager) {
        this.bookmarkService = bookmarkService;
        this.authManager = authManager;
    }


    @PostMapping("/create/{cocktail-id}")
    public ResponseEntity postBookmark(Authentication authentication,
                                       @PathVariable("cocktail-id") long cocktailId) {
        String email = authManager.getEmailFromAuthentication(authentication, UnsignedPermission.NOT_PERMIT.get());
        bookmarkService.createBookmark(email, cocktailId);
        return ResponseEntity.accepted().build();
    }

    @DeleteMapping("/delete/{cocktail-id}")
    public ResponseEntity deleteBookmark(Authentication authentication,
                                         @PathVariable("cocktail-id") long cocktailId){
        String email = authManager.getEmailFromAuthentication(authentication, UnsignedPermission.NOT_PERMIT.get());
        bookmarkService.deleteBookmark(email, cocktailId);
        return ResponseEntity.noContent().build();
    }
}
