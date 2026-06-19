/**
 * Site helper – generates tip cards, keyword badges and access info
 * No external dependencies.
 * (c) Aoke Portal – data only, no remote calls.
 */
(function () {
  "use strict";

  // --- Configuration -------------------------------------------------------
  var SITE_BASE = "https://index-portal-aoke.com";
  var PRIMARY_KEYWORD = "aoke";
  var SECONDARY_KEYWORDS = ["portal", "index", "guide", "hub"];

  // --- DOM helpers ---------------------------------------------------------
  function createElement(tag, className, text) {
    var el = document.createElement(tag);
    if (className) el.className = className;
    if (text) el.appendChild(document.createTextNode(text));
    return el;
  }

  function appendChildren(parent) {
    for (var i = 1; i < arguments.length; i++) {
      if (arguments[i] instanceof Node) parent.appendChild(arguments[i]);
    }
    return parent;
  }

  // --- Tip card generator --------------------------------------------------
  function generateTipCards() {
    var tips = [
      {
        title: "What is Aoke Portal?",
        content:
          "Aoke Portal (" + SITE_BASE + ") is a curated index of resources, tools and references around the " + PRIMARY_KEYWORD + " ecosystem.",
        icon: "\u2139",
      },
      {
        title: "How to navigate",
        content:
          "Use the sidebar or search bar (if available) to filter categories. Badges below indicate related keywords.",
        icon: "\u2705",
      },
      {
        title: "Stay updated",
        content:
          "Bookmark the portal and check back for new additions. No automated tracking or external fetches are performed.",
        icon: "\u2B50",
      },
    ];

    var container = document.getElementById("tip-card-container");
    if (!container) return;

    tips.forEach(function (tip) {
      var card = createElement("div", "tip-card");
      var iconSpan = createElement("span", "tip-icon", tip.icon);
      var titleEl = createElement("h3", "tip-title", tip.title);
      var contentEl = createElement("p", "tip-content", tip.content);

      appendChildren(card, iconSpan, titleEl, contentEl);
      container.appendChild(card);
    });
  }

  // --- Keyword badges ------------------------------------------------------
  function generateBadges() {
    var allKeywords = [PRIMARY_KEYWORD].concat(SECONDARY_KEYWORDS);
    var badgeContainer = document.getElementById("keyword-badge-list");
    if (!badgeContainer) return;

    allKeywords.forEach(function (kw) {
      var badge = createElement("span", "keyword-badge", kw);
      badge.setAttribute("data-keyword", kw);
      badgeContainer.appendChild(badge);
    });
  }

  // --- Access info ---------------------------------------------------------
  function generateAccessInfo() {
    var infoBox = document.getElementById("access-info-box");
    if (!infoBox) return;

    var header = createElement("h2", "access-title", "Access Information");

    var desc = createElement("p", "access-description");
    var descText = document.createTextNode(
      "This site (" + SITE_BASE + ") is publicly available. No login or token required. " +
      "All content is static and relies on the " + PRIMARY_KEYWORD + " namespace."
    );
    desc.appendChild(descText);

    var list = createElement("ul", "access-list");
    var items = [
      "URL: " + SITE_BASE,
      'Primary keyword: "' + PRIMARY_KEYWORD + '"',
      "Secondary keywords: " + SECONDARY_KEYWORDS.join(", "),
      "Generated tips and badges are pure DOM, no remote calls.",
    ];
    items.forEach(function (itemText) {
      var li = createElement("li", "access-item", itemText);
      list.appendChild(li);
    });

    appendChildren(infoBox, header, desc, list);
  }

  // --- Initialize ----------------------------------------------------------
  function init() {
    // Ensure we have the needed containers or create them if missing
    var body = document.body;
    if (!body) return;

    var containers = [
      { id: "tip-card-container", tag: "div", class: "tip-card-wrapper" },
      { id: "keyword-badge-list", tag: "div", class: "badge-wrapper" },
      { id: "access-info-box", tag: "div", class: "info-wrapper" },
    ];

    containers.forEach(function (cfg) {
      if (!document.getElementById(cfg.id)) {
        var wrapper = createElement(cfg.tag, cfg.class);
        wrapper.id = cfg.id;
        body.appendChild(wrapper);
      }
    });

    generateTipCards();
    generateBadges();
    generateAccessInfo();
  }

  // Run on DOMContentLoaded or immediately if already loaded
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();