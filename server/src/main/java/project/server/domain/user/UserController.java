package project.server.domain.user;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

@RestController
@Validated
@Slf4j
@RequestMapping("/users")
public class UserController {
    UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/signup")
    public ResponseEntity postUser(@Valid @RequestBody UserDto.post requestBody) {
        UserDto.Response response = userService.createUser(requestBody);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/{user-id}")
    public ResponseEntity getUser(@PathVariable("user-id") @Positive long userId) {
        User user = userService.findUser(userId);
        return new ResponseEntity<>(user.entityToResponse(), HttpStatus.OK);
    }

    @PatchMapping("/{user-id}")
    public ResponseEntity patchUser(@PathVariable("user-id") @Positive long userId,
                                    @Valid @RequestBody UserDto.Patch requestBody) {
        User user = userService.updateUser(requestBody, userId);
        return new ResponseEntity<>(user.entityToResponse(), HttpStatus.OK);
    }

    @DeleteMapping("/{user-id}")
    public ResponseEntity deleteUser(@PathVariable("user-id") @Positive long userId) {
        userService.deleteUser(userId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}