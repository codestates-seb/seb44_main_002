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
import project.server.global.auth.service.AuthManager;
import project.server.global.dto.MultiResponseDto;
import project.server.global.utils.UnsignedPermission;

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
        log.info("# CocktailController#postCocktail 실행");
        String email = authManager.getEmailFromAuthentication(authentication, UnsignedPermission.NOT_PERMIT.get());
        CocktailDto.Response response = cocktailService.createCocktail(email, post);
        log.info("# CocktailController#postCocktail 완료");
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/{cocktail-id}")
    public ResponseEntity getCocktail(Authentication authentication,
                                      @PathVariable("cocktail-id") long cocktailId) {
        log.info("# CocktailController#getCocktail 실행");
        String email = authManager.getEmailFromAuthentication(authentication, UnsignedPermission.PERMIT.get());
        CocktailDto.Response response = cocktailService.readCocktail(email, cocktailId);
        log.info("# CocktailController#getCocktail 완료");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/filter")
    public ResponseEntity getFilteredCocktails(Authentication authentication,
                                               @RequestParam(value = "category", required = false) String category,
                                               @RequestParam(value = "tag", required = false) String tag,
                                               @RequestParam(value = "sort", defaultValue = "most_viewed") String sort) {
        log.info("# CocktailController#getFilteredCocktails 실행");
        String email = authManager.getEmailFromAuthentication(authentication, UnsignedPermission.PERMIT.get());
        MultiResponseDto responses = cocktailService.readFilteredCocktails(email, category, tag, sort);
        log.info("# CocktailController#getFilteredCocktails 완료");
        return new ResponseEntity<>(responses, HttpStatus.OK);
    }

    @PatchMapping("/{cocktail-id}")
    public ResponseEntity patchCocktail(Authentication authentication,
                                        @PathVariable("cocktail-id") long cocktailId,
                                        @RequestBody CocktailDto.Patch patch) {
        log.info("# CocktailController#patchCocktail 실행");
        String email = authManager.getEmailFromAuthentication(authentication, UnsignedPermission.NOT_PERMIT.get());
        CocktailDto.Response response = cocktailService.updateCocktail(email, cocktailId, patch);
        log.info("# CocktailController#patchCocktail 완료");
        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/{cocktail-id}")
    public ResponseEntity deleteCocktail(Authentication authentication,
                                         @PathVariable("cocktail-id") long cocktailId) {
        log.info("# CocktailController#deleteCocktail 실행");
        String email = authManager.getEmailFromAuthentication(authentication, UnsignedPermission.NOT_PERMIT.get());
        cocktailService.deleteCocktail(email, cocktailId);
        log.info("# CocktailController#deleteCocktail 완료");
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PostMapping("/{cocktail-id}/rate")
    public ResponseEntity rateCocktail(Authentication authentication,
                                       @PathVariable("cocktail-id") long cocktailId,
                                       @RequestParam("value") int value) {
        log.info("# CocktailController#rateCocktail 실행");
        String email = authManager.getEmailFromAuthentication(authentication, UnsignedPermission.NOT_PERMIT.get());
        RateDto.Response response = cocktailService.rateCocktail(email, cocktailId, value);
        log.info("# CocktailController#rateCocktail 완료");
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/random")
    public ResponseEntity readRandomCocktail(Authentication authentication) {
        log.info("# CocktailController#readRandomCocktail 실행");
        String email = authManager.getEmailFromAuthentication(authentication, UnsignedPermission.PERMIT.get());
        CocktailDto.Response response = cocktailService.readRandomCocktail(email);
        log.info("# CocktailController#readRandomCocktail 완료");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
