package com.example.hwmenu.util;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
@Component
public class UploadImgUtil {
    //@Value("${img.path}")
    public static String path="D:\\hwmenu\\src\\main\\resources\\static\\img\\";

    /**
     * 保存图像
     *
     * @param img
     * @param userName
     * @return
     */
    public static String writeImgToUpload(MultipartFile img, String userName) {
        // 写入目录文件
        // 获取文件格式
        if(img==null){
            return "";
        }
        String suffix = img.getOriginalFilename().substring(img.getOriginalFilename().lastIndexOf("."));

        // 目标文件路径+文件名
        String imgFile = path + userName + suffix;
        File toFile = new File(imgFile);
        if (!toFile.getParentFile().exists()) {
            // when file is not existed, will create.
            toFile.mkdirs();
        }
        // write to target file.
        try {
            img.transferTo(toFile);
            return userName + suffix;
        } catch (IOException e) {
            e.printStackTrace();
            return "";
        }

    }

}
