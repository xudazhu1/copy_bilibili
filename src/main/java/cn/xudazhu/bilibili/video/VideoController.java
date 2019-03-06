package cn.xudazhu.bilibili.video;

import cn.xudazhu.bilibili.account.AccountBean;
import cn.xudazhu.bilibili.utils.FormatMap;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

/**
 * @author xudaz
 * @date 2019/2/28
 */
@RequestMapping("c_video")
@RestController
public class VideoController {

    /**
     * videoService property
     */
    private VideoService videoService;

    @Autowired
    public void setVideoService(VideoService videoService) {
        this.videoService = videoService;
    }


    @GetMapping
    public String getVideo(HttpServletRequest request) {
        int aPageNum = request.getParameter("a_page_num") == null ? 20 : Integer.parseInt(request.getParameter("a_page_num"));
        int pageNum = request.getParameter("page_num") == null ? 1 : Integer.parseInt(request.getParameter("page_num"));
        Map<String, Object> map = FormatMap.fomatRequestMap(request.getParameterMap());
        return videoService.getVideo(map, aPageNum, pageNum, FormatMap.toUpperCaseFirst(request.getParameter("condition"))).toString();
    }

    @GetMapping("/4sectionId")
    public String getVideo4sectionId(HttpServletRequest request) {
        int aPageNum = request.getParameter("a_page_num") == null ? 20 : Integer.parseInt(request.getParameter("a_page_num"));
        int pageNum = request.getParameter("page_num") == null ? 1 : Integer.parseInt(request.getParameter("page_num"));
        Map<String, Object> map = FormatMap.fomatRequestMap(request.getParameterMap());
        return videoService.getVideo4sectionId(map, aPageNum, pageNum, FormatMap.toUpperCaseFirst(request.getParameter("condition"))).toString();


    }

    //    @RequestMapping(value="or" , method=RequestMethod.GET )
//    @ResponseBody
//    public String get_video_or  ( HttpServletRequest request  ) throws Exception{
//        try {
//            String a_page_num = request.getParameter("a_page_num") == null ? "20" : request.getParameter("a_page_num");
//            String page_num = request.getParameter("page_num") == null ? "1" : request.getParameter("page_num");
//            List<VideoBean> select_limit = videoService.getVideo_or(FormatMap.fomatRequestMap(request.getParameterMap() ), a_page_num, page_num, request.getParameter("condition"));
//
//            Integer allNum = utilsService.get_select_num_or(VideoBean.class , FormatMap.fomatRequestMap(request.getParameterMap()));
//            System.out.println("all_video_num = " + allNum);
//
//            JSONArray jsonArray = JSONArray.fromObject(select_limit);
//            AddCascadingObjUtils.format(VideoBean.class, jsonArray);
//            JSONObject json = new JSONObject();
//            json.put("all_page_num",  ( ( (allNum-1) / Integer.parseInt(a_page_num) ) + 1 ));
//            json.put("all_num", allNum);
//            json.put("video_data", jsonArray);
//
//            System.out.println("GetVideo_or = " + json.toString());
//            System.out.println("page_num = " + page_num + "SelectVideo = " + json.toString());
//            return json.toString();
//
//        } catch (Exception e) {
//            e.printStackTrace();
//            return "";
//        }
//    }
//
//


    @PostMapping
    public String addVideo(HttpServletRequest request, @RequestParam("cover") MultipartFile coverFile, @RequestParam("file") MultipartFile videoFile) throws Exception {
        AccountBean accountBean = (AccountBean) request.getSession().getAttribute("account");
        if (accountBean == null) {
            return "登陆超时";
        }
        Map<String, Object> map = FormatMap.fomatRequestMap(request.getParameterMap());
        map.put("author_ID", accountBean.getId());
        map.put("subsectionName", request.getParameter("subSection"));
        VideoBean save = videoService.save(map, coverFile, videoFile);
        return save == null ? "视频上传成功" : "视频上传失败";

    }


}
