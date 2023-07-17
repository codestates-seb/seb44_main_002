package project.server.domain.recommend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import project.server.domain.recommend.service.RecommendService;
import project.server.domain.recommend.dto.RecommendDto;
import project.server.domain.user.AuthManager;

@RestController
@RequestMapping("/recommend")
public class RecommendController {

    private final RecommendService recommendService;

    public RecommendController(RecommendService recommendService) {
        this.recommendService = recommendService;
    }

    @GetMapping("/unsigned")
    public ResponseEntity getRecommendCocktailsForUnsignedUsers(){
        RecommendDto.UnsignedResponse response = recommendService.readRecommendCocktailsForUnsignedUser();
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/signed")
    public ResponseEntity getRecommendCocktailsForSignedUsers(Authentication authentication){
        String email = AuthManager.getEmailFromAuthentication(authentication, false);
        RecommendDto.SignedResponse response = recommendService.readRecommendCocktailsForSignedUser(email);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
