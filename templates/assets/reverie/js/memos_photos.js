const memosHost = memosPhotos.memosHost.endsWith("/") ? 
                    memosPhotos.memosHost:memosPhotos.memosHost + "/";
const memosFilterTag = memosPhotos.memosFilterTag;
const memosPhotoTags = memosPhotos.memosPhotoTags;

const photo_tags = memosPhotoTags.split(' ');
  
const photoLinkPrefix = `${memosHost}file/`;
const pageSize = 25;
const memosPageApi = `${memosHost}api/v1/memos?filter=tag%20in%20["${memosFilterTag}"]&pageSize=${pageSize}&pageToken=`; // 构建 API 请求 URL

$(document).ready(async function () {
    const $grid = $('#image-grid').isotope({
        itemSelector: '.grid-item',
        percentPosition: true,
        masonry: {
            columnWidth: '.grid-item'
        }
    });
  
    var page_token = '';
    let memosData = [];
    let isLoading = false; // 防止重复加载
   
    const loadingIndicator = document.querySelector('.joe_loading');

    const initLoadData = async () => {  //初次载入数据
        try {
            const response = await fetch(memosPageApi);
            const { memos, nextPageToken } = await response.json();
            memosData = memos;
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
        renderImages();

        if(page_token != '') {  //预加载

            const pageTokenApi = `${memosPageApi}${page_token}`;
            try {
                const response = await fetch(pageTokenApi);
                const { memos, nextPageToken } = await response.json();
                memosData = memos;
                                
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

    const renderImages = () => {  //渲染

        const createImageItem = (img_url, tagsString, img_title, img_time) => {
            return $(`
                <div class="grid-item wow fadeIn" data-sjsel="${tagsString}">
                    <div class="card__picture">
                        <a class="item animated wow jg-entry" href="${img_url}" data-fancybox="gallery">
                            <img class="lazy-load"
                                data-src="${img_url}"
                                alt="${img_title}"
                                src="/themes/theme-Joe3/assets/img/photo_loading.gif"
                                onerror="Joe.errorImg(this, 'LoadFailedImg')"/>
                        </a>
                        <span class="memos_photo_title" style="display:none;">${img_title}</span>
                        <span class="memos_photo_time" style="display:none;">${formatDate(img_time)}</span>
                    </div>
                </div>
            `);
        };

        memosData.forEach(res_item => {
            const tagsString = res_item.tags.join(' ');
            const def_time = res_item.createTime;
            
            const imageNodes = res_item.nodes.filter(node => node.paragraphNode)
                                            .flatMap(node => node.paragraphNode.children)
                                            .filter(child => child.type === "IMAGE");
            
            imageNodes.forEach(imageNode => {
                const img_altText = imageNode.imageNode.altText;
                const img_url = imageNode.imageNode.url;
                const textDeal = img_altText.split(/\s+&\s+/);
                const img_time = textDeal.length === 1 ? def_time : textDeal[0];
                const img_title = textDeal.length === 1 ? textDeal[0] : textDeal[1];
                const $img_item = createImageItem(img_url, tagsString, img_title, img_time);
                $grid.append($img_item).isotope('appended', $img_item);
            });

            // 解析资源文件
             for (const [index, item] of res_item.resources.entries()) {
                if(item.type.startsWith("image")) {     //确认资源是否是图片
                    const img_url = `${photoLinkPrefix}${item.name}/${item.filename}`;

                    const textDeal = item.filename.split('.').slice(0, -1).join('.').split(/\s+&\s+/);
                    const img_time = textDeal.length === 1 ? def_time : textDeal[0];
                    const img_title = textDeal.length === 1 ? textDeal[0] : textDeal[1];

                    const $img_item = createImageItem(img_url, tagsString, img_title, img_time);
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
                            
                            const titleSpan = entry.target.querySelector('.memos_photo_title');
                            if (titleSpan) {
                                titleSpan.style.display = 'inline';
                            }
                            // const timespan = entry.target.querySelector('.memos_photo_time');
                            // if (timespan) {
                            //     timespan.style.display = 'inline';
                            // }
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

// 时间格式化函数
const formatDate = (timeString, format = "yyyy年MM月dd日") => {
    const now = new Date();
    const date = new Date(timeString);
    const diffInSeconds = Math.floor((now - date) / 1000);

    // 相对时间判断
    if (diffInSeconds < 60) {
        return '刚刚';
    }
    else if (diffInSeconds < 3600) {
        const minutes = Math.floor(diffInSeconds / 60);
        return `${minutes} 分钟前`;
    }
    else if (diffInSeconds < 86400) {
        const hours = Math.floor(diffInSeconds / 3600);
        return `${hours} 小时前`;
    }
    else if (diffInSeconds < 172800) { // 48 小时内
        return '昨天';
    }
    else if (diffInSeconds < 2592000) { // 一个月内
        const days = Math.floor(diffInSeconds / 86400);
        return `${days}天前`;
    }
    else if (diffInSeconds < 31104000) { // 一年内
        const months = Math.floor(diffInSeconds / 2592000);
        return `${months}个月前`;
    }

    // 超过一周显示具体时间
    return format.replace(/yyyy|MM|dd|HH|mm|ss/g, tag => ({
        yyyy: date.getFullYear(),
        MM: String(date.getMonth() + 1).padStart(2, '0'),
        dd: String(date.getDate()).padStart(2, '0'),
        HH: String(date.getHours()).padStart(2, '0'),
        mm: String(date.getMinutes()).padStart(2, '0'),
        ss: String(date.getSeconds()).padStart(2, '0')
    })[tag]);
};
