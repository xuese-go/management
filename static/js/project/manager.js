let pageSize = 5;
let pageNow = 0;

let pageSize2 = 3;
let pageNow2 = 0;

$(function(){

    page(0);

    $("#add-form").on("submit", function (ev) {
        ev.preventDefault();
        let formData = $('#add-form').serializeObject();
        $.ajax({
            url:root+"/api/project/project",
            contentType : "application/json;charset=UTF-8",
            dataType:"json",
            data:JSON.stringify(formData),
            type:"POST",
            beforeSend:function(){
            },
            success:function(req){
                if(req.code == 200){
                    $('#add-form')[0].reset()
                    $("#add-model-open-button").click();
                    page(0);
                }else{
                    alert(req.msg)
                }
            },
            complete:function(){
            },
            error:function(e){
                console.log("error",e.responseText);
            }
        });
    })

    $("#edit-form").on("submit", function (ev) {
        ev.preventDefault();
        let formData = $('#edit-form').serializeObject();
        $.ajax({
            url:root+"/api/project/project/"+$("#id-edit").val(),
            contentType : "application/json;charset=UTF-8",
            dataType:"json",
            data:JSON.stringify(formData),
            type:"PUT",
            beforeSend:function(){
            },
            success:function(req){
                if(req.code == 200){
                    $('#edit-form')[0].reset()
                    $("#edit-model-open-button").click();
                    page(0);
                }else{
                    alert(req.msg)
                }
            },
            complete:function(){
            },
            error:function(e){
                console.log("error",e.responseText);
            }
        });
    })

    $("#edit-form2").on("submit", function (ev) {
        ev.preventDefault();
        let lcjd = $("#lcqk-edit").val()
        if(lcjd == "-1"){
            if(confirm('当前选择的发票已结清，此选择修改后将会导致该项目不可修改，是否确定要完成此项目')==false){
                return
            }
        }
        let formData = $('#edit-form2').serializeObject();
        $.ajax({
            url:root+"/api/project/project/"+$("#id-edit2").val(),
            contentType : "application/json;charset=UTF-8",
            dataType:"json",
            data:JSON.stringify(formData),
            type:"PUT",
            beforeSend:function(){
            },
            success:function(req){
                if(req.code == 200){
                    $('#edit-form2')[0].reset()
                    $("#edit-model-open-button2").click();
                    page(0);
                }else{
                    alert(req.msg)
                }
            },
            complete:function(){
            },
            error:function(e){
                console.log("error",e.responseText);
            }
        });
    })

//    -------------------------------------第二个表格的 start---------------------------------------------------
    $("#add-model-open-button2").on("click", function (ev) {
        let id = $('#sxsm_id').val();
        if(id == ""){
            alert("请先选择项目")
        }else{
            $("#datas2").prepend("<tr><td></td>"
                +"<td><div contenteditable=\"true\" style=\"border-bottom:1px solid #ccc\">请输入</div></td>"
                +"<td><input type=\"date\" value=\""+getDay()+"\" /></td>"
                +"<td><div contenteditable=\"true\" style=\"border-bottom:1px solid #ccc\">请输入</div></td>"
                +"<td><div contenteditable=\"true\" style=\"border-bottom:1px solid #ccc\">请输入</div></td>"
                +"<td><div contenteditable=\"true\" style=\"border-bottom:1px solid #ccc\">请输入</div></td>"
                +"<td><button type=\"button\" class=\"btn btn-success btn-sm\" onclick=\"addStage(this)\">确定</button></td></tr>");
        }
    })
//    -------------------------------------第二个表格的 end---------------------------------------------------
//    -------------------------------------导出所有 start---------------------------------------------------
    $("#exp-all").on("click", function (ev) {
        localStorage.setItem("search",$("#search-name").val());
        var url = root+"/page/file/exp";
        window.open(url,"_blank");
    })
//    -------------------------------------导出所有 end---------------------------------------------------
})

//今日日期
function getDay(){
    var time = new Date();
    var day = ("0" + time.getDate()).slice(-2);
    var month = ("0" + (time.getMonth() + 1)).slice(-2);
    var today = time.getFullYear() + "-" + (month) + "-" + (day);
    return today;
}

function page(pageNow){
    this.pageNow = pageNow;
    let formData = $('#search-form').serializeObject();
    $.ajax({
        url:root+"/api/project/project/"+pageSize+"/"+pageNow,
        contentType : "application/json;charset=UTF-8",
        dataType:"json",
        data:JSON.stringify(formData),
        type:"POST",
        beforeSend:function(){
            $("#datas").find('tr').remove();
        },
        success:function(req){
            if(req.code == 200){
                pageUtil(req.data)
            }
        },
        complete:function(){
        },
        error:function(e){
            console.log("error",e.responseText);
        }
    });
}

function tableDatas(data){
    $(data).each(function(i,e){
         $("#datas").append(ttr((i+1),e))
    })
}

function ttr(i,e){
    let lcqk = "";
    if(e.lcqk == "0"){
        lcqk = "开始阶段"
    }else if(e.lcqk == "1"){
        lcqk = "进行阶段"
    }else if(e.lcqk == "2"){
        lcqk = "已汇款（预付款）"
    }else if(e.lcqk == "3"){
        lcqk = "已汇款（尾款）"
    }else if(e.lcqk == "-1"){
        lcqk = "发票已结清"
    }
    return "<tr>"+
            "<td>"+i+"</td>"+
            "<td onclick=\"getStage('"+e.uuid+"','"+e.name+"')\" class=\"project_name_css\" title=\"鼠标点击此列查看操作进度\">"+e.name+"</td>"+
            "<td>"+(e.lxrq == undefined ? '' : e.lxrq)+"</td>"+
            "<td>"+e.xmed+"</td>"+
            "<td>"+e.fbdw+"</td>"+
            "<td>"+e.djdw+"</td>"+
            "<td>"+e.dwszd+"</td>"+
            "<td>"+e.djr+"</td>"+
            "<td>"+e.lxfs+"</td>"+
            "<td>"+e.wsfzr+"</td>"+
            "<td>"+e.wslxfs+"</td>"+
            "<td>"+(e.jfrq == undefined ? '' : e.jfrq)+"</td>"+
            "<td>"+lcqk+"</td>"+
            "<td>"+e.bz+"</td>"+
            "<td>"+
                "<button type=\"button\" style=\"margin-right:5px\" class=\"btn btn-danger btn-xs\" onclick=\"remove('"+e.uuid+"')\">删除</button>"+
                "<button type=\"button\" class=\"btn btn-warning btn-xs\" onclick=\"openEditView('"+e.uuid+"')\">修改主体</button>&nbsp;&nbsp;"+
                "<button type=\"button\" class=\"btn btn-warning btn-xs\" onclick=\"openEditView2('"+e.uuid+"')\">修改流程备注</button>&nbsp;&nbsp;"+
            "</td>"+
            "</tr>";
}

function remove(e){
    if(confirm('是否确定当前操作')==true){
        $.ajax({
            url:root+"/api/project/project/"+e,
            dataType:"json",
            type:"DELETE",
            beforeSend:function(){
            },
            success:function(req){
                if(req.code == 200){
                    page(pageNow)
                }
            },
            complete:function(){
            },
            error:function(e){
                console.log("error",e.responseText);
            }
        });
    }
}

function openEditView(e){
    $.ajax({
        url:root+"/api/project/project/"+e,
        dataType:"json",
        type:"GET",
        beforeSend:function(){
        },
        success:function(req){
            let data = req.data
            if(req.code == 200){
                $("#id-edit").val(e);
                $("#name-edit").val(data.name)
                $("#lxrq-edit").val(data.lxrq)
                $("#xmed-edit").val(data.xmed)
                $("#fbdw-edit").val(data.fbdw)
                $("#djdw-edit").val(data.djdw)
                $("#dwszd-edit").val(data.dwszd)
                $("#djr-edit").val(data.djr)
                $("#lxfs-edit").val(data.lxfs)
                $("#wsfzr-edit").val(data.wsfzr)
                $("#wslxfs-edit").val(data.wslxfs)
                $("#jfrq-edit").val(data.jfrq)
                $("#edit-model-open-button").click();
            }else{
                alert("发生错误")
            }
        },
        complete:function(){
        },
        error:function(e){
            console.log("error",e.responseText);
        }
    });
}

function openEditView2(e){
    $.ajax({
        url:root+"/api/project/project/"+e,
        dataType:"json",
        type:"GET",
        beforeSend:function(){
        },
        success:function(req){
            let data = req.data
            if(req.code == 200){
                $("#id-edit2").val(e);
                $("#lcqk-edit").val(data.lcqk)
                $("#bz-edit").val(data.bz)
                $("#edit-model-open-button2").click();
            }else{
                alert("发生错误")
            }
        },
        complete:function(){
        },
        error:function(e){
            console.log("error",e.responseText);
        }
    });
}

//------------------------------------------第二张表格的js--------------------------------------------------------------

function getStage(e,n){
    $("#sxsm_id").val(e)
    $("#sxsm").text(n)
    page2(0)
}

function page2(pageNow2){
    this.pageNow2 = pageNow2;
    $.ajax({
        url:root+"/api/stage/stage/"+pageSize2+"/"+pageNow2+"/"+$("#sxsm_id").val(),
        dataType:"json",
        type:"GET",
        beforeSend:function(){
            $("#datas2").find('tr').remove();
        },
        success:function(req){
            if(req.code == 200){
                pageUtil2(req.data)
            }
        },
        complete:function(){
        },
        error:function(e){
            console.log("error",e.responseText);
        }
    });
}

function tableDatas2(data){
    $(data).each(function(i,e){
         $("#datas2").append(ttr2((i+1),e))
    })
}

function ttr2(i,e){
    return "<tr>"+
            "<td>"+i+"</td>"+
            "<td>"+e.bs+"</td>"+
            "<td>"+e.creationDate+"</td>"+
            "<td>"+e.stage+"</td>"+
            "<td>"+e.nextPlan+"</td>"+
            "<td>"+e.bz+"</td>"+
            "<td>"+
                "<button type=\"button\" style=\"margin-right:5px\" class=\"btn btn-danger btn-xs\" onclick=\"remove2('"+e.uuid+"')\">删除</button>"+
                "<button type=\"button\" class=\"btn btn-warning btn-xs\" onclick=\"setEditView('"+e.uuid+"',this)\">修改</button>&nbsp;&nbsp;"+
            "</td>"+
            "</tr>";
}

function remove2(e){
    if(confirm('是否确定当前操作')==true){
        $.ajax({
            url:root+"/api/stage/stage/"+e,
            dataType:"json",
            type:"DELETE",
            beforeSend:function(){
            },
            success:function(req){
                if(req.code == 200){
                    page2(pageNow2)
                }
            },
            complete:function(){
            },
            error:function(e){
                console.log("error",e.responseText);
            }
        });
    }
}

//新增第二张表格
function addStage(obj){
    let tr = $(obj).parents("tr")
    let a = $(tr).children("td:eq(1)").children("div:first").text()
    let b = $(tr).children("td:eq(2)").children("input:first").val()
    let c = $(tr).children("td:eq(3)").children("div:first").text()
    let d = $(tr).children("td:eq(4)").children("div:first").text()
    let e = $(tr).children("td:eq(5)").children("div:first").text()
    let project_id = $("#sxsm_id").val()

    let data = {
        projectId:project_id,
        bs:a,
        creationDate:b,
        stage:c,
        nextPlan:d,
        bz:e,
    }
    $.ajax({
        url:root+"/api/stage/stage",
        contentType : "application/json;charset=UTF-8",
        dataType:"json",
        data:JSON.stringify(data),
        type:"POST",
        beforeSend:function(){
        },
        success:function(req){
            if(req.code == 200){
                page2(0);
            }else{
                alert(req.msg)
            }
        },
        complete:function(){
        },
        error:function(e){
            console.log("error",e.responseText);
        }
    });
}

function setEditView(e2,obj){
    let uuid = e2
    let tr = $(obj).parents("tr")
    let a = $(tr).children("td:eq(1)")
    let b = $(tr).children("td:eq(2)")
    let c = $(tr).children("td:eq(3)")
    let d = $(tr).children("td:eq(4)")
    let e = $(tr).children("td:eq(5)")
    let f = $(tr).children("td:eq(6)")

    let at = $(a).text()
    let bt = $(b).text()
    let ct = $(c).text()
    let dt = $(d).text()
    let et = $(e).text()

    $(a).text("")
    $(b).text("")
    $(c).text("")
    $(d).text("")
    $(e).text("")
    $(f).text("")

    $(a).append("<div contenteditable=\"true\" style=\"border-bottom:1px solid #ccc\">"+at+"</div>")
    $(b).append("<input type=\"date\" value=\""+bt+"\" />")
    $(c).append("<div contenteditable=\"true\" style=\"border-bottom:1px solid #ccc\">"+ct+"</div>")
    $(d).append("<div contenteditable=\"true\" style=\"border-bottom:1px solid #ccc\">"+dt+"</div>")
    $(e).append("<div contenteditable=\"true\" style=\"border-bottom:1px solid #ccc\">"+et+"</div>")
    $(f).append("<button type=\"button\" class=\"btn btn-success btn-sm\" onclick=\"updateStage('"+uuid+"',this)\">确定修改</button>")
}

function updateStage(e2,obj){
    let tr = $(obj).parents("tr")
    let a = $(tr).children("td:eq(1)").children("div:first").text()
    let b = $(tr).children("td:eq(2)").children("input:first").val()
    let c = $(tr).children("td:eq(3)").children("div:first").text()
    let d = $(tr).children("td:eq(4)").children("div:first").text()
    let e = $(tr).children("td:eq(5)").children("div:first").text()

    let data = {
        bs:a,
        creationDate:b,
        stage:c,
        nextPlan:d,
        bz:e,
    }
    $.ajax({
        url:root+"/api/stage/stage/"+e2,
        contentType : "application/json;charset=UTF-8",
        dataType:"json",
        data:JSON.stringify(data),
        type:"PUT",
        beforeSend:function(){
        },
        success:function(req){
            if(req.code == 200){
                page2(0);
            }else{
                alert(req.msg)
            }
        },
        complete:function(){
        },
        error:function(e3){
            console.log("error",e3.responseText);
        }
    });
}
