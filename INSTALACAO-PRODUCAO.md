# 🚀 Guia de Instalação e Deploy - Quiz Ateneo

## 📦 Pacote de Produção

**Arquivo:** `Quiz-Ateneo-PRODUCAO.tar.gz`  
**Localização:** `/Users/everton/Downloads/`  
**Status:** ✅ Build de produção completo

---

## 📋 Conteúdo do Pacote

O pacote contém:

- ✅ Frontend compilado (`build/`)
- ✅ Backend API compilado (`src/.next/`)
- ✅ Código fonte completo
- ✅ Configurações de ambiente
- ✅ Scripts de inicialização
- ✅ Documentação

**Não inclui:**

- ❌ `node_modules` (deve ser instalado no servidor)
- ❌ Cache de build (será gerado automaticamente)

---

## 🖥️ Requisitos do Servidor

### Mínimos

- **Node.js:** v18.0.0 ou superior
- **npm:** v9.0.0 ou superior
- **Memória RAM:** 512 MB mínimo (1 GB recomendado)
- **Espaço em Disco:** 500 MB

### Recomendados

- **Node.js:** v20.x LTS
- **npm:** v10.x
- **Memória RAM:** 2 GB
- **Espaço em Disco:** 1 GB

---

## 📦 Instalação no Servidor

### Passo 1: Extrair o Pacote

```bash
# Fazer upload do arquivo para o servidor
# Depois extrair:
tar -xzf Quiz-Ateneo-PRODUCAO.tar.gz
cd Quiz-Ateneo
```

### Passo 2: Instalar Dependências

```bash
# Instalar dependências do frontend
npm install

# Instalar dependências do backend
cd src
npm install
cd ..
```

### Passo 3: Configurar Variáveis de Ambiente

Edite o arquivo `.env.local` dentro da pasta `src/`:

```bash
nano src/.env.local
```

Adicione suas credenciais:

```env
# Google Sheets API
GOOGLE_SHEETS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...
-----END PRIVATE KEY-----"

GOOGLE_SHEETS_CLIENT_EMAIL="seu-projeto@seu-projeto.iam.gserviceaccount.com"
GOOGLE_SPREADSHEET_ID="1AbCdEfGhIjKlMnOpQrStUvWxYz"

# Email (Nodemailer) - Opcional
EMAIL_USER="seu-email@gmail.com"
EMAIL_PASS="sua-senha-de-app"
EMAIL_TO="destinatario@email.com"
```

### Passo 4: Testar a Conexão

```bash
# Iniciar em modo desenvolvimento para testar
npm run dev
```

Acesse:

- Frontend: `http://localhost:5173`
- API: `http://localhost:3001`
- Teste Sheets: `http://localhost:3001/api/test-sheets`

---

## 🚀 Iniciar em Produção

### Opção 1: Usar os Scripts Fornecidos

```bash
# Dar permissão de execução aos scripts
chmod +x start-prod.sh

# Iniciar a aplicação
./start-prod.sh
```

### Opção 2: Usar PM2 (Recomendado)

```bash
# Instalar PM2 globalmente
npm install -g pm2

# Iniciar o frontend
pm2 start npm --name "quiz-frontend" -- run build:frontend
pm2 serve build 8080 --name "quiz-frontend-serve" --spa

# Iniciar o backend
cd src
pm2 start npm --name "quiz-backend" -- start
cd ..

# Salvar configuração
pm2 save
pm2 startup
```

### Opção 3: Usar Docker (Avançado)

Crie um `Dockerfile` na raiz:

```dockerfile
FROM node:20-alpine

WORKDIR /app

# Copiar arquivos
COPY package*.json ./
COPY src/package*.json ./src/

# Instalar dependências
RUN npm install
RUN cd src && npm install

# Copiar código
COPY . .

# Expor portas
EXPOSE 8080 3001

# Iniciar
CMD ["./start-prod.sh"]
```

Depois execute:

```bash
docker build -t quiz-ateneo .
docker run -p 8080:8080 -p 3001:3001 quiz-ateneo
```

---

## 🌐 Deploy em Plataformas

### Vercel (Recomendado para Next.js)

```bash
# Instalar Vercel CLI
npm install -g vercel

# Fazer deploy
cd src
vercel --prod
```

Configure no Vercel Dashboard:

- Framework Preset: `Next.js`
- Root Directory: `src`
- Build Command: `npm run build`
- Output Directory: `.next`

### Netlify

```bash
# Instalar Netlify CLI
npm install -g netlify-cli

# Deploy do frontend
netlify deploy --prod --dir=build
```

Para a API, use Netlify Functions ou hospede separadamente.

### Servidor VPS (Ubuntu/Debian)

```bash
# 1. Instalar Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# 2. Instalar Nginx
sudo apt-get install nginx

# 3. Configurar Nginx como proxy reverso
sudo nano /etc/nginx/sites-available/quiz-ateneo

# Adicionar:
server {
    listen 80;
    server_name seu-dominio.com;

    # Frontend
    location / {
        root /var/www/quiz-ateneo/build;
        try_files $uri $uri/ /index.html;
    }

    # API
    location /api {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

# 4. Ativar site
sudo ln -s /etc/nginx/sites-available/quiz-ateneo /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx

# 5. Usar PM2 para manter a API rodando
pm2 startup
pm2 save
```

---

## 🔒 Segurança

### 1. Proteger Variáveis de Ambiente

```bash
# Definir permissões corretas
chmod 600 src/.env.local
```

### 2. Usar HTTPS

```bash
# Instalar Certbot para SSL gratuito
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d seu-dominio.com
```

### 3. Configurar CORS (se necessário)

Edite `src/next.config.js`:

```javascript
module.exports = {
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "https://seu-dominio.com",
          },
          { key: "Access-Control-Allow-Methods", value: "GET,POST,OPTIONS" },
        ],
      },
    ];
  },
};
```

---

## 📊 Monitoramento

### Logs com PM2

```bash
# Ver logs em tempo real
pm2 logs

# Ver logs específicos
pm2 logs quiz-backend

# Monitorar recursos
pm2 monit
```

### Health Checks

Crie endpoints de health check:

```bash
# Testar API
curl http://localhost:3001/api/test-sheets

# Testar Frontend
curl http://localhost:8080
```

---

## 🔄 Atualizações

### Atualizar a Aplicação

```bash
# 1. Fazer backup
tar -czf backup-$(date +%Y%m%d).tar.gz Quiz-Ateneo/

# 2. Extrair nova versão
tar -xzf Quiz-Ateneo-PRODUCAO-nova.tar.gz

# 3. Reinstalar dependências
npm install
cd src && npm install && cd ..

# 4. Reiniciar serviços
pm2 restart all
```

---

## 🐛 Troubleshooting

### Erro: "Cannot find module"

```bash
# Limpar cache e reinstalar
rm -rf node_modules package-lock.json
rm -rf src/node_modules src/package-lock.json
npm install
cd src && npm install && cd ..
```

### Erro: "Port already in use"

```bash
# Encontrar processo usando a porta
lsof -i :3001

# Matar processo
kill -9 [PID]
```

### Erro de conexão com Google Sheets

1. Verifique se as credenciais estão corretas em `.env.local`
2. Verifique se a planilha está compartilhada com o email da service account
3. Teste com: `http://localhost:3001/api/test-sheets`

---

## 📞 Suporte

### Arquivos de Log

```bash
# PM2
pm2 logs --err

# Next.js
cat src/.next/trace

# Sistema
journalctl -u quiz-ateneo
```

### Verificar Status

```bash
# PM2
pm2 status

# Serviços
systemctl status nginx

# Portas
netstat -tulpn | grep -E '(3001|8080)'
```

---

## ✅ Checklist de Deploy

- [ ] Node.js instalado (v18+)
- [ ] Dependências instaladas (`npm install`)
- [ ] Variáveis de ambiente configuradas (`.env.local`)
- [ ] Build executado com sucesso (`npm run build`)
- [ ] Google Sheets configurado e testado
- [ ] PM2 configurado e rodando
- [ ] Nginx configurado (se aplicável)
- [ ] SSL/HTTPS configurado
- [ ] Firewall configurado (portas 80, 443, 3001)
- [ ] Backups configurados
- [ ] Monitoramento ativo

---

## 📈 Otimizações de Performance

### 1. Habilitar Compressão

```javascript
// src/next.config.js
module.exports = {
  compress: true,
  poweredByHeader: false,
};
```

### 2. Cache de Assets

```nginx
# Nginx
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

### 3. CDN (Opcional)

Use Cloudflare ou AWS CloudFront para servir assets estáticos.

---

**Última atualização:** 09/10/2025  
**Versão do pacote:** 1.0.0  
**Status:** ✅ Pronto para produção
