-- AutoCerto Support Copilot | Supabase schema v1
-- Execute no SQL Editor do projeto correto.
-- SEGURANÇA: acesso público anônimo NEGADO por padrão.
-- A API protegida será configurada separadamente antes de sincronizar o site.
create extension if not exists pgcrypto;

create table if not exists public.copilot_atendimentos (
 id text primary key,
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now(),
 modulo text not null,
 assunto text not null,
 descricao text not null default '',
 solucao text not null default '',
 status text not null default 'Em análise'
   check (status in ('Em análise','Aguardando cliente','Escalado','Resolvido')),
 duracao_minutos integer check (duracao_minutos between 0 and 10080),
 confirmada boolean not null default false
);
create table if not exists public.copilot_artigos (
 id text primary key,
 atendimento_origem_id text,
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now(),
 titulo text not null,
 modulo text not null,
 problema text not null,
 solucao text not null,
 revisor text not null default ''
);
create index if not exists copilot_atendimentos_status_idx on public.copilot_atendimentos(status);
create index if not exists copilot_atendimentos_created_idx on public.copilot_atendimentos(created_at desc);
create index if not exists copilot_artigos_updated_idx on public.copilot_artigos(updated_at desc);
alter table public.copilot_atendimentos enable row level security;
alter table public.copilot_artigos enable row level security;
revoke all on table public.copilot_atendimentos from anon, authenticated;
revoke all on table public.copilot_artigos from anon, authenticated;
-- Não criar políticas públicas (USING true / WITH CHECK true).
-- Não inserir service_role/secret keys no GitHub Pages.
