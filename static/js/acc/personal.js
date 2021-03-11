$(function(){
    $("#edit-pwd-form").on("submit", function (ev) {
        ev.preventDefault();
        let formData = $('#edit-pwd-form').serialize();
        $.ajax({
            url:root+"/api/user/user",
            dataType:"json",
            data:formData,
            type:"POST",
            beforeSend:function(){
            },
            success:function(req){
                if(req.code == 200){
                    alert("成功")
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
})