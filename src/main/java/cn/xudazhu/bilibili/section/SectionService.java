package cn.xudazhu.bilibili.section;

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
public class SectionService {

    /**
     * sectionDao property
     */
    private  SectionDao sectionDao;

    @Autowired
    public  void  setSectionDao( SectionDao sectionDao ) {
        this.sectionDao = sectionDao;
    }


    List<SectionBean> getSections(Map<String, Object> map) {
        if ( map == null || map.size() == 0 ) {
            return sectionDao.findAll();
        }
        SectionBean sectionBean = new SectionBean();
        MyBeanUtils.populate(sectionBean , map);
        return  sectionDao.findAll(Example.of(sectionBean));
    }
}
