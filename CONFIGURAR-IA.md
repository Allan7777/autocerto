# Ativação da IA — AutoCerto Academy

O site público é `assistente-atendimento.html`. O backend da IA é a Edge Function `copilot-ai` do projeto Supabase `autocerto-support-copilot` (ref `lpyggrfqfigrvfcosnaj`).

## Ativação (administrador)
1. Crie uma chave de API com faturamento e limites de uso em https://platform.openai.com/api-keys .
2. No Supabase, abra **Edge Functions > Secrets** do projeto `autocerto-support-copilot`. Adicione o segredo **OPENAI_API_KEY** com o valor da chave. Opcionalmente, defina `OPENAI_MODEL` (padrão `gpt-4.1-mini`).
3. Em **Authentication > URL Configuration**, configure o endereço do assistente como URL de redirecionamento permitida: `https://allan7777.github.io/autocerto/assistente-atendimento.html` (se a autenticação usar link mágico).\n4. No assistente, informe seu e-mail, clique **Enviar código de acesso** e confirme o código ou link recebido. Não existe aprovação manual.\n5. Teste uma dúvida genérica sem dados de clientes.

## Segurança
- A chave da OpenAI permanece no ambiente servidor Supabase. Nunca inserir no HTML ou GitHub.
- O endpoint valida o token de sessão com Supabase Auth; é necessário confirmar o e-mail. Não há aprovação manual.
- A função usa cota atômica no banco de até 20 chamadas por usuário autenticado por dia UTC. A autenticação pública por e-mail não impede que alguém crie várias contas; para uso com custo controlado, configure limites financeiros na OpenAI e considere restringir cadastros.
- CORS restringe a origem do navegador, mas **não é autenticação**: a autenticação é o token aprovado.
- A função envia à OpenAI a pergunta e até cinco trechos do material; **não envie dados pessoais ou confidenciais de clientes**.
- `store:false` desativa armazenamento de respostas no endpoint, mas não substitui avaliação de privacidade, contratos e políticas de retenção aplicáveis.
- O histórico local e as anotações ficam no navegador. Em dispositivo compartilhado, não registre informações confidenciais.
- Se o segredo não estiver configurado, a função responde 503 e não faz chamadas à OpenAI.
- Para restringir acesso, configure políticas de cadastro no Supabase Auth; não há mais aprovação por dispositivo na função de IA.

## Verificação
A implantação e o banco foram configurados; ainda é necessário validar uma chamada real com dispositivo aprovado e chave configurada. Não trate a integração como testada em produção antes disso.
