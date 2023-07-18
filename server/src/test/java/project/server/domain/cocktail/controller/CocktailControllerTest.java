package project.server.domain.cocktail.controller;

import com.google.gson.Gson;
import org.hamcrest.Matchers;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithAnonymousUser;
import org.springframework.security.test.context.support.WithUserDetails;
import org.springframework.test.web.servlet.MockMvc;
import project.server.domain.bookmark.service.BookmarkService;
import project.server.domain.cocktail.dto.CocktailDto;
import project.server.domain.cocktail.embed.ingredient.IngredientDto;
import project.server.domain.cocktail.embed.recipe.RecipeDto;
import project.server.domain.cocktail.embed.tag.TagDto;
import project.server.domain.user.UserDto;
import project.server.domain.user.UserService;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
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

    @Autowired
    private BookmarkService bookmarkService;

    @BeforeAll
    void createUser() {
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
        RecipeDto.Post process1 = new RecipeDto.Post();
        process1.setProcess("1");
        RecipeDto.Post process2 = new RecipeDto.Post();
        process2.setProcess("2");
        TagDto.Post tag = new TagDto.Post();
        tag.setTag("sweet");
        IngredientDto.Post ingredient = new IngredientDto.Post();
        ingredient.setIngredient("milk");

        CocktailDto.Post post = new CocktailDto.Post();
        post.setName("test");
        post.setDegree("frequency_high");
        post.setRecipe(List.of(process1, process2));
        post.setFlavor(List.of(tag));
        post.setLiquor("rum");
        post.setIngredients(List.of(ingredient));
        post.setImageUrl("sample image url");

        String content = gson.toJson(post);

        mockMvc.perform(
                post("/cocktails")
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content)
        ).andExpect(status().isCreated())
                .andExpect(jsonPath("$.name").value("test"))
                .andExpect(jsonPath("$.userName").value("1"))
                .andExpect(jsonPath("$.recipe[*].process").value(Matchers.contains("1", "2")))
                .andExpect(jsonPath("$.ingredients[0].ingredient").value("우유"))
                .andExpect(jsonPath("$.liquor").value("럼"))
                .andExpect(jsonPath("$.tags[*].tag").value(Matchers.contains("# 단맛", "# 도수 높음")))
                .andExpect(jsonPath("$.imageUrl").value("sample image url"));

    }

    @Test
    @WithAnonymousUser
    void 로그인_하지_않은_사용자_칵테일_조회_테스트() throws Exception {
        mockMvc.perform(
                        get("/cocktails/1")
                                .accept(MediaType.APPLICATION_JSON)
                ).andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("test1"))
                .andExpect(jsonPath("$.bookmarked").value("false"));
    }

    @Test
    @WithUserDetails(value = "11@11.com", userDetailsServiceBeanName = "detailsService")
    void 로그인한_사용자의_북마크_이후_칵테일_조회_테스트() throws Exception {
        bookmarkService.createBookmark("11@11.com", 1L);

        mockMvc.perform(
                        get("/cocktails/1")
                                .accept(MediaType.APPLICATION_JSON)
                ).andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("test1"))
                .andExpect(jsonPath("$.bookmarked").value("true"));
    }

    @Test
    @WithAnonymousUser
    void 칵테일_검색_테스트() throws Exception {
        RecipeDto.Post process1 = new RecipeDto.Post();
        process1.setProcess("1");
        RecipeDto.Post process2 = new RecipeDto.Post();
        process2.setProcess("2");
        TagDto.Post tag = new TagDto.Post();
        tag.setTag("sweet");
        IngredientDto.Post ingredient = new IngredientDto.Post();
        ingredient.setIngredient("milk");

        CocktailDto.Post post = new CocktailDto.Post();
        post.setName("test");
        post.setDegree("frequency_high");
        post.setRecipe(List.of(process1, process2));
        post.setFlavor(List.of(tag));
        post.setLiquor("rum");
        post.setIngredients(List.of(ingredient));
        post.setImageUrl("sample image url");

        String content = gson.toJson(post);

        mockMvc.perform(
                post("/cocktails")
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content)
        );

        mockMvc.perform(
                get("/cocktails/random")
                        .accept(MediaType.APPLICATION_JSON)
        ).andExpect(status().isOk());
    }

    // app configure 삭제하면 새롭게 칵테일 등록 로직 작성 후 테스트 고쳐야함.
    @Test
    @WithAnonymousUser
    void 랜덤_칵테일_조회_테스트() throws Exception {
        mockMvc.perform(
                        get("/cocktails/random")
                                .accept(MediaType.APPLICATION_JSON)
                ).andExpect(status().isOk());
//                .andExpect(jsonPath("$.name").value("test1"))
//                .andExpect(jsonPath("$.bookmarked").value("false"));
    }

    @Test
    @WithUserDetails(value = "11@11.com", userDetailsServiceBeanName = "detailsService")
    void 칵테일_별점_등록_테스트() throws Exception {
        mockMvc.perform(
                post("/cocktails/1/rate?value=3")
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
        ).andExpect(status().isCreated())
                .andExpect(jsonPath("$.rating").value(3.0));
    }
}