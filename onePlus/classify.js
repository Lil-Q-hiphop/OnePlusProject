console.log('商品分类页加载成功了');
require.config({
    paths: {
        "jquery": "jquery-1.11.3",
        "jquery-cookie": "jquery.cookie",
        "parabola": "parabola",
        'desc': 'desc',
        'index': 'index',
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
require(['desc', 'nav', 'index', 'goodsclass'], function (desc, nav, index, goodsclass) {
    nav.navLoad();
    //顶部导航栏
    nav.navTop();
    //购物车商品数量
    desc.goodsCarSum();
    //主页的一些操作
    index.iCon();
    //加载不同分类的商品
    goodsclass.loadClass();

})