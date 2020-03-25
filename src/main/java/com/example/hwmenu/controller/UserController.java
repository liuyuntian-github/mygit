package com.example.hwmenu.controller;

import com.example.hwmenu.entity.UserEntity;
import com.example.hwmenu.service.UserService;
import com.example.hwmenu.util.Validate;
import com.example.hwmenu.util.ValidateCodeUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;

@RequestMapping("/user")
@RestController
public class UserController {
    @Autowired
    UserService userService;
    @CrossOrigin
    @ResponseBody
    @RequestMapping(value="/login")
    public Map login(HttpServletRequest request){
        String name=request.getParameter("name");
        String password=request.getParameter("password");
        String validate=request.getParameter("validate");
        HttpSession session = request.getSession();
        String oldValidate=session.getAttribute("imgString").toString();
        Map map=new HashMap();
        String message="";
        if(!oldValidate.equals(validate)){
           message="验证码错误";
           map.put("code","0");
           map.put("message",message);
           return map;
        }
        UserEntity userEntity=new UserEntity();
        userEntity.setLoginName(name);
        userEntity.setPassword(password);
        map=userService.getUserInfo(userEntity);
        return map;
    }
    /**
     * 验证码刷新
     * @param request
     * @return
     */
    @CrossOrigin
    @ResponseBody
    @RequestMapping(value="/getValidate")
    public Object getValidate(HttpServletRequest request){
        Validate v = ValidateCodeUtil.getRandomCode();
        HttpSession session = request.getSession();
        if(v!=null){
            //将数据存储到session中
            session.setAttribute("imgString", v.getValue());
        }
        return v;
    }
}
