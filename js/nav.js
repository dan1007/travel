/**
 * Created by wangdan on 2016/6/18.
 */
$(function () {
    //���ض���
    var toTop = $(".toTop");
    var pageHeight = document.documentElement.clientHeight; //ҳ��ĸ߶�
    console.log(pageHeight);
    window.onscroll = function () {
        var backTop = document.body.scrollTop;//ҳ������ĸ߶� ��һ��Ҫд��window.onscroll=function(){}����
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
