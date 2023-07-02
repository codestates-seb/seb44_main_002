package project.server.domain.cocktail.embed.rating;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Embeddable;

@Embeddable
@Setter
@Getter
public class Rating {

    private double rating;

    private long rateCount = 0;

    private long rateSum = 0;
}
