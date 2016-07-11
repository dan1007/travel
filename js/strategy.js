/**
 * Created by wangdan on 2016/6/18.
 */
$(function(){
    $("#navUl").find("a").eq(2).attr("class","select");
      //签证服务导航
        $(".qzUl").find("a").on("click mouseover",function(e){//这里必须传参（e）
            $(this).addClass("select").css("text-decoration","none");
            console.log($(e.target));
        });
});