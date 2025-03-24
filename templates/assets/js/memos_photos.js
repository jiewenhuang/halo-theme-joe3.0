const memosHost = memosPhotos.memosHost;
const memosFilterTag = memosPhotos.memosFilterTag;
const memosPhotoTags = memosPhotos.memosPhotoTags;

const photo_tags = memosPhotoTags.split(' ');
  
const memosApiUrl = "http://42.193.148.76:20032/api/v1/memos"
const photoLinkPrefix = `${memosHost}/file/`;
const pageSize = 25;
const memosPageApi = `${memosApiUrl}?filter=tag%20in%20["${memosFilterTag}"]&pageSize=${pageSize}&pageToken=`; // 构建 API 请求 URL

$(document).ready(async function () {
    const $grid = $('#image-grid').isotope({
        itemSelector: '.grid-item',
        percentPosition: true,
        masonry: {
            columnWidth: '.grid-item'
        }
    });
  
    var page_token = '';
    let resourceData = [];
    let isLoading = false; // 防止重复加载
   
    const loadingIndicator = document.querySelector('.joe_loading');

    const initLoadData = async () => {  //初次载入数据
        try {
            const response = await fetch(memosPageApi);
            const { memos, nextPageToken } = await response.json();
            resourceData = memos.filter(item => item.resources.length > 0); // resources（资源）数组非空
            page_token = nextPageToken;

            const observerForLoading = new IntersectionObserver(entries => {
                if (entries[0].isIntersecting) {    //图片进入视窗
                    loadData();
                }
            }, {
                threshold: 1
            });
            observerForLoading.observe(loadingIndicator);   //观察Loading标志

        } catch (error) {
            console.error('数据加载失败:', error);
        }
    };


    const loadData = async () => {

        if (isLoading) return;
        isLoading = true;
        renderResource();

        if(page_token != '') {  //预加载

            const pageTokenApi = `${memosPageApi}${page_token}`;
            try {
                const response = await fetch(pageTokenApi);
                const { memos, nextPageToken } = await response.json();
                resourceData = memos.filter(item => item.resources.length > 0); // resources（资源）数组非空
                                
                page_token = nextPageToken;

            } catch (error) {
                console.error('预加载失败:', error);
            } finally {
                isLoading = false;
            }
        }
        else {
            document.querySelector('.joe_loading').remove(); //移除加载中标志
        }
    }

    const renderResource = () => {  //渲染
        resourceData.forEach(res_item => {

            const tagsString = res_item.tags.join(' ');

            for (const [index, item] of res_item.resources.entries()) {

                if(item.type.startsWith("image")) {     //确认资源是否是图片
                    const img_url = `${photoLinkPrefix}${item.name}/${item.filename}`;
                    
                    const $img_item = $(`
                        <div class="grid-item wow fadeIn" data-sjsel="${tagsString}">
                        <div class="card__picture">
                            <a class="item animated wow jg-entry" href="${img_url}" data-fancybox="gallery">
                            <img
                                class="lazy-load"
                                data-src="${img_url}"
                                alt="${res_item.filename}"
                                src="/themes/theme-Joe3/assets/img/photo_loading.gif"
                                onerror="Joe.errorImg(this, 'LoadFailedImg')"
                            />
                            </a>
                        </div>
                        </div>
                    `);
                    $grid.append($img_item).isotope('appended', $img_item);
                }
            }
        });
        $grid.on('layoutComplete', function() {
            loadRealImages();
            $grid.off('layoutComplete'); 
        });
        $grid.isotope('layout');
    }
  

    function loadRealImages() { //将在图片->将src设置为data-src
        const gridItems = document.querySelectorAll('.grid-item');
        const observer = new IntersectionObserver(function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {        
                    const image = entry.target.querySelector('.lazy-load');
                    if (image) {
                        image.src = image.dataset.src;          
                        image.classList.remove('lazy-load');
                        observer.unobserve(entry.target);
                        image.onload = function () {
                            $grid.isotope('layout');
                        };
                    }
                }
            });
        }, {
            threshold: 0.5
        });
  
        gridItems.forEach(function (item) {
            observer.observe(item);
        });
    }

    function renderFilterNav() {
        const container = document.getElementById('tag_filter');
        const filter_all = document.createElement('li');
        filter_all.className = `active`;
        filter_all.setAttribute('data-sjslink', '*');
        filter_all.innerHTML = `<a>全部</a>`;
        container.appendChild(filter_all);
    
        for (const [index, tag] of photo_tags.entries()) {
            const filter_item = document.createElement('li');
            filter_item.setAttribute('data-sjslink', tag);
            filter_item.innerHTML = `<a>${tag}</a>`;
            container.appendChild(filter_item);
        }
    }
    renderFilterNav();

    $('.joe_photos__filter li').on('click', function () {
        const filterValue = $(this).attr('data-sjslink');
        $(this).addClass('active').siblings().removeClass('active');
        $grid.isotope({
            filter: function () {
                const sjselValue = $(this).attr('data-sjsel');
                return filterValue === '*' || sjselValue.split(' ').includes(filterValue);
            }
        });
    });
    
    initLoadData();
});
