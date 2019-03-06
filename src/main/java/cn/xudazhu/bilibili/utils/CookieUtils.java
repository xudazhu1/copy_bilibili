package cn.xudazhu.bilibili.utils;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
/**
 * @author xudaz
 * @date 2018/2/29
 */
public class CookieUtils {


    public static Cookie getCookie(HttpServletRequest request , String name ) {
        Cookie[] cookies = request.getCookies();
        if ( cookies != null ) {
            for (Cookie cookie : cookies) {
                if ( name.equals( cookie.getName()) ) {
                    return cookie;
                }
            }
            return null;
        } else {
            return null;
        }
    }

    /**
     * 清空所有cookie
     * @param request HttpServletRequest
     * @param response HttpServletResponse
     */
    private static void clearCooie(HttpServletRequest request, HttpServletResponse response) {
        Cookie[] cookies = request.getCookies();
        if ( cookies != null ) {
            for (Cookie cookie : cookies) {
                cookie.setMaxAge(0);
                response.addCookie(cookie);
            }
        }

    }


    public static void addCookie4Session(HttpServletRequest request ,  HttpServletResponse response ) {
        Cookie easyCookie = CookieUtils.getCookie(request, "EASY-SESSION");
        if ( easyCookie != null ) {
            Cookie easyCookie2 = new Cookie("EASY-SESSION", easyCookie.getValue());
            Cookie session = new Cookie("SESSION", easyCookie.getValue());
            clearCooie(request, response);
            easyCookie2.setPath("/");
            easyCookie2.setMaxAge(60*60*24*100);
            response.addCookie(easyCookie2);
            session.setPath("/");
            session.setMaxAge(60*60*24*100);
            response.addCookie(session);
        }

    }

}