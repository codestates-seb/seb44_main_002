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

    //더미 데이터용. 삭제 필요
    public Recipe(List<String>recipe, int count){
        this.recipe = recipe;
    }

    public Recipe(List<RecipeDto.Post> recipe) {
        this.recipe = recipe.stream()
                .map(RecipeDto.Post::getProcess)
                .collect(Collectors.toList());
    }

    public List<RecipeDto.Response> createResponseDtoList() {
        return recipe.stream()
                .map(this::makeResponse)
                .collect(Collectors.toList());
    }

    private RecipeDto.Response makeResponse(String process) {
        return new RecipeDto.Response(process);
    }
}
