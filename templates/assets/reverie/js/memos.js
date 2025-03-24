// 使用从 HTML 中注入的全局变量
const memosHost = memosConfig.memosHost.endsWith("/") ? 
                memosConfig.memosHost:memosConfig.memosHost + "/";
const memosBlockHeight = memosConfig.memosBlockHeight;
const memosPageSize = memosConfig.memosPageSize > 20 ? memosConfig.memosPageSize : 20;
const memosLinkShow = memosConfig.memosLinkShow;

marked.setOptions({
    breaks: true // 将 \n 解析为 <br>
});

const TAG_REG = /(?<=^|\s)#([^\s#]+)(?=\s|$)/g;
const HTML_REG = /```__html([\s\S]*?)```/gm;

document.addEventListener('DOMContentLoaded', async () => { // DOM 加载后执行
              
    const config = {  // 配置参数（可从主题配置获取）
      enableEffect: true,    // 是否启用动画效果
      dateFormat: 'yyyy/MM/dd HH:mm:ss', // 时间格式
      scrollThreshold : 100
    };

    let all_memos = [];
    var host_url = memosHost + 'api/v1/memos?pageSize=' + memosPageSize + '&pageToken=';
    var page_token = '';
    let isLoading = false; // 防止重复加载

    // 初次获取数据 intiLoad()
    const intiLoad = async () => {
        try {
            const response = await fetch(host_url);
            const { memos, nextPageToken } = await response.json(); //获取memos和nextPageToken
            document.getElementById('memos_container').innerHTML = ''; // 清空容器
            all_memos = memos;
            page_token = nextPageToken;
            loadData();

        } catch (error) {
            console.error('数据加载失败:', error);
        }
    };

    //渲染以及预获取下一部分数据 loadData()
    const loadData = async () => {
      if (isLoading) return;
      isLoading = true;

      renderMemos();
      
        if(page_token != '') {
            let token_url = host_url + page_token;
            try {
                const response = await fetch(token_url);
                const { memos, nextPageToken } = await response.json();
                all_memos = [...all_memos, ...memos]; // 追加预加载的数据
                page_token = nextPageToken;

            } catch (error) {
                console.error('预加载失败:', error);
            } finally {
                isLoading = false;
            }
        }
    };
    

    // 渲染动态列表
    const renderMemos = () => {
      const container = document.getElementById('memos_container');
      
      const currentItemCount = container.children.length;
      const newData = all_memos.slice(currentItemCount); // 只获取新增数据
      
      newData.forEach((memo, index) => {
        const item = document.createElement('li');
        item.className = `joe_momos_item ${config.enableEffect ? 'animated wow' : ''}`;
        item.setAttribute('data-wow-delay', `0.${index}s`);
        item.setAttribute('data-cid', "memo.creator");
        item.innerHTML = `
          <!-- 发布时间 -->
        <p class="joe_memos_date">
            <i class="joe-font joe-icon-feather"></i>
            <em>
                ${formatDate(memo.createTime, config.dateFormat)}
            </em>
        </p>

        <!-- 内容区块 -->
        <div class="joe_memos_block">
            <div class="joe_memos_body" 
                style="max-height: ${memosBlockHeight}px">
                <div class="content-wrp">
                    ${renderContent(memo)}
                </div>
            </div>
            <div class="joe_memos_footer">
                <div class="memos_res">
                    ${renderFooter(memo)}
                </div>
            </div>
        </div>
        `;
        container.appendChild(item); // 追加新数据
      });
    }

    // 内容渲染函数
    const renderContent = (memo) => {
        //markdown语法渲染
        var memoContREG = memo.content.replace(TAG_REG,   //tag#匹配
            "<span><a class='memos-tag' rel='noopener noreferrer' href='"
                + memosHost +"?filter=tagSearch:$1' target='_blank' rel='noopener noreferrer'>#$1</a></span>")
            .replace(HTML_REG, "$1");   //匹配```__html```
            
            memoContREG = marked.parse(memoContREG);
            
        //资源渲染
        let mediaContent = '';
        if (memo.resources?.length) {
            mediaContent = memo.resources.map(res => {
            if (res.type.startsWith('image/')) {
                return `<img class="memos_img lazyload" src="/${res.name}" alt="${res.filename}" 
                        onerror="Joe.errorImg(this, 'LoadFailedImg')">`;
            }
            if (res.type.startsWith('video/')) {
                return `<joe-dplayer src="/${res.name}"></joe-dplayer>`;
            }
            return '';
            }).join('');
        }
        return `<div class="marked-content">${memoContREG}</div>${mediaContent}`;
    };

    //渲染reaction
    const renderFooter = (memo) => {
        var memoReactions = memo.reactions;

        const typeCount = memoReactions.reduce((acc, item) => {
            const type = item.reactionType;
            acc[type] = (acc[type] || 0) + 1; // 统计数量
            return acc;
        }, {});
        var result = '';
        Object.keys(typeCount).forEach((type) => {
            result += `<div class="memos_reaction">
                <span>${type}</span>
                <span style="opacity:.6">${typeCount[type]}</span></div>`;
        });
        
        //评论数量显示
        let commentCount = memo.relations.filter(item => item.type === 'COMMENT').length;
        result += `<div class="memos_relation" title="${commentCount}条评论">
            💬 <i>${commentCount}</i>
        </div>`;
        if(memosLinkShow) {
            let memo_url = memosHost + memo.name;
            result +=`<div class="memos_link_tag">
                <a title="前往 Memos" href="${memo_url}" target="_blank" rel="noopener noreferrer">
                <i class="joe-font joe-icon-link font-link-tag"></i></a></div>`
        }

        return result;
    };

    // 滚动加载逻辑
    const handleScroll = () => {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        if (scrollTop + clientHeight >= scrollHeight - config.scrollThreshold) {
            loadData(); // 加载下一页
        }
    };
    
    // 监听滚动事件（防抖处理）
    window.addEventListener('scroll', debounce(handleScroll, 100));

    intiLoad();
});

// 防抖函数
const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
};

// 时间格式化函数
const formatDate = (isoString, format) => {
    const now = new Date();
    const date = new Date(isoString);
    const diffInSeconds = Math.floor((now - date) / 1000);

    // 相对时间判断
    if (diffInSeconds < 60) {
        return '刚刚';
    }
    if (diffInSeconds < 3600) {
        const minutes = Math.floor(diffInSeconds / 60);
        return `${minutes} 分钟前`;
    }
    if (diffInSeconds < 86400) {
        const hours = Math.floor(diffInSeconds / 3600);
        return `${hours} 小时前`;
    }
    if (diffInSeconds < 172800) { // 48 小时内
        return '昨天';
    }
    if (diffInSeconds < 604800) { // 7 天内
        const days = Math.floor(diffInSeconds / 86400);
        return `${days}天前`;
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






