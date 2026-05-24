# 🪙 Cripto KN

App desenvolvido em React Native com Expo que consome a API pública da **CoinGecko** e exibe as top 20 criptomoedas com preços em tempo real.

## Funcionalidades

- Lista as 20 principais criptomoedas por market cap
- Preços em BRL ou USD (botão pra trocar)
- Variação das últimas 24h em verde/vermelho
- Pull to refresh pra atualizar os preços

## Como rodar

```bash
# Instalar dependências
npm install

# Rodar o projeto
npx expo start
```

Escaneie o QR Code com o **Expo Go** no celular.

## Tecnologias

- React Native
- Expo
- CoinGecko API (pública, sem autenticação)

## API utilizada

**CoinGecko** — https://api.coingecko.com

Endpoint: `/api/v3/coins/markets`