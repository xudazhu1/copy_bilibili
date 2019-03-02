package cn.xudazhu.bilibili.video;

import cn.xudazhu.bilibili.subsection.SubsectionBean;
import cn.xudazhu.bilibili.subsection.SubsectionDao;
import cn.xudazhu.bilibili.user.UserBean;
import cn.xudazhu.bilibili.user.UserDao;
import cn.xudazhu.bilibili.utils.MyBeanUtils;
import cn.xudazhu.bilibili.utils.PicUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
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
     * 查找符合条件的video集合
     *
     * @param map       条件
     * @param aPageNum  每页数量
     * @param pageNum   当前页数
     * @param condition 排序属性名
     * @return 返回查到的video集合
     */
    public List<VideoBean> getVideo(Map<Object, Object> map, Integer aPageNum, Integer pageNum, String condition) {
        if (condition == null) {
            condition = "id";
        }
        VideoBean videoBean = new VideoBean();
        MyBeanUtils.populate(videoBean, map);
        if (map.size() == 0) {
            Page<VideoBean> videoAll = videoDao.findAll(PageRequest.of(pageNum - 1, aPageNum, Sort.by(Sort.Order.desc(condition))));
            return videoAll.getContent();
        } else {
            Page<VideoBean> videoBeans = videoDao.findAll(Example.of(videoBean), PageRequest.of(pageNum - 1, aPageNum, Sort.by(Sort.Order.desc(condition))));
            String id = "id";
            if (map.get(id) != null) {
                VideoBean videoBean1 = videoBeans.getContent().get(0);
                videoBean1.setPlayNum(videoBean1.getPlayNum() + 1);
                videoDao.save(videoBean1);
            }
            return videoBeans.getContent();
        }

    }

    /**
     * 传入条件 返回符合条件的总数
     *
     * @param map 条件
     * @return 数量
     */
    Long getVideoNum(Map<Object, Object> map) {
        VideoBean videoBean = new VideoBean();
        Boolean populate = MyBeanUtils.populate(videoBean, map);
        if (populate) {
            if (map.size() == 0) {
                return videoDao.count();
            }
            return videoDao.count(Example.of(videoBean));
        } else {
            return 0L;
        }
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
    public VideoBean save(Map<Object, Object> map, MultipartFile coverFile, MultipartFile videoFile) throws IOException {
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
    List<VideoBean> getVideo4sectionId(Map<Object, Object> map, int aPageNum, int pageNum, String condition) {
        String sectionId = (String) map.get("sectionId");
        if (sectionId == null) {
            return new ArrayList<>();
        }
        SubsectionBean subsectionBean = new SubsectionBean();
        subsectionBean.setSectionId(Integer.parseInt(sectionId));
        List<SubsectionBean> subsectionBeans = subsectionDao.findAll(Example.of(subsectionBean));
        return videoDao.findAllBySubsectionBeanIn(subsectionBeans, PageRequest.of(pageNum - 1, aPageNum, Sort.by(Sort.Order.desc(condition))));

    }
}
