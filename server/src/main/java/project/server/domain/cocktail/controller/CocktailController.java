package project.server.domain.cocktail.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.server.domain.cocktail.dto.CocktailDto;
import project.server.domain.cocktail.service.CocktailService;

@RestController
@RequestMapping("/cocktails")
public class CocktailController {

    private final CocktailService cocktailService;

    public CocktailController(CocktailService cocktailService) {
        this.cocktailService = cocktailService;
    }

    @PostMapping
    public ResponseEntity postCocktail(@RequestBody CocktailDto.Post post) {
        CocktailDto.Response response = cocktailService.createCocktail(post);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/{cocktail-id}")
    public ResponseEntity getCocktail(@PathVariable("cocktail-id") long cocktailId) {
        CocktailDto.Response response = cocktailService.readCocktail(cocktailId);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
