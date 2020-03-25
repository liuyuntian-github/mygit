package com.example.hwmenu.dao;

import com.example.hwmenu.entity.UserEntity;
import org.springframework.stereotype.Component;

@Component
public interface  UserDao {
    public UserEntity getUserInfo(UserEntity userEntity);
}
