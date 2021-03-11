(function () {
    let pageSize = 5;
    let pageNow = 0;

    $(function () {

        page(pageNow);

        $("#search-form").on("submit", function (ev) {
            ev.preventDefault();
            page(0);
        })

        $("#add-form").on("submit", function (ev) {
            ev.preventDefault();
            let formData = $('#add-form').serializeObject();
            $.ajax({
                url: root + "/api/acc/acc",
                contentType: "application/json;charset=UTF-8",
                dataType: "json",
                data: JSON.stringify(formData),
                type: "POST",
                beforeSend: function () {
                },
                success: function (req) {
                    if (req.code === 200) {
                        $('#add-form')[0].reset()
                        page(0);
                    } else {
                        alert(req.msg)
                    }
                },
                complete: function () {
                },
                error: function (e) {
                    console.log("error", e.responseText);
                }
            });
        })

        $("#datas").on("click",".remove-data", function () {
            if (confirm('是否确定当前操作') === true) {
                $.ajax({
                    url: root + "/api/acc/acc/" + $(this).attr("data-id"),
                    dataType: "json",
                    type: "DELETE",
                    beforeSend: function () {
                    },
                    success: function (req) {
                        if (req.code === 200) {
                            page(pageNow)
                        }
                    },
                    complete: function () {
                    },
                    error: function (e) {
                        console.log("error", e.responseText);
                    }
                });
            }
        })

        $("#datas").on("click",".reset-data", function () {
            if (confirm('是否确定当前操作') === true) {
                $.ajax({
                    url: root + "/api/acc/acc/" + $(this).attr("data-id"),
                    dataType: "json",
                    type: "PUT",
                    beforeSend: function () {
                    },
                    success: function (req) {
                        if (req.code === 200) {
                            page(pageNow)
                        }
                    },
                    complete: function () {
                    },
                    error: function (e) {
                        console.log("error", e.responseText);
                    }
                });
            }
        })

    })

    function page(p) {
        pageNow = p;
        let formData = $('#search-form').serializeObject();
        $.ajax({
            url: root + "/api/acc/acc/" + pageSize + "/" + pageNow,
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            data: JSON.stringify(formData),
            type: "POST",
            beforeSend: function () {
                $("#datas").find('tr').remove();
            },
            success: function (req) {
                if (req.code === 200) {
                    tableDatas(req.data)
                }
            },
            complete: function () {
            },
            error: function (e) {
                console.log("error", e.responseText);
            }
        });
    }

    function tableDatas(data) {
        $(data).each(function (i, e) {
            $("#datas").append(ttr((i + 1), e))
        })
    }

    function ttr(i, e) {
        return "<tr>" +
            "<td>" + i + "</td>" +
            "<td>" + e.acc + "</td>" +
            "<td>" +
            "<button type=\"button\" style=\"margin-right:5px\" class=\"btn btn-danger btn-xs remove-data\" data-id=\"" + e.ID + "\">删除</button>" +
            "<button type=\"button\" style=\"margin-right:5px\" class=\"btn btn-danger btn-xs reset-data\" data-id=\"" + e.ID + "\">重置密码</button>" +
            "</td>" +
            "</tr>";
    }

})();
