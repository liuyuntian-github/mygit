package com.example.hwmenu.service;

import com.example.hwmenu.dao.MenuDao;
import com.example.hwmenu.entity.MenuEntity;
import com.example.hwmenu.util.TaskCodeUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.List;


/**
 * @author liu
 */
@Service
public class MenuService {
    @Autowired
    MenuDao menuDao;

    /**
     * 菜单显示数据
     * @return
     */
    public List<MenuEntity> selectByMenuShow(MenuEntity menuEntity){
        menuEntity.setState("0");
        List<MenuEntity> menuEntityList=menuDao.selectByMenu(menuEntity);
        return menuEntityList;
    }
    /**
     * 菜单删除数据
     * @return
     */
    public List<MenuEntity> selectByMenuDelete(MenuEntity menuEntity){
        menuEntity.setState("1");
        menuEntity.setUpdateDate(TaskCodeUtil.getTime());
        List<MenuEntity> menuEntityList=menuDao.selectByMenu(menuEntity);
        return menuEntityList;
    }

    /**
     * 增加菜单数据
     * @param menuEntity
     * @return
     */
    public int saveMenu(MenuEntity menuEntity){
        String menuId="";
        switch (menuEntity.getFoodType()){
            case "1":
                menuId="meat-";
                break;
            case "2":
                menuId="element-";
                break;
            case "3":
                menuId="soup-";
                break;
            case "4":
                menuId="stapleFood-";
                break;
        }
        menuEntity.setMenuId(TaskCodeUtil.getCode(menuId));
        menuEntity.setCreateDate(TaskCodeUtil.getTime());
        menuEntity.setState("0");
        int saveCount=menuDao.saveMenu(menuEntity);
        return saveCount;
    }

    /**
     * 修改菜单数据
     * @param menuEntity
     * @return
     */
    public int updateMenu(MenuEntity menuEntity){
        menuEntity.setUpdateDate(TaskCodeUtil.getTime());
        int updateCount=menuDao.updateMenu(menuEntity);
        return updateCount;
    }
    /**
     * 修改菜单数据(删除)
     * @param request
     * @return
     */
    public int updateMenuDelete(HttpServletRequest request){
        MenuEntity menuEntity=new MenuEntity();
        menuEntity.setMenuId(request.getParameter("menuId"));
        menuEntity.setState("1");
        menuEntity.setUpdateDate(TaskCodeUtil.getTime());
        int updateCount=menuDao.updateMenu(menuEntity);
        return updateCount;
    }
}
