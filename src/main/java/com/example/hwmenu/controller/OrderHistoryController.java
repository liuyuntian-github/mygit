package com.example.hwmenu.controller;

import com.example.hwmenu.entity.OrderHistoryEntity;
import com.example.hwmenu.service.OrderHistoryService;
import com.example.hwmenu.util.MenuArryUtil;
import com.example.hwmenu.util.PageHelper;
import com.example.hwmenu.util.PageUtil;
import com.example.hwmenu.util.TaskCodeUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

@RequestMapping("/history")
@RestController
public class OrderHistoryController {
    @Autowired
    OrderHistoryService orderHistoryService;
    @CrossOrigin
    @ResponseBody
    @RequestMapping(value="/getOrderHistory")
    public PageHelper<OrderHistoryEntity> getOrderHistory(HttpServletRequest request){
        String pagerq=request.getParameter("page");
        String sizerq=request.getParameter("limit");
        String offsetrq=request.getParameter("offset");
        int page=Integer.parseInt(pagerq);
        int size=Integer.parseInt(sizerq);
        int offset=Integer.parseInt(offsetrq);
        Map paramMap= PageUtil.getParameterMapBootStrap(offset,size);
        List orderHistoryEntityList=orderHistoryService.getOrderHistory(paramMap);
        int total=orderHistoryService.getOrderHistoryTotal(paramMap);
        PageHelper<OrderHistoryEntity> pageHelper=new PageHelper<OrderHistoryEntity>();
        pageHelper.setRows(orderHistoryEntityList);
        pageHelper.setTotal(total);
        return pageHelper;
    }
    @CrossOrigin
    @ResponseBody
    @RequestMapping(value="/saveOrderHistory")
    public int saveOrderHistory(HttpServletRequest request){
        String weekId=request.getParameter("weekId");
        String price=request.getParameter("price");
        String meatId=request.getParameter("meatId");
        String elementId=request.getParameter("elementId");
        String soupId=request.getParameter("soup");
        String stapleFoodId=request.getParameter("stapleFood");
        OrderHistoryEntity orderHistoryEntity=new OrderHistoryEntity();
        orderHistoryEntity.setHistoryId(TaskCodeUtil.getCode("history-"));
        orderHistoryEntity.setCreateDate(TaskCodeUtil.getTime());
        orderHistoryEntity.setMenuArrayId(MenuArryUtil.getMenuArry(meatId,elementId,soupId,stapleFoodId));
        orderHistoryEntity.setPriceTotal(price);
        orderHistoryEntity.setWeekId(weekId);
        int count=orderHistoryService.saveOrderHistory(orderHistoryEntity);
        return count;
    }
}
