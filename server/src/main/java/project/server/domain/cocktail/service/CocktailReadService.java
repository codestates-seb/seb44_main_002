package project.server.domain.cocktail.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import project.server.domain.cocktail.embed.category.Category;
import project.server.domain.cocktail.embed.tag.Tag;
import project.server.domain.cocktail.embed.tag.Tags;
import project.server.domain.cocktail.entity.Cocktail;
import project.server.domain.cocktail.repository.CocktailRepository;
import project.server.global.exception.BusinessLogicException;
import project.server.global.exception.ExceptionCode;

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
    public List<Cocktail> readAllCocktails() {
        return cocktailRepository.findAll();
    }

    @Transactional(readOnly = true)
    public List<Cocktail> readFilteredByTagsCocktails(List<Tag> tags) {
        return cocktailRepository.findDistinctByTagsTagsIn(tags);
    }

    @Transactional(readOnly = true)
    public List<Cocktail> readFilteredByCategoryCocktails(Category selectedCategory) {
        return cocktailRepository.findByCategory(selectedCategory);
    }

    @Transactional(readOnly = true)
    public List<Cocktail> readFilterByCategoryAndTagsCocktails(Category selectedCategory, List<Tag> tags) {
        return cocktailRepository.findDistinctByCategoryAndTagsTagsIn(selectedCategory, tags);
    }

    @Transactional(readOnly = true)
    public Cocktail readRandomCocktail() {
        List<Cocktail>cocktails = cocktailRepository.findAll();
        int index = getIndex(cocktails);
        Cocktail cocktail = cocktails.get(index);
        cocktail.assignRecommends(readDetailPageRecommendCocktails(cocktail.getTags(), cocktail.getCocktailId()));
        return cocktail;
    }

    private int getIndex(List<Cocktail> cocktails) {
        int size = cocktails.size();
        int index = (int) (Math.random() * size);
        if(index == size){
            index--;
        }
        return index;
    }
}
