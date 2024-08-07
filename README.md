
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
