#!/bin/bash

# Script para iniciar ambos os servidores em modo produção
# Uso: npm start

echo "🚀 Iniciando servidores em modo PRODUÇÃO..."
echo ""

# Verificar se os builds foram feitos
if [ ! -d "build" ]; then
    echo "❌ Build do frontend não encontrado. Execute: npm run build"
    exit 1
fi

if [ ! -d "src/.next" ]; then
    echo "❌ Build da API não encontrado. Execute: npm run build"
    exit 1
fi

# Função para limpar processos ao sair
cleanup() {
    echo ""
    echo "🛑 Parando servidores..."
    kill $API_PID $FRONTEND_PID 2>/dev/null
    exit 0
}

# Capturar Ctrl+C
trap cleanup INT TERM

# Iniciar API (Next.js) na porta 3001
echo "📦 Iniciando API (Next.js) na porta 3001..."
cd src && npm start -- -p 3001 > /tmp/nextjs-prod.log 2>&1 &
API_PID=$!
cd ..

# Aguardar API iniciar
sleep 3

echo "✅ API iniciada (PID: $API_PID)"
echo ""

# Para produção, você precisará de um servidor para servir os arquivos estáticos do Vite
# Aqui usamos um servidor HTTP simples com npx serve
echo "🎨 Servindo Frontend (build estático) na porta 3000..."
npx -y serve -s build -l 3000 > /tmp/frontend-prod.log 2>&1 &
FRONTEND_PID=$!

# Aguardar Frontend iniciar
sleep 2

echo "✅ Frontend servido (PID: $FRONTEND_PID)"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✨ Servidores em produção rodando!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "🌐 Frontend: http://localhost:3000"
echo "🔌 API:      http://localhost:3001"
echo ""
echo "📋 Logs salvos em:"
echo "   - API:      /tmp/nextjs-prod.log"
echo "   - Frontend: /tmp/frontend-prod.log"
echo ""
echo "💡 Pressione Ctrl+C para parar ambos os servidores"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Aguardar até que um dos processos termine
wait $API_PID $FRONTEND_PID

# Limpar ao terminar
cleanup

