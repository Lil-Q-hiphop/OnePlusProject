define(['jquery', 'jquery-cookie'], function ($) {
    msgLoad();
    //加载商品详细信息
    function msgLoad() {
        var local = location.search;
        // console.log(local);
        var localArr = local.split("?");
        // console.log(arr);
        var flag = localArr[1];
        // console.log(flag);
        $.ajax({
            type: 'get',
            url: '../data/goodslist.json',
            success: function (arr) {
                let str = ``;
                let str2 = ``;
                for (var i = 0; i < arr.length; i++) {
                    if (flag == arr[i].flag) {
                        if (!arr[i].serices) {
                            str += `<div class="goodsImg">
                        <div class="slideBox">
                            <img src="${arr[i].image}"
                                alt="" class="small">
                            <div class="tools"></div>
                            <div class="area">
                                <img src="${arr[i].image}"
                                alt="" class="big">
                            </div>
                        </div>
                    </div>
                    <div class="goodsMsg" id="${arr[i].number}">
                        <h2 class="goodsName">${arr[i].name}
                        </h2>
                        <div class="price">
                            <del>${arr[i].prePrice}</del><span>${arr[i].newPrice}</span>
                        </div>
                        <div class="btn">
                            <button class="sc_btn" sign="${arr[i].number}">加入购物车</button>
                        </div>
                        <div class="servers">
                            <p class="title">售后政策</p>
                            <p class="msg">七天无理由退货</p>
                        </div>
                        <div class="road">
                            <p class="title">物流信息</p>
                            <p class="msg">全场满99包邮，当天18点前支付24小时内发货</p>
                        </div>
                    </div>`
                        } else {
                            for (var j = 0; j < arr[i].serices.length; j++) {
                                str2 += `<li>${arr[i].serices[j].name}</li>`

                            }
                            str += `<div class="goodsImg">
                        <div class="slideBox">
                            <img src="${arr[i].image}"
                                alt="" class="small">
                            <div class="tools"></div>
                            <div class="area">
                                <img src="${arr[i].image}"
                                alt="" class="big">
                            </div>
                        </div>
                    </div>
                    <div class="goodsMsg" id="${arr[i].number}">
                        <h2 class="goodsName">${arr[i].name}
                        </h2>
                        <div class="model">
                            <p>颜色/规格</p>
                            <ul>
                                ${str2}
                            </ul>
                        </div>
                        <div class="price">
                            <del>${arr[i].prePrice}</del><span>${arr[i].newPrice}</span>
                        </div>
                        <div class="btn">
                            <button class="sc_btn">加入购物车</button>
                        </div>
                        <div class="servers">
                            <p class="title">售后政策</p>
                            <p class="msg">七天无理由退货</p>
                        </div>
                        <div class="road">
                            <p class="title">物流信息</p>
                            <p class="msg">全场满99包邮，当天18点前支付24小时内发货</p>
                        </div>
                    </div>`
                        }
                    }
                }

                $("#main").html(str);

                var st = $("#main .goodsMsg").attr("id");
                // console.log(st);
                $("#main .goodsMsg .btn").html(`<button class="sc_btn" sign="${st}">加入购物车</button>`)
                // console.log($("#main .goodsMsg .sc_btn").attr('sign'));
                $("#main .goodsMsg .model ").on('click', "li", function () {
                    var ed = $(this).index();
                    $("#main .goodsMsg .price").html(`<del>${arr[st].serices[ed].prePrice}</del><span>${arr[st].serices[ed].newPrice}</span>`)
                    $("#main .goodsMsg .btn").html(`<button class="sc_btn" sign="${st}" sign1="${ed}">加入购物车</button>`)

                })
                var tools = $('#main .goodsImg .tools');
                var areas = $('#main .goodsImg .area');
                $('#main .goodsImg .slideBox').mouseenter(function () {
                    tools.add(areas).show();
                }).mouseleave(function () {
                    tools.add(areas).hide();
                }).mousemove(function (ev) {
                    var l = ev.clientX - $(this).offset().left - 100;
                    l = Math.max(l, 0);
                    l = Math.min(l, 280);
                    var t = ev.clientY - $(this).offset().top - 100;
                    t = Math.max(t, 0);
                    t = Math.min(t, 280);
                    tools.css({
                        left: l,
                        top: t
                    })
                    areas.find('.big').css({
                        left: -2 * l,
                        top: -2 * t
                    })
                })
            },
            error: function (msg) {
                console.log(msg);
            }
        })
    }
    //点击加入购物车，将数据传入cookie
    function sc_btnHandleClick() {
        $("#main").on('click', '.sc_btn', function () {
            // console.log(this);
            var index1 = $(this).attr('sign');
            var index2 = $(this).attr('sign1');
            first = $.cookie("goods") == null ? true : false;
            if (first) {
                var arr = [{ id1: index1, id2: index2, num: 1 }];
                $.cookie('goods', JSON.stringify(arr), {
                    expires: 7,
                    raw: true
                });
            } else {
                var same = false;
                var cookieArr = JSON.parse($.cookie('goods'));
                for (var i = 0; i < cookieArr.length; i++) {
                    if (cookieArr[i].id1 == index1 && cookieArr[i].id2 == index2) {
                        cookieArr[i].num++;
                        same = true;
                        break;
                    }
                }
                if (!same) {
                    var obj = { id1: index1, id2: index2, num: 1 };
                    cookieArr.push(obj);

                }
                $.cookie('goods', JSON.stringify(cookieArr), {
                    expires: 7,
                    raw: true,
                })
            }
            console.log($.cookie('goods'));

        })

    }
    // function imgHandleExpand() {
    //     var tools = $('#main').find('');
    //     console.log(tools);
    // }
    return {
        msgLoad: msgLoad,
        sc_btnHandleClick: sc_btnHandleClick,
        // imgHandleExpand, imgHandleExpand,
    }
})