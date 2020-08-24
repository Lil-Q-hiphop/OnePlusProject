define(['jquery', 'jquery-cookie'], function ($) {
    loadMsg();

    //加载购物车商品信息
    function loadMsg() {
        var cookieStr = $.cookie('goods');
        if (!cookieStr) {
            return;
        }
        $.ajax({
            type: 'get',
            url: '../data/goodslist.json',
            success: function (arr) {
                // console.log(arr);
                var newArr = [];
                var cookieArr = JSON.parse(cookieStr);
                // console.log(cookieArr.length);
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
                // console.log(newArr);
                let str = ``;
                var sumprice = null;
                for (var i = 0; i < newArr.length; i++) {
                    str += `<li class="items" id="${newArr[i].number}">
                    <input type="checkbox" class="check">
                    <a href="http://localhost:6161/descxxx.html?${newArr[i].flag}" class="imgs">
                        <img src="${newArr[i].image}"
                            alt="">
                    </a>
                    <div class="goodsname">
                        <a href="http://localhost:6161/descxxx.html?${newArr[i].flag}" class="nms">
                            ${newArr[i].name}
                        </a>
                    </div>
                    <div class="price">￥${newArr[i].newPrice} </div>
                    <div class="numctl">
                        <button>➖</button>
                        <span class="sum">${newArr[i].num}</span>
                        <button>➕</button>
                    </div>
                    <div class="sumPrice">￥${newArr[i].newPrice * newArr[i].num}</div>
                    <div class="remove">X</div>
                </li>`;
                    sumprice += newArr[i].newPrice * newArr[i].num;

                }
                // console.log(str);
                $("#main #content-main ul").html(str);
                var b = $("#main #content-main ul li").size();
                // console.log($('#main #content-result .sc_right .sumprice').html());
                // $('#main #content-result .sc_left span').html(b);
                $('#main #content-result .sc_right .sumprice').html('￥' + sumprice);
                // for(var i = 0; i <oLi.size;i++){
                //     str2 += ``
                // }
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
            // console.log(id);
            var cookieStr = $.cookie('goods');
            var cookieArr = JSON.parse(cookieStr);
            // console.log(cookieArr);
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
        })
    }
    //通过加减改变商品数量
    function numctlHandleChange() {
        $("#main #content-main").on('click', '.numctl button', function () {
            var id = $(this).closest('li').attr('id');
            var cookieStr = $.cookie('goods');
            var cookieArr = JSON.parse(cookieStr);
            var index = cookieArr.findIndex(item => item.id1 == id)
            // console.log(this.innerHTML);
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
        $('#main #content-main ul').on('change', '.check', function () {
            $(this).prop('checked') = $('#main #content-main .selectAll').prop('checked');
        })
        $("#main #content-main #content-result").on('change', '.selectAll', function () {
            if ($('#main #content-main ul input:checked').size() == $('#main #content-main ul input').size) {
                $(this).prop('checked', true);
            } else {
                $(this).prop('checked', false);
            }
        })
        // //全选商品
        // function selectAll() {
        //     // console.log('11');
        //     $('#main #content-result .sc_left').on('change', '.selectAll', function () {
        //         // console.log(this);
        //         var isSelect = $(this).prop('checked');
        //         if (isSelect) {
        //             $('#main #content-main ul .check').prop('checked', true);
        //         } else {
        //             $('#main #content-main ul .check').prop('checked', false);

        //         }
        //     })
        //     checkboxSelect();
    }
    return {
        loadMsg: loadMsg,
        removeHandleDelete: removeHandleDelete,
        numctlHandleChange: numctlHandleChange,
        checkboxSelect: checkboxSelect,
        // selectAll: selectAll,
    }
})