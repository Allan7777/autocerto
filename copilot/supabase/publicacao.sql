-- ETAPA 2: catálogo público, somente leitura, sem contas ou senhas.
-- Execute manualmente no SQL Editor. Não publica registros privados.
create table if not exists public.copilot_artigos_publicados (
 id text primary key,
 titulo text not null,
 modulo text not null,
 problema text not null,
 solucao text not null,
 atualizado_em timestamptz not null default now()
);
alter table public.copilot_artigos_publicados enable row level security;
revoke all on public.copilot_artigos_publicados from anon, authenticated;
grant select on public.copilot_artigos_publicados to anon;
drop policy if exists "Leitura publica de artigos publicados" on public.copilot_artigos_publicados;
create policy "Leitura publica de artigos publicados"
on public.copilot_artigos_publicados for select to anon using (true);
-- Sem INSERT/UPDATE/DELETE público. Publique SOMENTE conteúdo revisado e
-- explicitamente autorizado usando SQL Editor por um administrador.
-- Exemplo (não executar sem conteúdo aprovado):
-- insert into public.copilot_artigos_publicados (id,titulo,modulo,problema,solucao)
-- values ('artigo-001','Título aprovado','Administrativo','Problema genérico','Solução aprovada');
