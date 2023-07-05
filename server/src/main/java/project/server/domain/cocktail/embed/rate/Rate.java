package project.server.domain.cocktail.embed.rate;

import lombok.Getter;
import lombok.NoArgsConstructor;
import javax.persistence.Embeddable;

@Embeddable
@NoArgsConstructor
@Getter
public class Rate {

    private double rate = 0;

    private double ratedCount = 0;

    private double totalRateSum = 0;

    public void calculate(int value) {
        ratedCount++;
        totalRateSum += value;
        rate = Math.round(totalRateSum/ratedCount*100)/100.0;
    }

    public void reCalculate(int oldValue, int value) {
        totalRateSum += value - oldValue;
        rate = Math.round(totalRateSum/ratedCount*100)/100.0;
    }
}
