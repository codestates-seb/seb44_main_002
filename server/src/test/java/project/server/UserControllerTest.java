package project.server;


import com.google.gson.Gson;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import project.server.domain.user.UserController;
import project.server.domain.user.UserDto;
import project.server.domain.user.User;
import project.server.domain.user.UserService;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
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

    @Test
    public void testPostUser() throws Exception {
        //give
        UserDto.post requestBody = new UserDto.post();
        requestBody.setEmail("pxodid2000@gmail.com");
        requestBody.setPassword("password1");
        requestBody.setName("태양");
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

        when(userService.createUser(any(UserDto.post.class))).thenReturn(response);

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
    public void testGetUser() throws Exception {
        //give
        User user = new User();
        user.setUserId(1L);
        user.setName("태양");
        user.setEmail("pxodid2000@gmail.com");
        user.setGender("male");
        user.setAge(24);

        when(userService.findUser(anyLong())).thenReturn(user);

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
    public void testDeleteUser() throws Exception {
        // Perform the request and validate the response
        ResultActions result =
                mockMvc.perform(
                        delete("/users/1"));

        result.andExpect(status().isNoContent());
    }
}
