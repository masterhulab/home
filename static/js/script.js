/* =========================================================
 * MasterHu Homepage Script
 * Author: MasterHu
 * Website: https://masterhu.com.cn
 * License: CC BY-NC 4.0
 * ========================================================= */

/* Console Banner & Signature */
console.log(
  "%cCopyright © 2026 masterhu.com.cn",
  "background: linear-gradient(90deg, #ff00ff, #8e44ad); color: white; font-size: 20px; font-weight: bold; padding: 8px 20px; border-radius: 5px;"
);

const CAT_STYLE = "color: #ff9ff3; font-family: monospace; font-weight: bold; line-height: 1.2;";
console.log("%c      |\\      _,,,---,,_", CAT_STYLE);
console.log("%cZZZzz /,`.-'`'    -.  ;-;;,_", CAT_STYLE);
console.log("%c     |,4-  ) )-,_. ,\\ (  `'-'", CAT_STYLE);
console.log("%c    '---''(_/--'  `-'\\_)", CAT_STYLE);

/*   Storage Utility (LocalStorage Wrapper) */
const Storage = {
  set(key, value) {
    localStorage.setItem(key, value);
  },
  get(key) {
    return localStorage.getItem(key);
  }
};

/* =========================================================================
 *  Configuration Section
 *  自定义配置区域 - 你可以在这里修改站点设置
 * ========================================================================= */

/* Theme Configuration | 主题配置 */
const THEME_CONFIG = {
  classes: [
    "theme-clear", "theme-dim", "theme-fresh",
    "theme-blur", "theme-sky", "theme-white", "theme-dark"
  ],
  names: [
    "清晰原图", "暗淡原图", "清新卡片",
    "背景模糊", "蔚蓝天际", "简约纯白", "星河夜幕"
  ],
  icons: ["🖼️", "🌗", "🍃", "🌫️", "🌊", "⚪", "🔮"]
};

/* Motto Configuration | 座右铭配置 */
const MOTTO_TEXTS = [
  "不忘初心，方得始终!",
  "Stay hungry Stay foolish!"
];

const HERO_TYPING_INTERVAL = 200;

/* Site Configuration | 站点基础配置 */
const SITE_CONFIG = {
  // 建站时间，用于计算运行时间
  BIRTH_TIME: "2026/01/01 00:00:00",
  // 页面元素 ID 配置 (通常无需修改)
  UPTIME_RENDER_ID: "run-time",
  TODAY_VISITORS_ID: "mh-today-visitors"
};


/* =========================================================================
 *  Core Logic Section
 *  核心逻辑区域 - 除非你是开发者，否则建议不要修改以下代码
 * ========================================================================= */

(function () {
  /* Uptime Counter | 站点运行时间计数器 */
  /**
   * Calculates and displays the site's uptime.
   * 计算站点运行时间并更新 DOM
   */
  function updateSiteUptime() {
    const start = new Date(SITE_CONFIG.BIRTH_TIME).getTime();
    const now = Date.now();
    const diff = now - start;

    const el = document.getElementById(SITE_CONFIG.UPTIME_RENDER_ID);
    if (!el) return;

    if (diff < 0) {
      el.textContent = "站点筹备中...";
      return;
    }

    const days = Math.floor(diff / 86400000);
    const hours = Math.floor(diff / 3600000) % 24;
    const minutes = Math.floor(diff / 60000) % 60;
    const seconds = Math.floor(diff / 1000) % 60;

    const years = Math.floor(days / 365);
    const remainingDays = days % 365;

    const pad = (n) => String(n).padStart(2, '0');
    const yearDayPart = years > 0
      ? `${years}年${remainingDays}天`
      : `${days}天`;

    const timePart = `${pad(hours)}时 ${pad(minutes)}分 ${pad(seconds)}秒`;

    el.innerHTML = `已运行 ${yearDayPart}<br>${timePart}`;
  }

  setInterval(updateSiteUptime, 1000);
  updateSiteUptime();

  /**
   * Updates the daily visitor count using localStorage.
   * 基于 localStorage 的简单日访客计数器
   */
  function updateTodayVisitors() {
    const el = document.getElementById(SITE_CONFIG.TODAY_VISITORS_ID);
    if (!el) return;

    const key = "MH_TODAY_VISIT";
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    const todayStr = `${yyyy}-${mm}-${dd}`;

    let data;
    try {
      data = JSON.parse(localStorage.getItem(key) || "{}");
    } catch {
      data = {};
    }

    if (!data || data.date !== todayStr) {
      data = { date: todayStr, count: 0 };
    }

    data.count += 1;
    localStorage.setItem(key, JSON.stringify(data));

    el.textContent = data.count;
  }


  /*  Determine whether a color is visually dark */
  /**
   * Checks if a color string is visually dark.
   * 判断颜色是否为深色，用于调整文字或图标颜色
   * @param {string} color - Hex or RGB color string
   * @returns {boolean}
   */
  function isDarkColor(color) {
    if (!color) return false;

    let r, g, b;
    if (color.startsWith('#')) {
      let hex = color.slice(1);
      if (hex.length === 3) hex = hex.split('').map(x => x + x).join('');
      r = parseInt(hex.substr(0, 2), 16);
      g = parseInt(hex.substr(2, 2), 16);
      b = parseInt(hex.substr(4, 2), 16);
    } else {
      const rgb = color.match(/\d+/g);
      if (!rgb) return false;
      [r, g, b] = rgb.map(Number);
    }

    return (0.2126 * r + 0.7152 * g + 0.0722 * b) < 128;
  }

  /**
   * Apply theme by index
   * 切换主题核心逻辑
   * - Switch html class (切换 HTML 类名)
   * - Sync UI icon & tooltip (同步图标和提示)
   * - Persist index (持久化存储)
   * @param {number} index - Theme index in configuration
   * @returns {number} Safe index applied
   */
  function applyTheme(index) {
    const total = THEME_CONFIG.classes.length;
    const safeIndex = (index + total) % total;

    const html = document.documentElement;
    THEME_CONFIG.classes.forEach(cls => html.classList.remove(cls));
    html.classList.add(THEME_CONFIG.classes[safeIndex]);

    Storage.set("themeIndex", safeIndex);

    if (UI.themeButton) {
      UI.themeButton.textContent = THEME_CONFIG.icons[safeIndex] + THEME_CONFIG.names[safeIndex];
    }

    if (UI.snakeImage) {
      const textColor = getComputedStyle(html)
        .getPropertyValue("--main-text-color")
        .trim();
      const suffix = isDarkColor(textColor) ? "Dark" : "Light";
      UI.snakeImage.src = `./static/svg/snake-${suffix}.svg`;
    }

    return safeIndex;
  }

  /**
   * Opens the image modal.
   * 打开图片模态框
   * @param {string} imgUrl
   */
  window.openModal = function (imgUrl) {
    if (!UI.modal) return;
    UI.modalImage.src = imgUrl;
    UI.modal.classList.add("active");
    setTimeout(() => UI.modalMain.classList.add("active"), 100);
  };

  /**
   * Closes the image modal.
   * 关闭图片模态框
   */
  window.closeModal = function () {
    if (!UI.modal) return;
    UI.modalMain.classList.remove("active");
    setTimeout(() => {
      UI.modal.classList.remove("active");
      UI.modalImage.src = "";
    }, 200);
  };

  /*  UI Cache */
  let UI = {};

  /**
   * Caches DOM elements to avoid repeated queries.
   * 缓存 DOM 元素，减少重复查询
   */
  function cacheUI() {
    UI = {
      html: document.documentElement,
      loading: document.querySelector(".mh-loading"),

      navBurger: document.querySelector(".nav-burger"),
      navLinks: document.querySelector(".nav-links"),
      themeButton: document.querySelector(".nav-theme-toggle"),

      modal: document.querySelector(".mh-modal"),
      modalMain: document.querySelector(".modal-main"),
      modalImage: document.querySelector(".modal-img"),

      heroMotto: document.getElementById("hero-motto"),
      snakeImage: document.getElementById("snake-img")
    };
  }

  /* Initializers */
  /**
   * Initializes the theme system.
   * 初始化主题系统
   */
  function initTheme() {
    let idx = parseInt(Storage.get("themeIndex")) || 0;
    idx = applyTheme(idx);
    UI.themeButton?.addEventListener("click", () => {
      idx = applyTheme(idx + 1);
    });
  }

  /**
   * Initializes the mobile navigation interaction.
   * 初始化移动端导航交互
   */
  function initMobileNav() {
    if (!UI.navBurger || !UI.navLinks) return;

    const closeNav = () => {
      UI.navLinks.classList.remove("nav-active");
      UI.navBurger.classList.remove("toggle");
      document.body.classList.remove("nav-open");
      UI.navBurger.setAttribute("aria-expanded", "false");
      UI.navLinks.setAttribute("aria-hidden", "true");
    };

    UI.navBurger.addEventListener("click", () => {
      UI.navLinks.classList.toggle("nav-active");
      UI.navBurger.classList.toggle("toggle");
      document.body.classList.toggle("nav-open");

      const expanded = UI.navBurger.getAttribute("aria-expanded") === "true";
      UI.navBurger.setAttribute("aria-expanded", expanded ? "false" : "true");
      UI.navLinks.setAttribute("aria-hidden", expanded ? "true" : "false");
    });

    UI.navLinks.addEventListener("click", (e) => {
      if (e.target.closest("a, .nav-theme-toggle")) {
        closeNav();
      }
    });

    document.addEventListener("click", (e) => {
      if (
        UI.navLinks.classList.contains("nav-active") &&
        !e.target.closest(".nav-burger") &&
        !e.target.closest(".nav-links")
      ) {
        closeNav();
      }
    });
  }

  /**
   * Initializes the typing effect for the motto.
   * 初始化座右铭打字机效果
   */
  function initHeroTyping() {
    if (!UI.heroMotto) return;

    let t = 0, c = 0, del = false, pause = 0;

    const tick = () => {
      if (pause-- > 0) return;

      const text = MOTTO_TEXTS[t];
      if (!del) {
        UI.heroMotto.textContent = text.slice(0, ++c);
        if (c === text.length) { del = true; pause = 20; }
      } else {
        UI.heroMotto.textContent = text.slice(0, --c);
        if (c === 0) { del = false; t = (t + 1) % MOTTO_TEXTS.length; pause = 10; }
      }
    };

    let timer = setInterval(tick, HERO_TYPING_INTERVAL);
    document.addEventListener("visibilitychange", () => {
      document.hidden ? clearInterval(timer) : timer = setInterval(tick, HERO_TYPING_INTERVAL);
    });
  }

  /* Bootstrap */
  document.addEventListener("DOMContentLoaded", () => {
    cacheUI();
    initTheme();
    initMobileNav();
    initHeroTyping();
    updateTodayVisitors();

    UI.modal?.addEventListener("click", (e) => {
      if (e.target === UI.modal) closeModal();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeModal();
      }
    });
  });

  window.addEventListener("load", () => {
    if (!UI.loading) return;

    setTimeout(() => {
      UI.loading.classList.add("hide");
    }, 300);

    setTimeout(() => {
      UI.loading.style.display = "none";
    }, 900);
  });
})();
