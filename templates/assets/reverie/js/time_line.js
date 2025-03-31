const config_avatar = timelineConfig.avatar;
const avatar_show = config_avatar? config_avatar : '/themes/theme-Joe3/assets/img/transparent-placeholder.png';
const page_content = timelineConfig.content;

const post_api = "/apis/api.content.halo.run/v1alpha1/posts/";


const level_svgs = [
    ``,
    `
        <svg xmlns="http://www.w3.org/2000/svg" width="140" height="140" viewBox="0 0 512 512"><path fill="#666666" d="M466.27 286.69C475.04 271.84 480 256 480 236.85c0-44.015-37.218-85.58-85.82-85.58H357.7c4.92-12.81 8.85-28.13 8.85-46.54C366.55 31.936 328.86 0 271.28 0c-61.607 0-58.093 94.933-71.76 108.6c-22.747 22.747-49.615 66.447-68.76 83.4H32c-17.673 0-32 14.327-32 32v240c0 17.673 14.327 32 32 32h64c14.893 0 27.408-10.174 30.978-23.95c44.509 1.001 75.06 39.94 177.802 39.94c7.22 0 15.22.01 22.22.01c77.117 0 111.986-39.423 112.94-95.33c13.319-18.425 20.299-43.122 17.34-66.99c9.854-18.452 13.664-40.343 8.99-62.99m-61.75 53.83c12.56 21.13 1.26 49.41-13.94 57.57c7.7 48.78-17.608 65.9-53.12 65.9h-37.82c-71.639 0-118.029-37.82-171.64-37.82V240h10.92c28.36 0 67.98-70.89 94.54-97.46c28.36-28.36 18.91-75.63 37.82-94.54c47.27 0 47.27 32.98 47.27 56.73c0 39.17-28.36 56.72-28.36 94.54h103.99c21.11 0 37.73 18.91 37.82 37.82c.09 18.9-12.82 37.81-22.27 37.81c13.489 14.555 16.371 45.236-5.21 65.62M88 432c0 13.255-10.745 24-24 24s-24-10.745-24-24s10.745-24 24-24s24 10.745 24 24"/></svg>
    `,
    `
        <svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 24 24"><path fill="#ffffff" d="m10.833 8.142l1.8-3.57a1.64 1.64 0 0 1 1.49-.92c.306 0 .606.09.86.26c.251.166.452.398.58.67l1.76 3.57l.11.08l3.92.57c.302.04.586.165.82.36c.234.205.41.467.51.76a1.66 1.66 0 0 1 0 .91a1.57 1.57 0 0 1-.44.77l-2.84 2.77a.11.11 0 0 0 0 .11l.68 3.93c.047.297.016.6-.09.88a1.7 1.7 0 0 1-1.4 1.05a1.6 1.6 0 0 1-.91-.2l-3.38-1.77l-.17-.07h-.14l-3.52 1.84a1.6 1.6 0 0 1-.76.19h-.17a1.7 1.7 0 0 1-.84-.32a1.54 1.54 0 0 1-.55-.71a1.6 1.6 0 0 1 0-1l.66-3.81a.5.5 0 0 0 0-.11h-.05l-2.82-2.74a1.7 1.7 0 0 1-.46-.8a1.62 1.62 0 0 1 .53-1.65a1.6 1.6 0 0 1 .83-.36l3.87-.57zm-2.83-2h-6a.75.75 0 0 1 0-1.5h6a.75.75 0 1 1 0 1.5m-3 12.07h-3a.75.75 0 1 1 0-1.5h3a.75.75 0 1 1 0 1.5m-1.46-5.77h-1.5a.75.75 0 1 1 0-1.5h1.5a.75.75 0 1 1 0 1.5"/></svg>
    `,
    `
        <svg xmlns="http://www.w3.org/2000/svg" width="140" height="124.44444444444444" viewBox="0 0 576 512"><path fill="#ffffff" d="M552 64H448V24c0-13.3-10.7-24-24-24H152c-13.3 0-24 10.7-24 24v40H24C10.7 64 0 74.7 0 88v56c0 35.7 22.5 72.4 61.9 100.7c31.5 22.7 69.8 37.1 110 41.7C203.3 338.5 240 360 240 360v72h-48c-35.3 0-64 20.7-64 56v12c0 6.6 5.4 12 12 12h296c6.6 0 12-5.4 12-12v-12c0-35.3-28.7-56-64-56h-48v-72s36.7-21.5 68.1-73.6c40.3-4.6 78.6-19 110-41.7c39.3-28.3 61.9-65 61.9-100.7V88c0-13.3-10.7-24-24-24M99.3 192.8C74.9 175.2 64 155.6 64 144v-16h64.2c1 32.6 5.8 61.2 12.8 86.2c-15.1-5.2-29.2-12.4-41.7-21.4M512 144c0 16.1-17.7 36.1-35.3 48.8c-12.5 9-26.7 16.2-41.8 21.4c7-25 11.8-53.6 12.8-86.2H512z"/></svg>
    `,
    `
        <svg xmlns="http://www.w3.org/2000/svg" width="140" height="140" viewBox="0 0 512 512"><path fill="#eab308" d="M137.273 41c1.41 59.526 16.381 119.035 35.125 167.77c19.69 51.191 44.086 90.988 57.965 104.867l2.637 2.636V343h46v-26.727l2.637-2.636c13.879-13.88 38.275-53.676 57.965-104.867c18.744-48.735 33.715-108.244 35.125-167.77zm-50.605 68.295c-17.97 6.05-32.296 18.214-37.625 30.367c-3.015 6.875-3.48 13.44-.988 20.129c.285.766.62 1.54.996 2.318a119 119 0 0 1 8.504-4.812l6.277-3.215l4.621 5.326c5.137 5.92 9.61 12.37 13.422 19.125c2.573-3.06 5.207-7.864 7.05-14.037c4.491-15.034 4.322-36.95-2.257-55.201m338.664 0c-6.58 18.25-6.748 40.167-2.258 55.201c1.844 6.173 4.478 10.977 7.051 14.037c3.813-6.756 8.285-13.205 13.422-19.125l4.621-5.326l6.277 3.215a119 119 0 0 1 8.504 4.812c.375-.779.71-1.552.996-2.318c2.492-6.689 2.027-13.254-.988-20.129c-5.329-12.153-19.655-24.317-37.625-30.367m-365.975 67.74c-20.251 12.486-34.121 31.475-36.746 47.973c-1.447 9.1.09 17.224 5.323 24.545c1.66 2.324 3.743 4.594 6.304 6.76a116.6 116.6 0 0 1 11.44-14.977l4.72-5.24l6.217 3.33c7.91 4.236 15.262 9.424 21.94 15.252c.973-3.633 1.619-7.892 1.773-12.616c.636-19.438-6.762-45.536-20.97-65.027zm393.286 0c-14.21 19.49-21.607 45.59-20.971 65.027c.154 4.724.8 8.983 1.773 12.616c6.678-5.828 14.03-11.016 21.94-15.252l6.217-3.33l4.72 5.24a116.6 116.6 0 0 1 11.44 14.976c2.56-2.165 4.643-4.435 6.304-6.76c5.233-7.32 6.77-15.444 5.323-24.544c-2.625-16.498-16.495-35.487-36.746-47.973M54.4 259.133c-14.394 18.806-20.496 41.413-17.004 57.748c1.928 9.014 6.298 16.078 13.844 21.078c4.944 3.276 11.48 5.7 19.94 6.645a120.6 120.6 0 0 1 7.101-17.852l3.125-6.338l6.9 1.535c4.095.911 8.133 2.046 12.094 3.377c-.373-3.838-1.309-8.185-2.925-12.82c-6.416-18.396-22.749-40.184-43.075-53.373m403.2 0c-20.326 13.189-36.66 34.977-43.075 53.373c-1.616 4.635-2.552 8.982-2.925 12.82a119 119 0 0 1 12.093-3.377l6.9-1.535l3.126 6.338a120.6 120.6 0 0 1 7.101 17.852c8.46-.944 14.996-3.37 19.94-6.645c7.546-5 11.916-12.065 13.844-21.078c3.492-16.335-2.61-38.942-17.004-57.748M91.5 341.527c-9.285 23.14-9.027 47.85-.709 63.54c4.57 8.619 11.106 14.607 20.268 17.562c4.586 1.479 9.957 2.19 16.185 1.803c-2.135-11.155-2.771-22.97-1.756-34.938l.602-7.074l7.02-1.065a129 129 0 0 1 13.458-1.312c.554-.025 1.107-.04 1.66-.059c-12.419-15.776-33.883-31.43-56.728-38.457m329 0c-22.845 7.027-44.31 22.68-56.729 38.457c.554.019 1.107.034 1.66.059c4.5.206 8.995.637 13.46 1.312l7.02 1.065l.6 7.074c1.016 11.967.38 23.783-1.755 34.938c6.228.386 11.6-.324 16.185-1.803c9.162-2.955 15.699-8.943 20.268-17.563c8.318-15.69 8.576-40.4-.709-63.539M199.729 361c-1.943 7.383-6.045 14.043-11.366 19.363a47 47 0 0 1-3.484 3.125c14.804 3.295 28.659 8.692 40.404 15.46c2.384-5.36 5.376-10.345 9.408-14.534C239.96 378.942 247.51 375 256 375s16.041 3.942 21.309 9.414c4.032 4.19 7.024 9.175 9.408 14.533c11.815-6.808 25.766-12.23 40.67-15.52a48 48 0 0 1-3.739-3.413c-5.227-5.333-9.27-11.852-11.261-19.014zM256 393c-3.434 0-5.635 1.084-8.34 3.895s-5.395 7.52-7.527 13.298c-4.265 11.556-6.343 27-7.156 38.446c-1.07 15.043 3 33.368 12.285 40.06c4.733 3.412 16.743 3.412 21.476 0c9.285-6.692 13.355-25.017 12.285-40.06c-.813-11.446-2.891-26.89-7.156-38.446c-2.132-5.777-4.823-10.488-7.527-13.298c-2.705-2.81-4.906-3.895-8.34-3.895m-103.521 4.979q-2.572-.012-5.127.09c-1.405.055-2.77.281-4.164.39c-.418 27.817 9.816 53.543 24.994 66.644c8.264 7.134 17.586 10.772 28.35 10.157c5.908-.338 12.394-2.03 19.374-5.52c-1.27-7.665-1.377-15.42-.883-22.379c.632-8.89 1.852-19.962 4.479-30.877c-17.16-10.686-42.426-18.395-67.023-18.506zm207.042 0c-24.597.11-49.863 7.82-67.023 18.505c2.627 10.915 3.847 21.987 4.479 30.877c.494 6.958.387 14.714-.883 22.38c6.98 3.49 13.466 5.181 19.375 5.519c10.763.615 20.085-3.023 28.35-10.156c15.177-13.102 25.411-38.828 24.993-66.645c-1.393-.109-2.76-.335-4.164-.39a116 116 0 0 0-5.127-.09"/></svg>
    `
];

let items;
const handleContent = () => {
    const regex = /{([^}]+)}/g;
    const matches = page_content.match(regex);

    if (matches) {
        items = matches.map(match => {
            try {
                // 直接解析为 JSON 对象
                return JSON.parse(match);
            } catch (error) {
                console.error("Failed to parse JSON:", match);
                return null;
            }
        });
    } else {
        console.log("No matches found.");
    }
}

handleContent();

document.addEventListener('DOMContentLoaded', async () => { // DOM 加载后执行

    const renderTimeline = async () => {
        const container = document.getElementById('timeline_container');

        /* 时间线头部输入框 */
        const input_item = document.createElement('li');
        input_item.className = `timeline-item animated wow`;
        input_item.setAttribute('data-wow-delay', `0.1s`);
        input_item.setAttribute('data-cid', "1");
        input_item.innerHTML = `
        <span class="timeline-item-icon | avatar-icon">
            <i class="timeline-avatar">
                <img src="${avatar_show}" />
            </i>
        </span>
        <div class="new-comment">
            <input type="text" id="noInput" placeholder="Add a comment..." />
        </div>
        `;
        container.appendChild(input_item);

        for (const [index, timeline_item] of items.entries()) {
            const item = document.createElement('li');
            if (timeline_item.type == '1') { //只有内容
                item.className = `timeline-item animated wow`;
                item.setAttribute('data-wow-delay', `0.${index + 1}s`);
                item.setAttribute('data-cid', "timeline");
                item.innerHTML = `
                    <span class="timeline-item-icon | faded-icon">
                        ${timeline_item.svg || level_svgs[timeline_item.level]}
                    </span>
                    <div class="timeline-item-content">
                        <i class="timeline-avatar | small">
                            <img src="${timeline_item.avatar || avatar_show}" />
                        </i>
                        <span>${timeline_item.content} <time>${timeline_item.date.formatDate()}</time></span>
                    </div>
                `;
                container.appendChild(item);
            } else if (timeline_item.type == '2') {   //内容和描述
                item.className = `timeline-item | extra-space animated wow`;
                item.setAttribute('data-wow-delay', `0.${index + 1}s`);
                item.setAttribute('data-cid', "1");
                item.innerHTML = `
                    <span class="timeline-item-icon | filled-icon">
                        ${timeline_item.svg || level_svgs[timeline_item.level]}
                    </span>
                    <div class="timeline-item-wrapper">
                        <div class="timeline-item-content">
                            <i class="timeline-avatar | small">
                                <img src="${timeline_item.avatar || avatar_show}" />
                            </i>
                            <span>${timeline_item.content} <time> ${timeline_item.date.formatDate()} </time></span>
                        </div>
                        <div class="timeline-item-description">
                            <p>${timeline_item.description}</p>
                        </div>
                    </div>
                `;
                container.appendChild(item);
            } else if (timeline_item.type == '3') {    //内容+描述+图片
                item.className = `timeline-item | extra-space animated wow`;
                item.setAttribute('data-wow-delay', `0.${index + 1}s`);
                item.setAttribute('data-cid', "1");
                item.innerHTML = `
                    <span class="timeline-item-icon | filled-icon">
                        ${timeline_item.svg || level_svgs[timeline_item.level]}
                    </span>
                    <div class="timeline-item-wrapper">
                        <div class="timeline-item-content">
                            <i class="timeline-avatar | small">
                                <img src="${timeline_item.avatar || avatar_show}" />
                            </i>
                            <span>${timeline_item.content} <time> ${timeline_item.date.formatDate()} </time></span>
                        </div>
                        <div class="timeline-item-description">
                            <p>${timeline_item.description}</p>
                            <div class="timeline-item-img" data-fancybox="Joe" href="${timeline_item.img_url}">
                                <img class="lazyload" src="${timeline_item.img_url}" />
                            </div>
                        </div>
                    </div>
                `;
                container.appendChild(item); // 追加新数据

            } else if (timeline_item.type == '4') {    //文章卡片
                const loadingElement = document.createElement('p');
                loadingElement.textContent = '正在加载文章数据...';
                container.appendChild(loadingElement);

                const post_data = await getPostDataByName(timeline_item.post_meta_name);
                container.removeChild(loadingElement);

                if (post_data) {
                    item.className = `timeline-item | extra-space animated wow`;
                    item.setAttribute('data-wow-delay', `0.${index + 1}s`);
                    item.setAttribute('data-cid', "1");
                    item.setAttribute('style', "margin-bottom:35px");
                    item.innerHTML = `
                    <span class="timeline-item-icon | filled-icon" style="margin-bottom: 35px;">
                        ${timeline_item.svg || level_svgs[timeline_item.level]}
                    </span>
                    <div class="timeline-item-wrapper" style="flex-grow: 1">
                        <div class="timeline-item-content">
                            <i class="timeline-avatar | small">
                                <img src="${timeline_item.avatar || avatar_show}" />
                            </i>
                            <span>${timeline_item.content} <time> ${timeline_item.date.formatDate()} </time></span>
                        </div>
                        <div class="timeline-item-description">
                            <p>${timeline_item.description}</p>
                        <a href="${post_data.link}" target="_blank" rel="noopener noreferrer">
                            <div class="article-card-container">
                                <div class="lazyload article-card-image" style="background-image:url(${post_data.cover})"></div>
                                <div class="article-card-info">
                                    <div class="article-card-title"> ${post_data.title}</div>
                                        ${renderPostMetadata(post_data)}
                                    <div class="article-card-summary">${post_data.excerpt}</div>
                                    </div></div></a></div></div>
                            `;
                    container.appendChild(item); // 追加新数据
                } else {
                    const errorElement = document.createElement('p');
                    errorElement.textContent = '加载文章数据失败，请稍后重试。';
                    container.appendChild(errorElement);
                }
            }
        }

        /* 时间线尾部按钮 */
        const btn_item = document.createElement('li');
        btn_item.className = ` animated wow`;
        btn_item.setAttribute('data-wow-delay', `0.${items.length + 1}s`);
        btn_item.setAttribute('data-cid', "1");
        btn_item.innerHTML = `
            <button class="return-btn" id="backToTop">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-forward" width="44" height="44" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M15 11l4 4l-4 4m4 -4h-11a4 4 0 0 1 0 -8h1" />
                </svg>
                Back to Top
                <span class="avatar-list">
                    <i class="timeline-avatar | small">
                        <img src="/themes/theme-Joe3/assets/img/rocket.png" />
                    </i>
                </span>
            </button>       
        `;
        container.appendChild(btn_item); // 追加新数据
    }

    document.addEventListener("click", function (event) {
        if (event.target && event.target.id === "backToTop") {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }
    });

    //animate wow生效函数
    const initEffect = () => {
        $(".joe_loading").remove();
        $(".joe_journals__list").removeClass("hidden");
        if (!ThemeConfig.enable_journal_effect) return;
        new WOW({
            boxClass: "wow",
            animateClass: ThemeConfig.journal_list_effect_class || "fadeIn",
            offset: 0,
            mobile: true,
            live: true,
        }).init();
    };
    initEffect();

    await renderTimeline();

    const inputField = document.getElementById('noInput');
    setupGradualDeletion(inputField);
});

const renderPostMetadata = (postData) => {
    const meta_item = postData.time.formatDate();

    let tag_item = '';
    postData.tags.forEach((item) => {
        tag_item += `
        <span onclick="return window.open('${item.status.permalink}', '_blank'),!1">
            ${item.spec.displayName}
        </span>
        `;
    });
    const result = `
        <div class="article-card-meta">${meta_item}</div>
        <div class="article-card-tags">${tag_item}</div>`;
    return result;
}

String.prototype.formatDate = function () {
    const dateString = this.toString(); // 获取当前字符串
    const date = new Date(dateString); // 转换为 Date 对象

    // 使用 toLocaleDateString 格式化
    const formattedDate = date.toLocaleDateString("en-US", {
        year: "numeric", // 年份
        month: "short",  // 短月份名称（如 Jan）
        day: "numeric",  // 日
    });

    return formattedDate; // 返回格式化后的日期
};

function setupGradualDeletion(inputElement) {
    let deleteInterval;
    let currentMinInterval = Infinity; // 初始化为无穷大

    function getDeleteInterval() {
        const length = inputElement.value.length;
        if (length > 50) {
            return 5;
        } else if (length > 20) {
            return 200;
        } else if (length > 10) {
            return 300;
        }
        return 500;
    }

    function deleteCharacter() {
        const currentValue = inputElement.value;
        if (currentValue.length > 0) {
            inputElement.value = currentValue.slice(0, -1);
        } else {
            clearInterval(deleteInterval);
            currentMinInterval = Infinity; // 全部删除完成，重置最小间隔
        }
    }

    inputElement.addEventListener('input', () => {
        const newInterval = getDeleteInterval();
        const prevMinInterval = currentMinInterval;
        currentMinInterval = Math.min(currentMinInterval, newInterval);

        if (currentMinInterval!== prevMinInterval) {
            if (deleteInterval) {
                clearInterval(deleteInterval);
            }
            deleteInterval = setInterval(deleteCharacter, currentMinInterval);
        }
    });
}


async function getPostDataByName(name) {
    try {
        // 使用模板字符串确保 URL 格式正确
        const url = `${post_api}${name}`;
        const response = await fetch(url);

        const responseData = await response.json();

        // 检查属性是否存在
        const spec = responseData.spec || {};
        const status = responseData.status || {};

        const post_data = {
            title: spec.title || '',
            cover: spec.cover || '',
            link: status.permalink || '',
            excerpt: status.excerpt || '',
            time: spec.publishTime || '',
            tags: responseData.tags || []
        };
        return post_data;
    } catch (error) {
        console.error('Error fetching post:', error);
        return null;
    }
}

