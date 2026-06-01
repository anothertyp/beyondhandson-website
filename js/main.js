/* =========================================================================
   Beyond Hands-On — Interaktion
   ========================================================================= */
(function () {
  "use strict";

  /* -----------------------------------------------------------------------
     1) BUCHUNGS-LINK (Stripe)
     Sobald dein Stripe-Zahllink steht, hier zwischen die Anführungszeichen
     einsetzen, z. B.: const BOOKING_URL = "https://buy.stripe.com/abc123";
     Solange leer, zeigen die Buttons auf den Preis-Abschnitt / die E-Mail.
     ----------------------------------------------------------------------- */
  const BOOKING_URL = "";

  if (BOOKING_URL) {
    document.querySelectorAll(".js-book").forEach(function (el) {
      el.setAttribute("href", BOOKING_URL);
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener");
    });
  }

  /* -----------------------------------------------------------------------
     2) Mobiles Menü
     ----------------------------------------------------------------------- */
  const toggle = document.getElementById("nav-toggle");
  const links = document.getElementById("nav-links");

  if (toggle && links) {
    toggle.addEventListener("click", function () {
      const open = document.body.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Menü schließen" : "Menü öffnen");
    });
    links.addEventListener("click", function (e) {
      if (e.target.closest("a") && document.body.classList.contains("nav-open")) {
        document.body.classList.remove("nav-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Menü öffnen");
      }
    });
  }

  /* -----------------------------------------------------------------------
     3) Header-Schatten beim Scrollen
     ----------------------------------------------------------------------- */
  const header = document.querySelector(".site-header");
  if (header) {
    const onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* -----------------------------------------------------------------------
     4) FAQ-Akkordeon
     ----------------------------------------------------------------------- */
  document.querySelectorAll(".faq__item").forEach(function (item) {
    const btn = item.querySelector(".faq__q");
    const panel = item.querySelector(".faq__a");
    if (!btn || !panel) return;

    btn.addEventListener("click", function () {
      const isOpen = item.classList.contains("is-open");

      // andere schließen (Akkordeon-Verhalten)
      document.querySelectorAll(".faq__item.is-open").forEach(function (other) {
        if (other !== item) {
          other.classList.remove("is-open");
          other.querySelector(".faq__a").style.maxHeight = null;
          other.querySelector(".faq__q").setAttribute("aria-expanded", "false");
        }
      });

      if (isOpen) {
        item.classList.remove("is-open");
        panel.style.maxHeight = null;
        btn.setAttribute("aria-expanded", "false");
      } else {
        item.classList.add("is-open");
        panel.style.maxHeight = panel.scrollHeight + "px";
        btn.setAttribute("aria-expanded", "true");
      }
    });
  });

  // bei Größenänderung offene Panels neu vermessen
  window.addEventListener("resize", function () {
    const open = document.querySelector(".faq__item.is-open .faq__a");
    if (open) open.style.maxHeight = open.scrollHeight + "px";
  });

  /* -----------------------------------------------------------------------
     5) Sanftes Einblenden beim Scrollen
     ----------------------------------------------------------------------- */
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    const io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  /* -----------------------------------------------------------------------
     6) Jahr im Footer
     ----------------------------------------------------------------------- */
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
