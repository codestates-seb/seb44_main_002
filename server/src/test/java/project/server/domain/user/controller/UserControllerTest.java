package project.server.domain.user.controller;


import com.google.gson.Gson;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.mockito.InjectMocks;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import project.server.domain.user.dto.UserDto;
import project.server.domain.user.entity.User;
import project.server.domain.user.service.UserService;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@ActiveProfiles(profiles = "server")
public class UserControllerTest {

    @MockBean
    private UserService userService;

    @InjectMocks
    private UserController userController;

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private Gson gson;

//    @BeforeAll
//    void createUser(){
//        UserDto.Post post = new UserDto.Post();
//        post.setName("1");
//        post.setPassword("1234");
//        post.setAge(30);
//        post.setGender("mail");
//        post.setEmail("11@11.com");
//        userService.createUser(post);
//    }

    @Test
    public void testPostUser() throws Exception {
        //give
        UserDto.Post requestBody = new UserDto.Post();
        requestBody.setEmail("postTest@gmail.com");
        requestBody.setPassword("test");
        requestBody.setName("test");
        requestBody.setGender("male");
        requestBody.setAge(24);

        String content = gson.toJson(requestBody);


        UserDto.Response response = UserDto.Response.builder()
                .userId(1L)
                .name(requestBody.getName())
                .profileImageUrl("")
                .gender(requestBody.getGender())
                .age(requestBody.getAge())
                .email(requestBody.getEmail())
                .subscriberCount(0L)
                .build();

        when(userService.createUser(any(UserDto.Post.class))).thenReturn(response);

        //when
        ResultActions result =
                mockMvc.perform(
                        post("/users/signup")
                                .accept(MediaType.APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(content)
                );

        //then
        result
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.email").value(requestBody.getEmail()));
    }

    @Test
    @WithMockUser
    public void testPatchUser() throws Exception {
        //give
        UserDto.Patch requestBody = new UserDto.Patch();
        requestBody.setPassword("patchpassword");

        UserDto.Response updatedUser = UserDto.Response.builder()
                .build();

        String content = gson.toJson(requestBody);

        when(userService.updateUser(any(UserDto.Patch.class), anyLong(), anyString())).thenReturn(updatedUser);

        //when
        ResultActions result =
                mockMvc.perform(
                        patch("/users/1")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(content)
                                .principal(mock(Authentication.class))
                );

        //then
        result
                .andExpect(status().isOk());
    }

    @Test
    public void testGetUser() throws Exception {
        //give
        User user = new User();
        user.setUserId(1L);
        user.setName("태양");
        user.setEmail("pxodid2000@gmail.com");
        user.setGender("male");
        user.setAge(24);

        when(userService.findUserByUserId(anyLong())).thenReturn(user);

        //when
        ResultActions result =
                mockMvc.perform(
                        get("/users/1")
                                .accept(MediaType.APPLICATION_JSON)
                );

        //then
        result
                .andExpect(status().isOk());
    }

    @Test
    @WithMockUser
    public void testDeleteUser() throws Exception {
        // Perform the request and validate the response
        ResultActions result =
                mockMvc.perform(
                        delete("/users/1"));

        result.andExpect(status().isNoContent());
    }
}
