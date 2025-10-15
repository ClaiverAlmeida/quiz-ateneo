#!/bin/bash

# Script para iniciar ambos os servidores em modo desenvolvimento
# Uso: npm run dev

# Obter o diretório do script
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR"

echo "🚀 Iniciando servidores de desenvolvimento..."
echo ""

# Função para limpar processos ao sair
cleanup() {
    echo ""
    echo "🛑 Parando servidores..."
    kill $API_PID $FRONTEND_PID $TAIL_PID 2>/dev/null
    exit 0
}

# Capturar Ctrl+C
trap cleanup INT TERM

# Iniciar API (Next.js) na porta 3001
echo "📦 Iniciando API (Next.js) na porta 3001..."
cd "$SCRIPT_DIR/src" && npm run dev > /tmp/nextjs-api.log 2>&1 &
API_PID=$!
cd "$SCRIPT_DIR"

# Aguardar API iniciar
sleep 3

# Verificar se a API iniciou
if ! kill -0 $API_PID 2>/dev/null; then
    echo "❌ Erro ao iniciar API. Verifique os logs em /tmp/nextjs-api.log"
    exit 1
fi

echo "✅ API iniciada (PID: $API_PID)"
echo ""

# Iniciar Frontend (Vite) na porta 3000
echo "🎨 Iniciando Frontend (Vite) na porta 3000..."
cd "$SCRIPT_DIR" && npm run dev:frontend > /tmp/vite-frontend.log 2>&1 &
FRONTEND_PID=$!

# Aguardar Frontend iniciar
sleep 3

# Verificar se o Frontend iniciou
if ! kill -0 $FRONTEND_PID 2>/dev/null; then
    echo "❌ Erro ao iniciar Frontend. Verifique os logs em /tmp/vite-frontend.log"
    kill $API_PID 2>/dev/null
    exit 1
fi

echo "✅ Frontend iniciado (PID: $FRONTEND_PID)"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✨ Servidores rodando com sucesso!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "🌐 Frontend: http://localhost:3000"
echo "🔌 API:      http://localhost:3001"
echo ""
echo "📋 Logs salvos em:"
echo "   - API:      /tmp/nextjs-api.log"
echo "   - Frontend: /tmp/vite-frontend.log"
echo ""
echo "💡 Pressione Ctrl+C para parar ambos os servidores"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Mostrar logs em tempo real
tail -f /tmp/nextjs-api.log /tmp/vite-frontend.log &
TAIL_PID=$!

# Aguardar até que um dos processos termine
wait $API_PID $FRONTEND_PID

# Limpar ao terminar
cleanup

