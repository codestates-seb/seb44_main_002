package project.server.global.auth.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import project.server.global.auth.service.AuthService;

@RestController
@Slf4j
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @DeleteMapping("/signout")
    public ResponseEntity signOut(@RequestHeader("Authorization") String tokenHeader,
                                  @RequestHeader("Refresh") String refreshToken ) {
        authService.signOut(tokenHeader, refreshToken);
        log.info("# sign out");
        return ResponseEntity.ok("Signed out successfully.");
    }


    @PostMapping("/reissue")
    public ResponseEntity reissue(@RequestHeader("refresh") String refreshToken) {
        String accessToken = authService.reissue(refreshToken);

        return ResponseEntity.ok().header("Authorization",accessToken).build();
    }
}
