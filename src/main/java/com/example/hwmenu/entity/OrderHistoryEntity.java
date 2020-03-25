package com.example.hwmenu.entity;

import lombok.Data;

@Data
public class OrderHistoryEntity {
    /**
     * 历史记录ID
     */
    private String historyId;
    /**
     * 星期表ID
     */
    private String weekId;
    /**
     * 菜品ID 1,2,3
     */
    private String menuArrayId;
    /**
     * 价格
     */
    private String priceTotal;
    /**
     * 创建时间
     */
    private String createDate;
    /**
     * 状态
     */
    private String state;

}
