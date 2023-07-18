package project.server.auth.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import org.springframework.stereotype.Service;
import project.server.auth.jwt.JwtTokenizer;
import project.server.auth.redis.RedisService;
import project.server.domain.user.User;
import project.server.domain.user.UserService;
import project.server.exception.BusinessLogicException;
import project.server.exception.ExceptionCode;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class AuthService {

    private final RedisService redisService;
    private final UserService userService;
    private final JwtTokenizer jwtTokenizer;

    public AuthService(RedisService redisService, UserService userService, JwtTokenizer jwtTokenizer) {
        this.redisService = redisService;
        this.userService = userService;
        this.jwtTokenizer = jwtTokenizer;
    }


    public void signOut(String tokenHeader, String refreshToken) {
        String token = jwtTokenizer.getTokenFromHeader(tokenHeader);
        if (redisService.isSignedOut(token)) throw new BusinessLogicException(ExceptionCode.USER_INPUT_ERROR);
        redisService.signOut(token, refreshToken);
    }

    public String reissue(String refreshToken) {
        if (redisService.isSignedOut(refreshToken)) throw new BusinessLogicException(ExceptionCode.TOKEN_EXPIRED);
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
        Jws<Claims> claims = jwtTokenizer.getClaims(refreshToken, base64EncodedSecretKey);

        String subject = claims.getBody().getSubject();
        User user = userService.findUserByEmail(subject);

        Map<String, Object> userClaims = new HashMap<>();
        userClaims.put("email", user.getEmail());
        userClaims.put("roles", user.getRoles());

        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());

        return "Bearer " + jwtTokenizer.generateAccessToken(userClaims, subject, expiration, base64EncodedSecretKey);
    }
}
