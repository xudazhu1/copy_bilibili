package cn.xudazhu.bilibili.video;

import cn.xudazhu.bilibili.subsection.SubsectionBean;
import org.springframework.data.domain.PageRequest;
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

    /**
     * countAllBySubsectionBeanIn
     * @param subsectionBeans  subsectionBeans
     * @return count Num
     */
    Long countAllBySubsectionBeanIn(Collection<SubsectionBean> subsectionBeans);

    /**
     * findAllBySubsectionBeanId
     * @param subsectionBeanId subsectionBeanId
     * @param pageable pageable
     * @return 结果集
     */
    List<VideoBean> findAllBySubsectionBeanId(Integer subsectionBeanId, Pageable pageable);

    /**
     * countAllBySubsectionBeanId
     * @param subsectionBeanId subsectionBeanId
     * @return count数
     */
    Long countAllBySubsectionBeanId(Integer subsectionBeanId );

    /**
     *  findAllByUserBeanAccountId
     * @param userBeanAccountId userBeanAccountId
     * @param pageable pageable
     * @return 结果集
     */
    List<VideoBean> findAllByUserBeanAccountId(Integer userBeanAccountId, Pageable pageable);

    /**
     *   countAllByUserBeanAccountId
     * @param userBeanAccountId userBeanAccountId
     * @return count 数
     */
    Long countAllByUserBeanAccountId(Integer userBeanAccountId );

    /**
     * findAllByTypeAndCoverId
     * @param type type
     * @param coverId coverId
     * @return 查询到的结果集
     */
    List<VideoBean> findAllByTypeAndCoverId(String type, Integer coverId);

}
