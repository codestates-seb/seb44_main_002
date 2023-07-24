package project.server.domain.bookmark.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import project.server.domain.bookmark.service.BookmarkService;
import project.server.global.auth.service.AuthManager;
import project.server.global.utils.UnsignedPermission;

@RestController
@RequestMapping("/bookmark")
@Slf4j
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
        log.info("# BookmarkController#postBookmark 실행");
        String email = authManager.getEmailFromAuthentication(authentication, UnsignedPermission.NOT_PERMIT.get());
        bookmarkService.createBookmark(email, cocktailId);
        log.info("# BookmarkController#postBookmark 완료");
        return ResponseEntity.accepted().build();
    }

    @DeleteMapping("/delete/{cocktail-id}")
    public ResponseEntity deleteBookmark(Authentication authentication,
                                         @PathVariable("cocktail-id") long cocktailId){
        log.info("# BookmarkController#deleteBookmark 실행");
        String email = authManager.getEmailFromAuthentication(authentication, UnsignedPermission.NOT_PERMIT.get());
        bookmarkService.deleteBookmark(email, cocktailId);
        log.info("# BookmarkController#deleteBookmark 완료");
        return ResponseEntity.noContent().build();
    }
}
