package cn.xudazhu.bilibili.pagectl;

import cn.xudazhu.bilibili.utils.CookieUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Map;

/**
 * 页面控制 controller
 *
 * @author xudaz
 * @date 2019/2/28
 */
@Controller
public class PageController {


    @GetMapping(value = {"index", "/"})
    public String skipIndex(HttpServletRequest request, HttpServletResponse response) {
        CookieUtils.addCookie4Session(request, response);
        return "index.html";
    }

    @GetMapping("login")
    public String skipLogin1(HttpServletRequest request, HttpServletResponse response) {
        CookieUtils.addCookie4Session(request, response);
        System.out.println(request.getRequestURL());
        return "/login.html";

    }

    @GetMapping("register")
    public String skipRegister1(HttpServletRequest request, HttpServletResponse response) {
        CookieUtils.addCookie4Session(request, response);
        System.out.println(request.getRequestURL());
        return "/register.html";

    }

    @GetMapping(value = {"section", "section.*", "section/*"})
    public String skipSection1(HttpServletRequest request, HttpServletResponse response) {
        CookieUtils.addCookie4Session(request, response);
        System.out.println(request.getRequestURL());
        return "/section.html";

    }

    @GetMapping("user")
    public ModelAndView skipUser1(HttpServletRequest request) {
        String  attr = "account";
        if (request.getSession().getAttribute(attr) == null) {
            StringBuilder url = new StringBuilder("login?url=user?");
            for (Map.Entry<String, String[]> entry : request.getParameterMap().entrySet()) {
                url.append( entry.getKey() ).append( "=" ).append( entry.getValue()[0] );
            }
            return new ModelAndView(new RedirectView(url.toString()));
        }
        System.out.println(request.getRequestURL());
        return new ModelAndView("/user.html");

    }

    @GetMapping(value = {"video" , "video.*"})
    public String skipVideo1(HttpServletRequest request, HttpServletResponse response) {
        CookieUtils.addCookie4Session(request, response);
        System.out.println(request.getRequestURL());
        return "/video1.html";

    }

    @GetMapping("syn_cookie")
    public String synCookie(HttpServletRequest request, HttpServletResponse response) {
        CookieUtils.addCookie4Session(request, response);
        System.out.println(request.getRequestURL());
        return "/syn_cookie.html";

    }


}
