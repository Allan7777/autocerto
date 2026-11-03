# Integração Supabase — AutoCerto Support Copilot

Projeto Supabase informado: `https://lpyggrfqfigrvfcosnaj.supabase.co`

## Estado atual
O arquivo `schema.sql` está preparado, **mas não foi executado no Supabase**.
O site continua com armazenamento local até que exista uma API autenticada/autorizada.
Apenas a URL do projeto não permite acesso administrativo ao banco.

## Aplicação
1. Acesse Supabase → SQL Editor no projeto correto.
2. Revise e execute o conteúdo de `schema.sql`.
3. Confirme as tabelas `copilot_atendimentos` e `copilot_artigos` no Table Editor.
4. Confirme que RLS está habilitado e que `anon` / `authenticated` não têm privilégios nas tabelas.
5. Configure uma API intermediária segura (por exemplo, Edge Function protegida por mecanismo de acesso da equipe). Sem login individual é possível, mas a aplicação ainda precisa controlar quem pode acessar os dados.
6. Somente depois conecte o front-end, migre os dados locais mediante confirmação e teste as permissões.

## Não faça
- Não publique chave `service_role` ou `sb_secret_` no GitHub ou no navegador.
- Não crie política de escrita pública para `anon`.
- Não trate uma chave publishable como senha privada.
- Não armazene informações pessoais de clientes sem autorização da empresa.

## Modelo de dados
`copilot_atendimentos`: id, datas, módulo, assunto, descrição, solução, status, duração, confirmação.
`copilot_artigos`: id, origem, datas, título, módulo, problema, solução, revisor.

A versão existente do Copilot usa localStorage. Esta etapa não altera seu comportamento.
