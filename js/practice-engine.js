/* Practice Engine shared behaviors */
(function () {
  "use strict";

  /* Mark that JS is available so entrance animations can safely hide content */
  document.documentElement.classList.add("js");

  /* -----------------------------------------------------------
     Product name registry: THE single source of truth for names.
     To rename a product, edit it here; every element carrying
     data-product-name="key" updates across the whole suite.
     Add data-name-short to use the short form (e.g. PE Admin).
     Page titles and prose are the only things updated by hand.
     ----------------------------------------------------------- */
  var PE_PRODUCTS = {
    suite:        { name: "Practice Engine",       short: "Practice Engine" },
    recall:       { name: "Recall Health",         short: "Recall Health" },
    receptionist: { name: "Medical Receptionist",  short: "Medical Receptionist" },
    chatbot:      { name: "Chatbot",               short: "Chatbot" },
    scheduler:    { name: "Online Scheduler",      short: "Online Scheduler" },
    intake:       { name: "Patient Intake",        short: "Patient Intake" },
    paymydoc:     { name: "Pay My Doc",            short: "Pay My Doc" },
    admin:        { name: "Practice Engine Admin", short: "PE Admin" }
  };
  document.querySelectorAll("[data-product-name]").forEach(function (el) {
    var product = PE_PRODUCTS[el.getAttribute("data-product-name")];
    if (product) el.textContent = el.hasAttribute("data-name-short") ? product.short : product.name;
  });

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

  /* Clickable table rows: add data-href to a <tr> to make the whole row navigate */
  document.querySelectorAll("tr[data-href]").forEach(function (row) {
    row.addEventListener("click", function (e) {
      if (e.target.closest("a, button, input, select, label")) return;
      window.location.href = row.getAttribute("data-href");
    });
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
