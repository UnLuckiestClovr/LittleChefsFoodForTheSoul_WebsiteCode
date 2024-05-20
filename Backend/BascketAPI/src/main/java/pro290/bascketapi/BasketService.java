/**
 * @author Kenneth
 * @createdOn 2024/05/20 at 9:25
 * @projectName BascketAPI
 * @packageName pro290.bascketapi;
 */

package pro290.bascketapi;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import java.util.UUID;

@Service
public class BasketService {

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    private static final String KEY_PREFIX = "Basket:";

    public void saveBasket(Basket basket) {
        String key = KEY_PREFIX + basket.getBID().toString();
        redisTemplate.opsForValue().set(key, basket);
    }

    public Basket getBasket(UUID id) {
        String key = KEY_PREFIX + id.toString();
        return (Basket) redisTemplate.opsForValue().get(key);
    }
}
