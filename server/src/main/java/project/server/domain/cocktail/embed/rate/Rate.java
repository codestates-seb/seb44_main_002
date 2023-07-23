package project.server.domain.cocktail.embed.rate;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Embeddable;

@Embeddable
@NoArgsConstructor
@Getter
public class Rate {

    private double rate = 0;

    private long ratedCount = 0;

    private long totalRateSum = 0;

    public void calculate(int value) {
        ratedCount++;
        totalRateSum += value;
        rate = Math.round((double) totalRateSum / ratedCount * 100) / 100.0;
    }

    public void reCalculate(int oldValue, int value) {
        totalRateSum += value - oldValue;
        rate = Math.round((double) totalRateSum / ratedCount * 100) / 100.0;
    }
}
