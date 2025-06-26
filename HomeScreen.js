import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { fetchPosts } from '../services/api';
import ItemCard from '../components/ItemCard';

const HomeScreen = () => {
  const [data, setData] = useState([]); // Estado para armazenar os dados da API
  const [loading, setLoading] = useState(true); // Estado para exibir o indicador de carregamento

  useEffect(() => {
    // Função para buscar os dados
    const loadData = async () => {
      try {
        const posts = await fetchPosts();
        setData(posts); // Armazena os dados no estado
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      } finally {
        setLoading(false); // Finaliza o carregamento
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ItemCard title={item.title} body={item.body} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
