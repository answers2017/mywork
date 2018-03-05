"use strict";

/**
 * 登录
 */

//记住密码
var isAutoLogin = false;
//初始化判断上次是否勾选记住密码 勾选自动填充用户信息
if (localStorage.getItem("rmbUser") == true) {
    $('input[name="name"]').val(localStorage.getItem("name"));
    $('input[name="password"]').val(localStorage.getItem("password"));
}
$('#rememberPwd').click(function () {
    if ($(this).hasClass('icon-check-on')) {
        $(this).removeClass('icon-check-on').addClass('icon-check');
        isAutoLogin = false;
    } else {
        $(this).removeClass('icon-check').addClass('icon-check-on');
        isAutoLogin = true;
    }
});

//提交表单
$('#login').click(function () {
    //校验
    var name, password;
    name = $('input[name="name"]').val().trim(), password = $('input[name="password"]').val().trim();
    if (name.length == 0) {
        $.tips({
            content: '请输入账号',
            stayTime: 2000,
            type: "warn"
        });
        return;
    }
    if (password.length == 0) {
        $.tips({
            content: '请输入密码',
            stayTime: 2000,
            type: "warn"
        });
        return;
    }
    //接口

    //记住密码 下次自动登录
    if (isAutoLogin) {
        //将登录信息保存在缓存 自行修改
        localStorage.setItem('rmbUser', true);
        localStorage.setItem('name', name);
        localStorage.setItem('password', password);
    } else {
        localStorage.setItem('rmbUser', false);
    }
});