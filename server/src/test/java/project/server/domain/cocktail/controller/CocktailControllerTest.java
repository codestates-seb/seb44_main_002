package project.server.domain.cocktail.controller;

import com.google.gson.Gson;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithAnonymousUser;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.security.test.context.support.WithUserDetails;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import project.server.domain.cocktail.dto.CocktailDto;
import project.server.domain.cocktail.embed.ingredient.IngredientDto;
import project.server.domain.cocktail.embed.recipe.RecipeDto;
import project.server.domain.cocktail.embed.tag.TagDto;
import project.server.domain.user.UserDto;
import project.server.domain.user.UserService;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class CocktailControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private Gson gson;

    @Autowired
    private UserService userService;

    @BeforeAll
    void createUser(){
        UserDto.Post post = new UserDto.Post();
        post.setName("1");
        post.setPassword("1234");
        post.setAge(30);
        post.setGender("mail");
        post.setEmail("11@11.com");
        userService.createUser(post);
    }

    @Test
    @DisplayName("칵테일 등록 컨트롤러 테스트")
    @WithUserDetails(value = "11@11.com", userDetailsServiceBeanName = "detailsService")
    void 칵테일_등록_테스트() throws Exception {
        RecipeDto.Post recipe = new RecipeDto.Post();
        recipe.setProcess("1");
        TagDto.Post tag = new TagDto.Post();
        tag.setTag("sweet");
        IngredientDto.Post ingredient = new IngredientDto.Post();
        ingredient.setIngredient("milk");

        CocktailDto.Post post = new CocktailDto.Post();
        post.setName("test");
        post.setDegree("frequency_high");
        post.setRecipe(List.of(recipe));
        post.setFlavor(List.of(tag));
        post.setLiquor("rum");
        post.setIngredients(List.of(ingredient));
        post.setImageUrl("sample image url");

        String content = gson.toJson(post);

        ResultActions actions =
                mockMvc.perform(
                        post("/cocktails")
                                .accept(MediaType.APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(content)
                );

        actions.andExpect(status().isCreated());
    }
}