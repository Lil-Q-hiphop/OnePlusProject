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
                        setTimeout(() => {
                            location.assign('login.html');
                        }, 500);
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

    return {
        createUser: createUser,
    }
})