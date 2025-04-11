function categoryDataHandle() {
    let postCount = [];
    let categoryNames = [];
    let categoryLink = [];
    
    categoryList.forEach(item => {
        postCount.push(item.postCount);
        categoryNames.push(item.spec.displayName)
        categoryLink.push(item.status.permalink)
        
    });
    const colorList = ['#4dabf7', '#ffa8a8', '#099268', '#ae3ec9', '#3bc9db', '#f03e3e','#6e9bc5', '#c3d94e', '#b1d5c8', '#bba1cb', '#e66767', '#706fd3', '#0be881', '#fff200'];

    const ctx = document.getElementById('categoryChart');
    const data = {
    labels: categoryNames,
    datasets: [{
        label: "分类文章数",
        data: postCount,
        backgroundColor: colorList,
        hoverOffset: 30
    }]
    };
    const config = {
        type: 'doughnut',
        data: data,
        options: {
            responsive: true, // 设置图表为响应式，根据屏幕窗口变化而变化
            maintainAspectRatio: false,// 保持图表原有比例
            plugins: {
                legend: {
                  position: false,
                }
            },
            //animation: false,
            animation: {
                delay: 300,
                duration: 1500
            },
            onClick: (event, elements, chart) => {
                if (elements.length > 0) {
                    const index = elements[0].index;
                    const link = categoryLink[index];
                    if (link) {
                        window.location.href = link;
                    }
                }
            },
            layout: {
                padding: {
                    left: 20,
                    right:20
                } //不被隐藏
            }
        },
        plugins: [{
            afterDraw: function(chart, options) {
                chart.options.animation.delay = 0;
                chart.options.animation.duration= 0;
            }
        }]
    };
    const myChart = new Chart(ctx, config);

    const canvas = ctx;
    canvas.addEventListener('mousemove', function (event) {
        const elements = myChart.getElementsAtEventForMode(event, 'nearest', { intersect: true }, true);
        canvas.style.cursor = elements.length > 0? 'pointer' : 'default';
        //myChart.options.animation.delay = 0;
    });

    canvas.addEventListener('mouseout', function () {
        canvas.style.cursor = 'default';
    });

    const tabList = document.getElementById("categoryInfoList");
    categoryNames.forEach((item, index) => {
        const li_item = document.createElement('a');
        li_item.href = categoryLink[index];
        li_item.target = `_blank`;
        li_item.rel = `noopener noreferrer`;
        li_item.innerHTML = `
        <li class="flex flex-row items-center text-slate-200 font-semibold transition duration-150 ease-in-out hover:scale-125 cursor-pointer">
            <span class="px-3.5 h-[15px] rounded-[1px] border-2 bg-[${colorList[index]}] mr-2 "></span>
            <span class="text-nowrap">${item}</span>
        <li>
        `;
        tabList.appendChild(li_item);
    })
}
categoryDataHandle();

function tagDataHandle() {
    let tagName = [];
    let postCount = [];
    let tagLink = [];

    tagList.forEach(item => {
        tagName.push(item.spec.displayName);
        postCount.push(item.postCount);
        tagLink.push(item.status.permalink);
    });

    const ctx = document.getElementById('tagChart');
    
    const colorList = ['#ae3ec9', '#3bc9db', '#f7b731','#6e9bc5', '#c3d94e', '#b1d5c8', '#bba1cb', '#4dabf7', '#ffa8a8', '#099268'];
    // const colorList = ['rgba(255, 99, 132, 0.2)','rgba(54, 162, 235, 0.2)','rgba(255, 206, 86, 0.2)','rgba(75, 192, 192, 0.2)','rgba(153, 102, 255, 0.2)'];
    // const borderColor = ['rgba(255, 99, 132, 1)','rgba(54, 162, 235, 1)','rgba(255, 206, 86, 1)','rgba(75, 192, 192, 1)','rgba(153, 102, 255, 1)'];
    const data = {
        labels: tagName,
        datasets: [{
            label: '标签文章数',
            data: postCount,
            backgroundColor: colorList,
            hoverOffset: 20
        }]
    };
    const config = {
        type: 'polarArea',
        data: data,
        options: {
        //animation: false,
        animation: {
            delay: 100,
            duration: 1000,
            easing: 'easeInOutCubic'
        },
          responsive: true,
          borderWidth: 1,
          circular: false,
          plugins: {
            legend: {
              position: false,
            }
          },
          onClick: (event, elements, chart) => {
            if (elements.length > 0) {
                const index = elements[0].index;
                const link = tagLink[index];
                if (link) {
                    window.location.href = link;
                }
            }
          },
          onHover: (event, elements, chart) => {
            event.native.target.style.cursor = elements.length > 0? 'pointer' : 'default';
            if (elements.length > 0) {
                // 鼠标悬停时进行缩放，增强交互感
                event.native.target.style.transform = 'scale(1.1)';
            } else {
                event.native.target.style.transform = 'scale(1)';
            }
          },
        }
    };
    const myChart = new Chart(ctx, config);
}
tagDataHandle();

const sortedTagList = tagList.sort((a, b) => b.postCount - a.postCount);
function createHaloTagList() {
    const haloTagList = document.querySelector(".stats-tag_list");
    sortedTagList.forEach(tag => {
        const tagItem = document.createElement('li');
        tagItem.className = "item mt-1 mr-3 mb-2.5 bg-[#35353e] border border-[#454545] group";
        tagItem.innerHTML = `
            <a th:href="${tag.status.permalink}" th:title="${tag.spec.displayName}" >
                <span class="text-slate-200">${tag.spec.displayName}</span>
                <em class="text-[#9999ff]">${tag.status.visiblePostCount ? tag.status.visiblePostCount : 0 }篇</em>
            </a>
        `;
        haloTagList.appendChild(tagItem);
    });
}

// Memos API 数据处理
const level_color = ['', '#4dabf7', '#4dabf7', '#2ecc71', '#4caf50', '#afb42b', '#ff8f00', '#fa541c', '#fa541c']
$(document).ready(function () {
    createHaloTagList();

    const memosUrl = `${memosCacheApi}/stats/1`;
    $.getJSON(memosUrl, function (data) {
        document.querySelector(".memos-count").textContent = data.total;
        document.querySelector(".memos-tags-count").textContent = data.tagTotal;
        document.querySelector(".memos-photo-count").textContent = data.photoTotal;


        const memosTagList = document.querySelector(".memos-tags_list");
        for (const [tag, count] of Object.entries(data.tags)) {

            const tagItem = document.createElement('a');
            tagItem.href = `${memosHost}explore?filter=tagSearch:${tag}`
            tagItem.target = `_blank`;
            tagItem.rel = `noopener noreferrer`;
            tagItem.innerHTML =`
            <li class="flex float-left text-[12px] font-light text-white mr-3 mb-3 items-center justify-items-center">
                <span class="inline-block px-[6px] py-[2px] rounded-l-[4px] bg-[#343a40]">${tag}</span>
                <span class="inline-block px-[6px] py-[2px] rounded-r-[4px] bg-[${level_color[count>10?8:(count>7?7:count)]}]">${count}</span>
            </li>
            `;
            memosTagList.appendChild(tagItem);
        }
    })
    .fail(function (error) {
        console.error('请求出错:', error);
    });
});
