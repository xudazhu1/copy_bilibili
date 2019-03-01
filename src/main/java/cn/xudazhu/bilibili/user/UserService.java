package cn.xudazhu.bilibili.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * UserService
 * @author xudaz
 * @date 2019/2/28
 */
@Service
public class UserService {
    /**
     * userDao property
     */
    private  UserDao userDao;

    @Autowired
    public  void setUserDao (UserDao userDao ) {
        this.userDao = userDao;
    }

    /**
     * findById
     * @param id id
     * @return UserBean
     */
    UserBean findById(Integer id) {
        return  userDao.findById(id).orElse(null);
    }
}
