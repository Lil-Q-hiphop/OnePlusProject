console.log('详情页加载成功了');
require.config({
    paths: {
        "jquery": "jquery-1.11.3",
        "jquery-cookie": "jquery.cookie",
        "parabola": "parabola",
        'desc': 'desc',
    },
    shim: {
        //设置依赖关系  先引入jquery.js  然后在隐去jquery-cookie
        "jquery-cookie": ["jquery"],
        //声明当前模块不遵从AMD
        "parabola": {
            exports: "_"
        }
    }
})
require(['desc', 'nav'], function (desc, nav) {
    //加载详情页信息
    desc.msgLoad();
    //选择商品操作
    desc.sc_btnHandleClick();
    //加载顶部导航栏
    nav.navLoad();
    //顶部导航效果
    nav.navTop();
    //图片放大镜
    // desc.imgHandleExpand();
    desc.goodsCarSum();

})