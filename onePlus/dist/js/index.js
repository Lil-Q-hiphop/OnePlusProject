define(['jquery'], function ($) {
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