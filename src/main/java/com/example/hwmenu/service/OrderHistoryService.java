package com.example.hwmenu.service;

import com.example.hwmenu.dao.OrderHistoryDao;
import com.example.hwmenu.entity.OrderHistoryEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class OrderHistoryService {
    @Autowired
    OrderHistoryDao orderHistoryDao;
    public int saveOrderHistory(OrderHistoryEntity orderHistoryEntity){
        int count=orderHistoryDao.saveOrderHistory(orderHistoryEntity);
        return count;
    }
    public List getOrderHistory(Map map){
        List orderHistoryEntityList=orderHistoryDao.getOrderHistory(map);
        return orderHistoryEntityList;
    }
    public int getOrderHistoryTotal(Map map){
        int total=orderHistoryDao.getOrderHistoryTotal(map);
        return total;
    }
}
