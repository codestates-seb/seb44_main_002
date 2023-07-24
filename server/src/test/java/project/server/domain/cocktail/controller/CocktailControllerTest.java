package project.server.domain.cocktail.controller;

import com.google.gson.Gson;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.test.web.servlet.MockMvc;
import project.server.domain.cocktail.dto.CocktailDto;
import project.server.domain.cocktail.embed.ingredient.IngredientDto;
import project.server.domain.cocktail.embed.rate.RateDto;
import project.server.domain.cocktail.embed.recipe.RecipeDto;
import project.server.domain.cocktail.embed.tag.TagDto;
import project.server.domain.cocktail.service.CocktailService;
import project.server.global.auth.service.AuthManager;
import project.server.global.dto.MultiResponseDto;
import project.server.global.utils.UnsignedPermission;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class CocktailControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private Gson gson;

    @MockBean
    private CocktailService cocktailService;

    @MockBean
    private AuthManager authManager;

    @Test
    void 칵테일_등록_테스트() throws Exception {
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
        dto.setDegree("frequency_high");
        dto.setRecipe(List.of(process1, process2));
        dto.setFlavor(List.of(tag));
        dto.setLiquor("rum");
        dto.setIngredients(List.of(ingredient));
        dto.setImageUrl("sample image url");

        // 가짜 응답 생성
        CocktailDto.Response fakeResponse = CocktailDto.Response.builder()
                .userId(1)
                .userName("test")
                .name("test")
                .imageUrl("test url")
                .liquor("rum")
                .build();

        Authentication authentication = new UsernamePasswordAuthenticationToken("test", "test");
        // SecurityContextHolder에 가짜 authentication 설정
        SecurityContextHolder.getContext().setAuthentication(authentication);

        when(authManager.getEmailFromAuthentication(authentication, false))
                .thenReturn("test@example.com");

        // Mockito를 사용하여 cocktailService의 동작 가짜 구현
        when(cocktailService.createCocktail(authManager.getEmailFromAuthentication(authentication, UnsignedPermission.NOT_PERMIT.get()), new CocktailDto.Post()))
                .thenReturn(fakeResponse);

        String content = gson.toJson(dto);

        // MockMvc를 사용하여 컨트롤러 메서드 호출
        mockMvc.perform(
                        post("/cocktails")
                                .accept(MediaType.APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(content)
                )
                .andExpect(status().isCreated());
    }

    @Test
    void 칵테일_조회_테스트() throws Exception {
        // 가짜 응답 생성
        CocktailDto.Response fakeResponse = CocktailDto.Response.builder()
                .userId(1)
                .userName("test")
                .name("test")
                .imageUrl("test url")
                .liquor("rum")
                .build();

        Authentication authentication = new UsernamePasswordAuthenticationToken("test", "test");
        // SecurityContextHolder에 가짜 authentication 설정
        SecurityContextHolder.getContext().setAuthentication(authentication);

        when(authManager.getEmailFromAuthentication(authentication, false))
                .thenReturn("test@example.com");

        long fakeId = 1L;

        // Mockito를 사용하여 cocktailService의 동작 가짜 구현
        when(cocktailService.readCocktail(authManager.getEmailFromAuthentication(authentication, UnsignedPermission.PERMIT.get()), fakeId))
                .thenReturn(fakeResponse);

        // MockMvc를 사용하여 컨트롤러 메서드 호출
        mockMvc.perform(
                        get("/cocktails/" + fakeId)
                                .accept(MediaType.APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON)
                )
                .andExpect(status().isOk());
    }

    @Test
    void 칵테일_검색_테스트() throws Exception {
        MultiResponseDto fakeResponse = new MultiResponseDto(new ArrayList<>());

        Authentication authentication = new UsernamePasswordAuthenticationToken("test", "test");
        SecurityContextHolder.getContext().setAuthentication(authentication);

        when(authManager.getEmailFromAuthentication(authentication, false))
                .thenReturn("test@example.com");

        when(cocktailService.readFilteredCocktails(authManager.getEmailFromAuthentication(authentication, UnsignedPermission.PERMIT.get()), null, null, null))
                .thenReturn(fakeResponse);

        mockMvc.perform(
                        get("/cocktails/filter")
                                .accept(MediaType.APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON)
                )
                .andExpect(status().isOk());
    }

    @Test
    void 칵테일_수정_테스트() throws Exception {
        CocktailDto.Patch fakePatch = new CocktailDto.Patch();
        CocktailDto.Response fakeResponse = CocktailDto.Response.builder()
                .userId(1)
                .userName("test")
                .name("test")
                .imageUrl("test url")
                .liquor("rum")
                .build();

        Authentication authentication = new UsernamePasswordAuthenticationToken("test", "test");
        SecurityContextHolder.getContext().setAuthentication(authentication);

        when(authManager.getEmailFromAuthentication(authentication, false))
                .thenReturn("test@example.com");

        long fakeId = 1;
        String content = gson.toJson(fakePatch);

        when(cocktailService.updateCocktail(authManager.getEmailFromAuthentication(authentication, UnsignedPermission.NOT_PERMIT.get()), fakeId, new CocktailDto.Patch()))
                .thenReturn(fakeResponse);

        mockMvc.perform(
                        patch("/cocktails/" + fakeId)
                                .accept(MediaType.APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(content)
                )
                .andExpect(status().isAccepted());
    }

    @Test
    void 칵테일_삭제_테스트() throws Exception {
        Authentication authentication = new UsernamePasswordAuthenticationToken("test", "test");
        SecurityContextHolder.getContext().setAuthentication(authentication);

        when(authManager.getEmailFromAuthentication(authentication, false))
                .thenReturn("test@example.com");

        long fakeId = 1;

        mockMvc.perform(
                        delete("/cocktails/" + fakeId)
                                .accept(MediaType.APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON)
                )
                .andExpect(status().isNoContent());
    }

    @Test
    void 칵테일_별점_등록_테스트() throws Exception {
        RateDto.Response fakeResponse = new RateDto.Response(1);

        Authentication authentication = new UsernamePasswordAuthenticationToken("test", "test");
        SecurityContextHolder.getContext().setAuthentication(authentication);
        when(authManager.getEmailFromAuthentication(authentication, false))
                .thenReturn("test@example.com");

        long fakeId = 1;
        int fakeRate = 1;

        when(cocktailService.rateCocktail(authManager.getEmailFromAuthentication(authentication, UnsignedPermission.NOT_PERMIT.get()), fakeId, fakeRate))
                .thenReturn(fakeResponse);

        mockMvc.perform(
                        post("/cocktails/" + fakeId + "/rate?value=" + fakeRate)
                                .accept(MediaType.APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON)
                )
                .andExpect(status().isCreated());
    }

    @Test
    void 무작위_칵테일_조회_테스트() throws Exception {
        CocktailDto.Response fakeResponse = CocktailDto.Response.builder()
                .userId(1)
                .userName("test")
                .name("test")
                .imageUrl("test url")
                .liquor("rum")
                .build();

        Authentication authentication = new UsernamePasswordAuthenticationToken("test", "test");
        SecurityContextHolder.getContext().setAuthentication(authentication);
        when(authManager.getEmailFromAuthentication(authentication, false))
                .thenReturn("test@example.com");

        when(cocktailService.readRandomCocktail(authManager.getEmailFromAuthentication(authentication, UnsignedPermission.PERMIT.get())))
                .thenReturn(fakeResponse);

        mockMvc.perform(
                get("/cocktails/random")
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
        ).andExpect(status().isOk());
    }
}
