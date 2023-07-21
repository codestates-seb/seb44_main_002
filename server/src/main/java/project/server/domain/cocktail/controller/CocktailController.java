package project.server.domain.cocktail.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import project.server.domain.cocktail.embed.rate.RateDto;
import project.server.domain.cocktail.service.CocktailService;
import project.server.domain.cocktail.dto.CocktailDto;
import project.server.auth.service.AuthManager;
import project.server.dto.MultiResponseDto;
import project.server.utils.UnsignedPermission;

@RestController
@RequestMapping("/cocktails")
@Validated
@Slf4j
public class CocktailController {

    private final CocktailService cocktailService;
    private final AuthManager authManager;

    public CocktailController(CocktailService cocktailService, AuthManager authManager) {
        this.cocktailService = cocktailService;
        this.authManager = authManager;
    }

    @PostMapping
    public ResponseEntity postCocktail(Authentication authentication,
                                       @RequestBody CocktailDto.Post post) {
        String email = authManager.getEmailFromAuthentication(authentication, UnsignedPermission.NOT_PERMIT.get());
        CocktailDto.Response response = cocktailService.createCocktail(email, post);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/{cocktail-id}")
    public ResponseEntity getCocktail(Authentication authentication,
                                      @PathVariable("cocktail-id") long cocktailId) {
        String email = authManager.getEmailFromAuthentication(authentication, UnsignedPermission.PERMIT.get());
        CocktailDto.Response response = cocktailService.readCocktail(email, cocktailId);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/filter")
    public ResponseEntity getFilteredCocktails(Authentication authentication,
                                               @RequestParam(value = "category", required = false) String category,
                                               @RequestParam(value = "tag", required = false) String tag,
                                               @RequestParam(value = "page", defaultValue = "1") int page,
                                               @RequestParam(value = "sort", defaultValue = "most_viewed") String sort) {
        String email = authManager.getEmailFromAuthentication(authentication, UnsignedPermission.PERMIT.get());
        MultiResponseDto responses = cocktailService.readFilteredCocktails(email, category, tag, page, sort);
        return new ResponseEntity<>(responses, HttpStatus.OK);
    }

    @PatchMapping("/{cocktail-id}")
    public ResponseEntity patchCocktail(Authentication authentication,
                                        @PathVariable("cocktail-id") long cocktailId,
                                        @RequestBody CocktailDto.Patch patch) {
        String email = authManager.getEmailFromAuthentication(authentication, UnsignedPermission.NOT_PERMIT.get());
        CocktailDto.Response response = cocktailService.updateCocktail(email, cocktailId, patch);
        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/{cocktail-id}")
    public ResponseEntity deleteCocktail(Authentication authentication,
                                         @PathVariable("cocktail-id") long cocktailId) {
        String email = authManager.getEmailFromAuthentication(authentication, UnsignedPermission.NOT_PERMIT.get());
        cocktailService.removeCocktail(email, cocktailId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PostMapping("/{cocktail-id}/rate")
    public ResponseEntity rateCocktail(Authentication authentication,
                                       @PathVariable("cocktail-id") long cocktailId,
                                       @RequestParam("value") int value) {
        String email = authManager.getEmailFromAuthentication(authentication, UnsignedPermission.NOT_PERMIT.get());
        RateDto.Response response = cocktailService.rateCocktail(email, cocktailId, value);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/random")
    public ResponseEntity readRandomCocktail(Authentication authentication) {
        String email = authManager.getEmailFromAuthentication(authentication, UnsignedPermission.PERMIT.get());
        CocktailDto.Response response = cocktailService.readRandomCocktail(email);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
