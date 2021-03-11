$(function(){
    $("#form-login").on("submit", function (ev) {
        ev.preventDefault();
        const t = this
        let formData = $('#form-login').serializeObject();
        $.ajax({
            url:"/api/login/login",
            dataType:"json",
            contentType : "application/json;charset=UTF-8",
            data:JSON.stringify(formData),
            type:"POST",
            beforeSend:function(){
                //请求前的处理
                $(t).attr('disabled',true);
            },
            success:function(req){
                //请求成功时处理
                if(req.code === 200){
                    localStorage.setItem("auth",req.data);
                    location.replace("/page/home/home");
                }else{
                    alert(req.msg)
                }
            },
            complete:function(){
                $(t).attr('disabled',false);
            },
            error:function(e){
                $(t).attr('disabled',false);
                alert(e.responseText);
            }
        });
    })
})