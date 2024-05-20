package pro290.bascketapi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.redis.repository.configuration.EnableRedisRepositories;


@SpringBootApplication
@EnableRedisRepositories
public class BascketApiApplication
{
    public static void main(String[] args) {
        SpringApplication.run(BascketApiApplication.class, args);
    }
}
