// Tony Peonio — small, dependency-free enhancements.
// Everything here is optional: the page reads fine with JavaScript off.
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Footer year
  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  // Light/dark toggle: follows the system until the visitor picks one, then remembers it
  var root = document.documentElement;
  var themeBtn = document.querySelector(".theme-toggle");
  var systemDark = window.matchMedia("(prefers-color-scheme: dark)");
  var isDark = function () {
    var t = root.getAttribute("data-theme");
    return t ? t === "dark" : systemDark.matches;
  };
  var syncThemeUi = function () {
    var dark = isDark();
    if (themeBtn) themeBtn.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", dark ? "#0d1524" : "#21314d");
  };
  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      var next = isDark() ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) {}
      syncThemeUi();
    });
  }
  if (systemDark.addEventListener) systemDark.addEventListener("change", syncThemeUi);
  syncThemeUi();

  // Mobile menu
  var toggle = document.querySelector(".nav__toggle");
  var links = document.getElementById("nav-links");
  var closeMenu = function () {
    if (!links || !links.classList.contains("open")) return;
    links.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.textContent = "Menu";
  };
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.textContent = open ? "Close" : "Menu";
    });
    links.addEventListener("click", function (e) {
      if (e.target.closest("a")) closeMenu();
    });
  }

  // Margin notes: tap to toggle on touch screens, Escape to close
  document.querySelectorAll(".note").forEach(function (note) {
    note.setAttribute("aria-expanded", "false");
    note.setAttribute("aria-label", note.textContent.trim() + ". Note: " + note.getAttribute("data-note"));
    note.addEventListener("click", function () {
      var open = note.getAttribute("aria-expanded") === "true";
      document.querySelectorAll('.note[aria-expanded="true"]').forEach(function (n) { n.setAttribute("aria-expanded", "false"); });
      note.setAttribute("aria-expanded", String(!open));
    });
  });
  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    document.querySelectorAll('.note[aria-expanded="true"]').forEach(function (n) { n.setAttribute("aria-expanded", "false"); });
    if (links && links.classList.contains("open")) { closeMenu(); toggle.focus(); }
  });
  document.addEventListener("click", function (e) {
    if (!e.target.closest(".note")) document.querySelectorAll('.note[aria-expanded="true"]').forEach(function (n) { n.setAttribute("aria-expanded", "false"); });
  });

  // Scroll reveals
  var reveals = document.querySelectorAll(".reveal");
  if (!reduceMotion && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add("in"); io.unobserve(entry.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  // Active chapter in the nav
  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".nav__links a"));
  var sections = navLinks.map(function (a) { return document.querySelector(a.getAttribute("href")); }).filter(Boolean);
  if ("IntersectionObserver" in window && sections.length) {
    var current = null;
    var navIo = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) current = entry.target.id;
      });
      navLinks.forEach(function (a) {
        var on = a.getAttribute("href") === "#" + current;
        a.classList.toggle("active", on);
        if (on) a.setAttribute("aria-current", "true"); else a.removeAttribute("aria-current");
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(function (s) { navIo.observe(s); });
  }

  // Pole-vault progress bar: the pole grows with scroll; at the end the vaulter clears the bar
  var progress = document.querySelector(".progress");
  var pole = document.querySelector(".progress__pole");
  var vaulter = document.querySelector(".progress__vaulter");
  if (progress && pole && vaulter) {
    var ticking = false;
    var update = function () {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      var p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      // Stop the pole short of the standards so the "bar" stays visible on the right
      var track = progress.clientWidth - 40;
      var cleared = p > 0.985;
      pole.style.width = (p * track) + "px";
      // Once cleared, the vaulter sails past the standards and lands on the far side
      vaulter.style.left = (cleared ? progress.clientWidth - 8 : p * track) + "px";
      progress.classList.toggle("cleared", cleared);
      ticking = false;
    };
    window.addEventListener("scroll", function () {
      if (!ticking) { ticking = true; window.requestAnimationFrame(update); }
    }, { passive: true });
    window.addEventListener("resize", update);
    update();
  }
})();
