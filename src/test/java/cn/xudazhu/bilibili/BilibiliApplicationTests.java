package cn.xudazhu.bilibili;

import cn.xudazhu.bilibili.account.AccountBean;
import cn.xudazhu.bilibili.account.AccountDao;
import cn.xudazhu.bilibili.utils.FormatMap;
import cn.xudazhu.bilibili.video.VideoBean;
import cn.xudazhu.bilibili.video.VideoDao;
import cn.xudazhu.bilibili.video.VideoService;
import net.sf.json.JSONObject;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RunWith(SpringRunner.class)
@SpringBootTest
public class BilibiliApplicationTests {

    /**
     * accountDao
     */
    private AccountDao accountDao;

    /**
     * 注入 accountDao
     */
    @Autowired
    public void setAccountDao( AccountDao accountDao ) {
        this.accountDao = accountDao;
    }

    /**
     * 查看是否存在用户
     * @param email  所查找的用户email
     * @return 返回是否 存在位true 不存在为false
     */
    Boolean hasAccount(String email) {
        return  accountDao.findByEmail(email) != null;
    }


    /**
     * 登陆方法
     * @param accountBean 登陆所用的email 和 password所封装成的aaccountBean
     * @return 返回登陆成功的bean
     */
    AccountBean login(AccountBean accountBean) {
        Optional<AccountBean> one = accountDao.findOne(Example.of(accountBean));
        return one.orElse(null);
    }

    /**
     * 注册方法
     * @param accountBean
     * @return
     */
    public Boolean register(AccountBean accountBean) {
        if ( accountDao.findByEmail(accountBean.getEmail()) != null ) {
            return false;
        }
        AccountBean saveAccountBean = accountDao.save(accountBean);
        return  saveAccountBean != null;
    }


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

    @Test
    public void contextLoads() {
//        List<VideoBean> allByTypeAndCoverId = videoDao.findAllByTypeAndCoverId("mp4", 4);
//        JSONObject jsonObject = new JSONObject();
//        Map<String , Object> map = new HashMap<>();
//        map.put("countNum" , 10);
//        map.put("pageNum" , 1);
//        jsonObject.put("pageData" , map);
//        jsonObject.put("statusCode" , 1);
//        jsonObject.put("data" , allByTypeAndCoverId);
//
//        System.out.println(jsonObject.toString());

//        VideoService videoService = new VideoService();
//        videoService.setVideoDao(videoDao);
//        List<VideoBean> videoBeans = videoService.getVideo(FormatMap.newMap(new Object[]{"id"}, new Object[]{36}), 1, 1, "id");
//        System.out.println( "videoBeans" + videoBeans);
        Page<VideoBean> videoBeans = videoDao.findAll(PageRequest.of(2, 15, Sort.by(Sort.Order.desc("upDate"))));
        System.out.println(videoBeans.getContent());
        System.out.println("getTotalElements == > " + videoBeans.getTotalElements());
        System.out.println("getTotalPages == > " + videoBeans.getTotalPages());
        System.out.println("getNumberOfElements == > " + videoBeans.getNumberOfElements());
        System.out.println("getNumber == > " + videoBeans.getNumber());


    }

}
