#!/bin/bash
echo "📦 Instalando dependencias..."
npm install --legacy-peer-deps

echo "🚀 Arrancando Expo con tunnel..."
npx expo start --tunnel --no-interactive
