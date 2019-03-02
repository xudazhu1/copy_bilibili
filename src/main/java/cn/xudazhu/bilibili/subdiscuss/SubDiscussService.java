package cn.xudazhu.bilibili.subdiscuss;

import cn.xudazhu.bilibili.discuss.DiscussBean;
import cn.xudazhu.bilibili.discuss.DiscussDao;
import cn.xudazhu.bilibili.user.UserBean;
import cn.xudazhu.bilibili.user.UserDao;
import cn.xudazhu.bilibili.utils.MyBeanUtils;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

/**
 * @author xudaz
 * @date 2019/3/3
 */
@Service
@Transactional(rollbackFor = Exception.class)
public class SubDiscussService {
    /**
     * subsectionDao property
     */
    private SubDiscussDao subdiscussDao;

    @Autowired
    public void setSubsectionDao(SubDiscussDao subdiscussDao) {
        this.subdiscussDao = subdiscussDao;
    }

    /**
     * userDao property
     */
    private UserDao userDao;

    @Autowired
    public void setUserDao(UserDao userDao) {
        this.userDao = userDao;
    }
    /**
     * discussDao property
     */
    private DiscussDao discussDao;

    @Autowired
    public void setDiscussDao(DiscussDao discussDao) {
        this.discussDao = discussDao;
    }


    Boolean addSubDiscuss(Map<String, Object> map) {
        try {
            SubDiscussBean subDiscussBean = new SubDiscussBean();
            subDiscussBean.setInfo((String) map.get("info"));
            subDiscussBean.setAddTime(new Date());
            String userBeanId = "userBeanId";
            Optional<UserBean> userBeanById = userDao.findById(Integer.parseInt((String) map.get(userBeanId)));
            subDiscussBean.setUserBean(userBeanById.orElse(null));
            String targetUserBeanId = "targetUserBeanId";
            Optional<UserBean> targetUserBeanById = userDao.findById(Integer.parseInt((String) map.get(targetUserBeanId)));
            subDiscussBean.setTargetUserBean(targetUserBeanById.orElse(null));
            String discussId = "discussId";
            Optional<DiscussBean> discussIdById = discussDao.findById(Integer.parseInt((String) map.get(discussId)));
            subDiscussBean.setDiscussBean(discussIdById.orElse(null));
                SubDiscussBean save = subdiscussDao.save(subDiscussBean);
                return save != null;
        } catch ( DataIntegrityViolationException e ) {
            e.printStackTrace();
            return  false;
        }

    }

    JSONObject getSubDiscuss(Map<Object, Object> map, Integer aPageNum, Integer pageNum, String condition) {
        if (condition == null) {
            condition = "id";
        }
        List<SubDiscussBean> subDiscussBeans = new ArrayList<>();
        Long allNum = 0L;

        String discussBeanId = "discussBeanId";
        if (map.get(discussBeanId) != null) {
            int i = Integer.parseInt((String) map.get(discussBeanId));
            subDiscussBeans = subdiscussDao.findAllByDiscussBeanId(i, PageRequest.of(pageNum - 1, aPageNum, Sort.by(Sort.Order.desc(condition))));
            allNum = subdiscussDao.countAllByDiscussBeanId(i);
        }
        String userBeanId = "userBeanId";
        if (map.get(userBeanId) != null) {
            int i = Integer.parseInt((String) map.get(userBeanId));
            subDiscussBeans = subdiscussDao.findAllByUserBeanAccountId(i, PageRequest.of(pageNum - 1, aPageNum, Sort.by(Sort.Order.desc(condition))));
            allNum = subdiscussDao.countAllByUserBeanAccountId(i);
        }
        String targetUserBeanId = "targetUserBeanId";
        if (map.get(targetUserBeanId) != null) {
            int i = Integer.parseInt((String) map.get(targetUserBeanId));
            subDiscussBeans = subdiscussDao.findAllByTargetUserBeanAccountId(i, PageRequest.of(pageNum - 1, aPageNum, Sort.by(Sort.Order.desc(condition))));
            allNum = subdiscussDao.countAllByTargetUserBeanAccountId(i);
        }
        SubDiscussBean subdiscussBean = new SubDiscussBean();
        Boolean populate = MyBeanUtils.populate(subdiscussBean, map);
        if (populate) {
            if (map.size() == 0) {
                Page<SubDiscussBean> subDiscussBeans1 = subdiscussDao.findAll(PageRequest.of(pageNum - 1, aPageNum, Sort.by(Sort.Order.desc(condition))));
                subDiscussBeans = subDiscussBeans1.getContent();
                allNum = subdiscussDao.count();
            } else {
                Page<SubDiscussBean> subDiscussBeans1 = subdiscussDao.findAll(Example.of(subdiscussBean), PageRequest.of(pageNum - 1, aPageNum, Sort.by(Sort.Order.desc(condition))));
                subDiscussBeans = subDiscussBeans1.getContent();
                allNum = subdiscussDao.count(Example.of(subdiscussBean));
            }
        }
        JSONArray jsonArray = JSONArray.fromObject(subDiscussBeans);
        JSONObject json = new JSONObject();
        json.put("all_page_num", ((allNum - 1) / aPageNum) + 1);
        json.put("all_num", allNum);
        json.put("subdiscuss_data", jsonArray);
        System.out.println("GetSubDiscuss = " + json.toString());
        return json;


    }


}
