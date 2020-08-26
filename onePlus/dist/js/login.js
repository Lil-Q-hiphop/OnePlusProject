define(['jquery',], function ($) {
    function loadUser() {
        var oBtn = $('#main #login #btn1');
        var aInputs = $('#main #login').find('input');
        var oAlert = $('#main #login #alert');
        oBtn.click(function () {
            $.ajax({
                type: 'post',
                url: '../php/login.php',
                data: {
                    username: aInputs[0].value,
                    password: aInputs[1].value,
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
    return {
        loadUser: loadUser,
    }
})