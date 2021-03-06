var flush = function () {
    // TODO get userID
    var userId = 1;
    $.ajax({
        url: "/ssm/image/v1/list/" + userId,
        type: "GET",
        headers: {
            Accept: "application/json;charset=utf-8"
        },
        data: {},
        dataType: "json",
        success: function (data) {
            var operation = '<td class=" text-center">' +
                '<a class="image-delete" href="#"><i class="glyphicon glyphicon-remove"></i></a>' +
                '&nbsp;&nbsp;' +
                '<a class="image-update" href="#"><i class="glyphicon glyphicon-edit"></i></a>' +
                '</td>';
            var html = '';
            for (var i = 0; i < data.length; i++) {
                html = html + '<tr>';
                html = html + '<td class="image-id">' + data[i].imageId + '</td>';
                html = html + '<td class="image-user">' + data[i].userId + '</td>';
                html = html + '<td class="image-text">' + data[i].imageText + '</td>';
                html = html + '<td class="image-class">' + data[i].classId + '</td>';
                html = html + '<td class="image-create">' + data[i].imageGmtCreate + '</td>';
                html = html + '<td class="image-modified">' + data[i].imageGmtModified + '</td>';
                html = html + '<td class="image-img">' + '<img src=' + data[i].imagePath + ' style="height=160px;width=160px;"/>' + '</td>';
                html = html + operation;
                html = html + '</tr>';
            }

            $('#image-table').html(html);
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
    $(document).on('click', "#image-read", flush());

    // 添加
    $(document).on('click', "#image-create", function () {
        layer.open({
            type: 2,
            title: '上传图片',
            maxmin: true,
            shadeClose: true,
            area: ['800px', '520px'],
            content: '/ssm/view/popup/image-upload.html',
            end: function () {
                flush();
            }
        });
    });

    // 删除
    $(document).on('click', ".image-delete", function () {
        var load = layer.load();

        var tr = $(this).parent().parent();
        var id = tr.children("td[class='image-id']").text();

        $.ajax({
            url: "/ssm/image/v1/" + id,
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
    $(document).on('click', ".image-update", function () {
        var tr = $(this).parent().parent();
        var imageId = tr.children("td[class='image-id']").text();
        var imageText = tr.children("td[class='image-text']").text();
        var imageClass = tr.children("td[class='image-class']").text();
        var imageImg = tr.children("td[class='image-img']").html();


        layer.open({
            type: 2,
            title: '修改图片',
            maxmin: true,
            shadeClose: true,
            area: ['800px', '520px'],
            content: '/ssm/view/popup/image-update.html',
            success: function (layero, index) {
                var body = layer.getChildFrame('body', index);
                var iframeWin = window[layero.find('iframe')[0]['name']];

                var idLabel = body.find('span#image-id-label');
                var textInput = body.find('input#imageText');
                var classInput = body.find('input#imageClass');
                var imageDiv = body.find('div#image-div');

                $(idLabel).html(imageId);
                $(textInput).val(imageText);
                $(classInput).val(imageClass);
                $(imageDiv).html(imageImg);
            },
            end: function () {
                flush();
            }
        });
    });

});
