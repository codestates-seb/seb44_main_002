package project.server.domain.user;

import javax.persistence.*;
import java.util.HashMap;
import java.util.Map;

@Embeddable
public class RatedCocktails {

    public static final int UNRATED_COCKTAIL = 0;
    @ElementCollection
    @CollectionTable(
            name = "rated_cocktail_rate_value",
            joinColumns = @JoinColumn(name = "user_id")
    )
    @MapKeyColumn(name = "cocktail_id")
    Map<Long, Integer> ratedCocktailIdAndRate = new HashMap<>();

    public boolean containCocktail(long cocktailId) {
        return ratedCocktailIdAndRate.containsKey(cocktailId);
    }

    public int findValue(long cocktailId) {
        if(ratedCocktailIdAndRate.containsKey(cocktailId)){
            return ratedCocktailIdAndRate.get(cocktailId);
        }
        return UNRATED_COCKTAIL;
    }

    public void put(long cocktailId, int value) {
        ratedCocktailIdAndRate.put(cocktailId, value);
    }
}
