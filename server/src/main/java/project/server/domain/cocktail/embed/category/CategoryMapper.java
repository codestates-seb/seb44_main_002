package project.server.domain.cocktail.embed.category;

import java.util.HashMap;
import java.util.Map;

public class CategoryMapper {

    private static final Map<String, Category> categoryMap;

    static {
        categoryMap = new HashMap<>();
        categoryMap.put("liqueur", Category.CATEGORY1);
        categoryMap.put("tequila", Category.CATEGORY1);
        categoryMap.put("rum", Category.CATEGORY2);
        categoryMap.put("jin", Category.CATEGORY2);
        categoryMap.put("vodka", Category.CATEGORY3);
        categoryMap.put("whiskey", Category.CATEGORY3);
        categoryMap.put("category_one", Category.CATEGORY1);
        categoryMap.put("category_two", Category.CATEGORY2);
        categoryMap.put("category_three", Category.CATEGORY3);
    }

    public static Category map(String key) {
        return categoryMap.get(key);
    }
}
