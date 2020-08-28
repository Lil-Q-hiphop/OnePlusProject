define(['jquery', 'jquery-cookie'], function ($) {
    // loadMsg();
    goodsCarSum();
    //加载购物车商品信息
    function loadMsg() {
        goodsCarSum();
        var cookieStr = $.cookie('goods');
        if (!cookieStr) {
            return;
        }
        $.ajax({
            type: 'get',
            url: '../data/goodslist.json',
            success: function (arr) {
                var newArr = [];
                var cookieArr = JSON.parse(cookieStr);
                for (var i = 0; i < cookieArr.length; i++) {
                    // console.log(i);
                    for (var j = 0; j < arr.length; j++) {
                        if (cookieArr[i].id1 == j) {
                            arr[j].num = cookieArr[i].num;
                            newArr.push(arr[j]);
                            break;
                        }
                    }
                }
                let str = ``;
                var sumprice = null;
                for (var i = 0; i < newArr.length; i++) {

                    str += `<li class="items" id="${newArr[i].number}">
                    <input type="checkbox" class="check">
                    <a href="descxxx.html?${newArr[i].flag}" class="imgs">
                        <img src="${newArr[i].image}"
                            alt="">
                    </a>
                    <div class="goodsname">
                        <a href="descxxx.html?${newArr[i].flag}" class="nms">
                            ${newArr[i].name}
                        </a>
                    </div>
                    <div class="price">￥${(newArr[i].newPrice).split('￥')[1]} </div>
                    <div class="numctl">
                        <button>➖</button>
                        <span class="sum">${newArr[i].num}</span>
                        <button>➕</button>
                    </div>
                    <div class="sumPrice">￥${(newArr[i].newPrice).split('￥')[1] * newArr[i].num}</div>
                    <div class="remove">X</div>
                </li>`;
                    sumprice += newArr[i].newPrice * newArr[i].num;

                }
                $("#main #content-main ul").html(str);

            },
            error: function (msg) {
                console.log(msg);
            }
        })
    }
    //添加商品删除操作
    function removeHandleDelete() {
        $("#main #content-main").on('click', '.remove', function () {
            var id = $(this).closest('li').remove().attr('id');
            var cookieStr = $.cookie('goods');
            var cookieArr = JSON.parse(cookieStr);
            var index = cookieArr.findIndex(item => item.id1 == id)
            cookieArr.splice(index, 1);
            if (cookieArr.length) {
                $.cookie('goods', JSON.stringify(cookieArr), {
                    expires: 7,
                    raw: true,
                })
            } else {
                $.cookie('goods', null)
            }
            goodsCarSum();
        })


    }
    //通过加减改变商品数量
    function numctlHandleChange() {
        $("#main #content-main").on('click', '.numctl button', function () {
            var id = $(this).closest('li').attr('id');
            var cookieStr = $.cookie('goods');
            var cookieArr = JSON.parse(cookieStr);
            var index = cookieArr.findIndex(item => item.id1 == id)
            if (this.innerHTML == '➕') {
                cookieArr[index].num++;

            } else {
                cookieArr[index].num == 1 ? alert('宝贝不能再减少了哦') : cookieArr[index].num--;
            }

            $(this).siblings('span').html(cookieArr[index].num);
            $.cookie('goods', JSON.stringify(cookieArr), {
                expires: 7,
                raw: true,
            })
            loadMsg();
            //取消button的默认行为
            return false;
        })
    }
    //通过checkbox选择商品
    function checkboxSelect() {
        //单独选中某个商品，当选中商品的数量和当前商品数量相等时，默认勾选全选按钮
        var total = 0;
        $('#main #content-main ul').on('change', '.check', function () {
            $('#main #content-main #content-result .sc_left span').html($('#main #content-main ul input:checked').size());
            if ($(this).prop('checked')) {
                total += parseFloat($(this).siblings('.sumPrice').html().split('￥')[1]);
            } else {
                total -= parseFloat($(this).siblings('.sumPrice').html().split('￥')[1]);
            }
            $('#main #content-result .sc_right .sumprice').html('￥' + total);
            if ($('#main #content-main ul input:checked').size() == $('#main #content-main ul input').size()) {
                $("#main #content-main #content-result .selectAll").prop('checked', true);
            } else {
                $("#main #content-main #content-result .selectAll").prop('checked', false);
            }
        })
        //全选按钮的选中效果和其他单个商品的选中效果保持同步，即全选和全不选
        $("#main #content-main #content-result").on('change', '.selectAll', function () {
            $('#main #content-main ul .check').prop('checked', $(this).prop('checked'));
            if ($(this).prop('checked')) {
                $('#main #content-main ul .check').each(function (index, ele) {
                    total += parseFloat($(ele).siblings('.sumPrice').html().split('￥')[1]);
                })

            } else {
                total = 0;
            }
            $('#main #content-main #content-result .sc_left span').html($('#main #content-main ul input:checked').size());
            $('#main #content-result .sc_right .sumprice').html('￥' + total);
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
        }
        $('#header .right span').html(sum);
    }
    return {
        loadMsg: loadMsg,
        removeHandleDelete: removeHandleDelete,
        numctlHandleChange: numctlHandleChange,
        checkboxSelect: checkboxSelect,
        goodsCarSum: goodsCarSum,
    }
})