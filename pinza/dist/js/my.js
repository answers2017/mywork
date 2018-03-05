'use strict';

/**
 * 产品方案 详情
 */

//时间
$('#startTime').datePicker({
    beginyear: 2010, //判断日期类型，给出合理区间
    endyear: new Date().getFullYear(), //日期--年--份结束
    theme: 'date',
    callBack: function callBack() {}
});
$('#endTime').datePicker({
    beginyear: 2010, //判断日期类型，给出合理区间
    endyear: new Date().getFullYear(), //日期--年--份结束
    theme: 'date',
    callBack: function callBack() {}
});

//分页
var currentPage = 1; //当前页
var pageSize = 10; //每页个数
var total = 30; //总条数
query(currentPage); //初始化加载数据

setTimeout(function () {
    jq('.pagination-box').pagination({
        coping: true,
        totalData: total,
        showData: 10,
        callback: function callback(api) {
            query(api.getCurrent());
        }
    });
}, 1000);

function query(currentPage) {
    //接口 获取数据加载
    $.ajax({
        type: "POST",
        dataType: "",
        url: '',
        data: {},
        success: function success(data) {
            $("tbody").html('');
            for (var i in data) {
                var html = '<tr><td>' + data[i].attr + '</td></tr>'; //拼接html
                $("tbody").append(html); //将返回的数据追加到表格
            }
        }
    });
}

//收款
$('body').on('click', '.receive-money', function () {
    //显示弹框
    $(".receive-dialog").dialog("show");
});
$('input[type=file]').change(function () {
    var formdata = new FormData();
    formdata.append("file", $("#file")[0].files[0]);
    $.ajax({
        type: 'post',
        url: '#',
        data: formdata,
        cache: false,
        processData: false, // 不处理发送的数据，因为data值是Formdata对象，不需要对数据做处理
        contentType: false, // 不设置Content-type请求头
        success: function success(data) {
            //得到图片路径 保存
            $('.img .add').hide();
            $('.img img').remove();
            var html = '<img src="' + data.url + '">';
            $('.img').append(html);
        },
        error: function error(data) {
            $.tips({
                content: data.msg,
                stayTime: 2000,
                type: "warn"
            });
        }
    });
});
$('.receive-dialog #btn-submit').click(function () {
    var money = $('input[name="money"]').val().trim();
    if (money.length == 0) {
        $.tips({
            content: '请输入第一次收款金额',
            stayTime: 2000,
            type: "warn"
        });
        return;
    }
    //接口
    //成功之后 关闭弹框 提示
});