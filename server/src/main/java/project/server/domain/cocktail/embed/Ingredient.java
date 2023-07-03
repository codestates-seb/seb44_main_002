package project.server.domain.cocktail.embed;

public enum Ingredient {

    ICE("얼음"),
    LEMON_SQUEEZE("레몬즙"),
    LIME_SQUEEZE("라임즙"),
    SALT("소금"),
    SUGAR("설탕"),
    SODA("탄산음료"),
    BEVERAGE("과일음료");


    private final String ingredient;

    Ingredient(String ingredient) {
        this.ingredient = ingredient;
    }
}

