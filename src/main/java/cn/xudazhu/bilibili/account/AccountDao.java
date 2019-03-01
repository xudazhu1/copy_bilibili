package cn.xudazhu.bilibili.account;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author xudaz
 * @date 2019/2/28
 */
@Repository
public interface AccountDao extends JpaRepository<AccountBean , Integer> {

    /**
     * 以email查找单个用户 一般用来注册时查找是否已存在用户
     * @param email 所查找的email
     * @return  返回查找到的用户 如果查找不到 返回null
     */
    AccountBean findByEmail(String email);
}
