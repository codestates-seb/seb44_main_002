package project.server.domain.cocktail.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import project.server.domain.cocktail.embed.category.Category;
import project.server.domain.cocktail.embed.tag.Tag;
import project.server.domain.cocktail.embed.tag.Tags;
import project.server.domain.cocktail.entity.Cocktail;
import project.server.domain.cocktail.repository.CocktailRepository;
import project.server.exception.BusinessLogicException;
import project.server.exception.ExceptionCode;

import java.util.List;

@Service
public class CocktailReadService {

    private final CocktailRepository cocktailRepository;

    public CocktailReadService(CocktailRepository cocktailRepository) {
        this.cocktailRepository = cocktailRepository;
    }

    @Transactional(readOnly = true)
    public List<Cocktail> readDetailPageRecommendCocktails(Tags tags, long cocktailId) {
        return cocktailRepository.findDistinctTop3ByTagsTagsContainingAndCocktailIdNotOrderByRateRateDesc(tags.getRandomTag(), cocktailId);
    }

    @Transactional(readOnly = true)
    public Cocktail readCocktail(long cocktailId) {
        return cocktailRepository.findById(cocktailId).orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.COCKTAIL_NOT_FOUND));
    }

    @Transactional(readOnly = true)
    public Page<Cocktail> readAllCocktails(Pageable pageable) {
        return cocktailRepository.findAll(pageable);
    }

    @Transactional(readOnly = true)
    public Page<Cocktail> readFilteredByTagsCocktails(List<Tag> tags, Pageable pageable) {
        return cocktailRepository.findDistinctByTagsTagsIn(tags, pageable);
    }

    @Transactional(readOnly = true)
    public Page<Cocktail> readFilteredByCategoryCocktails(Category selectedCategory, Pageable pageable) {
        return cocktailRepository.findByCategory(selectedCategory, pageable);
    }

    @Transactional(readOnly = true)
    public Page<Cocktail> readFilterByCategoryAndTagsCocktails(Category selectedCategory, List<Tag> tags, Pageable pageable) {
        return cocktailRepository.findDistinctByCategoryAndTagsTagsIn(selectedCategory, tags, pageable);
    }

    @Transactional(readOnly = true)
    public Cocktail readRandomCocktail() {
        long count = cocktailRepository.count();
        return cocktailRepository.findAll().get((int) (Math.random() * count));
    }
}
