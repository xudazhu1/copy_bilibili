package cn.xudazhu.bilibili.discuss;

import cn.xudazhu.bilibili.user.UserBean;
import cn.xudazhu.bilibili.video.VideoBean;
import com.sun.xml.internal.bind.v2.model.core.ID;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

/**
 * @author xudaz
 * @date 2019/3/1
 */
@Entity
@Table(name = "discuss")
@Getter
@Setter
public class DiscussBean {
    /**
     * id 自增主键
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    Integer id;
    /**
     * 评论楼层
     */
    Integer floor;
    /**
     * 评论作者
     * @see cn.xudazhu.bilibili.user.UserBean
     */
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "account_ID")
    UserBean userBean;
    /**
     * 评论对象
     * @see cn.xudazhu.bilibili.user.UserBean
     */
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "target_account_ID")
    UserBean targetUserBean;
    /**
     * 所属视频
     * @see cn.xudazhu.bilibili.video.VideoBean
     */
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "video_ID")
    VideoBean videoBean;
    /**
     * 视频介绍
     */
    String info;
    /**
     * 视频上传时间
     */
    Date addTime;
    /**
     * 是否已读
     */
    Boolean isRead;


    @Override
    public String toString() {
        return "DiscussBean{" +
                "id=" + id +
                ", floor=" + floor +
                ", userBean=" + userBean +
                ", targetUserBean=" + targetUserBean +
                ", videoBean=" + videoBean +
                ", info='" + info + '\'' +
                ", addTime=" + addTime +
                ", isRead=" + isRead +
                '}';
    }

}
