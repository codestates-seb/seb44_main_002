package project.server.domain.cocktail.embed.ingredient;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;
import java.util.stream.Collectors;

@Embeddable
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Ingredients {

    @ElementCollection
    @CollectionTable(name = "cocktail_ingredient", joinColumns = @JoinColumn(name = "cocktail_id"))
    @Column(name = "ingredient")
    private List<Ingredient> ingredients;

    //테스트용 삭제 요망
    public Ingredients(List<Ingredient> ingredients, int count) {
        this.ingredients = ingredients;
    }

    public Ingredients(List<IngredientDto.Post> ingredients) {
        this.ingredients = ingredients.stream()
                .map(IngredientDto.Post::getIngredient)
                .map(IngredientMapper::map)
                .collect(Collectors.toList());
    }

    public List<IngredientDto.Response> createResponseDtoList() {
        return ingredients.stream()
                .map(Ingredient::getIngredient)
                .map(this::createResponseDto)
                .collect(Collectors.toList());
    }

    private IngredientDto.Response createResponseDto(String ingredient) {
        return new IngredientDto.Response(ingredient);
    }
}
