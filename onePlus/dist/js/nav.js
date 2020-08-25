define(['jquery'], function ($) {
    function navTop() {
        var aLis = $('#header .center .page');
        // console.log(aLis);
        var aDivs = $('#header .center .page').find('div');
        aDivs.css('display', 'none');
        aLis.hover(function () {
            //⭐index()是返回当前节点在兄弟节点中的位置下标！！
            aDivs.eq($(this).closest('li').index()).css('display', 'flex');
            // aDivs.css('display', 'none').eq($(this).index()).css('display', 'flex')
        }, function () {
            aDivs.css('display', 'none');
        })
    }
    //轮播图轮播效果
    function banner() {
        var iNum = 0;
        var s = $('.imgBox .imgList').length;
        var timer = null;
        function auto() {
            timer = setInterval(function () {
                iNum++;
                if (iNum == s) {
                    iNum = 0;
                }

                tab();
            }, 2000)

        }
        auto();
        function tab() {
            $('.imgBox .imgList').eq(iNum).fadeIn(500).siblings().fadeOut(500);
        }
        $('.left').click(function () {
            clearInterval(timer);
            if (iNum <= -1) {
                iNum = s - 1;
            }
            iNum--;
            auto();
            tab();

        })
        $('.right').click(function () {
            clearInterval(timer);
            if (iNum >= s) {
                iNum = 0;
            }
            iNum++;
            auto();
            tab();

        })
        $('.imgBox').mouseenter(function () {
            clearInterval(timer);
        }).mouseleave(function () {
            auto();
        })
    }
    return {
        navTop: navTop,
        banner: banner,
    }
})