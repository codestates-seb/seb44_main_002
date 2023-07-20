package project.server.domain.cocktail.service;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import project.server.domain.cocktail.embed.category.Category;
import project.server.domain.cocktail.embed.ingredient.IngredientDto;
import project.server.domain.cocktail.embed.ingredient.Ingredients;
import project.server.domain.cocktail.embed.liquor.Liquor;
import project.server.domain.cocktail.embed.rate.Rate;
import project.server.domain.cocktail.embed.recipe.Recipe;
import project.server.domain.cocktail.embed.recipe.RecipeDto;
import project.server.domain.cocktail.embed.tag.Tag;
import project.server.domain.cocktail.embed.tag.Tags;
import project.server.domain.cocktail.entity.Cocktail;
import project.server.domain.cocktail.repository.CocktailRepository;
import project.server.domain.user.User;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class CocktailCreateServiceTest {

    @Mock
    private CocktailRepository cocktailRepository;

    @InjectMocks
    private CocktailCreateService cocktailCreateService;

    @Test
    void createTest(){

        //given
        Cocktail cocktail = createCocktail();
        User user = createUser();

        Cocktail result = createCocktail();
        result.assignUser(user);

        when(cocktailRepository.save(Mockito.any(Cocktail.class)))
                .thenReturn(result);

        //when
        Cocktail savedCocktail = cocktailCreateService.create(user, cocktail);

        //then
        assertThat(result.getCocktailId()).isEqualTo(savedCocktail.getCocktailId());
    }

    private User createUser() {
        User user = new User();
        user.setUserId(1L);
        user.setName("test user");
        user.setEmail("test@email.com");
        user.setPassword("test1234");
        user.setProfileImageUrl("test image url");
        return user;
    }

    private Cocktail createCocktail() {
        RecipeDto.Post process = new RecipeDto.Post();
        process.setProcess("1");
        IngredientDto.Post ingredient = new IngredientDto.Post();
        ingredient.setIngredient("sample");

        return Cocktail.builder()
                .name("test")
                .imageUrl("test image url")
                .recipe(new Recipe(List.of(process)))
                .tags(new Tags(List.of(Tag.BITTER, Tag.FREQUENCY_HIGH)))
                .rate(new Rate())
                .category(Category.CATEGORY1)
                .liquor(Liquor.RUM)
                .ingredients(new Ingredients(List.of(ingredient)))
                .build();
    }
}