/* ---------------------------------------------------------------
   Interactions: theme, sticky header state, mobile nav,
   scroll reveal, active section highlight.
   --------------------------------------------------------------- */

(function () {
  "use strict";

  var root = document.documentElement;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  /* --- theme -------------------------------------------------- */

  var toggle = document.querySelector("[data-theme-toggle]");

  function setTheme(theme) {
    root.dataset.theme = theme;

    if (toggle) {
      var isDark = theme === "dark";
      toggle.setAttribute("aria-label", isDark ? "Switch to light theme" : "Switch to dark theme");
      toggle.setAttribute("aria-pressed", String(isDark));
    }

    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", theme === "dark" ? "#0e0f0d" : "#faf9f6");
  }

  setTheme(root.dataset.theme === "dark" ? "dark" : "light");

  if (toggle) {
    toggle.addEventListener("click", function () {
      var next = root.dataset.theme === "dark" ? "light" : "dark";
      setTheme(next);
      try { localStorage.setItem("theme", next); } catch (e) { /* storage blocked */ }
    });
  }

  /* --- header border on scroll -------------------------------- */

  var header = document.querySelector("[data-header]");

  if (header) {
    var onScroll = function () {
      header.dataset.scrolled = String(window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* --- mobile nav --------------------------------------------- */

  var navToggle = document.querySelector("[data-nav-toggle]");
  var navPanel = document.querySelector("[data-nav-panel]");

  function closeNav() {
    if (!navToggle || !navPanel) return;
    navPanel.dataset.open = "false";
    navToggle.setAttribute("aria-expanded", "false");
  }

  if (navToggle && navPanel) {
    navPanel.dataset.open = "false";

    navToggle.addEventListener("click", function () {
      var open = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!open));
      navPanel.dataset.open = String(!open);
    });

    navPanel.addEventListener("click", function (event) {
      if (event.target.closest("a")) closeNav();
    });

    document.addEventListener("click", function (event) {
      if (!event.target.closest(".site-nav")) closeNav();
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        closeNav();
        navToggle.focus();
      }
    });

    window.matchMedia("(min-width: 721px)").addEventListener("change", function (event) {
      if (event.matches) closeNav();
    });
  }

  /* --- scroll reveal ------------------------------------------ */

  var revealItems = document.querySelectorAll(".reveal");

  if (reduceMotion.matches || !("IntersectionObserver" in window)) {
    revealItems.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });

    revealItems.forEach(function (el) { revealObserver.observe(el); });
  }

  /* --- active nav link ---------------------------------------- */

  var sections = Array.prototype.slice.call(document.querySelectorAll("main section[id]"));
  var navLinks = Array.prototype.slice.call(document.querySelectorAll("[data-nav-link]"));

  if (sections.length && navLinks.length && "IntersectionObserver" in window) {
    var visible = new Map();

    var navObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        visible.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
      });

      var bestId = null;
      var bestRatio = 0;
      visible.forEach(function (ratio, id) {
        if (ratio > bestRatio) {
          bestRatio = ratio;
          bestId = id;
        }
      });

      navLinks.forEach(function (link) {
        var match = bestId && link.getAttribute("href") === "#" + bestId;
        if (match) {
          link.setAttribute("aria-current", "true");
        } else {
          link.removeAttribute("aria-current");
        }
      });
    }, {
      rootMargin: "-45% 0px -45% 0px",
      threshold: [0, 0.25, 0.5, 1]
    });

    sections.forEach(function (section) { navObserver.observe(section); });
  }

  /* --- year --------------------------------------------------- */

  var year = document.querySelector("[data-year]");
  if (year) year.textContent = String(new Date().getFullYear());
})();
