package com.example.hwmenu;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
@MapperScan("com.example.hwmenu.dao")
@SpringBootApplication
public class HwmenuApplication {
    public static void main(String[] args) {
        SpringApplication.run(HwmenuApplication.class, args);
    }

}
