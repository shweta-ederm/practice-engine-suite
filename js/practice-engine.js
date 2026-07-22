/* Practice Engine shared behaviors */
(function () {
  "use strict";

  /* Mark that JS is available so entrance animations can safely hide content */
  document.documentElement.classList.add("js");

  /* Scroll-reveal micro-animation for [data-animate] elements */
  var animated = document.querySelectorAll("[data-animate]");
  if (animated.length && "IntersectionObserver" in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    animated.forEach(function (el) { observer.observe(el); });
  } else {
    animated.forEach(function (el) { el.classList.add("in-view"); });
  }

  /* Route small screens to the dedicated -mobile page, and wide screens back.
     Pages opt in via <body data-mobile-pair> (desktop) or data-desktop-pair (mobile). */
  var body = document.body;
  var MOBILE_BREAKPOINT = 768;

  function currentPage() {
    var path = window.location.pathname.split("/").pop();
    return path || "index.html";
  }

  function routeForViewport() {
    var page = currentPage();
    if (window.innerWidth <= MOBILE_BREAKPOINT && body.hasAttribute("data-mobile-pair")) {
      var mobile = page.replace(/\.html$/, "-mobile.html");
      if (mobile !== page) window.location.replace(mobile);
    } else if (window.innerWidth > MOBILE_BREAKPOINT && body.hasAttribute("data-desktop-pair")) {
      var desktop = page.replace(/-mobile\.html$/, ".html");
      if (desktop !== page) window.location.replace(desktop);
    }
  }
  routeForViewport();
  var resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(routeForViewport, 250);
  });

  /* App switcher */
  document.querySelectorAll("[data-switcher-toggle]").forEach(function (btn) {
    var menu = btn.closest(".app-switcher").querySelector(".app-switcher-menu");
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      menu.classList.toggle("open");
      btn.setAttribute("aria-expanded", menu.classList.contains("open"));
    });
    document.addEventListener("click", function (e) {
      if (!menu.contains(e.target)) {
        menu.classList.remove("open");
        btn.setAttribute("aria-expanded", "false");
      }
    });
  });

  /* Modals */
  document.querySelectorAll("[data-modal-open]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var modal = document.getElementById(btn.getAttribute("data-modal-open"));
      if (modal) modal.classList.add("open");
    });
  });
  document.querySelectorAll("[data-modal-close]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      btn.closest(".modal-overlay").classList.remove("open");
    });
  });
  document.querySelectorAll(".modal-overlay").forEach(function (overlay) {
    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) overlay.classList.remove("open");
    });
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      document.querySelectorAll(".modal-overlay.open").forEach(function (o) {
        o.classList.remove("open");
      });
    }
  });

  /* Tabs and segmented controls (visual demo behavior) */
  document.querySelectorAll(".tabs").forEach(function (tabs) {
    tabs.querySelectorAll(".tab").forEach(function (tab) {
      tab.addEventListener("click", function () {
        tabs.querySelectorAll(".tab").forEach(function (t) { t.classList.remove("active"); });
        tab.classList.add("active");
      });
    });
  });
  document.querySelectorAll(".segmented").forEach(function (seg) {
    seg.querySelectorAll("button").forEach(function (b) {
      b.addEventListener("click", function () {
        seg.querySelectorAll("button").forEach(function (x) { x.classList.remove("active"); });
        b.classList.add("active");
      });
    });
  });
})();
