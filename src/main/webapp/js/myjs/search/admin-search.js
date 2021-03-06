// 检测函数
var isInputAllow = function (value) {
    return !(value === '' || value === undefined || value === null || value.length < 1);
};
$('#search-btn').on('click', function () {
    var adminName = $('input[name="search-admin"]').val();

    if (isInputAllow(adminName)) {
        layer.msg("用户名不能为空");
    }

    else {
        $.ajax({
            url: "admin/v1/" + adminName,
            type: "GET",
            headers: {
                Accept: "application/json;charset=utf-8"
            },
            dataType: "json",
            success: function (data) {
                var operation = '<td class=" text-center">' +
                    '<a class="admin-delete" href="#"><i class="glyphicon glyphicon-remove"></i></a>' +
                    '&nbsp;&nbsp;' +
                    '<a class="admin-update" href="#"><i class="glyphicon glyphicon-edit"></i></a>' +
                    '</td>';
                var html = '';
                html = html + '<tr>';
                html = html + '<td class="admin-id">' + data.adminId + '</td>';
                html = html + '<td class="admin-name">' + data.adminName + '</td>';
                html = html + '<td class="admin-password">' + data.adminPassword + '</td>';
                html = html + '<td class="admin-create">' + data.adminGmtCreate + '</td>';
                html = html + '<td class="admin-modified">' + data.adminGmtModified + '</td>';
                html = html + operation;
                html = html + '</tr>';
                $('#admin-table').html(html);
            },
            error: function (res) {
                layer.msg("查无此人，请确认管理员用户名" + res.message);
            }
        });
    }
});