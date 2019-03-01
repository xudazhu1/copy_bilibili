package cn.xudazhu.bilibili.user;


import cn.xudazhu.bilibili.account.AccountBean;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

/**
 * @author xudaz
 * @date 2019/2/28
 */
@RestController
@RequestMapping("c_user")
public class UserController {

    /**
     * userService property
     */
    private UserService userService;

    @Autowired
    public void setUserService(UserService userService ) {
        this.userService = userService;
    }


    @GetMapping
    public String getUser( Map<String, Object> params , HttpServletRequest request  ) {
        try {
            String userId = (String) params.get("ID");
            System.out.println("user_ID = " + userId);
            UserBean user ;
            //如果没有传值过来 获取已登录的用户
            if ( userId == null ) {
                AccountBean accountBean = (AccountBean) request.getSession().getAttribute("account");
                if ( accountBean != null ) {
                    user = userService.findById(accountBean.getId());
                } else {
                    //如果没有登陆用户  返回空
                    System.out.println("GetUser = " +  new JSONObject().toString());
                    return new JSONObject().toString();
                }
            } else {
                user = userService.findById(Integer.parseInt(userId));
            }
            System.out.println(user);
            JSONObject jsonObject = JSONObject.fromObject(user);
            System.out.println("GetUser = " + jsonObject.toString());
            return   jsonObject.toString();
        } catch (Exception e) {
            e.printStackTrace();
            return "";
        }
    }


//    @PutMapping
//    public String updateUser(HttpServletRequest request  ) throws Exception{
//        if ( request.getContentType().contains("multipart") ) {
//            request.getPart("千万别注释这行");
//        }
//        try {
//            AccountBean aBean = (AccountBean) request.getSession().getAttribute("account");
//            if ( aBean == null ) {
//                return ("登陆超时 修改失败");
//            }
//            Map<Object , Object> map = FormatMap.fomatRequestMap(request.getParameterMap());
//            Boolean update ;
//            if ( request.getContentType().contains("multipart") ) {
//                Part part  = request.getPart("head_img");
//                if ( part != null ) {
//                    System.out.println("part!=null");
//                    part.write("img/head_img/" + aBean.getID() + ".png");
//                    map.put("head_img", aBean.getID());
//                }
//            }
//            map.put("account_ID" , aBean.getID());
//            update = accountService.update_user(map);
//            if ( update ) {
//                return ("修改成功");
//            } else {
//                return ("修改失败");
//            }
//        } catch (Exception e) {
//            e.printStackTrace();
//            return ("修改失败");
//        }
//
//    }



}
