define(['jquery',], function ($) {
    function createUser() {
        var oBtn = $('#main #login #btn1');
        var aInputs = $('#main #login').find('input');
        var oAlert = $('#main #login #alert');
        oBtn.click(function () {
            $.ajax({
                type: 'post',
                url: '../php/register.php',
                data: {
                    username: aInputs[0].value,
                    password: aInputs[1].value,
                    repassword: aInputs[2].value,
                    createtime: new Date().getTime()
                },
                success: function (res) {
                    var obj = JSON.parse(res);
                    if (obj.code) {
                        oAlert.css('background', 'red');
                    } else {
                        oAlert.css('background', 'green');
                    }
                    oAlert.css('display', 'block');
                    oAlert.html(obj.msg);
                },
                error: function (msg) {
                    console.log(msg);
                }
            })
        })
    }
    function checkUser() {
        var aInputs = $('#main #login').find('input');
        var oAlert = $('#main #login #alert');
        aInputs.focus(function () {
            oAlert.css('display', 'none');
        })
        aInputs.blur(function () {
            oAlert.css('display', 'block')
            //验证用户名
            var oValue1 = aInputs[0].value;
            if (oValue1.length < 6 || oValue1.length > 10) {
                oAlert.html('!长度应为6~10个字符');
                oAlert.css('background', 'red');
            } else if (!/^[a-zA-Z]/.test(oValue1[0])) {
                oAlert.html('!用户名需以字母开头');
                oAlert.css('background', 'red');
            } else if (/\W/.test(oValue1)) {
                oAlert.html('!只能输入字母数字下划线');
                oAlert.css('background', 'red');
            } else {
                oAlert.html('恭喜，用户名可以使用');
                oAlert.css('background', 'green');
            }
        })
    }
    return {
        createUser: createUser,
        checkUser: checkUser,
    }
})