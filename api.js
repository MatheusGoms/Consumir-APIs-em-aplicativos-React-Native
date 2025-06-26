import axios from 'axios';

// Configuração base do Axios
const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com', // URL base da API
});

// Função para buscar dados da API
export const fetchPosts = async () => {
  try {
    const response = await api.get('/posts'); // Endpoint de exemplo
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
    throw error;
  }
};

export default api;
