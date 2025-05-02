#!/bin/bash
echo "🔧 Instalando dependencias..."
npm install --legacy-peer-deps

echo "🚀 Arrancando Expo con tunnel..."
yes | npx expo start --tunnel
