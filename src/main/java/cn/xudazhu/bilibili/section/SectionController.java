package cn.xudazhu.bilibili.section;

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
 * @date 2019/2/28
 */
@RestController
@RequestMapping("c_section")
public class SectionController {

    /**
     * sectionService property
     */
    private SectionService sectionService;

    @Autowired
    public void setSectionService ( SectionService sectionService ) {
        this.sectionService = sectionService;
    }


    @GetMapping
    public String getSections( @RequestParam  Map<String, Object > map ) {
        List<SectionBean> sections = sectionService.getSections(map);
        return  JSONArray.fromObject(sections).toString();
    }



}
