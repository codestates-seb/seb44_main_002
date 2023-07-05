package project.server.domain.user;

import project.server.domain.cocktail.entity.Cocktail;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Embeddable
public class BookmarkedCocktails {

    @ElementCollection
    @CollectionTable(
            name = "user_bookmarked_cocktail",
            joinColumns = @JoinColumn(name = "user_id")
    )
    Set<Long> bookmarkedCocktails = new HashSet<>();

    public boolean containCocktail(long cocktailId) {
        return bookmarkedCocktails.contains(cocktailId);
    }

    public void add(long cocktailId) {
        bookmarkedCocktails.add(cocktailId);
    }

    public void remove(long cocktailId) {
        bookmarkedCocktails.remove(cocktailId);
    }
}
