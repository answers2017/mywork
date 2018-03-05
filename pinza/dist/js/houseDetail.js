'use strict';

/**
 * 产品方案
 */

// 滑块(这段放在接口返回成功 动态数据渲染页面之后)
var num = 4; //要根据实际接口返回的条数 这里假设都是4条
var ulWidth = (4.1 + 0.3) * num;
var ulWidth1 = (2.8 + 0.3) * num;
$('.scroller ul').css('width', ulWidth + 'rem');
$('.scroller1 ul').css('width', ulWidth1 + 'rem');
$('.scroller2 ul').css('width', ulWidth1 + 'rem');
$('.scroller3 ul').css('width', ulWidth1 + 'rem');
$('.scroller4 ul').css('width', ulWidth1 + 'rem');

$('.ui-scroller').each(function (i, el) {
    new fz.Scroll(el, {
        scrollY: false,
        scrollX: true
    });
});