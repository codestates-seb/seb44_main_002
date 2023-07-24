package project.server.domain.cocktail.embed.liquor;

import lombok.Getter;

public enum Liquor {
    RUM("럼"),
    WHISKEY("위스키"),
    VODKA("보드카"),
    TEQUILA("데킬라"),
    LIQUEUR("리큐르"),
    JIN("진"),
    SOJU("소주"),
    BEER("맥주"),
    WINE("와인"),
    MAKGEOLLI("막걸리"),
    ETC("기타");

    @Getter
    private final String liquor;

    Liquor(String liquor) {
        this.liquor = liquor;
    }
}
