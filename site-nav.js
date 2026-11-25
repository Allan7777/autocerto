/* AutoCerto Academy — menu lateral compartilhado das subpáginas.
   Para adicionar uma página ao menu, inclua uma linha em ACADEMY (ou COPILOT). */
(function () {
  "use strict";
  var sc = document.currentScript;
  var src = (sc && sc.getAttribute("src")) || "./site-nav.js";
  var base = src.replace(/site-nav\.js.*$/, "");
  var here = location.pathname.split("/").pop() || "index.html";
  var inCopilot = /\/copilot\//.test(location.pathname);

  var ICONS = {
    home: '<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/><path d="M10 21v-6h4v6"/>',
    book: '<path d="M2 4h6a4 4 0 0 1 4 4v13a3 3 0 0 0-3-3H2z"/><path d="M22 4h-6a4 4 0 0 0-4 4v13a3 3 0 0 1 3-3h7z"/>',
    compass: '<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5z"/>',
    grid: '<rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
    notebook: '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 3v18M12 8h4M12 12h4"/>',
    help: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.4-1 1-1 1.7"/><path d="M12 17h.01"/>',
    check: '<circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/>',
    file: '<path d="M6 3h8l5 5v13H6z"/><path d="M14 3v5h5M9 13h6M9 17h6"/>',
    headset: '<path d="M4 14v-2a8 8 0 0 1 16 0v2"/><rect x="3" y="14" width="4" height="6" rx="1.5"/><rect x="17" y="14" width="4" height="6" rx="1.5"/>',
    clipboard: '<rect x="6" y="4" width="12" height="17" rx="2"/><path d="M9 4h6v3H9zM9 12h6M9 16h4"/>',
    users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><circle cx="17" cy="9" r="2.5"/><path d="M17.5 14.2A5.5 5.5 0 0 1 21.5 19"/>',
    folder: '<path d="M3 6a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
    chat: '<path d="M4 5h16v11H9l-5 4z"/>',
    plug: '<path d="M9 3v5M15 3v5M6 8h12v3a6 6 0 0 1-12 0zM12 17v4"/>',
    car: '<path d="M5 16V11l2-5h10l2 5v5M3 16h18M7 19v-3M17 19v-3"/><circle cx="8" cy="13" r=".6"/><circle cx="16" cy="13" r=".6"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
    chart: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
    pulse: '<path d="M3 12h4l3-8 4 16 3-8h4"/>',
    list: '<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>'
  };

  // [arquivo, rótulo, ícone, âncora opcional]
  var ACADEMY = [
    ["Início", [["index.html", "Início", "home"]]],
    ["Estudar", [
      ["index.html#modules", "Módulos", "book"],
      ["sistema-na-pratica.html", "Sistema na prática", "compass"],
      ["playbook.html", "Playbook de suporte", "file"]
    ]],
    ["Praticar", [
      ["assistente-atendimento.html", "Assistente de atendimento", "chat"],
      ["treinamento.html", "Treinamento prático", "headset"],
      ["index.html#test", "Simulados", "check"],
      ["questionario-entrada.html", "Questionário de entrada", "clipboard"],
      ["integracao-webmotors.html", "Integração Webmotors · passo a passo", "plug"],
      ["novo-modulo-avaliacao-veiculos.html", "Novo módulo de avaliação de veículos", "car"],
      ["novo-gerenciador-leads.html", "Novo gerenciador de leads + simulado", "users"]
    ]],
    ["Consultar", [
      ["index.html#faq", "Dúvidas", "help"],
      ["casos-reais.html", "Casos reais de atendimento", "folder"],
      ["diario-atendimento.html", "Diário de atendimento", "notebook"],
      ["index.html#tools", "Central de ferramentas", "grid"]
    ]]
  ];
  var COPILOT = ["Support Copilot", [
    ["copilot/index.html", "Diagnóstico inteligente", "search"],
    ["copilot/atendimentos.html", "Gestão de atendimentos", "list"],
    ["copilot/conhecimento.html", "Base de conhecimento", "book"],
    ["copilot/diagnostico-guiado.html", "Diagnóstico guiado", "pulse"],
    ["copilot/inteligencia.html", "Inteligência do suporte", "chart"],
    ["copilot/compartilhado.html", "Atendimentos compartilhados", "users"]
  ]];

  function icon(name) {
    return '<svg viewBox="0 0 24 24" aria-hidden="true">' + (ICONS[name] || "") + "</svg>";
  }
  function isCurrent(target) {
    var file = target.split("#")[0];
    if (target.indexOf("#") !== -1) return false; // âncoras do índice nunca ficam marcadas aqui
    return file.split("/").pop() === here && (file.indexOf("copilot/") === 0) === inCopilot;
  }
  function link(item) {
    var cur = isCurrent(item[0]) ? ' aria-current="page"' : "";
    return '<a class="sn-link" href="' + base + item[0] + '"' + cur + ">" + icon(item[2]) + "<span>" + item[1] + "</span></a>";
  }
  function group(g) {
    var out = g[0] === "Início" ? "" : '<p class="sn-label">' + g[0] + "</p>";
    return out + g[1].map(link).join("");
  }

  var groups = inCopilot ? [COPILOT, ["Academy", [
    ["index.html", "Início da Academy", "home"],
    ["playbook.html", "Playbook de suporte", "file"],
    ["casos-reais.html", "Casos reais de atendimento", "folder"]
  ]]] : ACADEMY;

  var brandName = inCopilot ? "Support Copilot" : "Academy";
  var brand = '<span class="sn-mark"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 12.5 4 4 8-9"/></svg></span>' +
    '<span class="sn-name">AutoCerto<small>' + brandName + "</small></span>";
  var home = base + (inCopilot ? "copilot/index.html" : "index.html");

  var html =
    '<a class="sn-skip" href="#sn-main">Ir para o conteúdo</a>' +
    '<header class="sn-bar"><a class="sn-brand" href="' + home + '">' + brand + "</a>" +
    '<button class="sn-menu" type="button" aria-expanded="false" aria-controls="sn-side" aria-label="Abrir menu">' + icon("menu") + "</button></header>" +
    '<div class="sn-scrim" data-sn-close></div>' +
    '<aside class="sn-side" id="sn-side"><a class="sn-brand" href="' + home + '">' + brand + "</a>" +
    '<nav aria-label="Principal">' + groups.map(group).join("") + "</nav>" +
    '<div class="sn-foot">' + link(["minha-conta.html", "Minha conta", "user"]) + "</div></aside>";

  document.body.insertAdjacentHTML("afterbegin", html);
  document.body.classList.add("sn-on");

  var main = document.querySelector("main, .page");
  if (main && !main.id) main.id = "sn-main";
  var skip = document.querySelector(".sn-skip");
  if (main && skip) skip.setAttribute("href", "#" + main.id);

  var root = document.documentElement;
  var btn = document.querySelector(".sn-menu");
  function setOpen(open) {
    root.classList.toggle("sn-open", open);
    btn.setAttribute("aria-expanded", String(open));
    btn.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  }
  btn.addEventListener("click", function () { setOpen(!root.classList.contains("sn-open")); });
  document.querySelector("[data-sn-close]").addEventListener("click", function () { setOpen(false); });
  document.querySelectorAll(".sn-side a").forEach(function (a) { a.addEventListener("click", function () { setOpen(false); }); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") setOpen(false); });
})();
