package project.server.domain.cocktail.embed.tag;

import lombok.Getter;

public enum Tag {

    SWEET("sweet"),
    SOAR("soar"),
    BITTER("bitter");

    @Getter
    private final String tag;

    Tag(String tag) {
        this.tag = tag;
    }
}
