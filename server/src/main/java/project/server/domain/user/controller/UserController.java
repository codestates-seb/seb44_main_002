package project.server.domain.user.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import project.server.global.auth.service.AuthManager;
import project.server.domain.user.dto.UserDto;
import project.server.domain.user.service.UserService;
import project.server.global.utils.UnsignedPermission;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

@RestController
@Validated
@Slf4j
@RequestMapping("/users")
public class UserController {
    private final UserService userService;
    private final AuthManager authManager;

    public UserController(UserService userService, AuthManager authManager) {
        this.userService = userService;
        this.authManager = authManager;
    }

    @PostMapping("/signup")
    public ResponseEntity postUser(@Valid @RequestBody UserDto.Post requestBody) {
        UserDto.Response response = userService.createUser(requestBody);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/{user-id}")
    public ResponseEntity getUser(Authentication authentication,
                                  @PathVariable("user-id") @Positive long userId) {
        log.info("# 유저 조회");
        String email = authManager.getEmailFromAuthentication(authentication, UnsignedPermission.PERMIT.get());
        UserDto.Response response = userService.getUser(email, userId);
        log.info("# 유저 조회 완료");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PatchMapping("/{user-id}")
    public ResponseEntity patchUser(@PathVariable("user-id") @Positive long userId,
                                    @Valid @RequestBody UserDto.Patch requestBody,
                                    Authentication authentication) {
        String email = authManager.getEmailFromAuthentication(authentication, UnsignedPermission.NOT_PERMIT.get());
        UserDto.Response response = userService.updateUser(requestBody, userId, email);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping("/{user-id}")
    public ResponseEntity deleteUser(Authentication authentication,
                                     @PathVariable("user-id") @Positive long userId) {
        String email = authManager.getEmailFromAuthentication(authentication, UnsignedPermission.NOT_PERMIT.get());
        userService.deleteUser(userId,email);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
