$(function(){
    //默认首页
    toHtml('/page/home/right');
    $(".to-right").on("click",function(){
        let url = $(this).attr("url")
        toHtml('/page'+url);
    })
})

function toHtml(obj){
    $('#contents').load(obj);
}

//注销
function logout(){
    localStorage.clear();
    location.replace(root+"/");
}