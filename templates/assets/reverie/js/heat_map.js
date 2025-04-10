const postApi = "/apis/api.content.halo.run/v1alpha1/posts";

let startDate;
const monthDiv = document.querySelector('.month');
const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

numMonths = months ?(months>12?12:months):12;

if (numMonths > 6 && window.innerWidth < 768) {
    numMonths = 6;
}

const currentTime = new Date();
let currentDate = new Date();;
currentDate.setFullYear(currentDate.getFullYear() - 1);
const timeDiff = numMonths * 30 * 24 * 60 * 60 * 1000;

let startMonthIndex = (currentDate.getMonth() - (numMonths - 1) + 12) % 12;
for (let i = startMonthIndex; i < startMonthIndex + numMonths; i++) {
    let monthSpan = document.createElement('span');
    let monthIndex = i % 12;
    monthSpan.textContent = monthNames[monthIndex];
    monthDiv.appendChild(monthSpan);
}

const blogInfo = {"pages":[]};
getPostData();

//createHeatmap()


function getStartDate() {
    const today = new Date();

    if (numMonths > 6 && window.innerWidth < 768) {
        numMonths = 6;
    }

    const startDate = new Date(today.getFullYear(), today.getMonth() - numMonths + 1, 1, today.getHours(), today.getMinutes(), today.getSeconds());

    while (startDate.getDay() !== 1) {
        startDate.setDate(startDate.getDate() + 1);
    }

    return startDate;
}

function getWeekDay(date) {
    const day = date.getDay();
    return day === 0 ? 6 : day - 1;
}

function createDay(date, title, count, post) {
    const day = document.createElement("div");

    day.className = "heatmap_day";

    day.setAttribute("data-title", title);
    day.setAttribute("data-count", count);
    day.setAttribute("data-post", post);
    day.setAttribute("data-date", date);

    day.addEventListener("mouseenter", function () {
        const tooltip = document.createElement("div");
        tooltip.className = "heatmap_tooltip";

        let tooltipContent = "";

        if (post && parseInt(post, 10) !== 0) {
            tooltipContent += '<span class="heatmap_tooltip_post">' + '共 ' + post + ' 篇' + '</span>';
        }

        if (count && parseInt(count, 10) !== 0) {
            tooltipContent += '<span class="heatmap_tooltip_count">' + ' ' + count + ' 字；' + '</span>';
        }

        if (title && parseInt(title, 10) !== 0) {
            tooltipContent += '<span class="heatmap_tooltip_title">' + title + '</span>';
        }

        if (date) {
            tooltipContent += '<span class="heatmap_tooltip_date">' + date + '</span>';
        }

        tooltip.innerHTML = tooltipContent;
        day.appendChild(tooltip);
    });

    day.addEventListener("mouseleave", function () {
        const tooltip = day.querySelector(".heatmap_tooltip");
        if (tooltip) {
            day.removeChild(tooltip);
        }
    });

    if (count == 0 ) {
        day.classList.add("heatmap_day_level_0");
    } else if (count > 0 && count < 500) {
        day.classList.add("heatmap_day_level_1");
    } else if (count >= 1000 && count < 1000) {
        day.classList.add("heatmap_day_level_2");
    } else if (count >= 2000 && count < 2000) {
        day.classList.add("heatmap_day_level_3");
    } else {
        day.classList.add("heatmap_day_level_4");
    }

    return day;
}

function createWeek() {
    const week = document.createElement('div');
    week.className = 'heatmap_week';
    return week;
}

function createHeatmap() {
    const container = document.getElementById('heatmap');
    const startDate = getStartDate();
    const endDate = new Date();
    const weekDay = getWeekDay(startDate);

    let currentWeek = createWeek();
    container.appendChild(currentWeek);

    let currentDate = startDate;
    let i = 0;

    while (currentDate <= endDate) {
        if (i % 7 === 0 && i !== 0) {
            currentWeek = createWeek();
            container.appendChild(currentWeek);
        }

        const dateString = `${currentDate.getFullYear()}-${("0" + (currentDate.getMonth()+1)).slice(-2)}-${("0" + (currentDate.getDate())).slice(-2)}`;

        const articleDataList = blogInfo.pages.filter(page => page.date === dateString);

        if (articleDataList.length > 0) {
            const titles = articleDataList.map(data => data.title);
            const title = titles.map(t => `${t}`).join('<br />');

            let count = 0;
            let post = articleDataList.length;

            articleDataList.forEach(data => {
                count += parseInt(data.word_count, 10);
            });

            const formattedDate = formatDate(currentDate);
            const day = createDay(formattedDate, title, count, post);
            currentWeek.appendChild(day);
        } else {
            const formattedDate = formatDate(currentDate);
            const day = createDay(formattedDate, '', '0', '0');
            currentWeek.appendChild(day);
        }

        i++;
        currentDate.setDate(currentDate.getDate() + 1);
    }
}

function formatDate(date) {
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

function DateFormat(isoString, format) {
    const date = new Date(isoString);
    return format.replace(/yyyy|MM|dd|HH|mm|ss/g, tag => ({
      yyyy: date.getFullYear(),
      MM: String(date.getMonth() + 1).padStart(2, '0'),
      dd: String(date.getDate()).padStart(2, '0'),
      HH: String(date.getHours()).padStart(2, '0'),
      mm: String(date.getMinutes()).padStart(2, '0'),
      ss: String(date.getSeconds()).padStart(2, '0')
    })[tag]);
};

async function getPostData() {
// try {
//     // 使用模板字符串确保 URL 格式正确
//     const response = await fetch(postApi);
//     const { items } = await response.json();
    const fetchPromises = [];
    for (const [index, item] of postsData.entries()) {
        let publishDate = new Date(item.metadata.creationTimestamp);

        const timeDifference = currentTime - publishDate;
        const Difference = timeDifference / timeDiff;

        if(Difference > 1) {
            break;
        }

        const url = `${postApi}/${item.metadata.name}`;
        const promise = fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('网络响应不正常');
            }
            return response.json();
        })
        .then(data => {
            matches = data.content.content.replace(/<[^>]*>/g, '').match(/[\u4e00-\u9fa5a-zA-Z0-9]/g);
            page = {
                "title": `《${data.spec.title}》`,
                "date": DateFormat(data.spec.publishTime, "yyyy-MM-dd"),
                "year":DateFormat(data.spec.publishTime, "yyyy"),
                "month": DateFormat(data.spec.publishTime, "MM"),
                "day": DateFormat(data.spec.publishTime, "dd"),
                "word_count": matches ? matches.length : 0
            };
            blogInfo.pages.push(page);
        });
        fetchPromises.push(promise);
    };
    await Promise.all(fetchPromises);
    createHeatmap(blogInfo);
// } catch (error) {
//     console.error('Error fetching post:', error);
//     return null;
// }
}