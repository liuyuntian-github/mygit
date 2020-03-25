package com.example.hwmenu.dao;

import com.example.hwmenu.entity.OrderHistoryEntity;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

@Component
public interface OrderHistoryDao {
    public List<OrderHistoryEntity> getOrderHistory(Map map);

    public int saveOrderHistory(OrderHistoryEntity orderHistoryEntity);

    public int getOrderHistoryTotal(Map map);
}
