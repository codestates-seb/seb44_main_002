package project.server.domain.cocktail.embed.tag;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class TagMapper {

    private static final Map<String, Tag> tagMap;

    static {
        tagMap = new HashMap<>();
        tagMap.put("sweet", Tag.SWEET);
        tagMap.put("sour", Tag.SOUR);
        tagMap.put("bitter", Tag.BITTER);
        tagMap.put("frequency_high", Tag.FREQUENCY_HIGH);
        tagMap.put("frequency_medium", Tag.FREQUENCY_MEDIUM);
        tagMap.put("frequency_low", Tag.FREQUENCY_LOW);
    }

    public static Tag map(String tag) {
        return tagMap.get(tag);
    }
}
