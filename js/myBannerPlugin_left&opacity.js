/*把下面这个插件放在一个js文件里，方便调用，除defaults里的属性和转义变量可以改变位置外，不要打乱下面的顺序*/
;
(function ($, window, document, undefined) {
    var pluginName = "myBanner"; //插件名
    var defaults = { //对象的属性就是插件需要传递的参数，默认值就是插件参数的默认值：
        bannerImg: '', //存放轮播图片的最外层容器的id名
        bannerImgInnerTag: '', //存放轮播图片的外层容器的标签名
        activeClassName: null, //差异样式的class名
        bannerPageInnerTag: '', //存放缩略图的标签名
        bannerInfo: '', //存放图片信息的容器的id名
        bannerBtn: '', //存放前进、后退按钮的容器的id名
        nextBtn: '', //前进按钮的id名
        prevBtn: '', //后退按钮的id名
        currentIndex: 0, //页面加载完成时，当前要显示的轮播图及其对应的缩略图和图片信息的索引，默认从第一张开始
        speed: '',
        type: '',
        thumbnail: false //默认没有缩略图
    };
    //插件类
    function Plugin(ele, options) {
        this.ele = ele; //拿到dom元素，获得对应jq对象，要$(ele)
        this.options = $.extend({}, defaults, options); //将传递的参数，继承刚才定义的对象defaults //覆盖默认配置项
        this._defaults = defaults; //缓存配置项
        this.init(); //调用初始函数
    }

    Plugin.prototype.init = function () { //把初始化的方法添加到Plugin的原型上，注意，不要改变一下顺序
        /*转义变量*/
        var $element = $(this.ele); //$element是接口
        var $bannerImg = $(this.options.bannerImg);
        var $bannerInfo = $(this.options.bannerInfo);
        var $bannerBtn = $(this.options.bannerBtn);
        var $nextBtn = $(this.options.nextBtn);
        var $prevBtn = $(this.options.prevBtn);
        var activeClassName = this.options.activeClassName;
        var eventType = this.options.eventType;
        var bannerImgInnerTag = this.options.bannerImgInnerTag;
        var bannerPageInnerTag = this.options.bannerPageInnerTag;
        var currentIndex = this.options.currentIndex;
        var speed = this.options.speed;
        var type = this.options.type;
        var thumbnail = this.options.thumbnail;
        /*声明定时器和延时器，方便调用和清除*/
        var timer; //定时器
        var delay; //延时器
        if (type == 2) {
            $bannerImg.append($bannerImg.find(bannerImgInnerTag).first().clone()) //!!!重要!!!把轮播图的第一张图片复制到最后一张图片的后面,然后再计算轮播图片总数
        }

        /*动态获取轮播图片数量和每张图片的宽度，据此动态设置轮播图容器的宽度*/
        var imgW = $bannerImg.children().width(); //一张图片的宽度
        var size = $bannerImg.children().size(); //图片总数
        var allImgsW = $bannerImg.children().width() * size; //总宽度=一个轮播图片的宽度*图片总数
        $bannerImg.width(allImgsW); //！！！动态获取轮播图片容器的宽度=一个轮播图片的宽度*图片个数

        /*初始化公共样式————显示当前缩略图差异样式；图片信息显示当前一张图的alt内容；翻页按钮隐藏；将轮播图中的图片依次克隆到对应的缩略图容器中,并且显示当前图片其他隐藏*/
        $element.find(bannerPageInnerTag).eq(currentIndex).addClass(activeClassName) //显示当前缩略图差异样式
        $bannerInfo.html($bannerImg.find(bannerImgInnerTag).eq(currentIndex).children('img').attr('alt')); //图片信息显示当前一张图的alt内容
        $bannerBtn.hide(); //翻页按钮隐藏

        /*根据要显示的效果不同，判断对应的独特初始化样式*/
        if (type == 1) {
            $bannerImg.find(bannerImgInnerTag).css('position', 'absolute'); //淡入淡出效果的各个轮播图绝对定位，使图片重叠到一起
        } else if (type == 2) {
            //							$bannerImg.append($bannerImg.find(bannerImgInnerTag).first().clone()) //!!!重要!!!把轮播图的第一张图片复制到最后一张图片的后面
            $bannerImg.find(bannerImgInnerTag).css('float', 'left'); //向左滑动效果的各个轮播图片浮动到一排显示
            $bannerImg.css('left', -currentIndex * imgW); //！！！初始化轮播图容器相对于要显示的图片的位置，以便显示要特定索引对应的轮播图片
        }
        //判断是否显示缩略图
        if (thumbnail) {
            if (type == 1) {
                $bannerImg.find(bannerImgInnerTag).each(function (e) { //淡入淡出效果————将轮播图中的图片依次克隆到对应的缩略图容器中,并且显示当前轮播图片其他隐藏
                    $(this).find('img').clone().appendTo($element.find(bannerPageInnerTag).eq($(this).index()));
                }).eq(currentIndex).show().siblings().hide();
            } else if (type == 2) {
                $bannerImg.find(bannerImgInnerTag).each(function (e) { //向左滑动效果————将轮播图中的图片依次克隆到对应的缩略图容器中
                    $(this).find('img').clone().appendTo($element.find(bannerPageInnerTag).eq($(this).index()));
                });
            }
        }

        /*调用自动轮播*/
        autoPlay();

        /*鼠标快速滑到分页的缩略图上，对应的大图和图片信息延迟伴随显示，停止轮播，鼠标离开，开始轮播*/
        $element.on('mouseover', bannerPageInnerTag, function (e) { //接口$element是缩略图的容器
            currentIndex = $(this).index();
            if ($target = $element.find(bannerPageInnerTag)) {
                delay = setTimeout(function () { //防止鼠标快速来回滑过缩略图，造成鼠标离开缩略图，轮播图依然执行切换播放
                    if (type == 1) {
                        withDisplay();
                    } else if (type == 2) {
                        $bannerImg.stop().animate({
                            left: -currentIndex * imgW
                        }, 'slow');
                        $element.find(bannerPageInnerTag).eq(currentIndex).addClass(activeClassName).siblings().removeClass(activeClassName);
                        $bannerInfo.html($bannerImg.find(bannerImgInnerTag).eq(currentIndex).children('img').attr('alt'));
                    }
                }, 300);
            }
            clearInterval(timer);
        });
        $element.on('mouseout', bannerPageInnerTag, function (e) {
            clearTimeout(delay);
            autoPlay();
        });

        /*淡入淡出————大图、缩略图和图片信息伴随显示的函数————显示当前的轮播图片其他的隐藏，对应的缩略图的边框变色，对应的图片信息出现*/
        function withDisplay() {
            $bannerImg.find(bannerImgInnerTag).eq(currentIndex).fadeIn().siblings().fadeOut();
            $element.find(bannerPageInnerTag).eq(currentIndex).addClass(activeClassName).siblings().removeClass(activeClassName);
            $bannerInfo.html($bannerImg.find(bannerImgInnerTag).eq(currentIndex).children('img').attr('alt'));
        }

        //鼠标滑到轮播图上 和 翻页按钮上时，翻页按钮显示，图片停止播放;鼠标离开轮播图，翻页按钮隐藏，图片开始轮播
        $bannerImg.mouseenter(function () {
            clearInterval(timer);
            $bannerBtn.show();
        }).mouseleave(function () {
            $bannerBtn.hide();
            autoPlay();
        });
        $bannerBtn.mouseenter(function () {
            clearInterval(timer);
            $bannerBtn.show();
        }).mouseleave(function () {
            $bannerBtn.hide();
            autoPlay();
        });

        /*点击前进按钮*/
        $nextBtn.click(function () {
            currentIndex++;
            if (type == 1) {
                if (currentIndex > $bannerImg.children().length - 1) {
                    currentIndex = 0;
                }
                withDisplay();
            } else if (type == 2) {
                if (currentIndex == size) {
                    currentIndex = 1;
                    $bannerImg.css({
                        'left': 0
                    }); //保证无缝轮播，设置left值
                }
                $bannerImg.stop().animate({
                    left: -currentIndex * imgW
                }, 'slow');
                if (currentIndex == size - 1) { //设置小圆点指示
                    $element.find(bannerPageInnerTag).eq(0).addClass(activeClassName).siblings().removeClass(activeClassName);
                    $bannerInfo.html($bannerImg.find(bannerImgInnerTag).eq(0).children('img').attr('alt'));
                } else {
                    $element.find(bannerPageInnerTag).eq(currentIndex).addClass(activeClassName).siblings().removeClass(activeClassName);
                    $bannerInfo.html($bannerImg.find(bannerImgInnerTag).eq(currentIndex).children('img').attr('alt'));
                }
            }
        });

        /*点击后退按钮*/
        $prevBtn.click(function () {
            currentIndex--;
            if (type == 1) {
                if (currentIndex < 0) {
                    currentIndex = $bannerImg.children().length - 1;
                }
                withDisplay();
            } else if (type == 2) {
                if (currentIndex < 0) {
                    currentIndex = size - 2; //!!重要!!此设置保证到第一张图片时后退无缝切换到最后一张
                    $bannerImg.css({
                        left: -(size - 1) * imgW
                    });
                }
                $bannerImg.stop().animate({
                    left: -currentIndex * imgW
                }, 'slow');
                $element.find(bannerPageInnerTag).eq(currentIndex).addClass(activeClassName).siblings().removeClass(activeClassName);
                $bannerInfo.html($bannerImg.find(bannerImgInnerTag).eq(currentIndex).children('img').attr('alt'));
                //withDisplay();
            } else {
                console.log('else');
            }

        });

        /*自动播放的函数————定时播放点击前进按钮的事件*/
        function autoPlay() {
            timer = setInterval(function () {
                $nextBtn.click();
            }, speed);
        }

    };
    //fn就是prototype
    $.fn[pluginName] = function (options) {
        //each表示对多个元素调用，用return 是为了返回this，进行链式调用
        return this.each(function () {
            //判断有没有插件名字 如果你不愿意加if 直接new就好了
            if (!$.data(this, 'plugin_' + pluginName)) {
                //生成插件类实例
                $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
            }
        });
    }
})(jQuery, window, document);