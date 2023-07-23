package project.server.global.auth.redis;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import project.server.global.auth.jwt.JwtTokenizer;

import java.util.concurrent.TimeUnit;

@Service
public class RedisService {

    private final JwtTokenizer jwtTokenizer;
    private final RedisTemplate<String, String> redisTemplate;

    public RedisService(JwtTokenizer jwtTokenizer, RedisTemplate<String, String> redisTemplate) {
        this.jwtTokenizer = jwtTokenizer;
        this.redisTemplate = redisTemplate;
    }

    public void signOut(String token, String refreshToken) {
        jwtTokenizer.verifySignature(token, jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey()));
        redisTemplate.opsForValue().set(token, "sign-out");
        redisTemplate.opsForValue().set(refreshToken, "sign-out");
        redisTemplate.expire(token, jwtTokenizer.getAccessTokenExpirationMinutes(), TimeUnit.MINUTES);
        redisTemplate.expire(refreshToken, jwtTokenizer.getRefreshTokenExpirationMinutes(), TimeUnit.MINUTES);
    }

    public boolean isSignedOut(String token) {
        return redisTemplate.hasKey(token);
    }
}
