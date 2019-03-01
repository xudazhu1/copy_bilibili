package cn.xudazhu.bilibili.subsection;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * SubsectionDao 持久层
 * @author xudaz
 * @date 2019/2/28
 */
@Repository
public interface SubsectionDao  extends JpaRepository<SubsectionBean , Integer > {

    /**
     * findByName name属性唯一
     * @param subsectionName subsectionName
     * @return 查询到的 SubsectionBean
     */
    SubsectionBean findByName(String subsectionName);

    /**
     * findAllBySectionId
     * @param sectionId sectionId
     * @return 结果集
     */
    List<SubsectionBean> findAllBySectionId(Integer sectionId);
}
