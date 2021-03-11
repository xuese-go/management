$(function(){

    //默认首页
    $('#contents').load('/page/home/right');

    $(".to-right").on("click",function(){
        let url = $(this).attr("url")
        $('#contents').load('/page'+url);
    })

    $("#logout").on("click",function (ev) {
        localStorage.clear();
        location.replace(root+"/");
    })
})