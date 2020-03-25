package com.example.hwmenu.entity;

import lombok.Data;

@Data
public class WeekMenuEntity {
    /**
     * 星期
     */
    private String week;
    /**
     * 周菜单ID
     */
    private String weekId;
    /**
     * 荤
     */
    private String meat;
    /**
     * 素
     */
    private String element;
    /**
     * 汤
     */
    private String soup;
    /**
     * 主食
     */
    private String stapleFood;
    /**
     * 总计（钱）
     */
    private double total;

    private String meatId;
    private String elementId;
    private String soupId;
    private String stapleFoodId;

}
