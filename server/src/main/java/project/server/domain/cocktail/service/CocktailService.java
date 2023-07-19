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
import project.server.domain.user.User;
import project.server.domain.user.UserService;
import project.server.dto.MultiResponseDto;
import project.server.exception.BusinessLogicException;
import project.server.exception.ExceptionCode;

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
    private final UserService userService;

    public CocktailService(CocktailCreateService cocktailCreateService, CocktailDeleteService cocktailDeleteService, CocktailReadService cocktailReadService, CocktailUpdateService cocktailUpdateService, UserService userService) {
        this.cocktailCreateService = cocktailCreateService;
        this.cocktailDeleteService = cocktailDeleteService;
        this.cocktailReadService = cocktailReadService;
        this.cocktailUpdateService = cocktailUpdateService;
        this.userService = userService;
    }

    public CocktailDto.Response createCocktail(String email, CocktailDto.Post dto) {
        User user = userService.findUserByEmail(email);
        Cocktail cocktail = CocktailDeserializer.postDtoToEntity(dto);
        Cocktail savedCocktail = cocktailCreateService.create(user, cocktail);
        savedCocktail.assignRecommends(cocktailReadService.readDetailPageRecommendCocktails(savedCocktail.getTags(), savedCocktail.getCocktailId()));
        return CocktailSerializer.entityToSignedUserResponse(user, savedCocktail, BOOKMARK_DEFAULT, user.getRate(savedCocktail.getCocktailId()));
    }

    public CocktailDto.Response readCocktail(String email, long cocktailId) {
        Cocktail cocktail = cocktailReadService.readCocktail(cocktailId);
        log.info("# 칵테일에 태그 기반 추천 칵테일 할당");
        cocktail.assignRecommends(cocktailReadService.readDetailPageRecommendCocktails(cocktail.getTags(), cocktail.getCocktailId()));
        log.info("# 칵테일 조회 수 증가");
        cocktail.incrementViewCount();
        if (unsigned(email)) {
            log.info("# cocktailId : {} 조회 완료", cocktailId);
            return CocktailSerializer.entityToUnsignedResponse(cocktail, BOOKMARK_DEFAULT, UNSIGNED_USER_RATE);
        }
        User user = userService.findUserByEmail(email);
        log.info("# cocktailId : {} 조회 완료", cocktailId);
        return CocktailSerializer.entityToSignedUserResponse(user, cocktail, user.isBookmarked(cocktailId), user.getRate(cocktailId));
    }

    public MultiResponseDto readFilteredCocktails(String email, String category, String tag, int page, String sortValue) {
        Sort sort = setSort(sortValue);
        Pageable pageable = PageRequest.ofSize(DEFAULT_SIZE).withPage(page - 1).withSort(sort);
        if (isNotSelectCategoryAndTag(category, tag)) {
            Page<Cocktail> cocktailPage = cocktailReadService.readAllCocktails(pageable);
            return cocktailsSimpleResponseDto(email, cocktailPage);
        }
        if (isNotSelectCategory(category)) {
            return filterByTagCocktailsSimpleResponse(email, tag, pageable);
        }
        if (isNotSelectTag(tag)) {
            return filterByCategoryCocktailsSimpleResponse(email, category, pageable);
        }
        return filterByTagsAndCategoryCocktails(email, category, tag, pageable);
    }

    public CocktailDto.Response updateCocktail(String email, long cocktailId, CocktailDto.Patch patch) {
        User user = userService.findUserByEmail(email);
        Cocktail cocktail = cocktailReadService.readCocktail(cocktailId);
        verifyUser(user, cocktail);
        cocktailUpdateService.modify(cocktail, patch);
        cocktail.assignRecommends(cocktailReadService.readDetailPageRecommendCocktails(cocktail.getTags(), cocktail.getCocktailId()));
        return CocktailSerializer.entityToSignedUserResponse(user, cocktail, user.isBookmarked(cocktailId), user.getRate(cocktailId));
    }

    public void removeCocktail(String email, long cocktailId) {
        User user = userService.findUserByEmail(email);
        Cocktail cocktail = cocktailReadService.readCocktail(cocktailId);
        verifyUser(user, cocktail);
        cocktailDeleteService.delete(cocktail);
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
            return CocktailSerializer.entityToUnsignedResponse(cocktail, BOOKMARK_DEFAULT, UNSIGNED_USER_RATE);
        }
        User user = userService.findUserByEmail(email);
        return CocktailSerializer.entityToSignedUserResponse(user, cocktail, user.isBookmarked(cocktail.getCocktailId()), user.getRate(cocktail.getCocktailId()));
    }

    private boolean unsigned(String email) {
        return email == null;
    }

    private RateDto.Response calculateCocktailsRate(long cocktailId, int value, User user, Cocktail cocktail) {
        cocktail.rate(value);
        user.putRatedCocktail(cocktailId, value);
        return new RateDto.Response(cocktail.getRatedScore());
    }

    private RateDto.Response reCalculateCocktailsRate(long cocktailId, int value, User user, Cocktail cocktail) {
        int oldValue = user.getRate(cocktailId);
        cocktail.reRate(oldValue, value);
        user.putRatedCocktail(cocktailId, value);
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

    private MultiResponseDto<CocktailDto.SimpleResponse> filterByTagCocktailsSimpleResponse(String email, String tag, Pageable pageable) {
        List<Tag> tags = createTagList(tag);
        Page<Cocktail> cocktailPage = cocktailReadService.readFilteredByTagsCocktails(tags, pageable);
        return createFilteredByTagCockatilsMultiResponseDto(email, tags, cocktailPage);
    }

    private MultiResponseDto<CocktailDto.SimpleResponse> createFilteredByTagCockatilsMultiResponseDto(String email, List<Tag> tags, Page<Cocktail> cocktailPage) {
        List<Cocktail> filteredCocktails = cocktailPage.get()
                .filter(cocktail -> cocktail.containsAll(tags))
                .collect(Collectors.toList());
        List<CocktailDto.SimpleResponse> responses = createSimpleResponses(email, filteredCocktails);
        return new MultiResponseDto<>(responses, cocktailPage);
    }

    private MultiResponseDto<CocktailDto.SimpleResponse> filterByCategoryCocktailsSimpleResponse(String email, String category, Pageable pageable) {
        Category selectedCategory = CategoryMapper.map(category);
        Page<Cocktail> cocktailPage = cocktailReadService.readFilteredByCategoryCocktails(selectedCategory, pageable);
        return cocktailsSimpleResponseDto(email, cocktailPage);
    }

    private MultiResponseDto<CocktailDto.SimpleResponse> filterByTagsAndCategoryCocktails(String email, String category, String tag, Pageable pageable) {
        List<Tag> tags = createTagList(tag);
        Category selectedCategory = CategoryMapper.map(category);
        Page<Cocktail> cocktailPage = cocktailReadService.readFilterByCategoryAndTagsCocktails(selectedCategory, tags, pageable);
        return createFilteredByTagCockatilsMultiResponseDto(email, tags, cocktailPage);
    }

    // tags 때문에 아래랑 겹침 메모장 보고 수정 필요
    private MultiResponseDto<CocktailDto.SimpleResponse> cocktailsSimpleResponseDto(String email, Page<Cocktail> cocktailPage) {
        if (unsigned(email)) {
            List<CocktailDto.SimpleResponse> responses = cocktailPage.stream()
                    .map(cocktail -> CocktailSerializer.entityToSimpleResponse(BOOKMARK_DEFAULT, cocktail))
                    .collect(Collectors.toList());
            return new MultiResponseDto<>(responses, cocktailPage);
        }
        User user = userService.findUserByEmail(email);
        List<CocktailDto.SimpleResponse> responses = cocktailPage.stream()
                .map(cocktail -> CocktailSerializer.entityToSimpleResponse(user.isBookmarked(cocktail.getCocktailId()), cocktail))
                .collect(Collectors.toList());
        return new MultiResponseDto<>(responses, cocktailPage);
    }

    private List<CocktailDto.SimpleResponse> createSimpleResponses(String email, List<Cocktail> cocktails) {
        if (unsigned(email)) {
            return cocktails.stream()
                    .map(cocktail -> CocktailSerializer.entityToSimpleResponse(BOOKMARK_DEFAULT, cocktail))
                    .collect(Collectors.toList());
        }
        User user = userService.findUserByEmail(email);
        return cocktails.stream()
                .map(cocktail -> CocktailSerializer.entityToSimpleResponse(user.isBookmarked(cocktail.getCocktailId()), cocktail))
                .collect(Collectors.toList());
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
