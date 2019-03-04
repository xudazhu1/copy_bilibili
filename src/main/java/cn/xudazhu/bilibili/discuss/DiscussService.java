package cn.xudazhu.bilibili.discuss;

import cn.xudazhu.bilibili.user.UserBean;
import cn.xudazhu.bilibili.user.UserDao;
import cn.xudazhu.bilibili.utils.MyBeanUtils;
import cn.xudazhu.bilibili.video.VideoBean;
import cn.xudazhu.bilibili.video.VideoDao;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.*;

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
    JSONObject getDiscuss(Map<String, Object> map, int aPageNum, int pageNum, String condition) {
        if (condition == null) {
            condition = "id";
        }
        List<DiscussBean> discussBeanList = new ArrayList<>();
        Long allNum = 0L;

        String videoId = "videoBeanId";
        if (map.get(videoId) != null) {
            int i = Integer.parseInt((String) map.get(videoId));
            discussBeanList = discussDao.findAllByVideoBeanId( i, PageRequest.of(pageNum - 1, aPageNum, Sort.by(Sort.Order.desc(condition))));
            allNum = discussDao.countAllByVideoBeanId(i);
        }
        String userBeanId = "userBeanId";
        if (map.get(userBeanId) != null) {
            int i = Integer.parseInt((String) map.get(userBeanId));
            discussBeanList = discussDao.findAllByUserBeanAccountId( i, PageRequest.of(pageNum - 1, aPageNum, Sort.by(Sort.Order.desc(condition))));
            allNum = discussDao.countAllByUserBeanAccountId(i);
        }
        String targetUserBeanId = "targetUserBeanId";
        if (map.get(targetUserBeanId) != null) {
            int i = Integer.parseInt((String) map.get(targetUserBeanId));
            discussBeanList = discussDao.findAllByTargetUserBeanAccountId(i, PageRequest.of(pageNum - 1, aPageNum, Sort.by(Sort.Order.desc(condition))));
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

    /**
     * videoDao property
     */
    private VideoDao videoDao;

    @Autowired
    public void setVideoDao(VideoDao videoDao) {
        this.videoDao = videoDao;
    }

    /**
     * userDao property
     */
    private UserDao userDao;

    @Autowired
    public void setUserDao(UserDao userDao) {
        this.userDao = userDao;
    }


    Boolean addDiscuss(Map<String, Object> map) {
        try {
            DiscussBean discussBean = new DiscussBean();
            discussBean.setInfo((String) map.get("info"));
            discussBean.setAddTime(new Date());
            String userBeanId = "userBeanId";
            Optional<UserBean> userBeanById = userDao.findById(Integer.parseInt((String) map.get(userBeanId)));
            discussBean.setUserBean(userBeanById.orElse(null));
            String videoBeanId = "videoBeanId";
            Optional<VideoBean> videoBeanById = videoDao.findById(Integer.parseInt((String) map.get(videoBeanId)));
            discussBean.setVideoBean(videoBeanById.orElse(null));
            assert videoBeanById.orElse(null) != null;
            Optional<UserBean> targetUserBeanById = userDao.findById(videoBeanById.orElse(null).getUserBean().getAccountId());
            discussBean.setTargetUserBean(targetUserBeanById.orElse(null));
            DiscussBean save = discussDao.save(discussBean);
            return save != null;
        } catch ( Exception e ) {
            e.printStackTrace();
            return  false;
        }

    }

}
