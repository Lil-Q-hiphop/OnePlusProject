console.log('加载成功');
require.config({
    paths: {
        "jquery": "jquery-1.11.3",
        "jquery-cookie": "jquery.cookie",
        "parabola": "parabola",
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
require(['nav', 'list', 'goodslist', 'index'], function (nav, list, goodslist, index) {
    //加载顶部导航栏
    nav.navTop();
    //顶部轮播图
    nav.banner();
    //加载中部下拉菜单
    list.menuList();
    //加载中部商品列表
    goodslist.dlgoods();
    //显示购物车中的商品总数
    goodslist.goodsCarSum();
    //主页的一些操作
    index.iCon();

})