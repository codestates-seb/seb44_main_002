package project.server.domain.cocktail.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import project.server.domain.cocktail.embed.rate.RateDto;
import project.server.domain.cocktail.service.CocktailService;
import project.server.domain.cocktail.dto.CocktailDto;
import project.server.dto.MultiResponseDto;

@RestController
@RequestMapping("/cocktails")
@Validated
public class CocktailController {

    private final CocktailService cocktailService;

    public CocktailController(CocktailService cocktailService) {
        this.cocktailService = cocktailService;
    }

    @PostMapping
    public ResponseEntity postCocktail(Authentication authentication,
                                       @RequestBody CocktailDto.Post post) {
        CocktailDto.Response response = cocktailService.createCocktail(authentication,post);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/{cocktail-id}")
    public ResponseEntity getCocktail(Authentication authentication,
                                      @PathVariable("cocktail-id") long cocktailId) {
        CocktailDto.Response response = cocktailService.readCocktail(authentication,cocktailId);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/filter")
    public ResponseEntity getFilteredCocktails(Authentication authentication,
                                               @RequestParam(value = "category", required = false) String category,
                                               @RequestParam(value = "tag", required = false) String tag,
                                               @RequestParam(value = "page", defaultValue = "1") int page,
                                               @RequestParam(value = "sort", defaultValue = "most_viewed") String sort) {
        MultiResponseDto responses = cocktailService.readFilteredCocktails(authentication, category, tag, page, sort);
        return new ResponseEntity<>(responses, HttpStatus.OK);
    }

    @PatchMapping("/{cocktail-id}")
    public ResponseEntity patchCocktail(Authentication authentication,
                                        @PathVariable("cocktail-id") long cocktailId,
                                        @RequestBody CocktailDto.Patch patch){
        CocktailDto.Response response = cocktailService.updateCocktail(authentication, cocktailId, patch);
        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/{cocktail-id}")
    public ResponseEntity deleteCocktail(@PathVariable("cocktail-id") long cocktailId){
        cocktailService.removeCocktail(cocktailId);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    @PostMapping("/{cocktail-id}/rate")
    public ResponseEntity rateCocktail(Authentication authentication,
                                       @PathVariable("cocktail-id") long cocktailId,
                                       @RequestParam("value") int value){
        RateDto.Response response = cocktailService.rateCocktail(authentication, cocktailId, value);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PostMapping("/{cocktail-id}/bookmark")
    public ResponseEntity bookmarkCocktail(Authentication authentication,
                                           @PathVariable("cocktail-id") long cocktailId){
        cocktailService.bookmarkCocktail(authentication, cocktailId);
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }
}
