'use strict';

/**
 * 首页
 */

$(document).ready(function () {
    var isClickMade = false,
        //判断是否通过点击定制按钮绑定用户 后面跳转需要
    username = localStorage.getItem('username');

    //初始化判断是否登录 假设登录信息存储在缓存中的
    if (username) {
        $('#username').show().html(username);
    } else {
        $('#login').show();
    }

    //登录相关
    $('body').on('click', '#login', function () {
        //显示弹框登录
        $(".login-dialog").dialog("show");
    });
    $('body').on('click', '#btn-login', function () {
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
        $.ajax({
            type: "POST",
            url: "",
            data: {},
            success: function success(data) {
                //成功 返回用户信息
                if (data) {
                    $.tips({
                        content: '登录成功',
                        stayTime: 2000,
                        type: "success"
                    });
                    $('#login').hide();
                    $('#username').show().html(data.username);
                    //将用户信息存储在缓存中 方便下次直接登获取
                    localStorage.setItem('username', data.username);
                    //关闭登录弹框
                    $(".ui-dialog").dialog("hide");
                    //是否是通过定制按钮 绑定用户
                    if (isClickMade) {
                        //判断是否添加方案
                        var city = $('select[name=city]').val(),
                            program = $('select[name=program]').val(),
                            building = $('select[name=building]').val(),
                            unit = $('select[name=unit]').val(),
                            room = $('select[name=room]').val();
                        if (city || program || building || unit || room) {
                            //具体判断逻辑 根据实际情况
                            //跳转下一个页面
                            window.location.href = '';
                        } else {
                            $.tips({
                                content: '该户型未添加方案',
                                stayTime: 2000,
                                type: "warn"
                            });
                        }
                    }
                }
            }
        });
    });

    //定制
    $('body').on('click', '#btn-made', function () {
        //判断是否绑定用户
        if (username) {
            //判断用户是否添加方案
            var city = $('select[name=city]').val(),
                program = $('select[name=program]').val(),
                building = $('select[name=building]').val(),
                unit = $('select[name=unit]').val(),
                room = $('select[name=room]').val();
            if (city || program || building || unit || room) {
                //具体判断逻辑 根据实际情况
                //跳转下一个界面
                window.location.href = '';
            } else {
                $.tips({
                    content: '该户型未添加方案',
                    stayTime: 2000,
                    type: "warn"
                });
            }
        } else {
            $(".login-dialog").dialog("show");
            isClickMade = true;
        }
    });
});