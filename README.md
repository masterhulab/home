# MasterHu Homepage | 个人主页模板

![Version](https://img.shields.io/badge/version-1.1.0-blue)

![License](https://img.shields.io/badge/license-CC%20BY--NC%204.0-green)
![HTML](https://img.shields.io/badge/HTML-5-orange)
![CSS](https://img.shields.io/badge/CSS-3-blue)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow)

简洁优雅的静态个人主页模板，基于原生 HTML / CSS / JavaScript 构建。零依赖、零构建工具，开箱即用，专为开发者和设计师打造。

---

## ✨ 特性

- 🎨 **多主题支持** - 内置 7 套精美配色方案，支持一键切换与 LocalStorage 持久化
- 📱 **全端响应式** - 完美适配桌面端、平板、手机，包含移动端专属交互
- ⚡ **极致轻量** - 纯原生技术栈，无 Node.js/Webpack 依赖，核心代码体积极小
- 🎭 **沉浸式体验** - 毛玻璃拟态 (Glassmorphism) 设计，配合流畅的 iOS 风格过渡动画
- ⌨️ **动态交互** - 首页打字机效果、图片画廊弹窗（支持键盘方向键切换）、多层渐变加载动画
- ♿ **无障碍友好** - ARIA 标签、Focus Trap、键盘导航、`prefers-reduced-motion` 支持
- 📊 **数据统计** - 集成自定义访问统计，实时展示站点热度
- 🧩 **高度可配** - 语义化代码结构，通过简单配置即可修改内容
- 🚫 **404 趣味页** - 自定义 404 页面，跟随主题，带返回首页引导

## 🌐 在线预览

访问示例站点: **[masterhu.com.cn](https://masterhu.com.cn/)**

## 📂 项目结构

```
homepage/
├── index.html              # 页面入口 (HTML5 语义化结构)
├── 404.html                # 趣味 404 页面
├── .gitattributes          # Git 换行符规范 (LF)
├── .gitignore              # Git 忽略规则
├── LICENSE                 # 开源协议 (CC BY-NC 4.0)
├── static/
│   ├── css/
│   │   ├── style.css       # 核心样式 (PC端布局、动画、组件)
│   │   ├── mobile.css      # 移动端适配样式
│   │   └── theme.css       # 主题变量 (CSS Variables)
│   ├── js/
│   │   └── script.js       # 核心逻辑 (无依赖，ES6+)
│   ├── img/                # 图片资源 (头像、背景、二维码)
│   ├── fonts/              # Web 字体 (Pacifico)
│   └── svg/                # SVG 图标 Sprite 系统
└── README.md               # 项目文档
```

## 🚀 快速开始

### 方式一：直接克隆 (推荐)

```bash
git clone https://github.com/masterhulab/homepage.git
cd homepage
```

### 方式二：下载 ZIP

点击右上角 "Code" -> "Download ZIP" 下载并解压。

### 本地预览

由于浏览器安全策略 (CORS)，直接双击打开 `index.html` 可能会导致部分图标或字体无法加载。建议使用本地服务器：

**Python 3:**

```bash
python -m http.server 8000
# 浏览器访问 http://localhost:8000
```

**VS Code:**
安装 "Live Server" 插件，右键 `index.html` 选择 "Open with Live Server"。

## ✅ 发布前检查清单

在部署之前，请确保你已经完成了以下修改：

- [ ]  **Meta 信息**: 修改 `index.html` 中的 `<title>`, `description`, `keywords` 等 Meta 标签。
- [ ]  **SEO 信息**: 检查 `index.html` 中的 JSON-LD 结构化数据，确保 `jobTitle` (职位) 等信息准确。
- [ ]  **个人信息**: 修改 `index.html` 中的头像、名字、社交链接。
- [ ]  **站点配置**: 在 `static/js/script.js` 中修改 `SITE_CONFIG` (建站时间) 和 `MOTTO_TEXTS` (座右铭)。
- [ ]  **图片资源**: 替换 `static/img/` 下的 `avatar.gif` (头像) 和 `background.webp` (背景图)。
- [ ]  **技能图标**: 修改 `index.html` 中 `skillicons.dev` 的 URL 参数，定制你的技能栈。
- [ ]  **统计代码**: 在 `index.html` 底部替换默认统计脚本（`insight.masterhu.com.cn`），或删除。
- [ ]  **FOUC 防闪烁脚本**: `<head>` 中的内联主题脚本已默认适配 7 套主题。如果你修改了主题名称，需同步更新该脚本中的 `THEME_CLASSES` 数组（与 `script.js` 中的 `THEME_CONFIG.classes` 保持一致）。

## 🛠️ 配置指南

本项目设计为"配置即代码"，大部分修改只需编辑 `static/js/script.js` 和 `index.html`。

### 1. 基础信息配置

打开 `index.html`，修改 Meta 标签和页面内容：

```html
<!-- 修改你的名字和描述 -->
<title>Your Name | 个人主页</title>
<meta name="author" content="Your Name">

<!-- 修改头像和背景 -->
<div class="mh-avatar" ...></div>
```

### 2. 站点逻辑配置 (`script.js`)

在 `static/js/script.js` 顶部找到配置区域：

```javascript
/* Site Configuration | 站点基础配置 */
const SITE_CONFIG = {
  BIRTH_TIME: "2026/01/01 00:00:00", // 修改为你的建站时间
  // ...
};

/* Motto Configuration | 座右铭配置 */
const MOTTO_TEXTS = [
  "Hello World!",
  "编写代码，改变世界"
];
```

### 3. 更换图片与图标

- **头像**: 替换 `static/img/avatar.gif`
- **背景**: 替换 `static/img/background.webp` (建议 1920x1080, WebP 格式)
- **图标**: 项目使用 SVG Sprite (`static/svg/icons.svg`)。如需新增图标，请使用 `<symbol>` 格式添加到该文件中。

### 4. 主题定制

项目使用 CSS 变量实现主题系统，定义在 `static/css/theme.css` 中。核心颜色变量：

| 变量名 | 说明 | 默认值 |
|--------|------|--------|
| `--motto-color` | 座右铭文字颜色 | `#ffffff` |
| `--timeline-dot-color` | 时间线节点颜色 | `#ffffff` |
| `--timeline-active-dot-color` | 时间线活动节点颜色 | `#09f069` |
| `--avatar-border-color` | 头像边框颜色 | `rgba(255,255,255,0.6)` |
| `--modal-bg-color` | 模态框遮罩颜色 | `rgba(20,20,20,0.6)` |
| `--modal-main-bg` | 模态框内容背景 | `rgba(18,18,18,0.96)` |

如需新增主题，复制任一现有主题并修改变量值即可。

### 5. Footer 年份

Footer 年份由 `script.js` 中的 `SITE_CONFIG.BIRTH_TIME` 自动计算：
- 当年：只显示当前年（如 `2026`）
- 跨年：显示范围（如 `2026 - 2027`）

修改建站时间即可自动适配，无需手动更新年份。

### 6. 技能图标配置

找到 `index.html` 中的 `mh-skills` 区域，修改 `<img>` 标签的 `src` 属性：

```html
<!-- 修改 i= 参数后的技能列表，逗号分隔 -->
<img src="https://skillicons.dev/icons?i=html,css,js,react..." />
```

完整图标列表请参考: [Skill Icons](https://skillicons.dev)

### 7. 统计服务配置 (Analytics)

项目采用 **HTML 优先** 的配置方式，您只需在 `index.html` 中引入统计脚本并对应 ID 即可。

#### 默认配置 (自定义脚本)

在 `index.html` 底部引入您的统计脚本 (例如 Umami, Matomo 或 自定义服务):

```html
<!-- 统计脚本 -->
<script
  src="https://your-analytics.com/script.js"
  data-website-id="xxxxx"
  async defer>
</script>
```

#### 数据展示 (可选)

如果您希望在页脚显示 PV/UV 数据，请确保您的统计脚本能回填以下 ID 的元素：

- `mh_site_pv`: 站点总访问量
- `mh_site_uv`: 站点访客数
- `mh_page_pv`: 当前页访问量

#### 推荐替代方案

如果您还没有统计服务，推荐以下开源方案：

- **[Umami](https://umami.is/) (推荐)**:
  - ✅ 开源、免费、可私有化部署
  - ✅ 界面美观，注重隐私
- **[Counterscale](https://counterscale.dev/) (Cloudflare 专属)**:
  - ✅ 部署在 Cloudflare Workers
  - ✅ 完全免费，高性能

> **注意**: 旧版 JS 统计适配器代码已移除。统计脚本现在通过 HTML 直接引入。

## 🛫 部署

本项目是纯静态的，可以免费部署到任何静态托管平台：

- **GitHub Pages**: Settings -> Pages -> Source 选择 master 分支
- **Vercel / Netlify**: 导入仓库即可，无需构建命令
- **Cloudflare Pages**: 直接连接仓库部署

## 🛠️ 技术栈详情

- **HTML5**: 语义化标签 (main, aside, nav, header, footer, section)
- **CSS3**: CSS Variables, Flexbox, Backdrop Filter, Keyframes, `conic-gradient`, `mask`, `color-mix()`
- **JavaScript**: ES6+, IntersectionObserver, LocalStorage
- **Icons**: SVG Sprite System

## 📋 浏览器兼容性

| Chrome | Firefox | Safari | Edge | IE |
| :----: | :-----: | :----: | :--: | :-: |
| ✅ 80+ | ✅ 75+ | ✅ 13+ | ✅ 80+ | ❌ |

> **注意**: 部分高级效果（如 `color-mix()` 主题自适应发光色）需要 Chrome 111+、Firefox 113+、Safari 16.2+。旧浏览器会自动降级为固定颜色，不影响核心功能。

## ♿ 无障碍说明

本项目注重无障碍体验，已实现以下能力：

- **ARIA 标签**: 导航、模态框、头像等关键元素均添加了 `aria-label`
- **键盘导航**: 模态框支持 Tab 循环（Focus Trap）、方向键切换图片、Enter/Space 触发汉堡菜单
- **减少动画**: 自动响应 `prefers-reduced-motion: reduce`，禁用所有非必要动画
- **焦点管理**: 模态框打开时焦点自动移入，关闭时焦点恢复到触发元素

## 🤝 贡献与反馈

欢迎提交 Issue 或 Pull Request！

- 🐛 [报告 Bug](https://github.com/masterhulab/homepage/issues)
- 💡 [提出建议](https://github.com/masterhulab/homepage/issues)

## 📄 开源协议

本项目采用 [CC BY-NC 4.0](LICENSE) 协议。
您可以自由地分享、修改本项目，但**禁止用于商业用途**。如需商用，请联系作者获得授权。

## 🌟 支持项目

如果这个项目对您有帮助，请在 GitHub 上点个 **Star** ⭐️ 支持一下！

[![Star History Chart](https://api.star-history.com/svg?repos=masterhulab/homepage&type=Date)](https://star-history.com/#masterhulab/homepage&Date)

---

**Made with ❤️ by [MasterHu](https://masterhu.com.cn)**
