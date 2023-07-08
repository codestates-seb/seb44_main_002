package project.server.auth.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import project.server.auth.jwt.JwtTokenizer;
import project.server.auth.redis.RedisService;

@RestController
@Slf4j
@RequestMapping("/auth")
public class AuthController {
    private final RedisService redisService;
    private final JwtTokenizer jwtTokenizer;

    public AuthController(RedisService redisService, JwtTokenizer jwtTokenizer) {
        this.redisService = redisService;
        this.jwtTokenizer = jwtTokenizer;
    }

    @PostMapping("/signout")
    public ResponseEntity signout(@RequestHeader("Authorization") String tokenHeader) {
        String token = jwtTokenizer.getTokenFromHeader(tokenHeader);
        redisService.signOut(token);
        return ResponseEntity.ok("Signed out successfully.");
    }

}
