package project.server.domain.cocktail.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import project.server.domain.cocktail.embed.category.Category;
import project.server.domain.cocktail.embed.category.CategoryMapper;
import project.server.domain.cocktail.embed.rate.RateDto;
import project.server.domain.cocktail.embed.tag.Tag;
import project.server.domain.cocktail.embed.tag.TagMapper;
import project.server.domain.cocktail.dto.CocktailDto;
import project.server.domain.cocktail.entity.Cocktail;
import project.server.domain.cocktail.utils.CocktailDeserializer;
import project.server.domain.cocktail.utils.CocktailSerializer;
import project.server.domain.user.entity.User;
import project.server.domain.user.service.UserService;
import project.server.global.dto.MultiResponseDto;
import project.server.global.exception.BusinessLogicException;
import project.server.global.exception.ExceptionCode;

import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Service
@Transactional
public class CocktailService {

    private static final int DEFAULT_SIZE = 16;
    private static final String SEPARATOR = ",";
    private static final int MAX_RATE_VALUE = 5;
    private static final int MIN_RATE_VALUE = 1;
    private static final boolean BOOKMARK_DEFAULT = false;
    private static final int UNSIGNED_USER_RATE = 0;

    private final CocktailCreateService cocktailCreateService;
    private final CocktailDeleteService cocktailDeleteService;
    private final CocktailReadService cocktailReadService;
    private final CocktailUpdateService cocktailUpdateService;
    private final CocktailSerializer cocktailSerializer;
    private final CocktailDeserializer cocktailDeserializer;
    private final UserService userService;

    public CocktailService(CocktailCreateService cocktailCreateService, CocktailDeleteService cocktailDeleteService, CocktailReadService cocktailReadService, CocktailUpdateService cocktailUpdateService, CocktailSerializer cocktailSerializer, CocktailDeserializer cocktailDeserializer, UserService userService) {
        this.cocktailCreateService = cocktailCreateService;
        this.cocktailDeleteService = cocktailDeleteService;
        this.cocktailReadService = cocktailReadService;
        this.cocktailUpdateService = cocktailUpdateService;
        this.cocktailSerializer = cocktailSerializer;
        this.cocktailDeserializer = cocktailDeserializer;
        this.userService = userService;
    }

    public CocktailDto.Response createCocktail(String email, CocktailDto.Post dto) {
        User user = userService.findUserByEmail(email);
        Cocktail cocktail = cocktailDeserializer.postDtoToEntity(dto);
        Cocktail savedCocktail = cocktailCreateService.create(user, cocktail);
        log.info("# userId : {}, cocktailId : {}, cocktailName : {} 등록 성공", user.getUserId(), savedCocktail.getCocktailId(), savedCocktail.getName());
        savedCocktail.assignRecommends(cocktailReadService.readDetailPageRecommendCocktails(savedCocktail.getTags(), savedCocktail.getCocktailId()));
        return cocktailSerializer.entityToSignedUserResponse(user, savedCocktail, BOOKMARK_DEFAULT, user.getRate(savedCocktail.getCocktailId()));
    }

    public CocktailDto.Response readCocktail(String email, long cocktailId) {
        Cocktail cocktail = cocktailReadService.readCocktail(cocktailId);
        cocktail.assignRecommends(cocktailReadService.readDetailPageRecommendCocktails(cocktail.getTags(), cocktail.getCocktailId()));
        cocktail.incrementViewCount();
        if (unsigned(email)) {
            log.info("# cocktailId : {} 조회 성공", cocktailId);
            return cocktailSerializer.entityToUnsignedResponse(cocktail, BOOKMARK_DEFAULT, UNSIGNED_USER_RATE);
        }
        User user = userService.findUserByEmail(email);
        log.info("# userId : {}, cocktailId : {} 조회 성공", user.getUserId(), cocktailId);
        return cocktailSerializer.entityToSignedUserResponse(user, cocktail, user.isBookmarked(cocktailId), user.getRate(cocktailId));
    }

    public MultiResponseDto readFilteredCocktails(String email, String category, String tag, int page, String sortValue) {
        Sort sort = setSort(sortValue);
        if (isNotSelectCategoryAndTag(category, tag)) {
            List<Cocktail> cocktails = cocktailReadService.readAllCocktails(sort);
            log.info("# 칵테일 전체 목록 조회 성공");
            return createCocktailsSimpleMultiResponseDtos(email, cocktails);
        }
        if (isNotSelectCategory(category)) {
            return filterByTagCocktailsSimpleResponse(email, tag, sort);
        }
        if (isNotSelectTag(tag)) {
            return filterByCategoryCocktailsSimpleResponse(email, category, sort);
        }
        return filterByTagsAndCategoryCocktails(email, category, tag, sort);
    }

    public CocktailDto.Response updateCocktail(String email, long cocktailId, CocktailDto.Patch patch) {
        User user = userService.findUserByEmail(email);
        Cocktail cocktail = cocktailReadService.readCocktail(cocktailId);
        verifyUser(user, cocktail);
        cocktailUpdateService.modify(cocktail, patch);
        log.info("# cocktailId : {} 칵테일 수정 성공", cocktailId);
        cocktail.assignRecommends(cocktailReadService.readDetailPageRecommendCocktails(cocktail.getTags(), cocktail.getCocktailId()));
        return cocktailSerializer.entityToSignedUserResponse(user, cocktail, user.isBookmarked(cocktailId), user.getRate(cocktailId));
    }

    public void removeCocktail(String email, long cocktailId) {
        User user = userService.findUserByEmail(email);
        Cocktail cocktail = cocktailReadService.readCocktail(cocktailId);
        verifyUser(user, cocktail);
        cocktailDeleteService.delete(cocktail);
        log.info("# cocktailId : {} 칵테일 삭제 성공", cocktailId);
    }

    public RateDto.Response rateCocktail(String email, long cocktailId, int value) {
        verifyRateValue(value);
        User user = userService.findUserByEmail(email);
        Cocktail cocktail = cocktailReadService.readCocktail(cocktailId);
        if (user.isAlreadyRated(cocktailId)) {
            return reCalculateCocktailsRate(cocktailId, value, user, cocktail);
        }
        return calculateCocktailsRate(cocktailId, value, user, cocktail);
    }

    public CocktailDto.Response readRandomCocktail(String email) {
        Cocktail cocktail = cocktailReadService.readRandomCocktail();
        if(unsigned(email)){
            return cocktailSerializer.entityToUnsignedResponse(cocktail, BOOKMARK_DEFAULT, UNSIGNED_USER_RATE);
        }
        User user = userService.findUserByEmail(email);
        log.info("# 무작위 칵테일 조회 성공");
        return cocktailSerializer.entityToSignedUserResponse(user, cocktail, user.isBookmarked(cocktail.getCocktailId()), user.getRate(cocktail.getCocktailId()));
    }

    private boolean unsigned(String email) {
        return email == null;
    }

    private RateDto.Response calculateCocktailsRate(long cocktailId, int value, User user, Cocktail cocktail) {
        cocktail.rate(value);
        user.putRatedCocktail(cocktailId, value);
        log.info("# cocktailId : {}, userId : {} 별점 등록 성공 value : {}", cocktail, user.getUserId(), value);
        return new RateDto.Response(cocktail.getRatedScore());
    }

    private RateDto.Response reCalculateCocktailsRate(long cocktailId, int value, User user, Cocktail cocktail) {
        int oldValue = user.getRate(cocktailId);
        cocktail.reRate(oldValue, value);
        user.putRatedCocktail(cocktailId, value);
        log.info("# cocktailId : {}, userId : {} 별점 재등록 성공 value : {}", cocktail, user.getUserId(), value);
        return new RateDto.Response(cocktail.getRatedScore());
    }

    private void verifyRateValue(int value) {
        if (value > MAX_RATE_VALUE || value < MIN_RATE_VALUE) {
            throw new BusinessLogicException(ExceptionCode.INVALID_RATE_VALUE);
        }
    }

    private List<Tag> createTagList(String tag) {
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
            return Sort.by(Sort.Order.desc("rate.rate"));
        }
        return Sort.by(Sort.Order.asc("rate.rate"));
    }

    private void verifyUser(User user, Cocktail cocktail) {
        if (!user.hasAuthority(cocktail.getUserId())) {
            throw new BusinessLogicException(ExceptionCode.UNAUTHORIZED_USER);
        }
    }

    private MultiResponseDto<CocktailDto.SimpleResponse> filterByTagCocktailsSimpleResponse(String email, String tag, Sort sort) {
        List<Tag> tags = createTagList(tag);
        List<Cocktail> cocktails = cocktailReadService.readFilteredByTagsCocktails(tags,sort);
        log.info("# {} 태그를 적용한 칵테일 목록 조회", tag);
        return createFilteredByTagCockatilsMultiResponseDto(email, tags, cocktails);
    }

    private MultiResponseDto<CocktailDto.SimpleResponse> createFilteredByTagCockatilsMultiResponseDto(String email, List<Tag> tags, List<Cocktail> cocktails) {
        List<Cocktail> filteredCocktails = cocktails.stream()
                .filter(cocktail -> cocktail.containsAll(tags))
                .collect(Collectors.toList());
        return createCocktailsSimpleMultiResponseDtos(email, filteredCocktails);
    }

    private MultiResponseDto<CocktailDto.SimpleResponse> filterByCategoryCocktailsSimpleResponse(String email, String category, Sort sort) {
        Category selectedCategory = CategoryMapper.map(category);
        List<Cocktail> cocktails = cocktailReadService.readFilteredByCategoryCocktails(selectedCategory, sort);
        log.info("# {} 카테고리를 적용한 칵테일 목록 조회", category);
        return createCocktailsSimpleMultiResponseDtos(email, cocktails);
    }

    private MultiResponseDto<CocktailDto.SimpleResponse> filterByTagsAndCategoryCocktails(String email, String category, String tag, Sort sort) {
        List<Tag> tags = createTagList(tag);
        Category selectedCategory = CategoryMapper.map(category);
        List<Cocktail> cocktails = cocktailReadService.readFilterByCategoryAndTagsCocktails(selectedCategory, tags, sort);
        log.info("# {} 태그 및 {} 카테고리를 적용한 칵테일 목록", tag, category);
        return createFilteredByTagCockatilsMultiResponseDto(email, tags, cocktails);
    }

    private MultiResponseDto<CocktailDto.SimpleResponse> createCocktailsSimpleMultiResponseDtos(String email, List<Cocktail> cocktails) {
        if (unsigned(email)) {
            List<CocktailDto.SimpleResponse> responses = cocktails.stream()
                    .map(cocktail -> cocktailSerializer.entityToSimpleResponse(BOOKMARK_DEFAULT, cocktail))
                    .collect(Collectors.toList());
            return new MultiResponseDto<>(responses);
        }
        User user = userService.findUserByEmail(email);
        List<CocktailDto.SimpleResponse> responses = cocktails.stream()
                .map(cocktail -> cocktailSerializer.entityToSimpleResponse(user.isBookmarked(cocktail.getCocktailId()), cocktail))
                .collect(Collectors.toList());
        return new MultiResponseDto<>(responses);
    }

    private boolean isNotSelectTag(String tag) {
        return tag == null;
    }

    private boolean isNotSelectCategory(String category) {
        return category == null;
    }

    private boolean isNotSelectCategoryAndTag(String category, String tag) {
        return category == null && tag == null;
    }
}
