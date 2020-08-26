define(['jquery'], function ($) {
    //右下角微信图标的显示与隐藏
    function iCon() {
        var oWx = $("#page-footer .top").find('.wechat');
        oWx.hover(function () {
            $("#page-footer .top").find('.wechat-qr-code').css('display', 'block');
        }, function () {
            $("#page-footer .top").find('.wechat-qr-code').css('display', 'none');

        })
    }
    return {
        iCon: iCon,
    }

})