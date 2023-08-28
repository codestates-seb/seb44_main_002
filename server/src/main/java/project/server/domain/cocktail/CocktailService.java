package project.server.domain.cocktail;

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
import project.server.domain.cocktail.service.CocktailCommandService;
import project.server.domain.cocktail.service.CocktailQueryService;
import project.server.domain.cocktail.utils.CocktailConverter;
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

    private static final String SEPARATOR = ",";
    private static final int MAX_RATE_VALUE = 5;
    private static final int MIN_RATE_VALUE = 1;
    private static final boolean BOOKMARK_DEFAULT = false;

    private final CocktailCommandService cocktailCommandService;
    private final CocktailQueryService cocktailQueryService;
    private final CocktailConverter cocktailConverter;
    private final UserService userService;

    public CocktailService(CocktailQueryService cocktailQueryService, CocktailCommandService cocktailCommandService, CocktailConverter cocktailConverter, UserService userService) {
        this.cocktailCommandService = cocktailCommandService;
        this.cocktailQueryService = cocktailQueryService;
        this.cocktailConverter = cocktailConverter;
        this.userService = userService;
    }

    public CocktailDto.Response createCocktail(String email, CocktailDto.Post dto) {
        User user = userService.findUserByEmail(email);
        Cocktail cocktail = cocktailConverter.convertPostDtoToEntity(dto);
        Cocktail savedCocktail = cocktailCommandService.create(user, cocktail);
        log.info("# userId : {}, cocktailId : {}, cocktailName : {} CocktailService#createCocktail 성공", user.getUserId(), savedCocktail.getCocktailId(), savedCocktail.getName());
        savedCocktail.assignRecommends(cocktailQueryService.readDetailPageRecommendCocktails(savedCocktail.getTags(), savedCocktail.getCocktailId()));
        return cocktailConverter.convertEntityToSignedUserResponseDto(user, savedCocktail, user.getRate(savedCocktail.getCocktailId()));
    }

    public CocktailDto.Response readCocktail(String email, long cocktailId) {
        Cocktail cocktail = cocktailQueryService.readCocktail(cocktailId);
        cocktail.assignRecommends(cocktailQueryService.readDetailPageRecommendCocktails(cocktail.getTags(), cocktail.getCocktailId()));
        cocktail.incrementViewCount();
        if (unsigned(email)) {
            log.info("# cocktailId : {} CocktailService#readCocktail 성공", cocktailId);
            return cocktailConverter.convertEntityToUnsignedResponseDto(cocktail);
        }
        User user = userService.findUserByEmail(email);
        log.info("# userId : {}, cocktailId : {} CocktailService#readCocktail 성공", user.getUserId(), cocktailId);
        return cocktailConverter.convertEntityToSignedUserResponseDto(user, cocktail, user.getRate(cocktailId));
    }

    public MultiResponseDto readFilteredCocktails(String email, String category, String tag, String sortValue) {
        Sort sort = setSort(sortValue);
        if (isNotSelectCategoryAndTag(category, tag)) {
            List<Cocktail> cocktails = cocktailQueryService.readAllCocktails(sort);
            log.info("# CocktailService#readFilterdCocktails 성공");
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
        Cocktail cocktail = cocktailQueryService.readCocktail(cocktailId);
        verifyUser(user, cocktail);
        cocktailCommandService.modify(cocktail, patch);
        log.info("# cocktailId : {} CocktailService#updateCocktail 성공", cocktailId);
        cocktail.assignRecommends(cocktailQueryService.readDetailPageRecommendCocktails(cocktail.getTags(), cocktail.getCocktailId()));
        return cocktailConverter.convertEntityToSignedUserResponseDto(user, cocktail, user.getRate(cocktailId));
    }

    public void deleteCocktail(String email, long cocktailId) {
        User user = userService.findUserByEmail(email);
        Cocktail cocktail = cocktailQueryService.readCocktail(cocktailId);
        verifyUser(user, cocktail);
        cocktailCommandService.delete(cocktail);
        log.info("# cocktailId : {} CocktailService#deleteCocktail", cocktailId);
    }

    public RateDto.Response rateCocktail(String email, long cocktailId, int value) {
        verifyRateValue(value);
        User user = userService.findUserByEmail(email);
        Cocktail cocktail = cocktailQueryService.readCocktail(cocktailId);
        if (user.isAlreadyRated(cocktailId)) {
            return reCalculateCocktailsRate(cocktailId, value, user, cocktail);
        }
        return calculateCocktailRate(cocktailId, value, user, cocktail);
    }

    public CocktailDto.Response readRandomCocktail(String email) {
        Cocktail cocktail = cocktailQueryService.readRandomCocktail();
        if(unsigned(email)){
            log.info("# CocktailService#readRandomCocktail 성공");
            return cocktailConverter.convertEntityToUnsignedResponseDto(cocktail);
        }
        User user = userService.findUserByEmail(email);
        log.info("# userId : {} CocktailService#readRandomCocktail 성공", user.getUserId());
        return cocktailConverter.convertEntityToSignedUserResponseDto(user, cocktail, user.getRate(cocktail.getCocktailId()));
    }

    private boolean unsigned(String email) {
        return email == null;
    }

    private RateDto.Response calculateCocktailRate(long cocktailId, int value, User user, Cocktail cocktail) {
        cocktail.rate(value);
        user.putRatedCocktail(cocktailId, value);
        log.info("# userId : {} cocktailId : {}, value : {} CocktailService#calculateCocktailRate 성공", user.getUserId(), cocktail, value);
        return new RateDto.Response(cocktail.getRatedScore());
    }

    private RateDto.Response reCalculateCocktailsRate(long cocktailId, int value, User user, Cocktail cocktail) {
        int oldValue = user.getRate(cocktailId);
        cocktail.reRate(oldValue, value);
        user.putRatedCocktail(cocktailId, value);
        log.info("# userId : {} cocktailId : {}, value : {} CocktailService#reCalculateCocktailRate 성공", user.getUserId(), cocktail, value);
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
        List<Cocktail> cocktails = cocktailQueryService.readFilteredByTagsCocktails(tags,sort);
        log.info("# tag : {} CocktailService#filterByTagCocktailsSimpleResponse 성공", tag);
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
        List<Cocktail> cocktails = cocktailQueryService.readFilteredByCategoryCocktails(selectedCategory, sort);
        log.info("# category : {} CocktailService#filterByCategoryCocktailsSimpleResponse 성공", category);
        return createCocktailsSimpleMultiResponseDtos(email, cocktails);
    }

    private MultiResponseDto<CocktailDto.SimpleResponse> filterByTagsAndCategoryCocktails(String email, String category, String tag, Sort sort) {
        List<Tag> tags = createTagList(tag);
        Category selectedCategory = CategoryMapper.map(category);
        List<Cocktail> cocktails = cocktailQueryService.readFilterByCategoryAndTagsCocktails(selectedCategory, tags, sort);
        log.info("# tag : {}, category : {} CocktailService#filterByTagsAndCategoryCocktails성공", tag, category);
        return createFilteredByTagCockatilsMultiResponseDto(email, tags, cocktails);
    }

    private MultiResponseDto<CocktailDto.SimpleResponse> createCocktailsSimpleMultiResponseDtos(String email, List<Cocktail> cocktails) {
        if (unsigned(email)) {
            List<CocktailDto.SimpleResponse> responses = cocktails.stream()
                    .map(cocktail -> cocktailConverter.convertEntityToSimpleResponseDto(BOOKMARK_DEFAULT, cocktail))
                    .collect(Collectors.toList());
            return new MultiResponseDto<>(responses);
        }
        User user = userService.findUserByEmail(email);
        List<CocktailDto.SimpleResponse> responses = cocktails.stream()
                .map(cocktail -> cocktailConverter.convertEntityToSimpleResponseDto(user.isBookmarked(cocktail.getCocktailId()), cocktail))
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
