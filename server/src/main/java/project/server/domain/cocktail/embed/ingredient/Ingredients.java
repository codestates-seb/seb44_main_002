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
    private List<String> ingredients;

    public Ingredients(List<IngredientDto.Post> baseIngredients, List<IngredientDto.Post> additionalIngredients) {
        if (additionalIngredients != null) {
            baseIngredients.addAll(additionalIngredients);
        }
        this.ingredients = baseIngredients.stream()
                .map(IngredientDto.Post::getIngredient)
                .collect(Collectors.toList());
    }

    public List<IngredientDto.Response> createResponseDtoList() {
        return ingredients.stream()
                .map(this::createResponseDto)
                .collect(Collectors.toList());
    }

    private IngredientDto.Response createResponseDto(String ingredient) {
        return new IngredientDto.Response(ingredient);
    }
}
