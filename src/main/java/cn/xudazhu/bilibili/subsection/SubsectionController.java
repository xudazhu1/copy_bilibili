package cn.xudazhu.bilibili.subsection;

import net.sf.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

/**
 * @author xudaz
 * @date 2019/3/1
 */
@RestController
@RequestMapping("c_subsection")
public class SubsectionController {
    /**
     * subsectionService
     */
    private  SubsectionService subsectionService;

    @Autowired
    public  void  setSubsectionService( SubsectionService subsectionService ) {
        this.subsectionService = subsectionService;
    }

    @GetMapping("/4sectionId")
    public String getBySectionId( Integer sectionId) {
        List<SubsectionBean> subsectionBeans =  subsectionService.getBySectionId(sectionId);
        return  JSONArray.fromObject(subsectionBeans).toString();
    }

    @GetMapping
    public  String getSubsection(@RequestParam Map<String , Object > map ) {
        List<SubsectionBean> subsection = subsectionService.getSubsection(map);
        return  JSONArray.fromObject(subsection).toString();
    }


}
