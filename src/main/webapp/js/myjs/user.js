var flush = function () {
    $.ajax({
        url: "/ssm/user/v1/list",
        type: "GET",
        headers: {
            Accept: "application/json;charset=utf-8"
        },
        data: {},
        dataType: "json",
        success: function (data) {
            var operation = '<td class=" text-center">' +
                '<a class="user-delete" href="#"><i class="glyphicon glyphicon-remove"></i></a>' +
                '&nbsp;&nbsp;' +
                '<a class="user-update" href="#"><i class="glyphicon glyphicon-edit"></i></a>' +
                '</td>';
            var html = '';
            for (var i = 0; i < data.length; i++) {
                html = html + '<tr>';
                html = html + '<td class="user-id">' + data[i].userId + '</td>';
                html = html + '<td class="user-name">' + data[i].userName + '</td>';
                html = html + '<td class="user-password">' + data[i].userPassword + '</td>';
                html = html + '<td class="user-level">' + data[i].userLevel + '</td>';
                html = html + '<td class="user-create">' + data[i].userGmtCreate + '</td>';
                html = html + '<td class="user-modified">' + data[i].userGmtModified + '</td>';
                html = html + operation;
                html = html + '</tr>';
            }

            $('#user-table').html(html);
        },
        error: function (res) {
            alert("查询失败！" + res.message);
            location.reload();
        }
    });
};

$(document).ready(function () {
    flush();

    // 查询
    $(document).on('click', "#user-read", flush());

    // 添加
    $(document).on('click', '#user-create', function () {
        layer.open({
            type: 2,
            title: '添加用户',
            maxmin: true,
            shadeClose: true,
            area: ['800px', '520px'],
            content: '/ssm/view/popup/user-register.html',
            end: function () {
                flush();
            }
        });
    });

    // 删除
    $(document).on('click', ".user-delete", function () {
        var load = layer.load();

        var tr = $(this).parent().parent();
        var id = tr.children("td[class='user-id']").text();

        $.ajax({
            url: "/ssm/user/v1/" + id,
            type: 'delete',
            dataType: "json",
            contentType: "application/json;charset=utf-8;",
            data: {},
            success: function (msg) {
                setTimeout(function () {
                    layer.close(load);
                    layer.msg("删除成功" + msg.success);
                    flush();
                }, 1000);
            },
            error: function (msg) {
                setTimeout(function () {
                    layer.close(load);
                    layer.msg("删除失败" + msg.message);
                    flush();
                }, 1000);
            }
        });
    });

    // 更新
    $(document).on('click', ".user-update", function () {
        var tr = $(this).parent().parent();
        var id = tr.children("td[class='user-id']").text();
        var name = tr.children("td[class='user-name']").text();
        var password = tr.children("td[class='user-password']").text();
        var level = tr.children("td[class='user-level']").text();

        layer.open({
            type: 2,
            title: '更新用户信息',
            maxmin: true,
            shadeClose: true,
            area: ['800px', '520px'],
            content: '/ssm/view/popup/user-update.html',
            success: function (layero, index) {
                var body = layer.getChildFrame('body', index);
                var iframeWin = window[layero.find('iframe')[0]['name']];

                var idLabel = body.find('span#user-id-label');
                var nameInput = body.find('input[name="userName"]');
                var passwordInput = body.find('input[name="userPassword"]');
                var levelInput = body.find('input[name="userLevel"]');

                $(idLabel).html(id);
                $(nameInput).val(name);
                $(passwordInput).val(password);
                $(levelInput).val(level);
            },
            end: function () {
                flush();
            }
        });
    });
});


