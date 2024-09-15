
<h1 align="center"> Halo Theme Joe3  </h1>

<p class="badge-row" align="center">
  <a href="https://halo.run" target="_blank">
    <img src="https://img.shields.io/badge/dynamic/yaml?label=Halo&query=%24.spec.require&url=https://raw.githubusercontent.com/jiewenhuang/halo-theme-joe3.0/main/theme.yaml&color=113,195,71" alt="Halo"/>
  </a>
  <a href="https://github.com/jiewenhuang/halo-theme-joe3.0/releases" target="_blank">
    <img src="https://img.shields.io/github/v/release/jiewenhuang/halo-theme-joe3.0" alt="Release"/>
  </a>
  <a href="https://halo.run" target="_blank">
    <img src="https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-orange" alt="License"/>
  </a>
</p>

---
<p align="center">
<img width="100%" src="https://wmimg.com/i/70/2023/08/64d3c41d5bde2.webp">
</p>

预览：[Jiewen's Blog](https://www.jiewen.run/?preview-theme=theme-Joe3)

文档：部分配置请参考 [Joe3不完全使用指导指南](https://www.jiewen.run/archives/joe3use)
> halo-theme-Joe3 是一款 [Halo2.0](https://halo.run/) 的博客主题  
> 由[halo-theme-joe2.0](https://github.com/qinhua/halo-theme-joe2.0)适配而来，感谢原作者的无私奉献

## 安裝

### 下载安装
下载[releases](https://github.com/jiewenhuang/halo-theme-joe3.0/releases)或者直接[下载代码](https://github.com/jiewenhuang/halo-theme-joe3.0)，通过 Halo Console 后台主题安装处上传即可。

## 使用说明
> 1、首次使用请先把主题所有配置保存一遍  
> 2、部分功能使用插件进行实现  
> 3、请配合Halo2.8.0及以上版本使用  
> 4、菜单栏的图标请使用[iconfont](https://www.iconfont.cn/)的图标，需要填入Font Family 和图标代码例如：`jiewen joe-icon-tupian`  
> 5、使用自定义标签样式请以插入HTML文本形式使用，标签请参考[Joe3部分样式](https://www.jiewen.run/archives/joe3style)或者直接使用插件标签

- [x] 卡片化设计
- [x] 响应式主题
- [x] 深色模式
- [X] 文章目录
- [X] 代码高亮/语言/复制）
- [x] [文章搜索](https://github.com/halo-sigs/plugin-search-widget)
- [x] 显示字数统计
- [x] 显示相关文章
- [X] [评论系统](https://github.com/halo-sigs/plugin-comment-widget)
- [x] [友情链接](https://github.com/halo-sigs/plugin-links)  
- [x] [瞬时](https://github.com/halo-sigs/plugin-moments)  
- [x] [图库](https://github.com/halo-sigs/plugin-photos)  
- [x] 其他功能

## 主题配置

### 基本设置

#### Waline设置

##### Waline基础配置

该配置项可以对Waline进行自定义基础配置，内容为json格式，如果配置未生效，请先检查填入的内容是否为json格式，可以前往[JSON校验网站](https://www.json.cn/)进行格式校验。为了方便用户填写，这里提供如下样例，具体所代表的含义以及更多配置项请参考[Waline官网](https://waline.js.org/)。

```json
{
  "search":false,
  "reaction":true,
  "login":"force",
  "locale": {
     "placeholder":"欢迎评论啦啦啦"
  },
   "emoji": [
      "//unpkg.com/@waline/emojis@1.2.0/weibo",
      "//unpkg.com/@waline/emojis@1.2.0/bmoji"
    ]  
}
```

##### Waline图片上传配置

该配置项可以配置Waline的图片上传方式

+ 默认

默认的图片上传方式上传的图片最大只能128Kb

+ 兰空图床

该配置项可以配置Waline的图片上传至兰空图床，需要自建兰空图床服务

##### 兰空图床上传设置

+ 兰空图床服务端地址

兰空图床服务端地址，如 https://img.example.com/api/v1/upload 不要加结尾反斜杠

+ 兰空图床Token

兰空图床Token，如 `2|1bJbwlqBfnggmOMEZqXT5XusaIwqiZjCDs7r1Ob5`，通过配置Token可以进行图片上传的权限控制，如果为空则以游客身份上传（需要在兰空图床开放游客上传的权限）

如何获取Token?

通过兰空图床api获取，请求示例如下：

```bash
curl -X POST https://img.example.com/api/v1/tokens \
-H "Content-Type: application/json" \
-d '{
  "email": "email@qq.com",
  "password": "password***"
}'
```

如果出现如下报错，请在末尾加入参数`-k`来忽略证书验证

```bash
curl: (60) schannel: SEC_E_UNTRUSTED_ROOT (0x80090325) - More details here: https://curl.se/docs/sslcerts.html

curl failed to verify the legitimacy of the server and therefore could not
establish a secure connection to it.
```

返回结果示例：

```json
{"status":true,"message":"success","data":{"token":"2|1bJbwlqBfnggmOMEZqXT5XusaIwqiZjCDs7r1Ob5"}}
```

### 博主信息

#### 展示天气信息

>注意：天气的文字颜色为白色，考虑到用户使用的背景不同，如果不合适，请自行通过代码注入修改字体颜色以适配自己的博客

改配置项配置博主信息是否展示天气信息

#### 天气插件token

由于和风天气插件已经停止服务，所以将其替换为心知天气插件

1. 注册账号

前往[心知天气官网](https://www.seniverse.com/)注册账号并登录控制台

2. 添加产品

具体操作如下图所示：

![添加产品](docs/joe3_20240915184016.webp)

3. 配置插件并获取token

前往该[网站](https://www.seniverse.com/widgetv3)配置插件，目前该网站在控制台中不可见，不知道是不是也要停止服务了😅

首先配置插件：

![配置插件](docs/joe3_20240915185024.webp)

其次点击生成代码获取token：

![获取token](docs/joe3_20240915185129.webp)

## 预览

WIP
## TODO
- [ ] 优化图库
- [ ] ......


### 🏭 贡献

> 如果你想帮助完善 `Joe3.0` 主题，请：

- 点 `star`
- 提 `issue`
- 修 `bugs`
- 推 `pr`

<br>  

### 奉献提示
~~此仓库分为main和dev分支，如何您想奉献代码，请fork dev分支，开发完成后提交pr到dev分支，dev分支会定期合并到main分支，main分支为稳定版本且dev分支才是最新代码，不接受pr。~~  
现在只维护main分支，dev分支不再维护，如有需要请直接提交pr到main分支。


### 🙆‍♂️ 感谢

在此感谢以下项目提供的支持：

- [Halo](https://halo.run)
- [theme-starter](https://github.com/halo-dev/theme-starter)
- [Typecho Themes Joe](https://github.com/HaoOuBa/Joe)
- [Halo-theme-Joe2.0](https://github.com/qinhua/halo-theme-joe2.0)
- [Halo-theme-hao](https://github.com/liuzhihang/halo-theme-hao)
- [Halo-theme-sakura](https://github.com/LIlGG/halo-theme-sakura/tree/next)
- [plugin-links](https://github.com/halo-sigs/plugin-links)
- [plugin-comment-widget](https://github.com/halo-sigs/plugin-comment-widget)
- [plugin-search-widget](https://github.com/halo-sigs/plugin-search-widget)
- [plugin-moments](https://github.com/halo-sigs/plugin-moments)
- [plugin-photos](https://github.com/halo-sigs/plugin-photos)
- ......

<br>

### 交流群
QQ群号（929708466）欢迎大家前来交流分享  

![QQ群](https://www.jiewen.run/upload/IMG_3508(20240717-140309).JPG)  

### TinyTale小程序  
[TinyTale Halo微信小程序正式版发布](https://www.jiewen.run/archives/TinyTale-formal-edition)
![TinyTale](https://www.jiewen.run/upload/111.png)
