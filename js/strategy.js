/**
 * Created by wangdan on 2016/6/18.
 */
$(function(){
    $("#navUl").find("a").eq(2).attr("class","select");
      //ǩ֤���񵼺�
        $(".qzUl").find("a").on("click mouseover",function(e){//������봫�Σ�e��
            $(this).addClass("select").css("text-decoration","none");
            console.log($(e.target));
        });
});