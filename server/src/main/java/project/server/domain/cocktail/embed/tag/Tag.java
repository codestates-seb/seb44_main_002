package project.server.domain.cocktail.embed.tag;

import lombok.Getter;

public enum Tag {

    SWEET("sweet"),
    SOUR("sour"),
    BITTER("bitter"),
    FREQUENCY_HIGH("high"),
    FREQUENCY_MEDIUM("medium"),
    FREQUENCY_LOW("low");

    @Getter
    private final String tag;

    Tag(String tag) {
        this.tag = tag;
    }
}
