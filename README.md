# 📱 CryptoTracker

App React Native com Expo que consome a API pública da **CoinGecko** e exibe as top 50 criptomoedas com preços em BRL em tempo real.

## 🚀 Como rodar

### Pré-requisitos
- Node.js instalado
- Expo CLI: `npm install -g expo-cli`
- App **Expo Go** no celular

### Passos

```bash
# 1. Clone o repositório
git clone https://github.com/SEU_USUARIO/crypto-tracker.git
cd crypto-tracker

# 2. Instale as dependências
npm install

# 3. Rode o projeto
npx expo start
```

Escaneie o QR Code com o Expo Go e o app abre no celular!

## 🛠️ Tecnologias

- React Native
- Expo
- CoinGecko API (pública, sem autenticação)

## 📡 API utilizada

**CoinGecko** — https://api.coingecko.com

Endpoint: `/api/v3/coins/markets`

Retorna: preço atual, variação 24h, market cap, ícone e ranking das criptomoedas.

## ✨ Funcionalidades

- Lista as top 50 criptos por market cap
- Preços em Real (BRL)
- Variação 24h com indicador visual (verde/vermelho)
- Busca por nome ou símbolo
- Pull-to-refresh para atualizar preços
- Tratamento de erros de conexão
