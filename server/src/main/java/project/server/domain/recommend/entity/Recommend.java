package project.server.domain.recommend.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;

@NoArgsConstructor
@Entity
@Getter
public class Recommend implements Comparable<Recommend> {

    @Id
    long id;

    long cocktailId;

    String name;

    String imageUrl;

    long count;

    public Recommend(long cocktailId, String name, String imageUrl, long count) {
        this.cocktailId = cocktailId;
        this.name = name;
        this.imageUrl = imageUrl;
        this.count = count;
    }

    @Override
    public int compareTo(Recommend o) {
        return (int) (o.count - this.count);
    }
}
