package cn.xudazhu.bilibili.user;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.util.Date;

/**
 * 用户 pojo类
 * @author xudaz
 * @date 2019/2/28 2:29
 */
@Entity
@DynamicInsert
@DynamicUpdate(value = true)
@Table(name = "user")
@Getter
@Setter
public class UserBean {

    /**
     * 自增主键 id 也是所属账户id 一对一
     * @see cn.xudazhu.bilibili.account.AccountBean
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "account_ID")
    private Integer accountId;
    /**
     * 用户昵称
     */
    private String nickname;
    /**
     * 用户性别
     */
    private String sex;
    /**
     * 用户年龄
     */
    private Integer age;
    /**
     * 用户签名
     */
    private String info;
    /**
     * 用户头像id
     */
    @Column(name = "head_img")
    private String headImg;
    /**
     * 用户注册时间
     */
    @Column(name = "addTime")
    private Date addTime;

    @Override
    public String toString() {
        return "UserBean{" +
                "accountId=" + accountId +
                ", nickname='" + nickname + '\'' +
                ", sex='" + sex + '\'' +
                ", age=" + age +
                ", info='" + info + '\'' +
                ", headImg='" + headImg + '\'' +
                ", addTime=" + addTime +
                '}';
    }
}
