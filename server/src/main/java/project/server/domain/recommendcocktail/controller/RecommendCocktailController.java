package project.server.domain.recommendcocktail.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import project.server.domain.recommendcocktail.dto.RecommendCocktailDto;
import project.server.domain.recommendcocktail.service.RecommendCocktailService;

@RestController
@RequestMapping("/recommend")
public class RecommendCocktailController {

    private final RecommendCocktailService recommendCocktailService;

    public RecommendCocktailController(RecommendCocktailService recommendCocktailService) {
        this.recommendCocktailService = recommendCocktailService;
    }

    @GetMapping("/unsigned")
    public ResponseEntity getRecommendCocktailsForUnsignedUsers(){
        RecommendCocktailDto.UnsignedResponse response = recommendCocktailService.readRecommendCocktailsForUnsignedUser();
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/signed")
    public ResponseEntity getRecommendCocktailsForSignedUsers(Authentication authentication){
        RecommendCocktailDto.SignedResponse response = recommendCocktailService.readRecommendCocktailsForSignedUser(authentication);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
