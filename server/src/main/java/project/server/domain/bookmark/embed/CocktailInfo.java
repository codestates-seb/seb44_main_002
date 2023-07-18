package project.server.domain.bookmark.embed;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@Embeddable
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CocktailInfo {

    @Column(updatable = false)
    private long cocktailId;

    @Column(updatable = false)
    private String cocktailName;

    @Column(updatable = false)
    private String cocktailImageUrl;
}
