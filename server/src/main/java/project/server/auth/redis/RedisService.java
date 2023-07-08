package project.server.auth.redis;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

@Service
public class RedisService {
    private final RedisTemplate<String, String> redisTemplate;

    public RedisService(RedisTemplate<String, String> redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    public void signOut(String token) {
        redisTemplate.opsForValue().set(token, "sign-out");
    }

    public boolean isSignedOut(String token) {
        return redisTemplate.hasKey(token);
    }

    public void deleteToken(String token) {
        redisTemplate.delete(token);
    }
}
