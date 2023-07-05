package project.server.domain.cocktail.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.server.domain.cocktail.embed.rate.RateDto;
import project.server.domain.cocktail.service.CocktailService;
import project.server.domain.cocktail.dto.CocktailDto;
import project.server.dto.MultiResponseDto;

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

    @GetMapping("/filter")
    public ResponseEntity getFilteredCocktails(@RequestParam(value = "category", required = false) String category,
                                               @RequestParam(value = "tag", required = false) String tag,
                                               @RequestParam(value = "page", defaultValue = "1") int page,
                                               @RequestParam(value = "sort", defaultValue = "most_viewed") String sort) {
        MultiResponseDto responses = cocktailService.readFilteredCocktails(category, tag, page, sort);
        return new ResponseEntity<>(responses, HttpStatus.OK);
    }

    @PatchMapping("/{cocktail-id}")
    public ResponseEntity patchCocktail(@PathVariable("cocktail-id") long cocktailId,
                                        @RequestBody CocktailDto.Patch patch){
        CocktailDto.Response response = cocktailService.updateCocktail(cocktailId, patch);
        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/{cocktail-id}")
    public ResponseEntity deleteCocktail(@PathVariable("cocktail-id") long cocktailId){
        cocktailService.removeCocktail(cocktailId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PostMapping("/{cocktail-id}/rate")
    public ResponseEntity postRate(@PathVariable("cocktail-id") long cocktailId,
                                   @RequestParam int value){
        RateDto.Response response = cocktailService.rateCocktail(cocktailId, value);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PostMapping("/{cocktail-id}/bookmark")
    public ResponseEntity postBookmark(@PathVariable("cocktail-id") long cocktailId){
        cocktailService.bookmarkCocktail(cocktailId);
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }
}
