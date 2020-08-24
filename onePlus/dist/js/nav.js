define(['jquery'], function ($) {
    function navTop() {
        var aLis = $('#header .center .page').find('.slide');
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
    function banner() {
        var oImgBox = $('.imgBox');
        var oBanner = $('#banner');
        var aLis = $('#banner').find('li');
        var aLeftRightBtns = $('.leftRightTabs').find('a');
        var iNum = 0;
        var timer = null
        //给整个div添加移入移出操作
        oBanner.hover(function () {
            clearInterval(timer);
        }, function () {
            timer = setInterval(function () {
                // if (!isRunning) {
                //     isRunning = true;
                // } else {
                //     return;
                // }
                iNum++;
                tab();
            }, 2000);
        })

        timer = setInterval(function () {
            iNum++;
            tab();
        }, 2000)


        function tab() {
            oImgBox.animate({
                left: -1349 * iNum
            }, 500, function () {
                if (iNum == aLis.size() - 1) {
                    iNum = 0;
                    oImgBox.css('left', 0)
                }
            })
        }

    }
    return {
        navTop: navTop,
        banner: banner,
    }
})