📌 Visão Geral
Este projeto consiste em um jogo Mastermind, desenvolvido com frontend em Angular e backend em Python, com foco em separação de responsabilidades, comunicação via API REST e validações centralizadas no backend.
✅ Decisões Técnicas Relevantes

Angular utilizado no frontend pela organização em componentes, facilidade de gerenciamento de estado da UI e integração com APIs REST.
Python no backend para concentrar a lógica do jogo (validações, regras e respostas), garantindo consistência independente da interface.
Comunicação entre frontend e backend via HTTP (JSON).
Arquitetura simples e clara, priorizando legibilidade e fácil manutenção.
Projeto estruturado para execução local e fácil evolução futura.


🛠️ Tecnologias Utilizadas

Frontend: Angular 21.2.2
Backend: Python 3.11.9
Gerenciador de pacotes frontend: npm 11.9.0
Gerenciador de dependências backend: pip 24.0
Controle de versão: Git


✅ Pré-requisitos
Antes de rodar o projeto, certifique-se de ter instalado:
Backend

Python >= 3.11
pip >= 24.0

Frontend

Node.js >= 21.0
npm >= 11.0


▶️ Como Rodar o Backend Localmente


# 1. Clone o repositório
git clone https://github.com/Esparrell/Projeto-Mastermind

# 2. Acesse a pasta do backend
cd Projeto-Mastermind/Backend

# 3. Execute a aplicação
python rota.py


✅ O backend estará disponível em:
http://localhost:8000

▶️ Como Rodar o Frontend Localmente


# 1. Acesse a pasta do frontend
cd Frontend

# 2. Instale as dependências // Caso ainda não tenha.
npm install

# 3. Execute o projeto
ng serve


✅ O frontend ficará disponível em:
http://localhost:4200

▶️ Faça conexão do arquivo "bd_mastermind.sql" com seu gerenciador de banco SQL, para subir a base de dados.


⚙️ Variáveis de Ambiente
Crie um arquivo .env com base no .env.exemplo.
📄 .env.exemplo

# Frontend
API = http://localhost:8000
``

📸 Demonstração da Aplicação

Tela inicial -> telainicial.png
Tela de Dashboard/Ranking/Grafico -> dashboard.png
Tela de jogo -> jogar.png
tela do histórico -> histórico.png

🔐 Autenticação e Usuários
🔎 Endpoint – Login de Usuário
Descrição
Valida usuário e senha e retorna os dados básicos do usuário, direcionando para a página de Dashboard do usuário respectivo.
Método
POST
URL: /login

Corpo da Requisição
JSON{  "usuario": "string",  "senha": "string"}
Resposta de Sucesso (200)
JSON{  "status": "sucesso",  "id_usuario": 1,  "usuario": "esparrell"}
Resposta de Erro
JSON{  "status": "erro",  "mensagem": "Usuário ou senha inválidos"}

🔎 Endpoint – Cadastro de Usuário
Descrição
Cria um novo usuário no sistema.
Método
POST
URL: /cadastro

Corpo da Requisição
JSON{  "usuario": "string",  "senha": "string",  "email": "string"}
Resposta de Sucesso
JSON{  "status": "sucesso",  "mensagem": "Usuário cadastrado com sucesso!",  "id_usuario": 1,  "usuario": "henrique"}
Possíveis Erros

Usuário já existente
Erro interno no servidor


🎮 Jogo
🔎 Endpoint – Iniciar Jogo
Descrição
Inicia uma nova partida, sempre que a pagina é carregada, evitando fraudes de resultado no jogo, gerando uma nova sequência correta de cores.
Método
POST
URL /iniciar_jogo

Corpo da Requisição
Não possui
Resposta
JSON{  "status": "jogo iniciado"}Mostrar mais linhas

💡 Esse endpoint prepara o estado interno (lista_resultado e tentativas).


🔎 Endpoint – Validar Jogada
Descrição
Valida a tentativa do jogador, calcula acertos e pontuação e registra os dados da partida.
Método
POST
URL /jogo

Corpo da Requisição
JSON{  "id_usuario": 1,  "estados_botoes": ["vermelho", "verde", "azul", "amarelo"],  "tentativas": 3,  "tempo_total": 45}
Resposta de Sucesso
JSON{  "acertos": {    "acertos": 2,    "pontos": 0  }}
Regras

Se acertar os 4 estados:

Pontos = 11 - tentativas (Isso garante que na primeira tentativa o usuario obtenha os pontos máximos(10 pontos), e no decorrer da partida receba os pontos equivalentes até um minimo de 1 ponto caso acerte na ultima tentativa.


Se errar:

Pontos = 0


Após vitória ou acabar as tentativas:

Partida é salva no histórico




📊 Dashboard e Ranking
🔎 Endpoint – Exibir Dashboard (Top 10)
Descrição
Pagína inicial do sistema, oferecendo acesso ao Jogo e ao Histórico. Retorna também, os 10 usuários com maior pontuação acumulada, e um gráfico que exibe o top 3, utilizando implementação de Chart.js, para exibição.
Método
GET
URL /dashboard/{id_usuario}


⚠️ O id_usuario não interfere no retorno atualmente, serve apenas como referência.

Resposta
JSON[  {    "nome": "esparrell",    "pontuacao_total": 120  }]


🧾 Histórico
🔎 Endpoint – Histórico de Partidas do Usuário
Descrição
Retorna todas as partidas já jogadas pelo usuário e seus detalhes.
Método
GET
URL /historico/{id_usuario}

Resposta
JSON[  {    "pontuacao": 8,    "tentativas": 3,    "estado_completo": "[[\"vermelho\",\"azul\",\"verde\",\"amarelo\"]]",    "resposta_correta": "[\"vermelho\",\"verde\",\"azul\",\"amarelo\"]",    "tempo": 45,    "data": "2026-03-25 09:10:12"  }]Mostrar mais linhas

🩺 Sistema
🔎 Endpoint – Health Check
Descrição
Verifica se o servidor está ativo.
Método
GET
URL
/health

Resposta
Olá, mundo!
