package com.example.hwmenu.dao;

import com.example.hwmenu.entity.WeekMenuEntity;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface WeekMenuDao {
    /**
     * 查询菜单
     * @return
     */
    public List selectByWeekMenu();

    /**保存菜单
     * @param weekMenuEntity
     * @return
     */
    public int saveWeekMenu(WeekMenuEntity weekMenuEntity);

    /**
     * 修改菜单
     * @param weekMenuEntity
     * @return
     */
    public int updateWeekMenu(WeekMenuEntity weekMenuEntity);
}
