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
public interface DiscussDao extends JpaRepository<DiscussBean , Integer > {

    /**
     *  getAllByVideoBeanId
     * @param videoBeanId videoBeanId
     * @param pageable pageable
     * @return 结果集
     */
    List<DiscussBean> getAllByVideoBeanId(Integer videoBeanId , Pageable pageable);

    /**
     * 总数量 for 分页
     * @see DiscussDao#getAllByVideoBeanId(java.lang.Integer, org.springframework.data.domain.Pageable)
     * @param videoBeanId videoBeanId
     * @return  总数量
     */
    Long countAllByVideoBeanId( Integer videoBeanId );
    /**
     *  getAllByUserBeanId
     * @param userBeanId userBeanId
     * @param pageable pageable
     * @return 结果集
     */
    List<DiscussBean> getAllByUserBeanAccountId(Integer userBeanId , Pageable pageable);
    /**
     * 总数量 for 分页
     * @see DiscussDao#getAllByUserBeanAccountId(java.lang.Integer, org.springframework.data.domain.Pageable)
     * @param userBeanId userBeanId
     * @return  总数量
     */
    Long countAllByUserBeanAccountId( Integer userBeanId );
    /**
     *  getAllByTargetUserBeanId
     * @param targetUserBeanId targetUserBeanId
     * @param pageable pageable
     * @return 结果集
     */
    List<DiscussBean> getAllByTargetUserBeanAccountId(Integer targetUserBeanId , Pageable pageable);
    /**
     * 总数量 for 分页
     * @see DiscussDao#getAllByTargetUserBeanAccountId(java.lang.Integer, org.springframework.data.domain.Pageable)
     * @param targetUserBeanId targetUserBeanId
     * @return  总数量
     */
    Long countAllByTargetUserBeanAccountId( Integer targetUserBeanId );
}
