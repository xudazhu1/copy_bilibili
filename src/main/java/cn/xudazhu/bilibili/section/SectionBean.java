package cn.xudazhu.bilibili.section;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

/**
 * 视频主分区 pojo类
 * @author xudaz
 * @date 2019/2/28 2:29
 */
@Entity
@Table(name = "section")
@Getter
@Setter
public class SectionBean {

    /**
     * 自增主键 id
     *
     */
    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    /**
     * 主分区名
     */
    private String name;

    @Override
    public String toString() {
        return "SectionBean{" +
                "ID=" + id +
                ", name='" + name + '\'' +
                '}';
    }
}
