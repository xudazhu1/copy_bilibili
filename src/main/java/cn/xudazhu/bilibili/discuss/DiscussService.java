package cn.xudazhu.bilibili.discuss;

import cn.xudazhu.bilibili.utils.MyBeanUtils;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * @author xudaz
 * @date 2019/3/1
 */
@Service
public class DiscussService {

    /**
     * discussDao property
     */
    private DiscussDao discussDao;

    @Autowired
    public void setDiscussDao(DiscussDao discussDao) {
        this.discussDao = discussDao;
    }

    /**
     * getDiscuss
     *
     * @param map       查询条件
     * @param aPageNum  每页size
     * @param pageNum   页数
     * @param condition 排序字段
     * @return 结果集
     */
    JSONObject getDiscuss(Map<Object, Object> map, int aPageNum, int pageNum, String condition) {
        if (condition == null) {
            condition = "id";
        }
        List<DiscussBean> discussBeanList = new ArrayList<>();
        Long allNum = 0L;

        String videoId = "videoBeanId";
        if (map.get(videoId) != null) {
            int i = Integer.parseInt((String) map.get(videoId));
            discussBeanList = discussDao.getAllByVideoBeanId( i, PageRequest.of(pageNum - 1, aPageNum, Sort.by(Sort.Order.desc(condition))));
            allNum = discussDao.countAllByVideoBeanId(i);
        }
        String userBeanId = "userBeanId";
        if (map.get(userBeanId) != null) {
            int i = Integer.parseInt((String) map.get(userBeanId));
            discussBeanList = discussDao.getAllByUserBeanAccountId( i, PageRequest.of(pageNum - 1, aPageNum, Sort.by(Sort.Order.desc(condition))));
            allNum = discussDao.countAllByUserBeanAccountId(i);
        }
        String targetUserBeanId = "targetUserBeanId";
        if (map.get(targetUserBeanId) != null) {
            int i = Integer.parseInt((String) map.get(targetUserBeanId));
            discussBeanList = discussDao.getAllByTargetUserBeanAccountId(i, PageRequest.of(pageNum - 1, aPageNum, Sort.by(Sort.Order.desc(condition))));
            allNum = discussDao.countAllByTargetUserBeanAccountId(i);
        }
        DiscussBean discussBean = new DiscussBean();
        Boolean populate = MyBeanUtils.populate(discussBean, map);
        if (populate) {
            if (map.size() == 0) {
                Page<DiscussBean> discussBeans = discussDao.findAll(PageRequest.of(pageNum - 1, aPageNum, Sort.by(Sort.Order.desc(condition))));
                discussBeanList = discussBeans.getContent();
                allNum = discussDao.count();
            } else {
                Page<DiscussBean> discussBeans = discussDao.findAll(Example.of(discussBean), PageRequest.of(pageNum - 1, aPageNum, Sort.by(Sort.Order.desc(condition))));
                discussBeanList = discussBeans.getContent();
                allNum = discussDao.count(Example.of(discussBean));
            }
        }
        JSONArray jsonArray = JSONArray.fromObject(discussBeanList);
        JSONObject json = new JSONObject();
        json.put("all_page_num", ((allNum - 1) / aPageNum) + 1);
        json.put("all_num", allNum);
        json.put("discuss_data", jsonArray);
        System.out.println("GetDiscuss = " + json.toString());
        return json;


    }

//    Long getDiscussNum(Map<Object, Object> map) {
//        DiscussBean discussBean = new DiscussBean();
//        Boolean populate = MyBeanUtils.populate(discussBean, map);
//        if (!populate) {
//            return 0L;
//        }
//        if (map.size() == 0) {
//            return discussDao.count();
//        } else {
//            return discussDao.count(Example.of(discussBean));
//        }
//    }
}
