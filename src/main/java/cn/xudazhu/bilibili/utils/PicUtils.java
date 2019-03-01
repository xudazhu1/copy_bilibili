package cn.xudazhu.bilibili.utils;

import java.awt.Color;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;

import javax.imageio.ImageIO;

/**
 * 图片转换Utils
 *
 * @author xudaz
 * @version V1.0.0
 * @date 2018/11/23
 */
public class PicUtils {

    /**
     *  将png转换为jpg格式
     * @param sourcePath 源路径 png格式文件路径
     * @param targetPath 目标路径 要生成的jpg格式目标路径
     * @return 是否成功
     */
    public static Boolean transform(String sourcePath, String targetPath) {

        BufferedImage bufferedImage;
        try {
            // read image file
            bufferedImage = ImageIO.read(new File(sourcePath));
            // create a blank, RGB, same width and height, and a white
            // background
            BufferedImage newBufferedImage = new BufferedImage(bufferedImage.getWidth(), bufferedImage.getHeight(),
                    BufferedImage.TYPE_INT_RGB);
            // TYPE_INT_RGB:创建一个RBG图像，24位深度，成功将32位图转化成24位
            newBufferedImage.createGraphics().drawImage(bufferedImage, 0, 0, Color.WHITE, null);
            // write to jpeg file
            ImageIO.write(newBufferedImage, "jpg", new File(targetPath));
            System.out.println("转换 " + sourcePath + " --> " + targetPath + " Done");
            return true;
        } catch (IOException e) {
            e.printStackTrace();
            return false;
        }

    }

}
