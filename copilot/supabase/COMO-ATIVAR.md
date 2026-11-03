# Catálogo Supabase sem login — ativação

O Copilot agora tenta ler o catálogo público e mantém fallback aos artigos locais.
**Ainda não há sincronização de atendimentos nem escrita compartilhada.**

1. Execute `publicacao.sql` no SQL Editor do projeto `lpyggrfqfigrvfcosnaj`.
2. Em Supabase → Project Settings → API Keys, copie **somente** a chave `publishable` (`sb_publishable_...`) ou a chave pública legada `anon`. Nunca use `service_role` ou `sb_secret_`.
3. Preencha `publishableKey` em `copilot/supabase/public-config.json` no GitHub. Essa chave é pública por design, e a segurança depende de RLS/permissões.
4. Publique manualmente artigos aprovados na tabela `copilot_artigos_publicados` pelo SQL Editor. O catálogo fica **visível a qualquer visitante**, portanto nunca publique dados de clientes, placas, telefones ou informações internas confidenciais.
5. Abra o Copilot e pesquise um artigo publicado. Se o Supabase falhar, os artigos locais continuam funcionando.

**Segurança:** `copilot_atendimentos` e `copilot_artigos` continuam privados. Nenhuma escrita anônima é liberada. Para sincronizar alterações entre dispositivos sem login, senha ou credencial digitada, ainda será necessário algum controle externo de acesso por dispositivo/rede; não é possível proteger gravações em um site público apenas com o endereço do site.
