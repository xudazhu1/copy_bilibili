package cn.xudazhu.bilibili.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * 用户 Dao
 * @author xudaz
 * @date 2018/2/28
 */
@Repository
public interface UserDao extends JpaRepository<UserBean , Integer> {
}
