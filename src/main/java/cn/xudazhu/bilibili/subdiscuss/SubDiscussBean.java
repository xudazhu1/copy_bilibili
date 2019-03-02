package cn.xudazhu.bilibili.subdiscuss;

import cn.xudazhu.bilibili.discuss.DiscussBean;
import cn.xudazhu.bilibili.user.UserBean;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

/**
 * 子评论 pojo类
 * @author xudaz
 * @date 2019/3/2
 */
@Entity
@Table(name = "subdiscuss")
@Getter
@Setter
public class SubDiscussBean {
    /**
     * 自增主键ID
     */
    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;
    /**
     * 子评论所处评论
     * @see DiscussBean
     */
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "discuss_ID")
    DiscussBean discussBean;
    /**
     * 评论发布方
     * @see UserBean
     */
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "account_ID")
    UserBean userBean;
    /**
     * 评论目标目标
     * @see UserBean
     */
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "obj_ID")
    UserBean targetUserBean;
    /**
     * 子评论详情
     */
    String info;
    /**
     * 子评论发布时间
     */
    Date addTime;
    /**
     * 是否已读
     */
    Boolean isRead;
}
