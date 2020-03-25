package com.example.hwmenu.service;

import com.example.hwmenu.dao.MenuDao;
import com.example.hwmenu.dao.WeekMenuDao;
import com.example.hwmenu.entity.MenuEntity;
import com.example.hwmenu.entity.WeekMenuEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Service
public class WeekMenuService {
    @Autowired
    WeekMenuDao weekMenuDao;
    @Autowired
    MenuDao menuDao;
    public List selectByWeekMenu(){
        return weekMenuDao.selectByWeekMenu();
    }

    /**
     * 更新菜单
     * @param weekMenuEntity
     * @return
     */
    public int updateWeekMenu(WeekMenuEntity weekMenuEntity){
//        double meatPrice=getPrice(weekMenuEntity.getMeat());
//        double elementPrice=getPrice(weekMenuEntity.getElement());
//        double soupPrice=getPrice(weekMenuEntity.getSoup());
//        double stapleFoodPrice=getPrice(weekMenuEntity.getStapleFood());
//        double total=meatPrice+elementPrice+soupPrice+stapleFoodPrice;
//        weekMenuEntity.setTotal(total);
        int count=weekMenuDao.updateWeekMenu(weekMenuEntity);
        return count;
    }

    /**
     * 获取价格
     * @param menuId
     * @return
     */
    public double getPrice(String menuId){
        double price=0.00;
        if(!"".equals(menuId)){
            MenuEntity menuEntity=new MenuEntity();
            menuEntity.setMenuId(menuId);
            price=menuDao.selectByMenuId(menuEntity).getPrice();
        }

        return price;
    }
}
