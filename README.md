# Giffgaff 保号助手（PWA）

跨平台桌面级 Web App，纯前端、零服务器成本。记录保号时间、倒计时、一键流量保号、成功记录。

## 包含文件

- `index.html` — 应用本体（单页，含全部功能）
- `manifest.webmanifest` — PWA 清单（名称、图标、独立窗口）
- `sw.js` — Service Worker（只缓存应用外壳，不缓存保号流量）
- `icons/icon-192.png`、`icons/icon-512.png`、`icons/icon-maskable-512.png`

## 部署（必须走 HTTPS 才能安装为 PWA）

任选其一，零成本：

1. **最简单：Netlify Drop** — 打开 Netlify Drop，把整个文件夹拖进去，得到一个 HTTPS 网址。
2. **GitHub Pages** — 新建仓库，把这几个文件推上去，开 Pages。
3. **Cloudflare Pages** — 新建项目，上传文件夹，得到 HTTPS 网址。
4. **本地测试（仅本机）** — 在文件夹里运行 `python3 -m http.server 8000`，浏览器打开 `http://localhost:8000`，Chrome / Edge 可以安装。

直接用 `file://` 打开本地 HTML 文件是装不了 PWA 的（浏览器不允许 file 协议注册 Service Worker），页面会正常显示功能，但不会出现“安装”提示。

## 安装

- **Android / Windows / Mac（Chrome、Edge）：** 打开部署好的网址，浏览器地址栏或菜单里出现“安装”时点安装；应用里也会出现“可以安装为 App 了”的卡片。
- **iPhone / iPad：** Safari 打开网址，点底部分享按钮，选“添加到主屏幕”。

## 使用（关键）

安装成 App 之后，保号那一步**必须在手机上、用 giffgaff 卡的移动数据完成**：

1. 手机插入 giffgaff 卡，设为移动数据卡
2. 关闭 Wi-Fi
3. 关闭后台自动更新、云同步、视频自动播放
4. 在中国使用时打开数据漫游
5. 打开 App，勾选 4 项确认，点“开始保号（自动执行）”
6. 完成后马上关数据漫游，并拨 `*100#` 或打开 giffgaff App 核对余额是否真的减少了

在 Mac / Windows 桌面 App 里点按钮，流量走的是电脑网络，不是 giffgaff 卡，不算保号。

## 数据与隐私

- 所有保号记录只存在浏览器本地（localStorage），不上传服务器。
- 换手机、清浏览器数据会丢失，重要日期请同时记到手机日历，或用页面里的 .ics 下载日历提醒。
- 本工具只解决“180 天没有付费活动就断号”，不能消除 giffgaff 对长期境外使用的终止风险。
