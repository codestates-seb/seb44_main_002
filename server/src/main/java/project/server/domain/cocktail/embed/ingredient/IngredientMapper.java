package project.server.domain.cocktail.embed.ingredient;

import java.util.HashMap;
import java.util.Map;

public class IngredientMapper {

    private final static Map<String, Ingredient> ingredientMap;

    static {
        ingredientMap = new HashMap<>();
        ingredientMap.put("ice", Ingredient.ICE);
        ingredientMap.put("lemonSqueeze", Ingredient.LEMON_SQUEEZE);
        ingredientMap.put("limeSqueeze", Ingredient.LIME_SQUEEZE);
        ingredientMap.put("salt", Ingredient.SALT);
        ingredientMap.put("sugar", Ingredient.SUGAR);
        ingredientMap.put("soda", Ingredient.SODA);
        ingredientMap.put("beverage", Ingredient.BEVERAGE);
        ingredientMap.put("milk", Ingredient.MILK);
        ingredientMap.put("mint", Ingredient.MINT);

    }

    public static Ingredient map(String key){
        return ingredientMap.get(key);
    }
}
