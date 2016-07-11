/**
 * Created by wangdan on 2016/6/20.
 */
$(function(){
    $("#navUl").find("a").eq(1).attr("class","select");

    //contMenu menuR
    $(".menuR p").on("click","a",function(e){
        $(e.target).addClass("select").siblings().removeClass("select");
        console.log($(e.target));
    });

    //≈≈–Úµº∫ΩÃı
    $(".contNav").on("click","a",function(e){
        $(e.target).addClass("select").siblings().removeClass("select");
        console.log($(e.target));
    });
    //console.log($(".contNav a"));
});

$(function(){
    var length=3;
        for(var i=0;i<length;i++){
            $(".contBox").clone().appendTo(".cp");
        }
    //console.log($(".contBox").size());

    $.ajax({
        type:"get",
        url:"http://localhost:8088/travel/strategy.php",
        success:function(data){
            var jsondata=JSON.parse(data);
            //console.log(jsondata);
            $(jsondata.europe).each(function(index,e){
                $(".boxImg img").eq(index).attr("src",$(jsondata.europe)[index]);
            });
            //console.log( $(".boxImg img"));
            //console.log($(jsondata.europe));
        }
    })

});