package cn.xudazhu.bilibili.user;

import cn.xudazhu.bilibili.utils.MyBeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.Map;
import java.util.Optional;

/**
 * UserService
 *
 * @author xudaz
 * @date 2019/2/28
 */
@Service
@Transactional(rollbackFor = Exception.class)
public class UserService {
    /**
     * userDao property
     */
    private UserDao userDao;

    @Autowired
    public void setUserDao(UserDao userDao) {
        this.userDao = userDao;
    }

    /**
     * findById
     *
     * @param id id
     * @return UserBean
     */
    UserBean findById(Integer id) {
        return userDao.findById(id).orElse(null);
    }

    public boolean updateUser(Map<String, Object> map, MultipartFile headImg) throws IOException {
        if (map.size() == 0) {
            return false;
        }
        Optional<UserBean> byId = userDao.findById((Integer) map.get("accountId"));
        if (byId.isPresent()) {
            UserBean userBean = new UserBean();
            MyBeanUtils.populate(userBean, map);
            userBean.setAddTime(byId.get().getAddTime());
            userBean.setHeadImg(byId.get().getHeadImg());
            userDao.save(userBean);
            if (headImg != null) {
                String headImgPath = "//usr//local//static//img//head_img//" + userBean.getHeadImg() + ".png";
                headImg.transferTo(new File(headImgPath));
            }
            return true;

        } else {
            return false;
        }
    }
}
