# AutoCerto Academy

Plataforma independente de estudos sobre fluxos de suporte do sistema AutoCerto, construída a partir das transcrições de treinamentos fornecidas pelo usuário.

## Conteúdo

- 4 módulos: Administrativo, Avaliação de Veículos, Gestor de Leads e Financeiro
- 49 aulas com explicações, fluxos e orientações de suporte
- 12 casos de dúvidas frequentes e diagnósticos
- 10 questões interativas com correção
- Progresso das aulas salvo localmente no navegador
- Pesquisa por palavras-chave e layout responsivo

## Executar

Abra `index.html` em qualquer navegador moderno. Não há dependências externas. Para testar localmente as páginas que carregam arquivos (como o questionário), use um servidor simples, por exemplo `python3 -m http.server`, e abra `http://localhost:8000`.

## Estrutura visual

- `academy.css`: estilo da página inicial (`index.html`).
- `site.css`: estilo compartilhado de todas as subpáginas e da pasta `copilot/` (cores, fontes, botões, formulários, cartões, tabelas). Cada página só tem em `<style>` o que é específico dela.
- `site-nav.js`: menu lateral das subpáginas. **Para criar uma página nova no menu**, adicione uma linha na lista `ACADEMY` (ou `COPILOT`) no início desse arquivo e, na nova página, inclua `<link rel="stylesheet" href="./site.css">`, `<script src="./site-nav.js"></script>` logo após `<body>` e `class="page"` no `<main>`. Páginas dentro de `copilot/` usam `../` nos caminhos.
- `fonts/`: fontes Archivo e Figtree, servidas pelo próprio site.

## Publicar com GitHub Pages

Em **Settings → Pages → Build and deployment**, selecione **Deploy from a branch**, branch `main`, pasta `/ (root)` e salve. O endereço esperado após ativação é https://allan7777.github.io/autocerto/.

## Avisos

Este projeto é independente e não oficial. Os procedimentos refletem o conteúdo dos treinamentos fornecidos e não foram validados contra a versão atual do software. Os pontos não demonstrados ou incertos são sinalizados. Não use credenciais nem dados reais de clientes nos exercícios.
