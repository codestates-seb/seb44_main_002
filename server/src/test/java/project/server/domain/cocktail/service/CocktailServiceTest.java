package project.server.domain.cocktail.service;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import project.server.domain.cocktail.dto.CocktailDto;
import project.server.domain.cocktail.embed.ingredient.IngredientDto;
import project.server.domain.cocktail.embed.recipe.RecipeDto;
import project.server.domain.cocktail.embed.tag.TagDto;
import project.server.domain.cocktail.entity.Cocktail;
import project.server.domain.cocktail.utils.CocktailDeserializer;
import project.server.domain.cocktail.utils.CocktailSerializer;
import project.server.domain.user.User;
import project.server.domain.user.UserService;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class CocktailServiceTest {

    @Mock
    private CocktailCreateService cocktailCreateService;

    @Mock
    private CocktailReadService cocktailReadService;

    @Mock
    private CocktailUpdateService cocktailUpdateService;

    @Mock
    private CocktailDeleteService cocktailDeleteService;

    @Mock
    private CocktailSerializer cocktailSerializer;

    @Mock
    private CocktailDeserializer cocktailDeserializer;

    @Mock
    private UserService userService;

    @InjectMocks
    private CocktailService cocktailService;

    @Test
    void createCocktailTest() {
        // given
        String email = "test@example.com";
        CocktailDto.Post dto = createPostDto();

        User user = mock(User.class);
        Cocktail cocktail = mock(Cocktail.class);
//        Tags tags = mock(Tags.class);
        Cocktail savedCocktail = mock(Cocktail.class);

        when(userService.findUserByEmail(email)).thenReturn(user);
        when(cocktailDeserializer.postDtoToEntity(dto)).thenReturn(cocktail);
        when(cocktailCreateService.create(user, cocktail)).thenReturn(savedCocktail);
//        when(savedCocktail.getTags()).thenReturn(tags);
        when(savedCocktail.getCocktailId()).thenReturn(1L);
        when(user.getRate(savedCocktail.getCocktailId())).thenReturn(0);
        when(user.getUserId()).thenReturn(1L);

        CocktailDto.Response response = CocktailDto.Response.builder()
                .userId(user.getUserId())
                .cocktailId(savedCocktail.getCocktailId())
                .isBookmarked(false)
                .build();

        when(cocktailSerializer.entityToSignedUserResponse(user, savedCocktail, false, user.getRate(savedCocktail.getCocktailId())))
                .thenReturn(response);

        // when
        CocktailDto.Response result = cocktailService.createCocktail(email, dto);

        // then
        assertThat(user.getUserId()).isEqualTo(result.getUserId());
        assertThat(savedCocktail.getCocktailId()).isEqualTo(result.getCocktailId());
        assertThat(result.isBookmarked()).isEqualTo(false);
        assertThat(result.getRating()).isEqualTo(user.getRate(savedCocktail.getCocktailId()));

        verify(userService).findUserByEmail(email);
        verify(cocktailCreateService).create(user, cocktail);
    }

    private CocktailDto.Post createPostDto() {
        RecipeDto.Post process1 = new RecipeDto.Post();
        process1.setProcess("1");
        RecipeDto.Post process2 = new RecipeDto.Post();
        process2.setProcess("2");
        TagDto.Post tag = new TagDto.Post();
        tag.setTag("sweet");
        IngredientDto.Post ingredient = new IngredientDto.Post();
        ingredient.setIngredient("milk");

        CocktailDto.Post dto = new CocktailDto.Post();
        dto.setName("test");
        dto.setImageUrl("sample image url");
        dto.setLiquor("rum");
        dto.setIngredients(List.of(ingredient));
        dto.setRecipe(List.of(process1, process2));
        dto.setDegree("frequency_high");
        dto.setFlavor(List.of(tag));
        return dto;
    }
}