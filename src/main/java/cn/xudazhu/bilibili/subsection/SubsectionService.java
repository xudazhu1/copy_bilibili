package cn.xudazhu.bilibili.subsection;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author xudaz
 * @date 2019/3/1
 */
@Service
public class SubsectionService {

    private  SubsectionDao subsectionDao;

    @Autowired
    public  void  setSubsectionDao( SubsectionDao subsectionDao ) {
        this.subsectionDao =subsectionDao;
    }

    /**
     * getBySectionId
     * @param sectionId sectionId
     * @return 结果集
     */
    List<SubsectionBean> getBySectionId(Integer sectionId) {
        return subsectionDao.findAllBySectionId(sectionId);
    }
}
