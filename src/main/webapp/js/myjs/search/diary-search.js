// 检测函数
var isInputAllow = function (value) {
    return !(value === '' || value === undefined || value === null || value.length < 1);
};
$('#search-btn').on('click', function () {
    var diaryName = $('input[name="search-diary"]').val();

    if (isInputAllow(diaryName)) {
        layer.msg("日记标题不能为空");
    }

    else {
        $.ajax({
            url: "diary/v1/" + diaryName,
            type: "GET",
            headers: {
                Accept: "application/json;charset=utf-8"
            },
            dataType: "json",
            success: function (data) {
                var operation = '<td class=" text-center">' +
                    '<a class="diary-delete" href="#"><i class="glyphicon glyphicon-remove"></i></a>' +
                    '&nbsp;&nbsp;' +
                    '<a class="diary-update" href="#"><i class="glyphicon glyphicon-edit"></i></a>' +
                    '</td>';
                var html = '';
                html = html + '<tr>';
                html = html + '<td class="diary-id">' + data.diaryId + '</td>';
                html = html + '<td class="diary-user">' + data.userId + '</td>';
                html = html + '<td class="diary-name">' + data.diaryName + '</td>';
                html = html + '<td class="diary-text">' + data.diaryText + '</td>';
                html = html + '<td class="diary-create">' + data.diaryGmtCreate + '</td>';
                html = html + '<td class="diary-modified">' + data.diaryGmtModified + '</td>';
                html = html + operation;
                html = html + '</tr>';
                $('#diary-table').html(html);
            },
            error: function (res) {
                layer.msg("没有这资源" + res.message);
            }
        });
    }
});