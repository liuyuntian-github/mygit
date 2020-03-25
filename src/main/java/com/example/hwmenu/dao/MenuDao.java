package com.example.hwmenu.dao;

import com.example.hwmenu.entity.MenuEntity;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * @author liu
 */
@Component
public interface MenuDao {
    /**
     * 查询
     * @return
     */
    public List<MenuEntity> selectByMenu(MenuEntity menuEntity);

    /**
     * 增加
     * @return
     */
    public int saveMenu(MenuEntity menuEntity);

    /**
     * 修改
     * @param menuEntity
     * @return
     */
    public int updateMenu(MenuEntity menuEntity);

    /**
     * 查找单个菜品
     * @param menuEntity
     * @return
     */
    public MenuEntity selectByMenuId(MenuEntity menuEntity);
}
