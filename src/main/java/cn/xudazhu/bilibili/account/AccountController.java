package cn.xudazhu.bilibili.account;


import cn.xudazhu.bilibili.utils.CookieUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *  AccountController
 * @author xudaz
 * @date  2019/2/28
 */
@RestController
@RequestMapping("c_account")
public class AccountController {

    /**
     * accountService property
     */
    private AccountService accountService;

    /**
     * 注入accountService
     * @param accountService accountService
     */
    @Autowired
    public  void setAccountService(AccountService accountService) {
        this.accountService = accountService;
    }

    /**
     * 检查邮箱是否已被注册的请求 直接返回是否能使用的文字
     * @param email  所检测的邮箱
     * @return 邮箱已被注册 or 可以使用
     */
    @GetMapping("check")
    public String hasAccount ( @RequestParam("email") String email) {
        try {
            Boolean hasAccount = accountService.hasAccount(email);
            if (hasAccount) {
                System.out.println("GetUser = " + "邮箱已被注册");
                return "邮箱已被注册";
            } else {
                System.out.println("可以使用");
                return "可以使用";
            }
        } catch (Exception e) {
            e.printStackTrace();
            return "";
        }
    }

    /**
     * 登陆请求
     * @param accountBean email passwod 所自动包装的accountBean
     * @param request  HttpServletRequest
     * @param response  HttpServletResponse
     * @return  true or false
     */
    @PostMapping("login")
    public String login ( AccountBean accountBean , HttpServletRequest request , HttpServletResponse response ) {
        try {
            AccountBean loginAccountBean = accountService.login(accountBean);
            if (loginAccountBean != null) {
                System.out.println(loginAccountBean.getId() + "号用户登陆");
                request.getSession().setAttribute("account", loginAccountBean);
                Cookie cookie2 = CookieUtils.getCookie(request, "SESSION");
                assert cookie2 != null;
                System.out.println(" cookie  = " + cookie2.getName() + " : " + cookie2.getValue());
                Cookie cookie = new Cookie("EASY-SESSION", cookie2.getValue());
                cookie.setMaxAge(60 * 60 * 24 * 100);
                response.addCookie(cookie);
                return "true";
            } else {
                return "false";
            }
        } catch (Exception e) {
            e.printStackTrace();
            return "false";
        }
    }

    /**
     * 登出请求
     * @param request HttpServletRequest
     * @return message
     */
    @PostMapping("logout")
    public String logout ( HttpServletRequest request) {
        AccountBean aBean = (AccountBean) request.getSession().getAttribute("account");
        request.getSession().setAttribute("account", null);
        System.out.println("已登出 = " + aBean);
        return "已登出";
    }


    /**
     * 注册请求
     * @param accountBean email passwod 所自动包装的accountBean
     * @param request HttpServletRequest
     * @return  true or false
     */
    @PostMapping("register")
    public String register ( @RequestBody AccountBean accountBean , HttpServletRequest request) {
        try {
            System.out.println("来注册请求");
            AccountBean registerAccountBean = accountService.register(accountBean);
            if (registerAccountBean != null ) {
                request.getSession().setAttribute("account", registerAccountBean);
            }
            assert registerAccountBean != null;
            System.out.println("注册了 --> " + registerAccountBean.toString());
            return "true";
        } catch (Exception e) {
            e.printStackTrace();
            return "false";
        }

    }

}
