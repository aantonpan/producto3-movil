#!/bin/bash
echo "🔧 Instalando dependencias..."
npm install --legacy-peer-deps

echo "🚀 Arrancando Expo con tunnel..."
npx expo start --tunnel --port 19006 --no-interactive
