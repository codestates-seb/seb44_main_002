package project.server.domain.user;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@Validated
@Slf4j
@RequestMapping("/users")
public class UserController {
    UserService userService;
    UserMapper userMapper;

    public UserController(UserService userService, UserMapper userMapper) {
        this.userService = userService;
        this.userMapper = userMapper;
    }

    @PostMapping("/join")
    public ResponseEntity postUser(@Valid @RequestBody UserDto.post requestBody) {
        User user = userService.createUser(requestBody);
        UserDto.Response response = userMapper.userToUserResponseDto(user);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

}
