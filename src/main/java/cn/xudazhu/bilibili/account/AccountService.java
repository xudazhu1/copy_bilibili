package cn.xudazhu.bilibili.account;


import cn.xudazhu.bilibili.user.UserBean;
import cn.xudazhu.bilibili.user.UserDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Optional;

/**
 * account service
 * @author xudaz
 * @date  2019/2/28
 */
@Service
public class AccountService {

    /**
     * accountDao
     */
    private AccountDao accountDao;

    /**
     * 注入 accountDao
     */
    @Autowired
    public void setAccountDao( AccountDao accountDao ) {
        this.accountDao = accountDao;
    }

    /**
     * userDao
     */
    private UserDao userDao;

    /**
     * 注入 userDao
     */
    @Autowired
    public void setUserDao( UserDao userDao ) {
        this.userDao = userDao;
    }

    /**
     * 查看是否存在用户
     * @param email  所查找的用户email
     * @return 返回是否 存在位true 不存在为false
     */
    Boolean hasAccount(String email) {
        return  accountDao.findByEmail(email) != null;
    }


    /**
     * 登陆方法
     * @param accountBean 登陆所用的email 和 password所封装成的aaccountBean
     * @return 返回登陆成功的bean
     */
     AccountBean login(AccountBean accountBean) {
        Optional<AccountBean> one = accountDao.findOne(Example.of(accountBean));
        return one.orElse(null);
    }

    /**
     * 注册方法
     * @param accountBean 所封装的账户bean
     * @return 注册成为的bean
     */
    public AccountBean register(AccountBean accountBean) {
        if ( accountDao.findByEmail(accountBean.getEmail()) != null ) {
            return null;
        }
        AccountBean saveAccountBean = accountDao.save(accountBean);
        UserBean userBean = new UserBean();
        userBean.setAccountId(saveAccountBean.getId());
        userBean.setAddTime(new Date());
        userDao.save(userBean);
        return  saveAccountBean ;
    }
}
