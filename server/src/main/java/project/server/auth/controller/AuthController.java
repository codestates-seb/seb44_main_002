package project.server.auth.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.server.auth.jwt.JwtTokenizer;
import project.server.auth.redis.RedisService;
import project.server.exception.BusinessLogicException;
import project.server.exception.ExceptionCode;

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

    @DeleteMapping("/signout")
    public ResponseEntity signout(@RequestHeader("Authorization") String tokenHeader) {
        String token = jwtTokenizer.getTokenFromHeader(tokenHeader);
        if (redisService.isSignedOut(token)) throw new BusinessLogicException(ExceptionCode.USER_INPUT_ERROR);
        redisService.signOut(token);
        return ResponseEntity.ok("Signed out successfully.");
    }
}
