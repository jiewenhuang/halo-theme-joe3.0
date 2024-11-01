$(document).ready(function(){
    const $grid = $('#image-grid').isotope({
        itemSelector: '.grid-item',
        percentPosition: true,
        masonry: {
            columnWidth: '.grid-item'
        }
    });
    let page = Number(document.querySelector('#image-grid').getAttribute('data-index')) + 1;
    const totalPage = document.querySelector('#image-grid').getAttribute('data-total');
    // 使用window.location.origin可避免跨域问题
    const baseUrl = window.location.origin;
    const loadingIndicator = document.querySelector('.joe_loading');

    function loadRealImages(){
        // 创建 Intersection Observer 实例
        const gridItems = document.querySelectorAll('.grid-item');

        const observer = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    // 加载图片
                    const image = entry.target.querySelector('.lazy-load');
                    if (image) {
                        image.src = image.dataset.src; // 将 data-src 的值赋给 src
                        image.classList.remove('lazy-load'); // 移除 lazy-load 类
                        observer.unobserve(entry.target); // 停止观察该元素
                        image.onload = function() {
                            $grid.isotope('layout');
                        };
                    }
                }
            });
        }, {
            threshold: 0.5
        });

        // 开始观察每个 grid item
        gridItems.forEach(function(item) {
            observer.observe(item);
        });
    }
    loadRealImages();

    /**
     * 异步加载页面数据的函数
     * 此函数根据当前URL和全局变量来确定要加载的页面数据的URL，并使用fetch API进行加载
     * 加载成功后，它将解析HTML，提取并追加到页面上，同时更新全局页码变量
     */
    const loadPageData = async function() {
        // 初始化URL变量
        let url;
        // 获取当前页面的URL
        const currentUrl = window.location.href;

        // 根据当前URL确定要加载的页面数据的URL
        // 检查当前URL是否包含'/photos'且不包含'?group='
        if (currentUrl.includes('/photos') && !currentUrl.includes('?group=')) {
            url = `${baseUrl}/photos/page/${page}`;
        // 检查当前URL是否包含'/photos'且包含'?group='
        } else if (currentUrl.includes('/photos') && currentUrl.includes('?group=')) {
            // 获取URL中的group参数
            const groupParam = new URLSearchParams(window.location.search).get('group');
            url = `${baseUrl}/photos/page/${page}?group=${groupParam}`;
        }

        // 检查当前页码是否超过总页码
        if (page > totalPage) {
            // 移除加载指示器并返回
            loadingIndicator.remove();
            return;
        }

        // 使用fetch API加载确定的URL
        fetch(url)
            .then(response => response.text())
            .then(html => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const nextPageImages = doc.querySelectorAll('.grid-item');

                // 如果有图片元素，则追加到页面上
                if (nextPageImages.length > 0) {
                    nextPageImages.forEach(image => {
                        $grid.append(image).isotope('appended', image);
                    });
                    $grid.isotope('layout');
                    // 加载实际图片并增加页码
                    loadRealImages();
                    page++;
                    // 再次检查当前页码是否超过总页码
                    if (page > totalPage) {
                        // 移除加载指示器
                        loadingIndicator.remove();
                    }
                }
            })
            .catch(error => {
                console.error('Error fetching next page data:', error);
            });
    };

    const observerForLoading = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
            loadPageData();
        }
    }, {
        threshold: 1
    });

    // 使用try/catch隐藏在使用分页时浏览器控制台中报找不到元素的错
    try {
        observerForLoading.observe(loadingIndicator);
    }catch (e){}

    $('.joe_photos__filter li').on('click', function() {
        const filterValue = $(this).attr('data-sjslink');
        $(this).addClass('active').siblings().removeClass('active');
        $grid.isotope({
            filter: function() {
                const sjselValue = $(this).attr('data-sjsel');
                return filterValue === '*' || sjselValue === filterValue;
            }
        });
    });
});
