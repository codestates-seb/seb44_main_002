package project.server.domain.cocktail.embed.rating;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@Embeddable
@Setter
@Getter
@NoArgsConstructor
public class Rating {

    @Column(name = "rate")
    private double rate = 0;

    @Column(name = "rate_count")
    private long rateCount = 0;

    @Column(name = "rate_sum")
    private long rateSum = 0;
}
