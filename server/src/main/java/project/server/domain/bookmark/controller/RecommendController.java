package project.server.domain.bookmark.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import project.server.domain.bookmark.BookmarkDto;
import project.server.domain.bookmark.service.BookmarkService;
import project.server.domain.user.AuthManager;

@RestController
@RequestMapping("/recommend")
public class RecommendController {

    private final BookmarkService bookmarkService;

    public RecommendController(BookmarkService bookmarkService) {
        this.bookmarkService = bookmarkService;;
    }

    @GetMapping("/unsigned")
    public ResponseEntity getRecommendCocktailsForUnsignedUsers(){
        BookmarkDto.UnsignedResponse response = bookmarkService.readRecommendCocktailsForUnsignedUser();
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/signed")
    public ResponseEntity getRecommendCocktailsForSignedUsers(Authentication authentication){
        String email = AuthManager.getEmailFromAuthentication(authentication, false);
        BookmarkDto.SignedResponse response = bookmarkService.readRecommendCocktailsForSignedUser(email);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
