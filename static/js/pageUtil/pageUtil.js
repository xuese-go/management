function pageUtil(data){
    console.log(data)
    $("#pages").find("li").remove();
    $("#pages").append("<li><a href=\"#\">总页数："+data.pages+"</a></li>")
    $("#pages").append("<li><a href=\"#\">总条数："+data.total+"</a></li>")
    $("#pages").append("<li><a href=\"#\">当前页："+data.pageNum+"</a></li>")

    let p = data.pages;
    let t = data.pageNum;
    let tp = t - 5;
    let tn = t + 5;
    if(tp < 1){
        tp = 1
    }
    if(tn > p){
        tn = p
    }

    for(let i = tp;i <= tn;i++){
        $("#pages").append("<li><a href=\"javascript:page("+(i - 1)+");\">"+i+"</a></li>")
    }

    tableDatas(data.list)
}

function pageUtil2(data){
    $("#pages2").find("li").remove();
    $("#pages2").append("<li><a href=\"#\">总页数："+data.pages+"</a></li>")
    $("#pages2").append("<li><a href=\"#\">总条数："+data.total+"</a></li>")
    $("#pages2").append("<li><a href=\"#\">当前页："+data.pageNum+"</a></li>")

    let p = data.pages;
    let t = data.pageNum;
    let tp = t - 5;
    let tn = t + 5;
    if(tp < 1){
        tp = 1
    }
    if(tn > p){
        tn = p
    }

    for(let i = tp;i <= tn;i++){
        $("#pages2").append("<li><a href=\"javascript:page2("+(i - 1)+");\">"+i+"</a></li>")
    }

    tableDatas2(data.list)
}