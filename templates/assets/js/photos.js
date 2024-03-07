$(document).ready(function(){
    const $grid = $('#image-grid').isotope({
        itemSelector: '.grid-item',
        percentPosition: true,
        masonry: {
            columnWidth: '.grid-item'
        }
    });
    let page = Number(document.querySelector('#image-grid').getAttribute('data-index'))+1
    const totalPage = document.querySelector('#image-grid').getAttribute('data-total')

    const baseUrl = ThemeConfig.blog_url;
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
loadRealImages()

    const loadPageData = async function() {
        const url = baseUrl + '/photos/page/' + page;
        if(page>totalPage){
            document.querySelector('.joe_loading').remove()
            return

        }
        fetch(url)
            .then(response => response.text())
            .then(html => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const nextPageImages = doc.querySelectorAll('.grid-item');

                if (nextPageImages.length > 0) {
                    nextPageImages.forEach(image => {
                        $grid.append(image).isotope('appended', image);
                    });
                    $grid.isotope('layout');
                    loadRealImages()
                    page++
                    if(page>totalPage){
                        document.querySelector('.joe_loading').remove()

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

    observerForLoading.observe(loadingIndicator);

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
