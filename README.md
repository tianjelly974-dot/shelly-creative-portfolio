# Shelly Creative Portfolio

田洁钰的个人作品集，包含首页及六个项目页。网站为静态 HTML、CSS 和 JavaScript，图片、视频及简历文件随仓库一同发布。

## 本地预览

```powershell
python -m http.server 8000 --directory public
```

打开 `http://localhost:8000/`。

## 修改与发布

页面和资源位于 `public/`。修改后推送至 `main` 分支，GitHub Actions 会运行 `scripts/prepare_pages.py`，将站点地图及社交分享链接设置为本仓库的 GitHub Pages 地址，再自动发布。

视频使用 `preload="none"`，仅在用户播放时加载。原始素材的本机路径不属于在线网站运行依赖。
