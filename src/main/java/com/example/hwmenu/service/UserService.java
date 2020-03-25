package com.example.hwmenu.service;

import com.example.hwmenu.dao.UserDao;
import com.example.hwmenu.entity.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class UserService {
    @Autowired
    UserDao userDao;
    public Map getUserInfo(UserEntity userEntity){
        Map resultMap=new HashMap();
        userEntity.setRole("0");
        UserEntity userEntityNew=userDao.getUserInfo(userEntity);
        if(userEntityNew==null){
            resultMap.put("code","0");
            resultMap.put("message","用户名或密码不正确");
        }else{
            resultMap.put("code","1");
            resultMap.put("message","登录成功");
            resultMap.put("user",userEntityNew);
        }
        return resultMap;
    }
}
