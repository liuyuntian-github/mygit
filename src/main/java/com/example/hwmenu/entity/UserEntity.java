package com.example.hwmenu.entity;

import lombok.Data;

@Data
public class UserEntity {
    private String userId;
    private String realName;
    private String createDate;
    private String updateDate;
    private String loginName;
    private String password;
    private String role;

}
