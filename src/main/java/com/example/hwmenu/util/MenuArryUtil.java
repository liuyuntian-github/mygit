package com.example.hwmenu.util;


import com.alibaba.fastjson.JSONObject;
public class MenuArryUtil {
    public static String getMenuArry(String meatId,String elementId,String soupId,String stapleFoodId){
        JSONObject jsonObject=new JSONObject();
        jsonObject.put("meatId",meatId);
        jsonObject.put("elementId",elementId);
        jsonObject.put("soupId",soupId);
        jsonObject.put("stapleFoodId",stapleFoodId);
        return jsonObject.toString();
    }
}
