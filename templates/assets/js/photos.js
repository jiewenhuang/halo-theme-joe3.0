
$(document).ready(function(){
    const $grid = $('#image-grid').isotope({
        itemSelector: '.grid-item',
        percentPosition: true,
        masonry: {
            columnWidth: '.grid-item'
        }
    });


    let allImages = [];
    let currentIndex = 0;
    const batchSize = 6;
    const baseUrl = ThemeConfig.blog_url; // 替换成您的API URL

    function loadImages(callback) {
        // ...逻辑保持不变
        if (allImages.length) {
            callback();
            return;
        }

        // 获取所有图片
        const apiUrl = baseUrl + '/apis/api.plugin.halo.run/v1alpha1/plugins/PluginPhotos/photos';
        $.getJSON(apiUrl, function(data) {
            allImages = data.items; // 假设这是图片数组
            callback();
        });
    }



    function loadBatchImages() {

        const $domLoad = $('.joe_loading')
        loadImages(function() {
            // ...创建和插入元素的逻辑保持不变
            const batchEndIndex = currentIndex + batchSize;
            // 一批加载的图片项
            const items = [];

            // 获取当前批次的图片
            for (; currentIndex < batchEndIndex && currentIndex < allImages.length; currentIndex++) {
                const currentImage = allImages[currentIndex];
                const item = $('<div class="grid-item wow fadeIn" data-sjsel="'+ currentImage.spec.groupName+'">' +
                    '<div class="card__picture">'+
                    '<a class="item animated wow jg-entry" href="'+ currentImage.spec.url+'" data-fancybox="gallery">'+
                    '<img src="'+ currentImage.spec.url + '" alt="' + currentImage.spec.displayName + '"/>' +
                    '</a>'+
                        '</div>'+
                '</div>');

                items.push(item[0]);
            }

            // 将图片元素添加到网格中并重新布局
            $grid.append(items)
                .isotope('appended', items)
                .imagesLoaded().progress(function() {
                $grid.isotope('layout');
            });
            // ...其余逻辑保持不变
            // 如果所有图片都已加载，可以选择隐藏加载更多按钮
            if (currentIndex >= allImages.length) {
                $domLoad.remove()
                ob.unobserve(loading)
            }
        });
    }

    // 初始加载
    loadBatchImages();

    const ob =  new IntersectionObserver(entries => {
        if (entries[0].isIntersecting){
            loadBatchImages();
            let filteredDivs = $('.grid-item').filter(function() {
                return $(this).data('sjsel') === $('.joe_photos__filter li.active').data('sjslink');
            });
            if (filteredDivs.length===0 && currentIndex <= allImages.length && $('.joe_photos__filter li.active').data('sjslink')!=='*') {
                while (filteredDivs.length===0&&currentIndex <= allImages.length){
                    loadBatchImages();
                    filteredDivs = $('.grid-item').filter(function() {
                        return $(this).data('sjsel') === $('.joe_photos__filter li.active').data('sjslink');
                    });
                }
            }else {
            }
                }

    }, {
        threshold:1
    })
    const loading = document.querySelector('.joe_loading')
    ob.observe(loading)


    $('.joe_photos__filter li').on('click', function(){
        let filterValue = $(this).attr('data-sjslink');
        // 添加active
        $(this).addClass('active').siblings().removeClass('active');
        // 重置 Isotope 过滤器为默认值
        $grid.isotope({
            filter: function() {
                // 检查 data-sjsel 属性值是否匹配我们筛选的值
                const sjselValue = $(this).attr('data-sjsel'); // 这里获取的是.grid-item的data-sjsel
                // 如果 filterValue 是 '*'（显示所有），或者 sjselValue 匹配筛选值，则保留元素
                return filterValue === '*' || sjselValue === filterValue;
            }
        });
    });
});