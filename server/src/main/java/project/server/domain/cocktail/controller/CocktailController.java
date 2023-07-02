package project.server.domain.cocktail.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import project.server.domain.cocktail.service.CocktailService;
import project.server.domain.cocktail.dto.CocktailDto;

@RestController
@RequestMapping("/cocktails")
public class CocktailController {

    private final CocktailService cocktailService;

    public CocktailController(CocktailService cocktailService) {
        this.cocktailService = cocktailService;
    }

    @PostMapping
    public ResponseEntity postCocktail(@RequestBody CocktailDto.Post post){
        CocktailDto.Response response = cocktailService.createCocktail(post);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
}
