package cn.xudazhu.bilibili;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.web.servlet.MultipartAutoConfiguration;
import org.springframework.session.data.redis.config.annotation.web.http.EnableRedisHttpSession;

/**
 * 由ide 自动生成
 * @author xudaz
 * @date  2019/2/28 2:29
 *
 * EnableRedisHttpSession 开启使用redis接管session
 */
@EnableRedisHttpSession(maxInactiveIntervalInSeconds = 64800)
@SpringBootApplication
public class BilibiliApplication {

    public static void main(String[] args) {
        SpringApplication.run(BilibiliApplication.class, args);
    }

}
