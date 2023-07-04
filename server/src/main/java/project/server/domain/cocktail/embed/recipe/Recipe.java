package project.server.domain.cocktail.embed.recipe;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;
import java.util.stream.Collectors;

@Embeddable
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Recipe {

    @ElementCollection
    @CollectionTable(name = "cocktail_recipe", joinColumns = @JoinColumn(name = "cocktail_id"))
    @Column(name = "recipe")
    private List<String> recipe;

    public Recipe(List<RecipeDto.Post> recipe) {
        this.recipe = recipe.stream()
                .map(RecipeDto.Post::getProcess)
                .collect(Collectors.toList());
    }

    public List<RecipeDto.Response> createResponseList() {
        return recipe.stream()
                .map(this::makeResponse)
                .collect(Collectors.toList());
    }

    private RecipeDto.Response makeResponse(String process) {
        return new RecipeDto.Response(process);
    }
}
