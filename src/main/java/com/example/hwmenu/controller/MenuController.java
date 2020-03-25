package com.example.hwmenu.controller;

import com.example.hwmenu.entity.MenuEntity;
import com.example.hwmenu.entity.WeekMenuEntity;
import com.example.hwmenu.service.MenuService;
import com.example.hwmenu.service.WeekMenuService;
import com.example.hwmenu.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.List;

@RequestMapping("/menu")
@RestController
public class MenuController {
    @Autowired
    MenuService menuService;
    @Autowired
    WeekMenuService weekMenuService;


    @CrossOrigin
    @ResponseBody
    @RequestMapping(value="/selectByMenuShow")
    public List selectByMenuShow(HttpServletRequest request){
        String foodName=request.getParameter("foodName");
        String price=request.getParameter("price");
        MenuEntity menuEntity =new MenuEntity();
        menuEntity.setFoodName(foodName);
        Double priceDouble=0.00;
        if(!"".equals(price)){
            priceDouble=Double.parseDouble(price);
        }
        menuEntity.setPrice(priceDouble);
        List menuList=menuService.selectByMenuShow(menuEntity);
       return menuList;
    }


    @CrossOrigin
    @ResponseBody
    @RequestMapping(value="/selectByMenuDelete",produces="application/json;charset=utf-8",method={RequestMethod.POST})
    public List<MenuEntity> selectByMenuDelete(@RequestBody MenuEntity menuEntity){
        return menuService.selectByMenuDelete(menuEntity);
    }


    @CrossOrigin
    @ResponseBody
    @RequestMapping(value="/saveMenu")
    public int saveMenu(@RequestParam(value = "img", required = false) MultipartFile file, HttpServletRequest request){
        String menuId=request.getParameter("menuId");
        String foodName=request.getParameter("foodName");
        String price=request.getParameter("price");
        String foodType=request.getParameter("foodType");
        Double priceDouble=0.00;
        if(!"".equals(price)){
            priceDouble=Double.parseDouble(price);
        }
        MenuEntity menuEntity=new MenuEntity();
        menuEntity.setMenuId(menuId);
        menuEntity.setPrice(priceDouble);
        menuEntity.setFoodName(foodName);
        menuEntity.setFoodType(foodType);
        menuEntity.setFoodUrl(UploadImgUtil.writeImgToUpload(file, TaskCodeUtil.getCode("img-")));
        return menuService.saveMenu(menuEntity);
    }

    @CrossOrigin
    @ResponseBody
    @RequestMapping(value="/updateMenu")
    public int updateMenu(@RequestParam(value = "img", required = false) MultipartFile file, HttpServletRequest request){
        String menuId=request.getParameter("menuId");
        String foodName=request.getParameter("foodName");
        String price=request.getParameter("price");
        String foodType=request.getParameter("foodType");
        Double priceDouble=0.00;
        if(!"".equals(price)){
            priceDouble=Double.parseDouble(price);
        }
        MenuEntity menuEntity=new MenuEntity();
        menuEntity.setMenuId(menuId);
        menuEntity.setPrice(priceDouble);
        menuEntity.setFoodName(foodName);
        menuEntity.setFoodType(foodType);
        menuEntity.setFoodUrl(UploadImgUtil.writeImgToUpload(file, TaskCodeUtil.getCode("img-")));
        return menuService.updateMenu(menuEntity);
    }

    @CrossOrigin
    @ResponseBody
    @RequestMapping(value="/updateMenuDelete",produces="application/json;charset=utf-8",method={RequestMethod.POST})
    public int updateMenuDelete(HttpServletRequest request){
        return menuService.updateMenuDelete(request);
    }

    @CrossOrigin
    @ResponseBody
    @RequestMapping(value="/selectByWeekMenu")
    public List<WeekMenuEntity> selectByWeekMenu(){
        List<WeekMenuEntity> weekMenuEntityList= weekMenuService.selectByWeekMenu();
        return weekMenuEntityList;
    }

    @CrossOrigin
    @ResponseBody
    @RequestMapping(value="/selectByType")
    public List selectByType(HttpServletRequest request){
        String type=request.getParameter("foodType");
        MenuEntity menuEntity =new MenuEntity();
        menuEntity.setState("0");
        menuEntity.setFoodType(type);
        List menuList=menuService.selectByMenuShow(menuEntity);
        return menuList;
    }

    @CrossOrigin
    @ResponseBody
    @RequestMapping(value="/updateWeekMenu")
    public int updateWeekMenu(HttpServletRequest request){
        String weekId=request.getParameter("weekId");
        String meat=request.getParameter("meat");
        String element=request.getParameter("element");
        String soup=request.getParameter("soup");
        String stapleFood=request.getParameter("stapleFood");
        WeekMenuEntity weekMenuEntity=new WeekMenuEntity();
        weekMenuEntity.setWeekId(weekId);
        weekMenuEntity.setMeat(meat);
        weekMenuEntity.setElement(element);
        weekMenuEntity.setSoup(soup);
        weekMenuEntity.setStapleFood(stapleFood);
        int count=weekMenuService.updateWeekMenu(weekMenuEntity);
        return count;
    }

}
