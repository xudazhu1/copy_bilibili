package cn.xudazhu.bilibili.video;

import cn.xudazhu.bilibili.subsection.SubsectionBean;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;

/**
 * VideoDao
 * @author xudaz
 * @date 2019/2/28
 */
@Repository
public interface VideoDao extends JpaRepository<VideoBean , Integer> {

    /**
     * find list where subsectionId in
     * @param subsectionBeans  subsectionBeans
     * @param pageable  pageable
     * @return 查询结果集
     */
    List<VideoBean> findAllBySubsectionBeanIn(Collection<SubsectionBean> subsectionBeans, Pageable pageable);


}
