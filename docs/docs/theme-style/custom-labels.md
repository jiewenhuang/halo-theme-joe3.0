
## 居中标题



```HTML
<joe-mtitle title="牛鞭牛鞭"></joe-mtitle>
```

行内代码


```
`halo-theme-joe2.0`
```

## 代码块

```HTML
\```html
<html>
  <head>
    <title>标题</title>
  </head>
  <body>
    <p>远上寒山石径斜，白云生处有人家。</p>
  </body>
</html>
\```
```

### 表格元素

## 居中


```text
| 表头 1 | 表头 2 | 表头 3 |
| :----: | :----: | :----: |
| 内容 1 | 内容 2 | 内容 3 |
```

## 右对齐


```text
| 表头 1 | 表头 2 | 表头 3 |
| -----: | -----: | -----: |
| 内容 1 | 内容 2 | 内容 3 |
```

### 按钮元素

## 多彩按钮



```HTML
<joe-abtn color="#409eff" content="多彩按钮"></joe-abtn>
```

## 带图标按钮


```HTML
<joe-abtn icon="fa-bell" content="带图标按钮"></joe-abtn>
```

## 圆角按钮



```HTML
<joe-abtn radius="12px" content="圆角按钮"></joe-abtn>
```

## 搭配在一起使用


```HTML
<joe-abtn
  color="#409eff"
  icon="fa-bell"
  href="#"
  radius="3px"
  content="搭配在一起"></joe-abtn>
```

## 便条按钮


```HTML
<joe-anote href="#" type="secondary" content="便条按钮"></joe-anote>
<joe-anote icon="fa-bus" href="#" type="success" content="便条按钮"></joe-anote>
<joe-anote icon="fa-bus" href="#" type="warning" content="便条按钮"></joe-anote>
<joe-anote icon="fa-bus" href="#" type="error" content="便条按钮"></joe-anote>
<joe-anote icon="fa-bus" href="#" type="info" content="便条按钮"></joe-anote>
```

## 复制按钮


```HTML
<joe-copy
  title="点击复制"
  content="这是一段美好的鸡汤文"
  color="green"
  bold></joe-copy>
```

## 标签按钮


```HTML
<joe-anote
  icon="fa-download"
  href="#"
  type="success"
  content="标签按钮"></joe-anote>
```

## 网盘按钮



```HTML
<joe-cloud type="default" url="" password=""></joe-cloud>
<joe-cloud type="360" url="" password=""></joe-cloud>
<joe-cloud type="bd" url="" password="bn6f"></joe-cloud>
<joe-cloud type="ty" url="" password=""></joe-cloud>
<joe-cloud type="ct" url="" password=""></joe-cloud>
<joe-cloud type="wy" url="" password=""></joe-cloud>
<joe-cloud type="github" url="" password=""></joe-cloud>
<joe-cloud type="gitee" url="" password=""></joe-cloud>
<joe-cloud type="lz" url="" password=""></joe-cloud>
<joe-cloud type="ad" url="" password=""></joe-cloud>
```

### 装饰元素

## 分割线

---

## 跑马灯

<span class="joe_lamp"></span>

```HTML
<span class="joe_lamp"></span>
```

## 进度条


```HTML
<joe-progress percentage="50%" color="#6ce766"></joe-progress>
```

## 彩色虚线

```HTML
<joe-dotted></joe-dotted>
<joe-dotted startcolor="#1772e8" endcolor="#4cd327"></joe-dotted>
```

## Tabs


```HTML
<joe-tabs>
  <div class="_tpl">
    {tabs-pane 第一个}单身狗的故事{/tabs-pane}
    {tabs-pane 第二个}小说家的故事{/tabs-pane}
  </div>
</joe-tabs>
```

## 时间线

```HTML
<joe-timeline>
 <div class="_tpl">
   {timeline-item 2020}10元{/timeline-item}
   {timeline-item 2021}20元{/timeline-item}
   {timeline-item 2022}100元{/timeline-item}
 </div>
</joe-timeline>
```

## 视频播放


```HTML
<joe-dplayer src="https://stream7.iqilu.com/10339/upload_transcode/202002/17/20200217101826WjyFCbUXQ2.mp4"></joe-dplyer>
```

## Bilibili 视频


```HTML
<joe-bilibili bvid="BV12h411k7vr"></joe-bilibili>
```

## PDF预览


```HTML
<joe-pdf src="/upload/Node的设计与实现-0a7b571b1a5b4a0d8f810a253afe7077.pdf"></joe-pdf>
```

## 网易云歌单

```HTML
<joe-mlist id="6800335663"></joe-mlist>
```

## 网易云单曲


```HTML
<joe-music id="1303046498"></joe-music>
```

## 音乐播放器

```HTML
<joe-mp3
  name="天生狂野-柴古唐斯主题曲"
  url="https://bbchin.com/upload/2022/04/%E5%A4%A9%E7%94%9F%E7%8B%82%E9%87%8E-%E6%9F%B4%E5%8F%A4%E5%94%90%E6%96%AF%E4%B8%BB%E9%A2%98%E6%9B%B2.mp3"
  theme="red"
  cover="https://bbchin.com/upload/2022/04/cgts.png"
  autoplay></joe-mp3>
```

### 提示元素



```HTML、
<joe-message type="info" content="普通消息"></joe-message>
<joe-message type="warning" content="警告消息"></joe-message>
<joe-message type="error" content="错误消息"></joe-message>
```

### 提示注意事项

> 以上大部分为 webcomponents 组件，且仅在使用 halo-theme-joe3.0 主题时才能生效，请根据实际情况使用。
>
> 组件定义文件见主题目录下的 assets/js/custom.js。
