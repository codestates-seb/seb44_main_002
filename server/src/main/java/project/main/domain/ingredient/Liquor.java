package project.main.domain.ingredient;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import project.main.domain.ingredient.Ingredient;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity(name = "Liquors")
@Getter
@Setter
@NoArgsConstructor
public class Liquor implements Ingredient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long liquorId;
}
