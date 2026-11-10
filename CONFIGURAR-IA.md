# Ativação da IA — AutoCerto Academy

O site público é `assistente-atendimento.html`. O backend da IA é a Edge Function `copilot-ai` do projeto Supabase `autocerto-support-copilot` (ref `lpyggrfqfigrvfcosnaj`).

## Ativação (administrador)
1. Crie uma chave de API com faturamento e limites de uso em https://platform.openai.com/api-keys .
2. No Supabase, abra **Edge Functions > Secrets** do projeto `autocerto-support-copilot`. Adicione o segredo **OPENAI_API_KEY** com o valor da chave. Opcionalmente, defina `OPENAI_MODEL` (padrão `gpt-4.1-mini`).
3. Acesse o assistente no site, informe um nome de dispositivo e clique **Solicitar acesso**.
4. No Supabase, em **Table Editor > copilot_dispositivos**, localize o registro correspondente ao nome do dispositivo, confirme sua identidade e defina `aprovado = true`. Não altere `token_hash` nem divulgue tokens.
5. No site, clique **Verificar aprovação** e teste uma dúvida genérica sem dados de clientes.

## Segurança
- A chave da OpenAI permanece no ambiente servidor Supabase. Nunca inserir no HTML ou GitHub.
- O endpoint verifica token de dispositivo contra hash SHA-256 armazenado no banco, aprovação e revogação.
- A função usa cota atômica no banco de até 30 chamadas por dispositivo por dia UTC.
- CORS restringe a origem do navegador, mas **não é autenticação**: a autenticação é o token aprovado.
- A função envia à OpenAI a pergunta e até cinco trechos do material; **não envie dados pessoais ou confidenciais de clientes**.
- `store:false` desativa armazenamento de respostas no endpoint, mas não substitui avaliação de privacidade, contratos e políticas de retenção aplicáveis.
- O histórico local e as anotações ficam no navegador. Em dispositivo compartilhado, não registre informações confidenciais.
- Se o segredo não estiver configurado, a função responde 503 e não faz chamadas à OpenAI.
- Para revogar acesso, marque `revogado=true` no registro do dispositivo.

## Verificação
A implantação e o banco foram configurados; ainda é necessário validar uma chamada real com dispositivo aprovado e chave configurada. Não trate a integração como testada em produção antes disso.
