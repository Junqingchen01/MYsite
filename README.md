# 陈俊清 (Junqing Chen) · 个人交互式作品集与简历网站 (Portfolio & Interactive CV)

> 🌟 一个追求极致轻量、优雅视觉美学与原生工程架构的个人技术与交互设计网站。纯原生 HTML5 / CSS3 / ES6+ JavaScript 构建，零外部框架依赖，支持中 / 英 / 葡 三语实时切换与明暗主题自适应。

* **线上代码仓库**：[https://github.com/Junqingchen01/MYsite](https://github.com/Junqingchen01/MYsite)
* **主理人**：陈俊清 (Junqing Chen)
* **教育背景**：
  * 🇵🇹 葡萄牙阿威罗大学 (Universidade de Aveiro) · 计算机与远程信息工程 (MSc) · *SCI 期刊论文投递中*
  * 🇵🇹 葡萄牙波尔图理工学院 (ESMAD - P.PORTO) · 网页与多媒体技术 (BSc) · *获中国留学网认证*
* **求职方向**：全栈开发工程师 (Full-Stack Engineer) / 交互系统设计师 (Interaction Designer) / AI Agent 应用研发

---

## 目录
- [项目特色与核心亮点](#项目特色与核心亮点)
- [页面架构与功能模块](#页面架构与功能模块)
- [前端技术栈与核心技巧](#前端技术栈与核心技巧)
- [项目演进与开发历程](#项目演进与开发历程)
- [致谢与 Skill 规范作者](#致谢与-skill-规范作者)
- [本地运行与部署指南](#本地运行与部署指南)

---

## 项目特色与核心亮点

### 1. 纯粹的原生极简架构 (Pure Vanilla Engineering)
* **零依赖、零框架**：不引入 React / Vue，亦不使用 Tailwind / Bootstrap 等庞大 CSS 框架，全站使用标准 HTML5、现代 CSS3 以及轻量 ES6+。
* **极速加载与轻盈体量**：秒级首屏渲染，资源请求极少，无打包黑盒，天然具备高可维护性与无障碍体验。

### 2. 中 / 英 / 葡 三语无刷新切换 (Trilingual i18n Engine)
* 针对葡萄牙、中国及国际化科技企业的多元求职需求，定制设计了现代胶囊式语言切换器（`中文` | `EN` | `PT`）。
* 基于原生的客户端字典映射机制，无须刷新页面即可即时变更全文语义内容、页面 `title` 与 `<meta>` 标签。
* 支持首选语言浏览器探测与 `localStorage` 偏好持久化。

### 3. 一键明暗双模系统 (Dark / Light Mode Toggle)
* 通过原生 CSS Custom Properties (CSS 变量) 搭建了一整套高品质的色彩系统。
* 浅色模式温润雅致，深色模式沉稳高级，配合微动效过渡与毛玻璃卡片（Glassmorphism），保障全天候阅读体验。

### 4. 浮动竖向模块导航指示器 (Floating Dot Navigation)
* 网页侧边部署现代点状浮动指示器，采用 `IntersectionObserver` 监听用户滚动视口，高亮指示当前所浏览的模块（关于我、项目、能力、教育、联系）。
* 支持悬浮提示（Tooltip）与平滑滚动导航（Smooth Scroll）。

### 5. 交互式联系弹窗与一键复制反馈 (Contact Modal & Toast)
* 针对国内与欧洲不同的联络习惯，集成全功能联系浮窗，同时提供微信、境内短信电话、葡萄牙当地电话、邮箱、GitHub 与 LinkedIn 外链。
* 内置 Web Clipboard API 实现一键复制微信/电话，并触发轻量级原生 Toast 动效提醒。

### 6. 双重官方学历学位背书 (Dual Academic Credentials)
* **波尔图理工学院成绩单**：集成 2024 年 8 月官方签发的成绩与学位认证 PDF（[certidao.pdf](file:///c:/Users/38240/Desktop/mysite/certidao.pdf)）；
* **中国教育部留学服务中心认证书**：集成中留服国(境)外学历学位正式认证书（[中国留学网认证.jpg](file:///c:/Users/38240/Desktop/mysite/images/中国留学网认证.jpg)）。

---

## 页面架构与功能模块

```text
mysite/
├── index.html              # 网站主页面结构（HTML5 语义化）
├── style.css               # 原生核心设计系统、响应式断点与动效
├── main.js                 # 交互逻辑、主题切换、弹窗、滚动监听与事件处理
├── i18n.js                 # 中/英/葡 三语多语言字典库
├── images/                 # 静态图片与设计原型资产
│   ├── POSTER.jpg          # 餐饮预订系统项目海报
│   ├── poster_preview.jpg  # 餐饮海报预览缩略图
│   ├── iotdashboard.png    # UrbMobSense 物联网与微出行监控看板
│   ├── iotdashboard_preview.jpg
│   ├── goodbuck_screens.png# Goodbuck 记账软件界面设计
│   ├── goodbuck_sitemap.png# Goodbuck 站点地图与架构
│   ├── rehanceGoodbuck.png # Goodbuck 高保真渲染图
│   └── 中国留学网认证.jpg    # 中国留服中心官方学历认证书
├── certidao.pdf            # 葡萄牙波尔图理工学院官方成绩认证
├── myinfo.pdf              # 个人简历基础资料档
├── USER_PROFILE.md         # 结构化个人求职资料与信息归档
├── AGENTS.md               # 项目开发全局指令与规范设定
└── README.md               # 项目说明文档与开发记录
```

---

## 前端技术栈与核心技巧

### 1. HTML5 语义化与无障碍性 (Accessibility)
* 严格采用 `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>` 等语义标签，提升 SEO 表现与屏幕阅读器友好度。
* 为所有交互元素（如弹窗、语言切换按钮、浮动指示器）配置明确的 `aria-label`、`role` 与 `aria-modal` 等无障碍属性。

### 2. 现代 CSS3 架构与视觉美学
* **CSS 变量系统**：
  ```css
  :root {
      --bg-primary: #f8fafc;
      --text-primary: #0f172a;
      --accent-primary: #2563eb;
      /* ... 全局设计 Token */
  }
  [data-theme="dark"] {
      --bg-primary: #090d16;
      --text-primary: #f1f5f9;
      --accent-primary: #3b82f6;
  }
  ```
* **弹性与网格布局 (Flexbox + CSS Grid)**：构建流式响应式排版，无需繁冗的辅助类，容器自然适应不同屏幕宽度。
* **现代视觉工艺**：毛玻璃背景滤镜 (`backdrop-filter: blur()`)、微交互立体悬浮阴影 (`box-shadow`) 以及流畅的贝塞尔缓动过渡 (`transition`)。

### 3. 原生 JavaScript (ES6+) 实践技巧
* **高性能滚动视口监听**：摒弃卡顿的 `window.addEventListener('scroll')` 高频事件，全面采用浏览器底层的高性能 `IntersectionObserver` 监控各区块可见度。
* **DOM 数据集选择与国际化批量替换**：通过 `document.querySelectorAll('[data-i18n]')` 遍历标记元素，读取 `i18n.js` 中的多级键名快速映射更新。
* **剪贴板 API 与优雅降级**：
  ```javascript
  navigator.clipboard.writeText(text).then(() => {
      showToast('已复制到剪贴板');
  }).catch(() => {
      /* 降级备用方案 */
  });
  ```

---

## 项目演进与开发历程

1. **第一阶段：从旧版网页到现代 CV 架构重塑**
   * 深入解析 `myinfo.pdf` 与现有代码结构，确立全栈与交互双重优势的定位。
   * 全面重构布局，搭建响应式导航栏、个人 Hero 介绍、三大核心项目展板（UrbMobSense、多端餐饮系统、Goodbuck）、能力矩阵与教育背景。
2. **第二阶段：中英葡国际化引擎与官方学历证书集成**
   * 架构 `i18n.js` 语料库，实现中 / 英 / 葡 无刷新即时切换与持久化存储。
   * 细化硕士项目重点——阿威罗大学 UrbMobSense（标明团队协作与 SCI 期刊论文审稿中）。
   * 集成葡萄牙高校官方成绩单（PDF）与中留服海外学历学位认证书（JPG）。
3. **第三阶段：体验增强与高阶交互赋能**
   * 新增一键明暗主题（Dark / Light Mode）切换开关。
   * 新增页面侧边竖向点状浮动导航指示器，鼠标悬停 Tooltip 与滚动实时跟踪。
   * 新增核心项目的真实界面 Mockup 缩略图与点击查看大图预览机制。
   * 配置一键直达与下载的简历单页 PDF、中国福建籍贯与 AI Agent 研发探索方向。
4. **第四阶段：资产规范化与工程整理**
   * 统一将散落于根目录的图片归纳整理至 `images/` 目录，修复所有引用与测试断点。
   * 规范化 Git 版本控制，持续同步至 GitHub 远端仓库。

---

## 致谢与 Skill 规范作者

本项目在规划、设计与编码全过程中，严格遵循并受惠于 `.skills` 规范库中专业技能指南的指导，特此向以下 Skill 的设计者与开源贡献者致以由衷感谢：

* 🎨 **`frontend-design`**
  * **理念贡献**：提供了避免模板化、拒绝“AI 工业套样 (anti-AI slop)”的设计审美准则。帮助本项目确立了克制、现代、以真实学术与工程内容为核心的视觉风格与色彩排版层级。
* 🧱 **`web-artifacts-builder`**
  * **规范贡献**：指导了 Web 交互组件的状态管理、模块化结构划分与响应式无障碍设计范式。
* 🔍 **`code-review-and-quality`**
  * **标准贡献**：提供了涵盖“正确性、可读性、架构合理性、安全性与性能”的五维代码审查标准，确保每一次代码提交的高健康度。
* ✂️ **`code-simplification`**
  * **重构贡献**：灵感源自 Claude Code Simplifier 思想，指导本项目在持续迭代中精炼原生逻辑、降低圈复杂度，坚持“让代码直观易懂”的纯粹工程理念。

---

## 本地运行与部署指南

### 本地快速预览
本项目无需任何构建编译步骤，可在任意本地 HTTP 静态服务器中运行：

* **使用 Python**：
  ```bash
  # 进入项目目录
  cd mysite
  # 启动本地服务
  python -m http.server 8080
  ```
  浏览器访问：`http://localhost:8080`

* **使用 Node.js / npx**：
  ```bash
  npx serve .
  ```

* **使用 VS Code Live Server**：
  直接在编辑器中右键 `index.html`，选择 **Open with Live Server** 即可。

### 部署至 GitHub Pages
1. 在 GitHub 仓库设置 (Settings) -> **Pages** 页面；
2. 在 **Branch** 下选择 `main` 分支，目录选择 `/ (root)`；
3. 保存后，即可通过 `https://junqingchen01.github.io/MYsite/` 访问您的线上简历。
