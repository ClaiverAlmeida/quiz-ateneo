# Quiz Ateneo Interiores - Next.js

Landing page interativa com quiz para qualificação de leads de interiores de luxo, desenvolvida em Next.js com backend integrado.

## 🚀 Funcionalidades

- **Quiz Interativo**: 7 perguntas estratégicas para identificar perfil do cliente
- **Classificação Automática**: Sistema inteligente de scoring (Alto/Médio/Baixo Padrão) 
- **Backend Integrado**: API routes Next.js para processamento e envio de emails
- **Design Premium**: Interface elegante e responsiva com Tailwind CSS
- **Captura de Leads**: Formulário de contato com validação e envio automatizado

## ⚙️ Configuração

### 1. Instalação

```bash
npm install
# ou
yarn install
```

### 2. Configuração de Environment

Copie o arquivo `.env.example` para `.env.local`:

```bash
cp .env.example .env.local
```

Configure as variáveis de ambiente:

```env
# Configurações SMTP (exemplo com Gmail)
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_USER=envio@ateneointeriores.com.br
SMTP_PASS=senha-do-email-envio
SMTP_FROM="Quiz Ateneo <envio@ateneointeriores.com.br>"

# Email de destino para receber leads
ADMIN_EMAIL=mkt@ateneointeriores.com.br

# URL da API (use se o frontend estiver em domínio/servidor diferente)
NEXT_PUBLIC_API_BASE_URL=https://seu-dominio.com/api
VITE_API_BASE_URL=https://seu-dominio.com/api
```

> 💡 Se nenhuma variável for definida, o frontend tenta automaticamente:
> - usar o mesmo domínio do site;
> - em desenvolvimento com Vite (`localhost:5173`), falar com `http://localhost:3000/api/submit-quiz`.
> Certifique-se apenas de que o backend Next/Node esteja realmente rodando nesse endereço.

### 3. Configuração Gmail (Recomendado)

Para usar Gmail como SMTP:

1. Acesse [Conta Google > Segurança](https://myaccount.google.com/security)
2. Ative a "Verificação em duas etapas"
3. Gere uma "Senha de app" específica
4. Use essa senha no `SMTP_PASS`

### 4. Execução

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build
npm start
```

## 📁 Estrutura do Projeto

```
├── app/
│   ├── api/
│   │   ├── submit-quiz/
│   │   │   └── route.ts          # API para processar formulário
│   │   └── types/
│   │       └── quiz.ts           # Tipos TypeScript
│   ├── globals.css               # Estilos globais Tailwind
│   ├── layout.tsx                # Layout principal
│   └── page.tsx                  # Página principal do quiz
├── components/
│   ├── contact-form.tsx          # Formulário de contato
│   ├── progress-bar.tsx          # Barra de progresso
│   ├── quiz-header.tsx           # Cabeçalho do quiz
│   ├── quiz-question.tsx         # Componente de pergunta
│   ├── quiz-result.tsx           # Página de resultado
│   ├── thank-you.tsx             # Página de agradecimento
│   └── ui/                       # Componentes shadcn/ui
└── guidelines/
    └── Guidelines.md             # Diretrizes do projeto
```

## 🎯 Como Funciona

### 1. Quiz Interativo
- 7 perguntas estratégicas sobre perfil de investimento
- Sistema de scoring de 1-3 pontos por resposta
- Navegação fluida com botão "Voltar" preservando respostas

### 2. Classificação de Perfil
- **Alto Padrão** (≥2.5): Cliente premium que valoriza exclusividade
- **Médio Padrão** (1.8-2.4): Cliente equilibrado, busca qualidade/preço
- **Baixo Padrão** (<1.8): Cliente potencial para desenvolvimento

### 3. Captura de Leads
- Formulário validado (nome, email, telefone)
- Envio via API route para `mkt@ateneointeriores.com.br`
- Email formatado com dados do cliente e respostas detalhadas

### 4. Email Automatizado
O admin recebe email completo contendo:
- Dados de contato do lead
- Perfil identificado e score médio
- Respostas detalhadas do quiz
- Recomendação de abordagem comercial

## 📊 Integração Google Sheets

### Método 1: Google Apps Script (Simples)

1. **Criar planilha no Google Sheets** com cabeçalho:
   ```
   Data/Hora | Nome | Email | Telefone | Perfil | Score Médio | P1 | P2 | P3 | P4 | P5 | P6 | P7 | Status
   ```

2. **Configurar Google Apps Script:**
   - Na planilha: `Extensões > Apps Script`
   - Cole o código disponível em `/docs/google-sheets-setup.md`
   - Publique como web app
   - Copie a URL gerada

3. **Configurar variável de ambiente:**
   ```env
   GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/AKfycbyJMlCIXGYql1LlRzpZzTAshscigK3ST8UPWq3_ZuyRhQDJWWZqZpV2-7ROojOYkRca/exec
   ```

### Método 2: Google Sheets API (Avançado)

1. **Criar Service Account no Google Cloud Console**
2. **Ativar Google Sheets API**
3. **Baixar JSON das credenciais**
4. **Configurar variáveis:**
   ```env
   GOOGLE_SHEETS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
   GOOGLE_SHEETS_CLIENT_EMAIL="quiz@projeto.iam.gserviceaccount.com"
   GOOGLE_SHEETS_SPREADSHEET_ID="1ABC123xyz..."
   ```

## 🔧 Deploy

### Vercel (Recomendado)
1. Conecte o repositório no [Vercel](https://vercel.com)
2. Configure as variáveis de ambiente no dashboard
3. Deploy automático

### Outros Provedores
- Configure as variáveis de environment
- Certifique-se de que Node.js 18+ está disponível
- Execute `npm run build` e `npm start`

## 📊 Monitoramento

Os dados são automaticamente logados no console da aplicação para análise:
- Leads recebidos com timestamp
- Perfis identificados
- Scores médios

## 🎨 Personalização

### Cores
A paleta da marca está definida em `app/globals.css`:
- **Principal**: `#5C2C1D` (marrom sofisticado)
- **Secundária**: `#7A3726` (tom mais claro)

### Perguntas do Quiz
Edite o array `quizQuestions` em `app/page.tsx` para personalizar:
- Textos das perguntas
- Opções de resposta
- Scores (1-3 pontos)

## 📝 Licença

Propriedade da Ateneo Interiores. Todos os direitos reservados.
