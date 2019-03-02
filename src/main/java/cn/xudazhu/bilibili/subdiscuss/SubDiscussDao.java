package cn.xudazhu.bilibili.subdiscuss;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author xudaz
 * @date 2019/3/3
 */
@Repository
public interface SubDiscussDao extends JpaRepository<SubDiscussBean, Integer > {
    /**
     * findAllByUserBeanAccountId
     * @param accountId  UserBeanAccountId
     * @param pageable   pageable
     * @return 结果集
     */
    List<SubDiscussBean> findAllByUserBeanAccountId(Integer accountId , Pageable pageable ) ;

    /**
     * countAllByUserBeanAccountId
     * @param accountId UserBeanAccountId
     * @return  count数
     */
    Long countAllByUserBeanAccountId(Integer accountId ) ;
    /**
     * findAllByTargetUserBeanAccountId
     * @param accountId  TargetUserBeanAccountId
     * @param pageable   pageable
     * @return 结果集
     */
    List<SubDiscussBean> findAllByTargetUserBeanAccountId(Integer accountId , Pageable pageable ) ;

    /**
     * countAllByTargetUserBeanAccountId
     * @param accountId TargetUserBeanAccountId
     * @return  count数
     */
    Long countAllByTargetUserBeanAccountId(Integer accountId ) ;

    /**
     * findAllByDiscussBeanId
     * @param discussBeanId discussBeanId
     * @param pageable pageable
     * @return 结果集
     */
    List<SubDiscussBean> findAllByDiscussBeanId (Integer discussBeanId , Pageable pageable );

    /**
     * countAllByDiscussBeanId
     * @param discussBeanId discussBeanId
     * @return count数
     */
    Long countAllByDiscussBeanId ( Integer discussBeanId );

}
