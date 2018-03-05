"use strict";

/**
 * 快速下单
 */

//初始化购物车数量 放公共js中
$(document).ready(function () {
    //选择方案名称后展示列表
    $('select[name=groupName]').change(function () {
        //入参 请求类型等根据实际情况
        var params = {};
        $.ajax({
            type: "get",
            url: "/mockData/list.json",
            data: params,
            success: function success(data) {
                if (data.length > 0) {
                    $('.thead').show();
                    $('.balance-nav').show();
                    $('.module').remove();
                    for (var i in data) {
                        var html = "<div class=\"module\">\n                                <h1>\n                                    <label class=\"label-group\" for=\"" + data[i].id + "\">\n                                        <i class=\"icon\"></i>\n                                    </label>\n                                    <input type=\"checkbox\" id=\"" + data[i].id + "\" hidden>\n                                    " + data[i].groupName + "\n                                </h1>";
                        for (var j in data[i].list) {
                            html = html + ("<ul>\n                                                <li>\n                                                    <label class=\"label-item\" for=\"" + data[i].list[j].id + "\">\n                                                        <i class=\"icon\"></i>\n                                                    </label>\n                                                    <input type=\"checkbox\" id=\"" + data[i].list[j].id + "\" hidden>\n                                                </li>\n                                                <li>" + data[i].list[j].productNo + "</li>\n                                                <li>" + data[i].list[j].productName + "</li>\n                                                <li>" + data[i].list[j].space + "</li>\n                                                <li>" + data[i].list[j].brand + "</li>\n                                                <li>" + data[i].list[j].unit + "</li>\n                                                <li class=\"item-num\">1</li>\n                                                <li class=\"primary\">\xA5" + data[i].list[j].price + "</li>\n                                                <li class=\"primary\">\xA5<span class=\"item-amount\">" + data[i].list[j].price + "</span></li>\n                                           </ul>");
                        }
                        html = html + '</div>';
                        $('.thead').after(html);
                        $('.module').each(function () {
                            $(this).find('ul').eq(0).css('border-top-width', '2px');
                        });
                    }
                }
            }
        });
    });

    var totalNum = 0; //总件数
    var totalAmount = 0; //总金额

    //item check
    $('body').on('click', '.label-item', function () {
        if ($(this).hasClass('is-checked')) {
            $(this).removeClass('is-checked');
            //组全选取消
            $(this).parent().parent().siblings().find('.label-group').removeClass('is-checked');
            $(this).parent().parent().siblings().find('.label-group + input[type=checkbox]').prop('checked', false);
            //全选取消
            $('label[for=checkAll]').removeClass('is-checked');
            $('label[for=checkAll] + input[type=checkbox]').prop('checked', false);
            //计算件数和金额
            totalNum -= parseInt($(this).parent().siblings('.item-num').html());
            totalAmount -= parseInt($(this).parent().siblings().find('.item-amount').html());
        } else {
            $(this).addClass('is-checked');
            //判断组是否选中
            var total = $(this).parent().parent().parent().find('.label-item').length;
            var checkedNum = $(this).parent().parent().parent().find('.label-item.is-checked').length;
            if (total == checkedNum) {
                $(this).parent().parent().siblings().find('.label-group').addClass('is-checked');
                $(this).parent().parent().siblings().find('.label-group + input[type=checkbox]').prop('checked', true);
            }
            //判断是否全选中
            var total1 = $('.label-item').length;
            var checkedNum1 = $('.label-item.is-checked').length;
            if (total1 == checkedNum1) {
                $('label[for=checkAll]').addClass('is-checked');
                $('label[for=checkAll] + input[type=checkbox]').prop('checked', true);
            }
            //计算件数和金额
            totalNum += parseInt($(this).parent().siblings('.item-num').html());
            totalAmount += parseInt($(this).parent().siblings().find('.item-amount').html());
        }
        $('#totalNum').html(totalNum);
        $('#totalAmount').html('¥' + totalAmount);
    });

    //组全选和全不选
    $('body').on('click', '.label-group', function () {
        if ($(this).hasClass('is-checked')) {
            $(this).removeClass('is-checked');
            $(this).parent().siblings('ul').find('.label-item').removeClass('is-checked');
            $(this).parent().siblings('ul').find('.label-item + input[type=checkbox]').prop('checked', false);
            //全选取消
            $('label[for=checkAll]').removeClass('is-checked');
            $('label[for=checkAll] + input[type=checkbox]').prop('checked', false);
        } else {
            $(this).addClass('is-checked');
            $(this).parent().siblings('ul').find('.label-item').addClass('is-checked');
            $(this).parent().siblings('ul').find('.label-item + input[type=checkbox]').prop('checked', true);
            //判断是否全选中
            var total = $('.label-item').length;
            var checkedNum = $('.label-item.is-checked').length;
            if (total == checkedNum) {
                $('label[for=checkAll]').addClass('is-checked');
                $('label[for=checkAll] + input[type=checkbox]').prop('checked', false);
            }
        }
        count();
    });

    //全选和全不选
    $('body').on('click', 'label[for=checkAll]', function () {
        if ($(this).hasClass('is-checked')) {
            $(this).removeClass('is-checked');
            $('.label-item').removeClass('is-checked');
            $('.label-group').removeClass('is-checked');
            $('.label-item + input[type=checkbox]').prop('checked', false);
            $('.label-group + input[type=checkbox]').prop('checked', false);
        } else {
            $(this).addClass('is-checked');
            $('.label-item').addClass('is-checked');
            $('.label-group').addClass('is-checked');
            $('.label-item + input[type=checkbox]').prop('checked', true);
            $('.label-group + input[type=checkbox]').prop('checked', true);
        }
        count();
    });

    //结算
    $('.btn-submit').click(function () {
        var checkedNum = $('.label-item + input[type=checkbox]:checked').length;
        if (checkedNum == 0) {
            $.tips({
                content: '您还未选中任何商品',
                stayTime: 2000,
                type: "warn"
            });
            return;
        }
        //接口
        //totalNum totalAmount 能取到
        //选中item的id 这里给你拿一下
        var itemIds = [];
        $('.label-item + input[type=checkbox]:checked').each(function () {
            itemIds.push($(this).attr('id'));
        });
        console.log(itemIds);
    });

    // 计算金额和件数
    function count() {
        totalNum = 0;
        totalAmount = 0;
        $('.label-item + input[type=checkbox]:checked').each(function () {
            totalNum += parseInt($(this).parent().siblings('.item-num').html());
            totalAmount += parseInt($(this).parent().siblings().find('.item-amount').html());
        });
        $('#totalNum').html(totalNum);
        $('#totalAmount').html('¥' + totalAmount);
    }
});