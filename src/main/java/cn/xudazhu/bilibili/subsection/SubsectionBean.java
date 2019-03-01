package cn.xudazhu.bilibili.subsection;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

/**
 * 子分区 pojo
 * @author xudaz
 * @date 2018/2/28
 */
@Entity
@Table(name = "subsection")
@Getter
@Setter
public class SubsectionBean {

    /**
     * 自增主键 id
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Integer id;
    /**
     * 分区名
     */
    private String name;
    /**
     * 所属主分区 id
     * @see cn.xudazhu.bilibili.section.SectionBean
     */
    @Column(name = "section_ID")
    private Integer sectionId;

    @Override
    public String toString() {
        return "SubsectionBean{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", sectionId=" + sectionId +
                '}';
    }
}
