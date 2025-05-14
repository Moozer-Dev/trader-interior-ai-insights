
import axios from 'axios';
import { toast } from '@/components/ui/use-toast';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token de autenticação
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratamento de erro
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;
    
    if (response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
      toast({
        title: 'Sessão expirada',
        description: 'Sua sessão expirou. Por favor, faça login novamente.',
        variant: 'destructive',
      });
    } else if (response) {
      const errorMessage = response.data?.message || 'Ocorreu um erro na requisição';
      toast({
        title: 'Erro',
        description: errorMessage,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Erro de conexão',
        description: 'Não foi possível conectar ao servidor. Verifique sua conexão com a internet.',
        variant: 'destructive',
      });
    }
    
    return Promise.reject(error);
  }
);
