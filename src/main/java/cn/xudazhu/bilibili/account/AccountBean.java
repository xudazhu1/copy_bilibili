package cn.xudazhu.bilibili.account;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;


/**
 * 账户 pojo类
 * @author xudaz
 * @date 2019/2/28 2:29
 */
@Entity
@Table(name = "account")
@Getter
@Setter
public class AccountBean implements Serializable {
    /**
     * 序列化版本号
     */
    private static final long serialVersionUID = 2L;
    /**
     * id 主键
     *
     * GeneratedValue(strategy = GenerationType.IDENTITY) 表示自增主键
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    Integer id;
    /**
     * email  唯一
     */
    String email;
    /**
     *用户密码
     */
    String password;

    @Override
    public String toString() {
        return "AccountBean{" +
                "id=" + id +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}
