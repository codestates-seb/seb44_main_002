package project.server.domain.cocktail.embed;

import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Embeddable
@NoArgsConstructor
public class Ingredients {

    @ElementCollection
    @CollectionTable(name = "cocktail_ingredient", joinColumns = @JoinColumn(name = "cocktail_id"))
    @Column(name = "ingredient")
    private List<Ingredient> ingredients;
}
