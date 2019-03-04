package cn.xudazhu.bilibili;

import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.web.servlet.MultipartAutoConfiguration;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
/**
 * 由ide 自动生成
 * @author xudaz
 * @date  2019/2/28 2:29
 */
@EnableAutoConfiguration(exclude = {MultipartAutoConfiguration.class})
public class ServletInitializer extends SpringBootServletInitializer {

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(BilibiliApplication.class);
    }

}
