'use strict';

/**
 * 产品方案
 */

// 滑块(这段放在接口返回成功 动态数据渲染页面之后)
// 假设方案数4个
var num = 4;
var ulWidth = (4 + 0.3) * num;
$('.ui-scroller ul').css('width', ulWidth + 'rem');

var scroll = new fz.Scroll('.ui-scroller', {
  scrollY: false,
  scrollX: true
});