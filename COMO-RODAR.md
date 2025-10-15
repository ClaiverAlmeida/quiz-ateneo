# 🚀 Como Rodar o Projeto Quiz Ateneo

Este documento explica como iniciar o projeto em **desenvolvimento** e **produção**.

## 📋 Pré-requisitos

- Node.js instalado (versão 18 ou superior)
- npm instalado

---

## 🛠️ Desenvolvimento

### Comando Único (Recomendado)

Para iniciar **tanto o frontend quanto a API** de uma vez:

```bash
npm run dev
```

Isso irá iniciar:

- ✅ **Frontend (Vite)** em http://localhost:3000
- ✅ **API (Next.js)** em http://localhost:3001

### Comandos Separados (Opcional)

Se preferir rodar cada servidor separadamente:

**Terminal 1 - API:**

```bash
npm run dev:api
```

**Terminal 2 - Frontend:**

```bash
npm run dev:frontend
```

---

## 🏭 Produção

### 1. Build

Primeiro, faça o build de ambos os projetos:

```bash
npm run build
```

Isso irá:

- Fazer build do frontend (Vite) → pasta `build/`
- Fazer build da API (Next.js) → pasta `src/.next/`

### 2. Iniciar Servidores

```bash
npm start
```

Isso irá iniciar ambos os servidores em modo produção:

- ✅ **Frontend** em http://localhost:3000
- ✅ **API** em http://localhost:3001

---

## 📝 Variáveis de Ambiente

### Arquivo `.env` (raiz do projeto)

Crie um arquivo `.env` na raiz com:

```env
VITE_API_BASE_URL=http://localhost:3001
```

### Arquivo `.env.local` (pasta `src/`)

Crie um arquivo `src/.env.local` com as credenciais SMTP:

```env
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_USER=seu_email@ateneointeriores.com.br
SMTP_PASS=sua_senha_smtp
ADMIN_EMAIL=destino@ateneointeriores.com.br
SMTP_FROM=Quiz Ateneo <envio@ateneointeriores.com.br>
GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/SEU_ID/exec
```

---

## 🔍 Logs

Os logs dos servidores são salvos em:

- **API (dev)**: `/tmp/nextjs-api.log`
- **Frontend (dev)**: `/tmp/vite-frontend.log`
- **API (prod)**: `/tmp/nextjs-prod.log`
- **Frontend (prod)**: `/tmp/frontend-prod.log`

Para visualizar os logs:

```bash
tail -f /tmp/nextjs-api.log
tail -f /tmp/vite-frontend.log
```

---

## 🛑 Parar os Servidores

Quando estiver rodando via `npm run dev` ou `npm start`, pressione:

```
Ctrl + C
```

Isso irá parar **ambos os servidores** automaticamente.

---

## ⚙️ Comandos Disponíveis

| Comando                  | Descrição                                     |
| ------------------------ | --------------------------------------------- |
| `npm run dev`            | Inicia frontend + API em modo desenvolvimento |
| `npm run dev:frontend`   | Inicia apenas o frontend (Vite)               |
| `npm run dev:api`        | Inicia apenas a API (Next.js)                 |
| `npm run build`          | Faz build de frontend + API                   |
| `npm run build:frontend` | Faz build apenas do frontend                  |
| `npm run build:api`      | Faz build apenas da API                       |
| `npm start`              | Inicia frontend + API em modo produção        |

---

## 🐛 Troubleshooting

### Porta já em uso

Se receber erro de porta em uso:

```bash
# Verificar o que está usando a porta 3000
lsof -ti:3000

# Parar processo na porta 3000
kill -9 $(lsof -ti:3000)

# Verificar o que está usando a porta 3001
lsof -ti:3001

# Parar processo na porta 3001
kill -9 $(lsof -ti:3001)
```

### CORS Error

Se receber erro de CORS, verifique:

1. O arquivo `.env` existe e tem `VITE_API_BASE_URL=http://localhost:3001`
2. A API está rodando na porta 3001
3. Recarregue a página após iniciar os servidores

### Email não está sendo enviado

Verifique:

1. O arquivo `src/.env.local` existe com as credenciais SMTP corretas
2. As credenciais estão válidas
3. Verifique os logs da API: `tail -f /tmp/nextjs-api.log`

---

## 📞 Suporte

Se encontrar problemas, verifique os logs primeiro. Os logs contêm informações detalhadas sobre erros.

---

**Desenvolvido para Ateneo Interiores** ✨
