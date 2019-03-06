package cn.xudazhu.bilibili.subsection;


import cn.xudazhu.bilibili.utils.MyBeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

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

    public List<SubsectionBean> getSubsection(Map<String, Object> map) {
        if ( map == null || map.size() == 0 ) {
            return subsectionDao.findAll();
        }
        SubsectionBean subsectionBean = new SubsectionBean();
        MyBeanUtils.populate(subsectionBean , map);
        return subsectionDao.findAll(Example.of(subsectionBean));
    }
}
