$(function () {
    $("#navUl").find("a").eq(3).attr("class", "select");
    console.log($("#navUl").find("a"));
    $(".dzpage").find("a").on("click", function (e) {
        $(e.target).addClass("select");
    })

});
