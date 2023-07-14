package project.server;


import com.google.gson.Gson;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import project.server.domain.user.UserController;
import project.server.domain.user.UserDto;
import project.server.domain.user.UserService;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles(profiles = "server")
public class UserControllerTest {

    @Mock
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

        //when
        when(userService.createUser(any(UserDto.post.class))).thenReturn(response);


        ResultActions result =
                mockMvc.perform(
                        post("/users/signup")
                                .accept(MediaType.APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(content)
                );

        result
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.email").value(requestBody.getEmail()));
    }
}
