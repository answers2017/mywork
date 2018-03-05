'use strict';

/**
 * 购物清单
 */

//初始化购物车数量 放公共js中

$('.module').each(function () {
    $(this).find('ul').eq(0).css('border-top-width', '2px');
});

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
    }
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
});

//删除
$('.delete').click(function () {
    var checkedNum = $('.label-item + input[type=checkbox]:checked').length;
    if (checkedNum == 0) {
        $.tips({
            content: '请选择需要删除的项',
            stayTime: 2000,
            type: "warn"
        });
        return;
    }
    //接口
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
});