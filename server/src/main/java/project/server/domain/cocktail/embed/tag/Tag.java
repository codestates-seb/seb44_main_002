package project.server.domain.cocktail.embed.tag;

import lombok.Getter;

public enum Tag {

    SWEET("# 단맛"),
    SOUR("# 신맛"),
    BITTER("# 쓴맛"),
    FREQUENCY_HIGH("# 도수 높음"),
    FREQUENCY_MEDIUM("# 도수 보통"),
    FREQUENCY_LOW("# 도수 낮음");

    @Getter
    private final String tag;

    Tag(String tag) {
        this.tag = tag;
    }
}
