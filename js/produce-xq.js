/**
 * Created by wangdan on 2016/6/26.
 */
$(function(){
    $("#navUl").find("a").eq(1).attr("class","select");

//�ֲ�ͼ












//��Ʒ�����ã�ע���������
    var liA=$(".detailUl li a");
    console.log(liA);
    var pubDiv=$(".public");
    console.log(pubDiv);
    liA.each(function(index,e){
        liA.eq(index).on("click",function(){
            $(this).addClass("select").parent().siblings().find("a").removeClass("select");
            pubDiv.eq(index).css("display","block").siblings().css("display","none");
            console.log(liA.eq(index));
            console.log(pubDiv.eq(index).height());
        })
    });

});