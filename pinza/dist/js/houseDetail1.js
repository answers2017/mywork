'use strict';

/**
 * 产品方案
 */
var slider = new fz.Scroll('.ui-slider', {
    role: 'slider',
    indicator: true,
    autoplay: true,
    interval: 3000
});

//初始化展示第一个
initProdInfo($('.fixed-nav li').eq(0).attr('id'));

$('.fixed-nav li').click(function () {
    $(this).addClass('active');
    $(this).siblings().removeClass('active');
    //展示对应商品信息
    //入参 请求类型等根据实际情况 应该要取到对应类型的id
    var id = $(this).attr('id');
    initProdInfo(id);
});

function initProdInfo(id) {
    var params = {
        id: id
    };
    $.ajax({
        type: "get",
        url: "/mockData/list1.json",
        data: params,
        success: function success(data) {
            if (data.length > 0) {
                $('.prod-box ul').html('');
                for (var i in data) {
                    var html = '<li>\n     <a href="detail.html"><img src="images/prod-2.png" width="100%" alt=""></a>\n                                    <p class="ui-nowrap pt5">' + data[i].productName + '</p>\n                                    <p class="pt15">\n                                        <span class="primary">\xA5<i class="money">' + data[i].price + '</i></span>\n                                        <i class="icon icon-cart-primary fr"></i>\n                                    </p>\n                                </li>';

                    $('.prod-box ul').append(html);
                }
                setTimeout(function () {
                    var h = $('.ui-scroller ul li').height();
                    var n = data.length;
                    $('.ui-scroller ul').css('height', h * n + 'px');
                    var scroll = new fz.Scroll('.ui-scroller', {
                        scrollY: true
                    });
                }, 300);
            }
        }
    });
}