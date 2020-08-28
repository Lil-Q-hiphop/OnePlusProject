define(['jquery', 'jquery-cookie'], function ($) {
    function loadClass() {
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
                let str1 = ``;
                for (var i = 0; i < arr.length; i++) {
                    if ((flag == arr[i].value) || (flag == arr[i].value1)) {
                        str1 += `<div class="goodsList ${arr[i].value} ${arr[i].value1}">
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
                }
                $("#content #goodsBox").html(str1)

            },
            error: function (msg) {
                console.log(msg);
            }
        })
        $.ajax({
            type: 'get',
            url: '../data/menu.json',
            success: function (arr) {
                var newArr = arr[0].serise;
                let str2 = ``;
                let str3 = ``;
                for (var i = 0; i < newArr.length; i++) {
                    if (flag == newArr[i].value) {
                        str2 = ` <div id="bg">
                        <img src="${newArr[i].image}"
                            alt="">
                    </div>
                    <p id="title">${newArr[i].text}</p>`;
                        str3 = `${newArr[i].text}|一加手机配件专区`
                    }
                }
                $('#banner').html(str2);
                $('head title').text(str3);
                if ((flag == 'CAT00000311') || (flag == 'CAT00000711')) {
                    $('#banner #title').css('color', '#000');
                }
            },
            error: function (msg) {
                console.log(msg);
            }
        })
    }
    return {
        loadClass: loadClass,
    }
})