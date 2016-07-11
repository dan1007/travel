/**
 * Created by wangdan on 2016/6/18.
 */
$(function () {
    //返回顶部
    var toTop = $(".toTop");
    var pageHeight = document.documentElement.clientHeight; //页面的高度
    console.log(pageHeight);
    window.onscroll = function () {
        var backTop = document.body.scrollTop;//页面滚动的高度 ，一定要写在window.onscroll=function(){}里面
        console.log(backTop);
        if (backTop >= pageHeight) {
            toTop.css("display", "block");
        } else {
            toTop.css("display", "none");
        }

        toTop.on("click", function () {
            var timer;
            var speed = backTop / 5;
            $("body").scrollTop(0);
        }).css({
            "color":"#333",
            "background-color":"#8B7F6F;"
        })
    }
});
