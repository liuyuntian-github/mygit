package com.example.hwmenu.entity;

import lombok.Data;

/**
 * @author liu
 */
@Data
public class MenuEntity {
    /**
     * 菜单编号
     */
    private String menuId;
    /**
     * 食物名称
     */
    private String foodName;
    /**
     * 食物图片路径
     */
    private String foodUrl;
    /**
     * 状态
     */
    private String state;
    /**
     * 创建时间
     */
    private String createDate;
    /**
     * 更新时间
     */
    private String updateDate;
    /**
     * 价格（单价）
     */
    private double price;
    /**
     * 类型
     */
    private String foodType;

}
