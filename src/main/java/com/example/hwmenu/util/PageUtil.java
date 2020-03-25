package com.example.hwmenu.util;

import java.util.HashMap;
import java.util.Map;

public class PageUtil {
    /**
     * 获得起始每页行数和结束行数放入参数Map中
     * @param size
     * @param page
     * @return
     */
    public static Map getParameterMap(int size,int page){
        //起始行数
        int startRow=(page-1)*size;
        //结束行数
       // int endRow=page*size;
        Map paramMap=new HashMap();
        paramMap.put("startRow",startRow);
        paramMap.put("page",page);
        return  paramMap;
    }


    /**
     * 获得起始每页行数和结束行数放入参数Map中
     * @param offset
     * @param size
     * @return
     */
    public static Map getParameterMapBootStrap(int offset,int size){
        //起始行数
        //int startRow=(page-1)*size;
        //结束行数
        // int endRow=page*size;
        Map paramMap=new HashMap();
        paramMap.put("startRow",offset);
        paramMap.put("size",size);
        return  paramMap;
    }
}
