package com.example.hwmenu.util;

import java.io.Serializable;

/**
 *
 * @ClassName: Validate
 * @Description: 验证码类
 * @author chenhx
 * @date 2017年11月14日 上午11:35:34
 */
public class Validate implements Serializable {
    private static final long serialVersionUID = 1L;
    private String Base64Str;		//Base64 值
    private String value;			//验证码值

    public String getBase64Str() {
        return Base64Str;
    }
    public void setBase64Str(String base64Str) {
        Base64Str = base64Str;
    }
    public String getValue() {
        return value;
    }
    public void setValue(String value) {
        this.value = value;
    }
}
