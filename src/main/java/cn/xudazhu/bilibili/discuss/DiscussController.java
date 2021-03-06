package cn.xudazhu.bilibili.discuss;

import cn.xudazhu.bilibili.account.AccountBean;
import cn.xudazhu.bilibili.utils.FormatMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

/**
 * @author xudaz
 * @date 2019/3/1
 */
@RestController
@RequestMapping("c_discuss")
public class DiscussController {

    /**
     * discussService property
     */
    private DiscussService discussService;

    @Autowired
    public void setDiscussService(DiscussService discussService) {
        this.discussService = discussService;
    }

    @GetMapping
    public String getDiscuss(HttpServletRequest request) {
        int aPageNum = request.getParameter("a_page_num") == null ? 20 : Integer.parseInt(request.getParameter("a_page_num"));
        int pageNum = request.getParameter("page_num") == null ? 1 : Integer.parseInt(request.getParameter("page_num"));
        Map<String, Object> map = FormatMap.fomatRequestMap(request.getParameterMap());
        return discussService.getDiscuss(map, aPageNum, pageNum, FormatMap.toUpperCaseFirst(request.getParameter("condition"))).toString();

    }

    @PostMapping
    public String addSubDiscuss(@RequestParam Map<String , Object> map , HttpServletRequest request) {
        String account = "account";
        if (request.getSession().getAttribute(account) == null) {
            return "";
        }
        map.put("userBeanId", ((AccountBean) request.getSession().getAttribute("account")).getId() + "");
        Boolean addDiscuss = discussService.addDiscuss(map);
        if (addDiscuss) {
            System.out.println("添加评论 = " + map);
            return "添加评论成功";
        } else {
            return "添加评论失败";
        }


    }


}
