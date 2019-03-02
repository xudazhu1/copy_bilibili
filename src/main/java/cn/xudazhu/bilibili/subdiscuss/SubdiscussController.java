package cn.xudazhu.bilibili.subdiscuss;

import cn.xudazhu.bilibili.account.AccountBean;
import cn.xudazhu.bilibili.utils.FormatMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

/**
 * @author xudaz
 * @date 2019/3/3
 */
@RestController
@RequestMapping("c_subdiscuss")
public class SubdiscussController {
    /**
     * subDiscussService property
     */
    private SubDiscussService subDiscussService;

    @Autowired
    public void setSubDiscussService(SubDiscussService subDiscussService) {
        this.subDiscussService = subDiscussService;
    }

    @PostMapping
    public String addSubDiscuss(@RequestParam Map<String , Object> map , HttpServletRequest request) {
        String account = "account";
        if (request.getSession().getAttribute(account) == null) {
            return "";
        }
        map.put("userBeanId", ((AccountBean) request.getSession().getAttribute("account")).getId() + "");
        Boolean addDiscuss = subDiscussService.addSubDiscuss(map);
        if (addDiscuss) {
            System.out.println("添加子评论 = " + map);
            return "添加子评论成功";
        } else {
            return "添加子评论失败";
        }


    }

    @GetMapping
    public String getSubDiscuss(HttpServletRequest request) {
        String aPageNum = request.getParameter("a_page_num") == null ? "20" : request.getParameter("a_page_num");
        String pageNum = request.getParameter("page_num") == null ? "1" : request.getParameter("page_num");
        Map<Object, Object> map = FormatMap.fomatRequestMap(request.getParameterMap());
        return subDiscussService.getSubDiscuss(map, Integer.parseInt(aPageNum), Integer.parseInt(pageNum), request.getParameter("condition")).toString();


    }

}