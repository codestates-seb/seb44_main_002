package project.server.domain.cocktail.embed.liquor;

import java.util.HashMap;
import java.util.Map;

public class LiquorMapper {

    private final static Map<String, Liquor> liquorMap;

    static {
        liquorMap = new HashMap<>();
        liquorMap.put("rum", Liquor.RUM);
        liquorMap.put("whiskey", Liquor.WHISKEY);
        liquorMap.put("vodka", Liquor.VODKA);
        liquorMap.put("tequila", Liquor.TEQUILA);
        liquorMap.put("liqueur", Liquor.LIQUEUR);
        liquorMap.put("jin", Liquor.JIN);
    }

    public static Liquor map(String key){
        return liquorMap.get(key);
    }
}
