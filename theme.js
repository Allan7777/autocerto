/* AutoCerto Academy — tema claro/escuro.
   Carregado no <head> de todas as páginas: aplica a escolha salva antes da página
   aparecer (sem piscar) e coloca o botão "Tema escuro/claro" no menu lateral. */
(function () {
  "use strict";
  var KEY = "academy-theme";
  var root = document.documentElement;

  function read() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function write(v) { try { localStorage.setItem(KEY, v); } catch (e) { /* navegação privada */ } }
  function isDark() { return root.getAttribute("data-theme") === "dark"; }
  function apply(theme) {
    if (theme === "dark") root.setAttribute("data-theme", "dark");
    else root.removeAttribute("data-theme");
  }

  apply(read());

  var MOON = '<path d="M20 14.5A8 8 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z"/>';
  var SUN = '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>';
  var buttons = [];

  function paint(btn) {
    var dark = isDark();
    btn.setAttribute("aria-pressed", String(dark));
    btn.innerHTML = '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="20" height="20">' +
      (dark ? SUN : MOON) + "</svg><span>" + (dark ? "Tema claro" : "Tema escuro") + "</span>";
  }
  function refresh() { buttons.forEach(paint); }

  function build() {
    var box = document.querySelector(".sn-foot, .side-foot");
    if (!box) return;
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = box.classList.contains("sn-foot") ? "sn-link" : "nav";
    btn.addEventListener("click", function () {
      var next = isDark() ? "light" : "dark";
      apply(next);
      write(next);
      refresh();
    });
    box.insertBefore(btn, box.lastElementChild);
    buttons.push(btn);
    paint(btn);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", build);
  else build();

  // mantém várias abas abertas em sincronia
  window.addEventListener("storage", function (e) {
    if (e.key === KEY) { apply(e.newValue); refresh(); }
  });
  // na impressão, sempre no tema claro
  var before = null;
  window.addEventListener("beforeprint", function () { before = isDark(); if (before) apply("light"); });
  window.addEventListener("afterprint", function () { if (before) apply("dark"); before = null; });
})();
