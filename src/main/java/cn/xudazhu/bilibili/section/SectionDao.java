package cn.xudazhu.bilibili.section;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * SectionDao
 * @author xudaz
 * @date
 */
@Repository
public interface SectionDao extends JpaRepository<SectionBean , Integer> {
}
