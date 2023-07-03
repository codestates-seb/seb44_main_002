package project.server.domain.cocktail.service;

import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import project.server.domain.cocktail.embed.category.Category;
import project.server.domain.cocktail.embed.category.CategoryMapper;
import project.server.domain.cocktail.embed.tag.Tag;
import project.server.domain.cocktail.embed.tag.TagMapper;
import project.server.domain.cocktail.embed.tag.Tags;
import project.server.domain.cocktail.repository.CocktailRepository;
import project.server.domain.cocktail.dto.CocktailDto;
import project.server.domain.cocktail.entity.Cocktail;
import project.server.dto.MultiResponseDto;
import project.server.exception.BusinessLogicException;
import project.server.exception.ExceptionCode;

import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional
public class CocktailService {

    public static final int DEFAULT_SIZE = 16;
    public static final String SEPARATOR = ",";

    private final CocktailRepository cocktailRepository;

    public CocktailService(CocktailRepository cocktailRepository) {
        this.cocktailRepository = cocktailRepository;
    }

    /**
     * 칵테일에 유저 정보 담는 로직 필요
     */
    public CocktailDto.Response createCocktail(CocktailDto.Post post) {
        Cocktail cocktail = post.postToEntity();
        Cocktail savedCocktail = cocktailRepository.save(cocktail);
        savedCocktail.setRecommends(createRecommendCocktails(savedCocktail.getTags(), savedCocktail.getCocktailId()));
        return savedCocktail.entityToResponse();
    }

    public CocktailDto.Response readCocktail(long cocktailId) {
        Cocktail cocktail = findCocktailById(cocktailId);
        cocktail.setRecommends(createRecommendCocktails(cocktail.getTags(), cocktail.getCocktailId()));
        cocktail.setViewCount(cocktail.getViewCount() + 1);
        return cocktail.entityToResponse();
    }

    public MultiResponseDto readFilteredCocktails(String category, String tag, int page, String sortValue) {
        Sort sort = setSort(sortValue);
        Pageable pageable = PageRequest.ofSize(DEFAULT_SIZE).withPage(page - 1).withSort(sort);
        if (isNotSelectCategoryAndTag(category, tag)) {
            return readEveryCocktails(pageable);
        }
        if (isNotSelectCategory(category)) {
            return readFilteringByTagsCocktails(tag, pageable);
        }
        if (isNotSelectTag(tag)) {
            return readFilteringByCategoryCocktails(category, pageable);
        }
        return readFilteringByTagsAndCategoryCocktails(category, tag, pageable);
    }

    private MultiResponseDto<CocktailDto.SimpleResponse> readFilteringByTagsAndCategoryCocktails(String category, String tag, Pageable pageable) {
        List<Tag> tags = createTagList(tag);
        Category selectedCategory = CategoryMapper.map(category);
        Page<Cocktail> cocktailPage = cocktailRepository.findByCategoryAndTagsTagsIn(selectedCategory, tags, pageable);
        return createMultiResponseDto(pageable, tags, cocktailPage);
    }

    private MultiResponseDto<CocktailDto.SimpleResponse> createMultiResponseDto(Pageable pageable, List<Tag> tags, Page<Cocktail> cocktailPage) {
        List<Cocktail>filteredCocktails = cocktailPage.get()
                .collect(Collectors.toSet()).stream()
                .filter(cocktail -> cocktail.containsAll(tags))
                .collect(Collectors.toList());
        List<CocktailDto.SimpleResponse> responses = createSimpleResponses(filteredCocktails);
        cocktailPage = resetPageValues(pageable, filteredCocktails);
        return new MultiResponseDto<>(responses, cocktailPage);
    }

    private static Page<Cocktail> resetPageValues(Pageable pageable, List<Cocktail> filteredCocktails) {
        Page<Cocktail> cocktailPage;
        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), filteredCocktails.size());
        cocktailPage = new PageImpl<>(filteredCocktails.subList(start,end), pageable, filteredCocktails.size());
        return cocktailPage;
    }

    private MultiResponseDto<CocktailDto.SimpleResponse> readFilteringByCategoryCocktails(String category, Pageable pageable) {
        Category selectedCategory = CategoryMapper.map(category);
        Page<Cocktail> cocktailPage = cocktailRepository.findByCategory(selectedCategory, pageable);
        List<CocktailDto.SimpleResponse> responses = createSimpleResponses(cocktailPage.getContent());
        return new MultiResponseDto<>(responses, cocktailPage);
    }

    private MultiResponseDto<CocktailDto.SimpleResponse> readFilteringByTagsCocktails(String tag, Pageable pageable) {
        List<Tag> tags = createTagList(tag);
        Page<Cocktail> cocktailPage = cocktailRepository.findByTagsTagsIn(tags, pageable);
        return createMultiResponseDto(pageable, tags, cocktailPage);
    }

    private static List<Tag> createTagList(String tag) {
        return Arrays.stream(tag.split(SEPARATOR))
                .map(TagMapper::map)
                .collect(Collectors.toList());
    }

    private Sort setSort(String sortValue) {
        if (sortValue.equals("most_viewed")) {
            return Sort.by(Sort.Order.desc("viewCount"));
        }
        if (sortValue.equals("least_viewed")) {
            return Sort.by(Sort.Order.asc("viewCount"));
        }
        if (sortValue.equals("highest_rate")) {
            return Sort.by(Sort.Order.desc("rating.rate"));
        }
        return Sort.by(Sort.Order.asc("rating.rate"));
    }

    private MultiResponseDto<CocktailDto.SimpleResponse> readEveryCocktails(Pageable pageable) {
        Page<Cocktail> cocktailPage = cocktailRepository.findAll(pageable);
        List<CocktailDto.SimpleResponse> responses = createSimpleResponses(cocktailPage.getContent());
        return new MultiResponseDto<>(responses, cocktailPage);
    }

    private List<CocktailDto.SimpleResponse> createSimpleResponses(List<Cocktail> cocktails) {
        return cocktails.stream()
                .map(cocktail -> cocktail.entityToSimpleResponse(cocktail))
                .collect(Collectors.toList());
    }

    private Cocktail findCocktailById(long cocktailId) {
        return cocktailRepository.findById(cocktailId).orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.COCKTAIL_NOT_FOUND));
    }

    private List<Cocktail> createRecommendCocktails(Tags tags, long cocktailId) {
        return cocktailRepository.findDistinctTop5ByTagsTagsContainingAndCocktailIdNotOrderByRatingRateDesc(tags.getRandomTag(), cocktailId);
    }

    private static boolean isNotSelectTag(String tag) {
        return tag == null;
    }

    private static boolean isNotSelectCategory(String category) {
        return category == null;
    }

    private static boolean isNotSelectCategoryAndTag(String category, String tag) {
        return category == null && tag == null;
    }
}
