package project.server.domain.cocktail;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/cocktails")
public class CocktailController {

    @PostMapping
    public ResponseEntity postCocktail(){
        return ResponseEntity.ok(new Cocktail());
    }
}
