console.log('登录页加载成功');
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
require(['nav', 'index', 'login'], function (nav, index, login) {
    //加载顶部导航栏
    nav.navLoad();
    //顶部导航效果
    nav.navTop();
    //主页的一些操作
    index.iCon();
    //登录
    login.loadUser();

})