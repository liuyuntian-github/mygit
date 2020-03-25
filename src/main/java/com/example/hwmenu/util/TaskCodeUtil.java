package com.example.hwmenu.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Date;
import java.util.Random;

public class TaskCodeUtil {
    private TaskCodeUtil(){ };
    /**
     * 生成任务编号，精度为毫秒级别
     * @param beforeCode
     *  首字母
     * @return
     */

    public static synchronized String getCode(String beforeCode){
        StringBuilder sb =new StringBuilder("");
        sb.append(beforeCode);
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
        sb.append(sdf.format(new Date()));
        //得到当日的00：00：00 的时间
        LocalDateTime today = LocalDateTime.of(LocalDate.now(), LocalTime.of(0, 0, 0));
        //得到当前时间
        LocalDateTime now = LocalDateTime.now();
        //等到当前与当天0时的毫秒差值  拼接线程号  +四位随机数
        long millis = Duration.between(today, now).toMillis();
        String unCode = ""+millis+Thread.currentThread().getId()+new Random().nextInt(9999);
        long finResultTime = Long.parseLong(unCode);
        //将差值转化为32进制并转化为大写，若不满足6位数字补0
        String endCode = "000000000"+Long.toString(finResultTime, 32).toUpperCase();
        sb.append(endCode.substring(endCode.length()-9));
        return sb.toString();
    }


    /**
     * 获取系统当前时间yyyy-MM-dd HH:mm:ss
     * @return
     */
    public static  String getTime(){
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//设置日期格式
        //System.out.println(df.format(new Date()));// new Date()为获取当前系统时间
        String time=df.format(new Date());
        return time;
    }

    /**
     * yyyy-MM-dd
     * @return
     */
    public static  String getTimeDate(){
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");//设置日期格式
        //System.out.println(df.format(new Date()));// new Date()为获取当前系统时间
        String time=df.format(new Date());
        return time;
    }
    public static String getYMD(String timeString) throws ParseException {
        SimpleDateFormat formatter = new SimpleDateFormat( "yyyy-MM-dd ");
        Date date = formatter.parse(timeString);
        SimpleDateFormat Format = new SimpleDateFormat("yyyy-MM-dd");
        String time = Format.format(date);
        System.out.println(time);
        System.out.println("转成String为"+time.toString());
        return time;

    }
}
