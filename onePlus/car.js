console.log('购物车页面加载成功了');
require.config({
    paths: {
        "jquery": "jquery-1.11.3",
        "jquery-cookie": "jquery.cookie",
        "parabola": "parabola",
        'goodscar': 'goodscar',
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
require(['nav', 'goodscar'], function (nav, goodscar) {
    //加载顶部导航栏
    nav.navLoad();
    //顶部导航效果
    nav.navTop();
    //加载购物车中商品信息
    goodscar.loadMsg();
    //购物车商品删除操作
    goodscar.removeHandleDelete();
    //购物车商品增减操作
    goodscar.numctlHandleChange();
    //选择商品
    goodscar.checkboxSelect();
    //全选按钮
    // goodscar.selectAll();
    goodscar.goodsCarSum();

})