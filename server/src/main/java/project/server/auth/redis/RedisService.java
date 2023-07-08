package project.server.auth.redis;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import project.server.auth.jwt.JwtTokenizer;

import java.util.concurrent.TimeUnit;

@Service
public class RedisService {

    @Getter
    @Value("${jwt.access-token-expiration-minutes}")
    private long accessTokenExpirationMinutes;

    private final JwtTokenizer jwtTokenizer;
    private final RedisTemplate<String, String> redisTemplate;

    public RedisService(JwtTokenizer jwtTokenizer, RedisTemplate<String, String> redisTemplate) {
        this.jwtTokenizer = jwtTokenizer;
        this.redisTemplate = redisTemplate;
    }

    public void signOut(String token) {
        jwtTokenizer.verifySignature(token, jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey()));
        redisTemplate.opsForValue().set(token, "sign-out");
        redisTemplate.expire(token, getAccessTokenExpirationMinutes(), TimeUnit.MINUTES);
    }

    public boolean isSignedOut(String token) {
        return redisTemplate.hasKey(token);
    }

    public void deleteToken(String token) {
        redisTemplate.delete(token);
    }
}
