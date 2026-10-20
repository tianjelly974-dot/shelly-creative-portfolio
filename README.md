# Shelly Creative Portfolio

田洁钰的个人作品集，包含首页及六个项目页。网站为静态 HTML、CSS 和 JavaScript，图片、视频及简历文件随仓库一同发布。

## 本地预览

```powershell
python -m http.server 8000 --directory public
```

打开 `http://localhost:8000/`。

## 修改与发布

页面和资源位于 `public/`。修改后推送至 `main` 分支，GitHub Actions 会运行 `scripts/prepare_pages.py`，将站点地图及社交分享链接设置为本仓库的 GitHub Pages 地址，再自动发布。

视频不自动播放，接近可视区域时准备元数据，鼠标移入或键盘聚焦时提前缓冲。省流量模式和 2G 网络下仅在用户播放时加载。视频为 H.264/AAC MP4，最高 720×1280，并启用 faststart。12 条视频合计约 17.5 MB。原始素材的本机路径不属于在线网站运行依赖。
