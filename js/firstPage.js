
$(function () {
    $("#navUl").find("a").eq(0).attr("class","select");
    //搜索内容变成动态的
    var inputA = $(".areas").find("a");
    inputA.eq(3).addClass("select");
    inputA.eq(6).addClass("select");
    inputA.eq(8).addClass("select");

    inputA.on("click", function (e) {
        $(e.target).toggleClass("select");
        var aText = $(e.target).html();//a标签里的文本内容
        //console.log(aText);
        //var inputVal=$(".search input").val();//input里的文本内容
        var input = $(".search input");
        input.val(aText).css({//将a标签里的文本内容赋给input
            "font-size": "16px",//加引号完全符合css书写方式
            color: "#333;",
            fontWeight: "bold"//不加引号要大写第二个单词的首字母
        });
        //console.log(inputVal);
    }).on("mouseout", function (e) {
        $(e.target).removeClass("select");
    });

});
//图片动态生成
$(function () {


    //签证服务导航

    $.ajax({
        type: "get",
        url: "http://localhost:8088/travel/qz.php",
        dataType:"json",
        success: function (data) {
            //var jsondata = JSON.parse(data);
            console.log(data);  




            $(".qzUl .europe").on("click", function (e) {
                $(e.target).addClass("select").parent().siblings().find("a").removeClass("select");
                $(data.europe).each(function (index, e) {
                    $(".imgBox img").eq(index).attr("src", $(data.europe)[index]);
                    //console.log($(data.europe)[index]);
                });

            });
            $(".qzUl .america").on("click", function (e) {
                $(e.target).addClass("select").parent().siblings().find("a").removeClass("select");
                $(data.america).each(function (index) {
                    $(".imgBox img").eq(index).attr("src", $(data.america)[index]);
                });
            });
            $(".qzUl .asia").on("click", function (e) {
                $(e.target).addClass("select").parent().siblings().find("a").removeClass("select");
                $(data.asia).each(function (index) {
                    $(".imgBox img").eq(index).attr("src", $(data.asia)[index]);
                });
            });
            $(".qzUl .other").on("click", function (e) {
                $(e.target).addClass("select").parent().siblings().find("a").removeClass("select");
                $(data.other).each(function (index) {
                    $(".imgBox img").eq(index).attr("src", $(data.other)[index]);
                });
            })
        }
    });

    $.ajax({
        type: "get",
        url: "http://localhost:8088/travel/lx.php",
        dataType:"json",
        success: function (data) {
            //var jsondata = JSON.parse(data);
            console.log(data);
            adapter(data);
        }
    });

});
function adapter(data) {
    $(data.lxTitle).each(function (index, ele) {
        $(".lx h2").eq(index).html($(data.lxTitle)[index]);
    });
    $(data.findP).each(function (index, ele) {
        $(".find .lxText .p1").html($(data.findP)[index].p1);
        $(".find .lxText .p2").html($(data.findP)[index].p2);
    });
    $(data.driveP).each(function (index, ele) {
        $(".drive .lxText .p1").html($(data.driveP)[index].p1);
        $(".drive .lxText .p2").html($(data.driveP)[index].p2);
    });
    $(data.seaP).each(function (index, ele) {
        $(".sea .lxText .p1").html($(data.seaP)[index].p1);
        $(".sea .lxText .p2").html($(data.seaP)[index].p2);
    });
    $(data.prayP).each(function (index, ele) {
        $(".pray .lxText .p1").html($(data.prayP)[index].p1);
        $(".pray .lxText .p2").html($(data.prayP)[index].p2);
    });
    $(data.findImg).each(function (index, ele) {
        $(".find .areaList img").eq(index).attr("src", $(data.findImg)[index]);
    });
    $(data.driveImg).each(function (index, ele) {
        $(".drive .areaList img").eq(index).attr("src", $(data.driveImg)[index]);
    });
    $(data.seaImg).each(function (index, ele) {
        $(".sea .areaList img").eq(index).attr("src", $(data.seaImg)[index]);
    });
    $(data.prayImg).each(function (index, ele) {
        $(".pray .areaList img").eq(index).attr("src", $(data.prayImg)[index]);
    });
    $(data.findTitle).each(function (index, ele) {
        $(".find .detail .p1").eq(index).html($(data.findTitle)[index]);
    });
    $(data.driveTitle).each(function (index, ele) {
        $(".drive .detail .p1").eq(index).html($(data.driveTitle)[index]);
    });
    $(data.seaTitle).each(function (index, ele) {
        $(".sea .detail .p1").eq(index).html($(data.seaTitle)[index]);
    });
    $(data.prayTitle).each(function (index, ele) {
        $(".pray .detail .p1").eq(index).html($(data.prayTitle)[index]);
    });
    $(data.findText).each(function (index, ele) {
        $(".find .detail .p2").eq(index).html($(data.findText)[index]);
    });


}
