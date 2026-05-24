import { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator, SafeAreaView, StatusBar, TouchableOpacity, RefreshControl } from 'react-native';

export default function App() {
  const [moedas, setMoedas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [atualizando, setAtualizando] = useState(false);
  const [moeda, setMoeda] = useState('brl');

  const buscarMoedas = (currency = moeda) => {
    fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=20&page=1`)
      .then(res => res.json())
      .then(data => {
        setMoedas(data);
        setCarregando(false);
        setAtualizando(false);
      });
  };

  useEffect(() => {
    buscarMoedas();
  }, [moeda]);

  const onRefresh = useCallback(() => {
    setAtualizando(true);
    buscarMoedas();
  }, [moeda]);

  const trocarMoeda = (nova) => {
    setCarregando(true);
    setMoeda(nova);
  };

  if (carregando) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#f7931a" />
        <Text style={styles.loadingText}>Carregando moedas...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.titulo}>🪙 Cripto KN</Text>
        <Text style={styles.subtitulo}>Preços de criptos em tempo real</Text>

        <View style={styles.filtros}>
          <TouchableOpacity
            style={[styles.botao, moeda === 'brl' && styles.botaoAtivo]}
            onPress={() => trocarMoeda('brl')}
          >
            <Text style={[styles.botaoTexto, moeda === 'brl' && styles.botaoTextoAtivo]}>BRL</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.botao, moeda === 'usd' && styles.botaoAtivo]}
            onPress={() => trocarMoeda('usd')}
          >
            <Text style={[styles.botaoTexto, moeda === 'usd' && styles.botaoTextoAtivo]}>USD</Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={moedas}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
        refreshControl={
          <RefreshControl refreshing={atualizando} onRefresh={onRefresh} tintColor="#f7931a" />
        }
        renderItem={({ item, index }) => {
          const variacao = item.price_change_percentage_24h;
          const positivo = variacao >= 0;
          const simboloMoeda = moeda === 'brl' ? 'R$' : '$';

          return (
            <View style={styles.card}>
              <Text style={styles.ranking}>#{index + 1}</Text>
              <Image source={{ uri: item.image }} style={styles.icone} />
              <View style={styles.info}>
                <Text style={styles.nome}>{item.name}</Text>
                <Text style={styles.simbolo}>{item.symbol.toUpperCase()}</Text>
              </View>
              <View style={styles.valores}>
                <Text style={styles.preco}>
                  {simboloMoeda} {item.current_price.toLocaleString(moeda === 'brl' ? 'pt-BR' : 'en-US')}
                </Text>
                <View style={[styles.badge, { backgroundColor: positivo ? '#0d2e1f' : '#2e0d0d' }]}>
                  <Text style={{ color: positivo ? '#00c97a' : '#ff4d4d', fontSize: 12, fontWeight: '600' }}>
                    {positivo ? '▲' : '▼'} {Math.abs(variacao).toFixed(2)}%
                  </Text>
                </View>
              </View>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d0d0d',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0d0d0d',
  },
  loadingText: {
    marginTop: 10,
    color: '#555',
    fontSize: 14,
  },
  header: {
    backgroundColor: '#141414',
    paddingTop: 20,
    paddingBottom: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#f0f0f0',
  },
  subtitulo: {
    fontSize: 13,
    color: '#555',
    marginTop: 2,
  },
  filtros: {
    flexDirection: 'row',
    marginTop: 14,
    gap: 8,
  },
  botao: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#333',
  },
  botaoAtivo: {
    backgroundColor: '#f7931a',
    borderColor: '#f7931a',
  },
  botaoTexto: {
    color: '#555',
    fontWeight: '600',
    fontSize: 13,
  },
  botaoTextoAtivo: {
    color: '#000',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    marginHorizontal: 12,
    marginTop: 10,
    padding: 14,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
  },
  ranking: {
    fontSize: 12,
    color: '#444',
    width: 24,
  },
  icone: {
    width: 38,
    height: 38,
    borderRadius: 19,
    marginRight: 10,
  },
  info: {
    flex: 1,
  },
  nome: {
    fontSize: 15,
    fontWeight: '600',
    color: '#f0f0f0',
  },
  simbolo: {
    fontSize: 12,
    color: '#555',
    marginTop: 2,
  },
  valores: {
    alignItems: 'flex-end',
  },
  preco: {
    fontSize: 14,
    fontWeight: '700',
    color: '#f0f0f0',
  },
  badge: {
    marginTop: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
});