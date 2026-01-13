## MasterHu Homepage

本仓库是 **MasterHu 个人主页** 的静态网页源码，
仅使用 **原生 HTML / CSS / JavaScript** 实现，未依赖任何前端框架或第三方构建工具。

项目目标：

> 保持结构清晰、命名可读、易于二次修改与长期维护。

主页：[𝓜𝓪𝓼𝓽𝓮𝓻𝓱𝓾](https://masterhu.com.cn/)

🌐 主页地址：
👉 https://masterhu.com.cn

## ✨ Features

- 原生 HTML / CSS / JS
- 响应式布局（PC / Mobile）
- 多种主题切换
- 模块化页面结构
- 无框架、零构建成本
- 适合作为 **个人主页 / 开源模板** 使用

---

## 📁 Html Structure

```text
body
├── nav (mh-nav)                 # 顶部导航栏
├── main (mh-layout)             # 页面主体布局
│    ├── aside (mh-sidebar)      # 左侧侧边栏
│    │    ├── bio                # 个人信息
│    │    ├── tags               # 技能 / 标签
│    │    └── timeline           # 时间线
│    └── div (mh-content)        # 右侧主内容区域
│         ├── header (hero)      # 欢迎区 / Hero
│         └── section (mh-sections)
│              ├── site          # 站点入口
│              ├── project       # 项目展示
│              └── skills        # 技能图标
└── footer                       # 页脚
```

## 🗺 Roadmap

* [ ]  主页时钟组件
* [ ]  音乐播放器
* [ ]  访问统计展示
* [ ]  更多交互细节优化

## 🚀 Usage

你可以自由 **fork / clone / 修改** 本项目用于个人主页。

如果你使用或基于本项目进行二次开发，请遵循以下约定：

* ✔ 请修改页面内容
* ✔ 请调整样式或布局以体现个人风格
* ❗ 请保留原作者署名
* ❌ 禁止商业用途（详见 License）

## 📜 License

本项目基于 **CC BY-NC 4.0** 协议发布：

* 允许个人使用与修改
* 允许非商业分发
* **必须署名**
* **禁止商业用途**
