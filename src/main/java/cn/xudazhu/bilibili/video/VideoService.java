package cn.xudazhu.bilibili.video;

import cn.xudazhu.bilibili.subsection.SubsectionBean;
import cn.xudazhu.bilibili.subsection.SubsectionDao;
import cn.xudazhu.bilibili.user.UserBean;
import cn.xudazhu.bilibili.user.UserDao;
import cn.xudazhu.bilibili.utils.MyBeanUtils;
import cn.xudazhu.bilibili.utils.PicUtils;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * VideoService
 *
 * @author xudaz
 * @date 2019/2/28
 */
@Transactional(rollbackFor = Exception.class)
@Service
public class VideoService {

    /**
     * videoDao property
     */
    private VideoDao videoDao;

    /**
     * 注入videoDao
     *
     * @param videoDao videoDao
     */
    @Autowired
    public void setVideoDao(VideoDao videoDao) {
        this.videoDao = videoDao;
    }


    /**
     * getVideo
     *
     * @param map       查询条件
     * @param aPageNum  每页size
     * @param pageNum   页数
     * @param condition 排序字段
     * @return 结果集
     */
    JSONObject getVideo(Map<String, Object> map, int aPageNum, int pageNum, String condition) {
        if (condition == null) {
            condition = "id";
        }
        List<VideoBean> videoBeans =  new ArrayList<>();
        Long allNum = -1L;

        String videoId = "subsectionBeanId";
        if (map.get(videoId) != null) {
            int i = Integer.parseInt((String) map.get(videoId));
            videoBeans = videoDao.findAllBySubsectionBeanId(i, PageRequest.of(pageNum - 1, aPageNum, Sort.by(Sort.Order.desc(condition))));
            allNum = videoDao.countAllBySubsectionBeanId(i);
        }
        String userBeanId = "userBeanId";
        if (map.get(userBeanId) != null) {
            int i = Integer.parseInt((String) map.get(userBeanId));
            videoBeans = videoDao.findAllByUserBeanAccountId(i, PageRequest.of(pageNum - 1, aPageNum, Sort.by(Sort.Order.desc(condition))));
            allNum = videoDao.countAllByUserBeanAccountId(i);
        }
        VideoBean videoBean = new VideoBean();
        if (allNum == -1L) {
            if (map.size() == 0) {
                Page<VideoBean> discussBeans = videoDao.findAll(PageRequest.of(pageNum - 1, aPageNum, Sort.by(Sort.Order.desc(condition))));
                videoBeans = discussBeans.getContent();
                allNum = videoDao.count();
            } else {
                MyBeanUtils.populate(videoBean , map );
                Page<VideoBean> discussBeans = videoDao.findAll(Example.of(videoBean), PageRequest.of(pageNum - 1, aPageNum, Sort.by(Sort.Order.desc(condition))));
                videoBeans = discussBeans.getContent();
                allNum = videoDao.count(Example.of(videoBean));
            }
        }
        JSONArray jsonArray = JSONArray.fromObject(videoBeans);
        JSONObject json = new JSONObject();
        json.put("all_page_num", ((allNum - 1) / aPageNum) + 1);
        json.put("all_num", allNum);
        json.put("video_data", jsonArray);
        System.out.println("GetVideo = " + json.toString());
        return json;


    }

    /**
     * userDao property
     */
    private UserDao userDao;

    /**
     * userDao
     *
     * @param userDao userDao
     */
    @Autowired
    public void setUserDao(UserDao userDao) {
        this.userDao = userDao;
    }

    /**
     * subsectionDao property
     */
    private SubsectionDao subsectionDao;

    /**
     * subsectionDao
     *
     * @param subsectionDao subsectionDao
     */
    @Autowired
    public void setSubsectionDao(SubsectionDao subsectionDao) {
        this.subsectionDao = subsectionDao;
    }

    /**
     * 保存视频
     *
     * @param map       未封装的视频pojo数据
     * @param coverFile 封面文件
     * @param videoFile 视频文件
     * @return 返回保存后的视频bean
     */
    public VideoBean save(Map<String, Object> map, MultipartFile coverFile, MultipartFile videoFile) throws IOException {
        String subsectionName;
        subsectionName = (String) map.remove("subsectionName");
        SubsectionBean subsectionDaoByName = subsectionDao.findByName(subsectionName);
        String authorId = (String) map.remove("author_ID");
        UserBean userBeanById = userDao.findById(Integer.parseInt(authorId)).orElse(new UserBean());
        VideoBean videoBean = new VideoBean();
        videoBean.setSubsectionBean(subsectionDaoByName);
        videoBean.setUserBean(userBeanById);
        videoBean.setCoverId(userBeanById.getAccountId());
        videoBean.setVideoId(userBeanById.getAccountId());
        Boolean populate = MyBeanUtils.populate(videoBean, map);
        if (populate) {
            VideoBean saveVideo = videoDao.save(videoBean);
            if (saveVideo != null) {
                String coverFilePath = "//usr//local//static//img//cover//" + videoBean.getCoverId() + ".png";
                coverFile.transferTo(new File(coverFilePath));
                String videoFilePath = "//usr//local//static//video//" + videoBean.getCoverId() + ".avi";
                videoFile.transferTo(new File(videoFilePath));
                //对封面文件进行压缩储存
                PicUtils.transform(coverFilePath, coverFilePath.replace(".png", ".jpg"));
            }
            return saveVideo;
        } else {
            return null;
        }
    }


    /**
     * 传入条件 返回符合条件的总数
     * 查询for 大分区
     *
     * @param map 条件
     * @return 数量
     */
    JSONObject getVideo4sectionId(Map<String, Object> map, int aPageNum, int pageNum, String condition) {
        String sectionId = (String) map.get("sectionId");
        if (sectionId == null) {
            return new JSONObject();
        }
        SubsectionBean subsectionBean = new SubsectionBean();
        subsectionBean.setSectionId(Integer.parseInt(sectionId));
        List<SubsectionBean> subsectionBeans = subsectionDao.findAll(Example.of(subsectionBean));
        List<VideoBean> allBySubsectionBeanIn = videoDao.findAllBySubsectionBeanIn(subsectionBeans, PageRequest.of(pageNum - 1, aPageNum, Sort.by(Sort.Order.desc(condition))));
        Long allNum = videoDao.countAllBySubsectionBeanIn(subsectionBeans);
        JSONArray jsonArray = JSONArray.fromObject(allBySubsectionBeanIn);
        JSONObject json = new JSONObject();
        json.put("all_page_num", ((allNum - 1) / aPageNum) + 1);
        json.put("all_num", allNum);
        json.put("video_data", jsonArray);
        System.out.println("GetVideo = " + json.toString());
        return json ;

    }
}
