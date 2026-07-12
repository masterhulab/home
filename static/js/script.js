/* =========================================================
 * MasterHu Homepage Script
 * Author: MasterHu
 * Website: https://masterhu.com.cn
 * License: CC BY-NC 4.0
 * ========================================================= */

(function () {
  "use strict";

  /* Console Banner & Signature */
  const CAT_STYLE = "color: #ff9ff3; font-family: monospace; font-weight: bold; line-height: 1.2;";
  const currentYear = new Date().getFullYear();
  console.log(
    `%cCopyright © ${currentYear} masterhu.com.cn`,
    "background: linear-gradient(90deg, #ff00ff, #8e44ad); color: white; font-size: 20px; font-weight: bold; padding: 8px 20px; border-radius: 5px;"
  );
  console.log("%c      |\\      _,,,---,,_", CAT_STYLE);
  console.log("%cZZZzz /,`.-'`'    -.  ;-;;,_", CAT_STYLE);
  console.log("%c     |,4-  ) )-,_. ,\\ (  `'-'", CAT_STYLE);
  console.log("%c    '---''(_/--'  `-'\\_)", CAT_STYLE);

  /* Storage Utility (LocalStorage Wrapper) */
  const Storage = {
    set(key, value) {
      try {
        localStorage.setItem(key, value);
      } catch (e) {
        console.warn("LocalStorage access denied", e);
      }
    },
    get(key) {
      try {
        return localStorage.getItem(key);
      } catch (e) {
        console.warn("LocalStorage read failed", e);
        return null;
      }
    }
  };

  /* =========================================================================
   *  Configuration Section
   *  自定义配置区域 - 你可以在这里修改站点设置
   * ========================================================================= */

  /* Theme Configuration | 主题配置 */
  // Note: These names will be displayed on the theme toggle button
  // 注意：这些名称将显示在主题切换按钮上
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
    UPTIME_RENDER_ID: "run-time"
  };

  // Precompute timestamp to avoid parsing date repeatedly in the loop
  // 预计算时间戳，避免在循环中重复解析日期
  SITE_CONFIG.BIRTH_TIMESTAMP = new Date(SITE_CONFIG.BIRTH_TIME).getTime();


  /* =========================================================================
   *  Core Logic Section
   *  核心逻辑区域 - 除非你是开发者，否则建议不要修改以下代码
   * ========================================================================= */

  /* UI Cache */
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
      modalStack: document.querySelector(".modal-stack"),
      // Stack logic
      modalStackItems: null,
      modalStackShow: null,
      modalStackIndex: 0,

      heroMotto: document.getElementById("hero-motto"),
      snakeImage: document.getElementById("snake-img"),
      uptimeElement: document.getElementById(SITE_CONFIG.UPTIME_RENDER_ID)
    };
  }

  /* Uptime Counter | 站点运行时间计数器 */
  /**
   * Calculates and updates the site's running time.
   * 计算并更新站点运行时间
   */
  function updateSiteUptime() {
    const now = Date.now();
    const diff = now - SITE_CONFIG.BIRTH_TIMESTAMP;

    const el = UI.uptimeElement;
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

    const pad = (n) => String(n).padStart(2, "0");
    const yearDayPart = years > 0
      ? `${years}年${remainingDays}天`
      : `${days}天`;

    const timePart = `${pad(hours)} : ${pad(minutes)} : ${pad(seconds)}`;

    el.textContent = "";
    el.appendChild(document.createTextNode(yearDayPart));
    el.appendChild(document.createElement("br"));
    el.appendChild(document.createTextNode(timePart));
  }

  /**
   * Determines if a color is visually dark to adjust contrast.
   * 判断颜色是否为深色，用于调整对比度
   * @param {string} color - Hex or RGB color string
   * @returns {boolean} True if dark, false otherwise
   */
  function isDarkColor(color) {
    if (!color) return false;

    let r, g, b;
    if (color.startsWith("#")) {
      let hex = color.slice(1);
      if (hex.length === 3) hex = hex.split("").map(x => x + x).join("");
      r = parseInt(hex.slice(0, 2), 16);
      g = parseInt(hex.slice(2, 4), 16);
      b = parseInt(hex.slice(4, 6), 16);
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
   * @param {number} index - Theme index
   * @returns {number} The safe index applied
   */
  function applyTheme(index) {
    const total = THEME_CONFIG.classes.length;
    const safeIndex = (index + total) % total;

    const html = UI.html || document.documentElement;
    THEME_CONFIG.classes.forEach(cls => html.classList.remove(cls));
    html.classList.add(THEME_CONFIG.classes[safeIndex]);

    Storage.set("MH_THEME_INDEX", safeIndex);

    if (UI.themeButton) {
      const name = THEME_CONFIG.names[safeIndex];
      const icon = THEME_CONFIG.icons[safeIndex] || "🎨";
      UI.themeButton.textContent = icon + name;
      UI.themeButton.setAttribute("aria-label", name);
    }

    if (UI.snakeImage) {
      const textColor = getComputedStyle(html)
        .getPropertyValue("--primary-text-color")
        .trim();
      const suffix = isDarkColor(textColor) ? "Dark" : "Light";
      UI.snakeImage.src = `./static/svg/snake-${suffix}.svg`;
    }

    return safeIndex;
  }

  /* Modal Logic */
  /**
   * Opens the modal with the specified image.
   * 打开模态框
   * @param {string} imgUrl - URL of the image to display
   */
  /* Track the element that triggered the modal for focus restoration */
  let modalTriggerElement = null;

  function openModal(imgUrl) {
    if (!UI.modal) return;
    
    modalTriggerElement = document.activeElement;

    // Update main image
    if (UI.modalImage && imgUrl) {
      UI.modalImage.src = imgUrl;
    }

    // Reset stack if exists
    if (UI.modalStackShow) {
      UI.modalStackIndex = 0;
      UI.modalStackShow(0);
    }

    UI.modal.classList.add("active");
    UI.modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    
    // Animation delay
    setTimeout(() => {
        if(UI.modalMain) UI.modalMain.classList.add("active");
    }, 100);

    // Focus trap: focus the close button
    const closeBtn = UI.modal.querySelector(".modal-close");
    if (closeBtn) setTimeout(() => closeBtn.focus(), 150);
  }

  /**
   * Closes the modal.
   * 关闭模态框
   */
  function closeModal() {
    if (!UI.modal) return;
    
    if (UI.modalMain) UI.modalMain.classList.remove("active");
    
    setTimeout(() => {
      UI.modal.classList.remove("active");
      UI.modal.setAttribute("aria-hidden", "true");
      if (UI.modalImage) UI.modalImage.src = "";
      document.body.classList.remove("modal-open");

      // Restore focus to the trigger element
      if (modalTriggerElement && typeof modalTriggerElement.focus === "function") {
        modalTriggerElement.focus();
        modalTriggerElement = null;
      }
    }, 200);
  }

  /**
   * Initializes modal interactions (clicks, keyboard, swipes).
   * 初始化模态框交互
   */
  function initModal() {
    if (!UI.modal) return;

    // Event Delegation for Sponsors
    document.addEventListener("click", (e) => {
        const trigger = e.target.closest(".js-sponsor-trigger");
        if (trigger) {
            e.preventDefault();
            const imgUrl = trigger.getAttribute("data-image");
            openModal(imgUrl);
        }
    });

    // Close on click outside
    UI.modal.addEventListener("click", (e) => {
      if (e.target === UI.modal) closeModal();
    });

    // Close on button click
    const closeBtn = UI.modal.querySelector(".modal-close");
    if (closeBtn) {
      closeBtn.addEventListener("click", closeModal);
    }

    // Close on Escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeModal();
      }
    });

    // Focus Trap + Arrow Key Navigation
    UI.modal.addEventListener("keydown", (e) => {
      if (!UI.modal.classList.contains("active")) return;

      // Arrow keys to switch images in stack
      if ((e.key === "ArrowLeft" || e.key === "ArrowRight") && UI.modalStackItems) {
        e.preventDefault();
        if (e.key === "ArrowLeft") {
          UI.modalStackIndex = (UI.modalStackIndex - 1 + UI.modalStackItems.length) % UI.modalStackItems.length;
        } else {
          UI.modalStackIndex = (UI.modalStackIndex + 1) % UI.modalStackItems.length;
        }
        UI.modalStackShow(UI.modalStackIndex);
        return;
      }

      // Tab focus trap
      if (e.key !== "Tab") return;

      const focusable = UI.modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    });

    // Mobile Stack Swipe Logic
    if (UI.modalStack) {
      const items = Array.from(UI.modalStack.querySelectorAll(".stack-img"));
      const arrowLeft = UI.modalStack.querySelector(".modal-arrow-left");
      const arrowRight = UI.modalStack.querySelector(".modal-arrow-right");

      if (items.length) {
        UI.modalStackItems = items;
        UI.modalStackIndex = 0;

        UI.modalStackShow = (i) => {
          items.forEach((img, idx) => {
            img.style.display = idx === i ? "block" : "none";
          });
        };

        // Initialize first show
        UI.modalStackShow(0);

        const goNext = () => {
          UI.modalStackIndex = (UI.modalStackIndex + 1) % items.length;
          UI.modalStackShow(UI.modalStackIndex);
        };

        const goPrev = () => {
          UI.modalStackIndex = (UI.modalStackIndex - 1 + items.length) % items.length;
          UI.modalStackShow(UI.modalStackIndex);
        };

        // Touch events
        let startX = 0;
        let touching = false;
        const threshold = 40;

        UI.modalStack.addEventListener("touchstart", (e) => {
          if (!e.touches || !e.touches[0]) return;
          touching = true;
          startX = e.touches[0].clientX;
        });

        UI.modalStack.addEventListener("touchend", (e) => {
          if (!touching || !e.changedTouches || !e.changedTouches[0]) return;
          touching = false;
          const endX = e.changedTouches[0].clientX;
          const diff = endX - startX;

          if (Math.abs(diff) < threshold) return;
          diff < 0 ? goNext() : goPrev();
        });

        // Arrow clicks
        arrowLeft?.addEventListener("click", (e) => {
          e.stopPropagation();
          goPrev();
        });

        arrowRight?.addEventListener("click", (e) => {
          e.stopPropagation();
          goNext();
        });
      }
    }
  }

  /* Initializers */
  /**
   * Initializes theme logic and binds click events.
   * 初始化主题逻辑
   */
  function initTheme() {
    let idx = parseInt(Storage.get("MH_THEME_INDEX"), 10) || 0;
    idx = applyTheme(idx);
    UI.themeButton?.addEventListener("click", () => {
      idx = applyTheme(idx + 1);
    });
  }

  /**
   * Initializes mobile navigation menu interactions.
   * 初始化移动端导航交互
   */
  function initMobileNav() {
    if (!UI.navBurger || !UI.navLinks) return;

    const isMobile = !window.matchMedia("(min-width: 800px)").matches;

    // Mobile: nav is visually hidden on load — hide from screen readers too
    if (isMobile) {
      UI.navLinks.setAttribute("aria-hidden", "true");
    }

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

    UI.navBurger.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        UI.navBurger.click();
      }
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
   * Initializes the typewriter effect for the hero section motto.
   * 初始化首页座右铭打字机效果
   */
  function initHeroTyping() {
    if (!UI.heroMotto) return;

    let mottoIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let pauseTicks = 0;

    const tick = () => {
      if (pauseTicks-- > 0) return;

      const text = MOTTO_TEXTS[mottoIndex];
      if (!deleting) {
        charIndex += 1;
        UI.heroMotto.textContent = text.slice(0, charIndex);
        if (charIndex === text.length) {
          deleting = true;
          pauseTicks = 20;
        }
      } else {
        charIndex -= 1;
        UI.heroMotto.textContent = text.slice(0, charIndex);
        if (charIndex === 0) {
          deleting = false;
          mottoIndex = (mottoIndex + 1) % MOTTO_TEXTS.length;
          pauseTicks = 10;
        }
      }
    };

    let timer = setInterval(tick, HERO_TYPING_INTERVAL);
    document.addEventListener("visibilitychange", () => {
      clearInterval(timer);
      if (!document.hidden) {
        timer = setInterval(tick, HERO_TYPING_INTERVAL);
      }
    });
  }

  /* Bootstrap */
  document.addEventListener("DOMContentLoaded", () => {
    cacheUI();
    initTheme();
    initMobileNav();
    initModal();
    initHeroTyping();
    updateFooterYear();

    // Uptime timer: only starts after DOM is ready
    let uptimeTimer = setInterval(updateSiteUptime, 1000);
    updateSiteUptime();

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        clearInterval(uptimeTimer);
      } else {
        updateSiteUptime();
        uptimeTimer = setInterval(updateSiteUptime, 1000);
      }
    });

    // Pause card float animation when off-screen
    initCardAnimationObserver();
  });

  /**
   * Updates the footer year dynamically.
   * 动态更新页脚年份 (e.g. "2026" or "2026 - 2027")
   */
  function updateFooterYear() {
    const el = document.getElementById("footer-year");
    if (!el) return;

    const currentYear = new Date().getFullYear();
    const birthYear = new Date(SITE_CONFIG.BIRTH_TIME).getFullYear();

    el.textContent = currentYear > birthYear
      ? birthYear + " - " + currentYear
      : String(currentYear);
    el.setAttribute("datetime", String(currentYear));
  }

  /**
   * Uses IntersectionObserver to pause/resume card icon float animation.
   * 当卡片离开视口时暂停浮动动画，节省 GPU 资源
   */
  function initCardAnimationObserver() {
    if (!("IntersectionObserver" in window)) return;

    const cards = document.querySelectorAll(".mh-site-card, .mh-project-card");
    if (!cards.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const icon = entry.target.querySelector("img");
        if (icon) {
          icon.style.animationPlayState = entry.isIntersecting ? "running" : "paused";
        }
      });
    }, { threshold: 0.1 });

    cards.forEach((card) => observer.observe(card));
  }

  // Loading removal logic with safety timeout
  function removeLoading() {
    if (!UI.loading || UI.loading.classList.contains("hide")) return;

    UI.loading.classList.add("hide");
    setTimeout(() => {
      UI.loading.style.display = "none";
    }, 600);
  }

  window.addEventListener("load", removeLoading);
  
  // Safety fallback: Force remove loading after 5 seconds
  // 防止因资源加载失败导致页面一直白屏
  setTimeout(removeLoading, 5000);
})();
