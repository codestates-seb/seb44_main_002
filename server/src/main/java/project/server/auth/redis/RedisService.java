package project.server.auth.redis;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import project.server.auth.jwt.JwtTokenizer;

import java.util.concurrent.TimeUnit;

@Service
public class RedisService {

    private final JwtTokenizer jwtTokenizer;
    private final RedisTemplate<String, String> redisTemplate;

    public RedisService(JwtTokenizer jwtTokenizer, RedisTemplate<String, String> redisTemplate) {
        this.jwtTokenizer = jwtTokenizer;
        this.redisTemplate = redisTemplate;
    }

    public void signOut(String token) {
        jwtTokenizer.verifySignature(token, jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey()));
        redisTemplate.opsForValue().set(token, "sign-out");
        redisTemplate.expire(token, jwtTokenizer.getAccessTokenExpirationMinutes(), TimeUnit.MINUTES);
    }

    public boolean isSignedOut(String token) {
        return redisTemplate.hasKey(token);
    }
}
