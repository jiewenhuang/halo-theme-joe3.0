
const config_avatar = timelineConfig.avatar;
const avatar_show = config_avatar ? config_avatar: 
                '/themes/theme-Joe3/assets/img/transparent-placeholder.png';
const page_content = timelineConfig.content;

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

    const renderTimeline = () => {
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


        items.forEach((timeline_item, index) => {
            const item = document.createElement('li');
            if(timeline_item.type == '1') {
                item.className = `timeline-item animated wow`;
                item.setAttribute('data-wow-delay', `0.${index}s`);
                item.setAttribute('data-cid', "timeline");
                item.innerHTML = `
                    <span class="timeline-item-icon | faded-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="140" height="140" viewBox="0 0 512 512"><path fill="#666666" d="M466.27 286.69C475.04 271.84 480 256 480 236.85c0-44.015-37.218-85.58-85.82-85.58H357.7c4.92-12.81 8.85-28.13 8.85-46.54C366.55 31.936 328.86 0 271.28 0c-61.607 0-58.093 94.933-71.76 108.6c-22.747 22.747-49.615 66.447-68.76 83.4H32c-17.673 0-32 14.327-32 32v240c0 17.673 14.327 32 32 32h64c14.893 0 27.408-10.174 30.978-23.95c44.509 1.001 75.06 39.94 177.802 39.94c7.22 0 15.22.01 22.22.01c77.117 0 111.986-39.423 112.94-95.33c13.319-18.425 20.299-43.122 17.34-66.99c9.854-18.452 13.664-40.343 8.99-62.99m-61.75 53.83c12.56 21.13 1.26 49.41-13.94 57.57c7.7 48.78-17.608 65.9-53.12 65.9h-37.82c-71.639 0-118.029-37.82-171.64-37.82V240h10.92c28.36 0 67.98-70.89 94.54-97.46c28.36-28.36 18.91-75.63 37.82-94.54c47.27 0 47.27 32.98 47.27 56.73c0 39.17-28.36 56.72-28.36 94.54h103.99c21.11 0 37.73 18.91 37.82 37.82c.09 18.9-12.82 37.81-22.27 37.81c13.489 14.555 16.371 45.236-5.21 65.62M88 432c0 13.255-10.745 24-24 24s-24-10.745-24-24s10.745-24 24-24s24 10.745 24 24"/></svg>                    </span>
                    <div class="timeline-item-content">
                        <i class="timeline-avatar | small">
                            <img src="${avatar_show}" />
                        </i>
                        <span>${timeline_item.content} <time>${timeline_item.date.formatDate()}</time></span>
                    </div>
                `;
                container.appendChild(item);
            }
            else if (timeline_item.type == '2') {
                item.className = `timeline-item | extra-space animated wow`;
                item.setAttribute('data-wow-delay', `0.${index}s`);
                item.setAttribute('data-cid', "1");
                item.innerHTML = `
                    <span class="timeline-item-icon | filled-icon">
       
                    <svg xmlns="http://www.w3.org/2000/svg" width="140" height="124.44444444444444" viewBox="0 0 576 512"><path fill="#ffffff" d="M552 64H448V24c0-13.3-10.7-24-24-24H152c-13.3 0-24 10.7-24 24v40H24C10.7 64 0 74.7 0 88v56c0 35.7 22.5 72.4 61.9 100.7c31.5 22.7 69.8 37.1 110 41.7C203.3 338.5 240 360 240 360v72h-48c-35.3 0-64 20.7-64 56v12c0 6.6 5.4 12 12 12h296c6.6 0 12-5.4 12-12v-12c0-35.3-28.7-56-64-56h-48v-72s36.7-21.5 68.1-73.6c40.3-4.6 78.6-19 110-41.7c39.3-28.3 61.9-65 61.9-100.7V88c0-13.3-10.7-24-24-24M99.3 192.8C74.9 175.2 64 155.6 64 144v-16h64.2c1 32.6 5.8 61.2 12.8 86.2c-15.1-5.2-29.2-12.4-41.7-21.4M512 144c0 16.1-17.7 36.1-35.3 48.8c-12.5 9-26.7 16.2-41.8 21.4c7-25 11.8-53.6 12.8-86.2H512z"/></svg>                    </span>
                    <div class="timeline-item-wrapper">
                        <div class="timeline-item-content">
                            <i class="timeline-avatar | small">
                                <img src="${avatar_show}" />
                            </i>
                            <span>${timeline_item.content} <time> ${timeline_item.date.formatDate()} </time></span>
                        </div>
                        <div class="timeline-item-description">
                            <p>${timeline_item.description}</p>
                        </div>
                    </div>
                `;
                container.appendChild(item); // 追加新数据
            }

        });

        /* 时间线尾部按钮 */
        const btn_item = document.createElement('li');
        btn_item.className = ` animated wow`;
        btn_item.setAttribute('data-wow-delay', `0.7s`);
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
                        <img src="/upload/rocket.png" />
                    </i>
                </span>
            </button>       
        `;
        container.appendChild(btn_item); // 追加新数据
    }

    document.addEventListener("click", function(event) {
        if (event.target && event.target.id === "backToTop") {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }
    });

    //animate wow生效函数
    initEffect = () => {
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

    renderTimeline();

    const inputField = document.getElementById('noInput');
    setupGradualDeletion(inputField);
});


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
        }
        else if (length > 20) {
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