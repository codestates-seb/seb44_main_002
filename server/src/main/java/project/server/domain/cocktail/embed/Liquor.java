package project.server.domain.cocktail.embed;

public enum Liquor {
    RUM("럼"),
    WHISKEY("위스키"),
    VODKA("보드카"),
    TEQUILA("데킬라"),
    LIQUEUR("리큐르"),
    JIN("진");

    private final String liquor;

    Liquor(String liquor) {
        this.liquor = liquor;
    }
}
