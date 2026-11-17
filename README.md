# 奶茶周记

一个纯前端的奶茶记录工具，以低饱和黄色、蓝色、紫色搭配清新手账风格。

## 功能

- 按周查看杯数、品类数量和最常喝的品类
- 每日打卡，新增、编辑和删除饮品记录
- 记录品牌、饮品名、甜度、冰量和备注，支持自定义品类
- 浏览器本地保存，以及 JSON 备份导入、导出
- 适配桌面和手机屏幕

## 本地运行

在线访问：https://aaaa0718.github.io/Miketea-recording/

GitHub Actions 会在每次推送到 `main` 后自动将 `dist` 目录部署到 GitHub Pages。可在仓库 Actions 页面查看部署进度。

无需安装依赖或构建。在项目目录运行：

```sh
python3 -m http.server 5173 --directory dist
```

然后访问 http://localhost:5173 。

## 文件结构

- `dist/index.html`：页面结构
- `dist/style.css`：样式及响应式布局
- `dist/app.js`：记录、统计和备份逻辑
- `.openai/hosting.json`：Sites 部署配置

可将 `dist` 目录部署到静态网页托管服务。字体使用 Google Fonts，无法访问时使用系统字体。

## 数据保存

记录通过 `localStorage` 保存于当前浏览器和网站来源下，不上传服务器，不会自动跨设备或跨域名同步。清除浏览器数据可能导致记录丢失，请定期导出 JSON 备份。更换访问地址时，可在旧地址导出后到新地址导入。
