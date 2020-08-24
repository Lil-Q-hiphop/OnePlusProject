define(['jquery'], function ($) {
    function menuList() {
        $.ajax({
            type: 'get',
            url: '../data/menu.json',
            success: function (arr) {
                let str = ``;
                str += `<select class="form-control s1">
                    <option class="act">${arr[0].class}</option>
                    <option>${arr[0].serise[0].text}</option>
                    <option>${arr[0].serise[1].text}</option>
                    <option>${arr[0].serise[2].text}</option>
                    <option>${arr[0].serise[3].text}</option>
                    <option>${arr[0].serise[4].text}</option>
                    <option>${arr[0].serise[5].text}</option>
                </select>
                <select class="form-control s2">
                    <option class="act">${arr[1].class}</option>
                    <option>${arr[1].serise[0].text}</option>
                    <option>${arr[1].serise[1].text}</option>
                    <option>${arr[1].serise[2].text}</option>
                    <option>${arr[1].serise[3].text}</option>
                    <option>${arr[1].serise[4].text}</option>
                    <option>${arr[1].serise[5].text}</option>
                    <option>${arr[1].serise[6].text}</option>
                    <option>${arr[1].serise[7].text}</option>
                    <option>${arr[1].serise[8].text}</option>
                </select>
                <select class="form-control s3">
                    <option class="act">${arr[2].class}</option>
                    <option>${arr[2].serise[0].text}</option>
                    <option>${arr[2].serise[1].text}</option>
                    <option>${arr[2].serise[2].text}</option>
                </select>`;
                $('#menuBox .form-group').html(str);
            },
            error: function (msg) {
                console.log(msg);
            }
        })
    }
    return {
        menuList: menuList,
    }
})