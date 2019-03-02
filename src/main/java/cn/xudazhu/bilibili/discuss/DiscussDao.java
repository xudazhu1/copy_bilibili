package cn.xudazhu.bilibili.discuss;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository
 * @author xudaz
 * @date 2019/3/1
 */
@Repository
public interface DiscussDao extends JpaRepository<DiscussBean, Integer > {

    /**
     *  findAllByVideoBeanId
     * @param videoBeanId videoBeanId
     * @param pageable pageable
     * @return 结果集
     */
    List<DiscussBean> findAllByVideoBeanId(Integer videoBeanId , Pageable pageable);

    /**
     * 总数量 for 分页
     * @see DiscussDao#findAllByVideoBeanId(java.lang.Integer, org.springframework.data.domain.Pageable)
     * @param videoBeanId videoBeanId
     * @return  总数量
     */
    Long countAllByVideoBeanId( Integer videoBeanId );
    /**
     *  findAllByUserBeanAccountId
     * @param userBeanId userBeanId
     * @param pageable pageable
     * @return 结果集
     */
    List<DiscussBean> findAllByUserBeanAccountId(Integer userBeanId , Pageable pageable);
    /**
     * 总数量 for 分页
     * @see DiscussDao#findAllByUserBeanAccountId(java.lang.Integer, org.springframework.data.domain.Pageable)
     * @param userBeanId userBeanId
     * @return  总数量
     */
    Long countAllByUserBeanAccountId( Integer userBeanId );
    /**
     *  findAllByTargetUserBeanAccountId
     * @param targetUserBeanId targetUserBeanId
     * @param pageable pageable
     * @return 结果集
     */
    List<DiscussBean> findAllByTargetUserBeanAccountId(Integer targetUserBeanId , Pageable pageable);
    /**
     * 总数量 for 分页
     * @see DiscussDao#findAllByTargetUserBeanAccountId(java.lang.Integer, org.springframework.data.domain.Pageable)
     * @param targetUserBeanId targetUserBeanId
     * @return  总数量
     */
    Long countAllByTargetUserBeanAccountId( Integer targetUserBeanId );
}
