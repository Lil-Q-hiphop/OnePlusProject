define(['jquery', 'jquery-cookie'], function ($) {
    dlgoods();
    goodsCarSum();
    //将商品加载到界面
    function dlgoods() {
        $.ajax({
            type: 'get',
            url: '../data/goodslist.json',
            success: function (arr) {
                // console.log(arr);
                let str = ``;
                let str2 = ``;
                for (var i = 0; i < arr.length; i++) {
                    str += `<div class="goodsList ${arr[i].value} ${arr[i].value1}">
                        <a target="_blank" class="list " href="descxxx.html?${arr[i].flag}">
                            <div class="products-tag">${arr[i].tag}</div>
                            <div class="card-image">
                                <img src="${arr[i].image}" alt="">
                            </div>
                            <span class="text-xs">${arr[i].textxs}</span>
                            <span class="accessory-name">${arr[i].name}</span>
                            <span class="accessory-price">
                                <del class="price">${arr[i].prePrice}</del>
                                <span class="discounted">${arr[i].newPrice}</span>
                            </span>
                        </a>
                    </div>`;
                }
                $("#goodsBox").html(str);

                var oS = $("#menuBox .form-group").find(".form-control");
                oS.change(function () {
                    var content = $(this).val();
                    function findNode(value, value1) {
                        return $("#goodsBox .goodsList").not(value, value1).css('display', 'none');
                    }
                    switch (content) {
                        case '手机':
                            $("#goodsBox").html(str);
                            findNode('.CAT00000111');
                            break;
                        case '耳机':
                            $("#goodsBox").html(str);
                            findNode('.CAT00000211');
                            break;
                        case '壳/膜':
                            $("#goodsBox").html(str);
                            findNode('.CAT00000311');
                            break;
                        case '适配器/数据线':
                            $("#goodsBox").html(str);
                            findNode('.CAT00000511');
                            break;
                        case '套装':
                            $("#goodsBox").html(str);
                            findNode('.CAT00000611');
                            break;
                        case '生活馆':
                            $("#goodsBox").html(str);
                            findNode('.CAT00000711');
                            break;
                        default:
                            $("#goodsBox").html(str);
                            break;
                    }
                })
            },
            error: function (msg) {
                console.log(msg);
            }
        })
    }
    //显示购物车中的商品个数
    function goodsCarSum() {
        var cookieStr = $.cookie('goods');
        var sum = 0;
        if (cookieStr) {
            var cookieArr = JSON.parse(cookieStr);
            for (var i = 0; i < cookieArr.length; i++) {
                sum += cookieArr[i].num;
            }
            // console.log(cookieArr);
        }
        // console.log(sum);
        $('#header .right span').html(sum);
    }
    return {
        dlgoods: dlgoods,
        goodsCarSum: goodsCarSum,

    }
})
