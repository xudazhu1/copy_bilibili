package cn.xudazhu.bilibili.video;


import cn.xudazhu.bilibili.subsection.SubsectionBean;
import cn.xudazhu.bilibili.user.UserBean;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

/**
 * 视频  pojo类
 * @author xudaz
 * @date 2019/2/28 2:29
 */
@Getter
@Setter
@Entity
@Table(name = "video")
public class VideoBean {

    /**
     * id 主键
     * <p>
     * GeneratedValue(strategy = GenerationType.IDENTITY) 表示自增主键
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Integer id;

    /**
     *视频所属子分类id
     * @see cn.xudazhu.bilibili.subsection.SubsectionBean
     */
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "subsection_ID" , referencedColumnName = "ID")
    private SubsectionBean subsectionBean;

    /**
     * 视频标题
     */
    private String title;
    /**
     * 视频类型
     */
    private String type;
    /**
     * 视频详细信息
     */
    private String info;
    /**
     * 视频封面id
     */
    @Column(name = "cover_ID")
    private Integer coverId;
    /**
     * 视频媒体文件id
     */
    @Column(name = "videoId")
    private Integer videoId;
    /**
     * 视频作者accountBean id
     * @see UserBean
     */
    @ManyToOne(fetch = FetchType.EAGER )
    @JoinColumn (name = "author_ID")
    private UserBean userBean;
    /**
     * 视频上传日期
     */
    @Column(name = "up_date")
    private Date upDate;
    /**
     * 视频播放数量
     */
    @Column(name = "play_num")
    private Integer playNum;

    @Override
    public String toString() {
        return "VideoBean{" +
                "id=" + id +
                ", subsectionBean=" + subsectionBean +
                ", title='" + title + '\'' +
                ", type='" + type + '\'' +
                ", info='" + info + '\'' +
                ", coverId=" + coverId +
                ", videoId=" + videoId +
                ", userBean=" + userBean +
                ", upDate=" + upDate +
                ", playNum=" + playNum +
                '}';
    }
}
