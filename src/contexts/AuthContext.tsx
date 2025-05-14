
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useToast } from "@/hooks/use-toast";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  plan?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshToken: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Verificar autenticação ao carregar a página
  useEffect(() => {
    const checkAuth = async () => {
      const storedUser = localStorage.getItem('user');
      const token = localStorage.getItem('accessToken');
      
      if (storedUser && token) {
        try {
          // Configurar o token para todas as requisições
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          
          // Verificar se o token é válido
          const response = await axios.get('/api/auth/verify');
          
          if (response.data.valid) {
            setUser(JSON.parse(storedUser));
          } else {
            // Se o token não for válido, tentar renovar
            await refreshToken();
          }
        } catch (error) {
          console.error('Erro ao verificar autenticação:', error);
          logout();
        }
      }
      
      setLoading(false);
    };
    
    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post('/api/auth/login', { email, password });
      
      const { accessToken, refreshToken, user } = response.data;
      
      // Armazenar tokens e dados do usuário
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('user', JSON.stringify(user));
      
      // Configurar token para futuras requisições
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      
      setUser(user);
      
      toast({
        title: "Login realizado com sucesso",
        description: "Bem-vindo à plataforma!",
      });
      
      return response.data;
    } catch (error) {
      console.error('Erro no login:', error);
      toast({
        variant: "destructive",
        title: "Erro no login",
        description: "Credenciais inválidas ou erro no servidor.",
      });
      throw error;
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      const response = await axios.post('/api/auth/register', { name, email, password });
      
      toast({
        title: "Cadastro realizado com sucesso",
        description: "Agora você pode fazer login na plataforma.",
      });
      
      return response.data;
    } catch (error: any) {
      console.error('Erro no registro:', error);
      const errorMessage = error.response?.data?.message || "Erro ao criar conta";
      toast({
        variant: "destructive",
        title: "Erro no cadastro",
        description: errorMessage,
      });
      throw error;
    }
  };

  const refreshToken = async () => {
    try {
      const storedRefreshToken = localStorage.getItem('refreshToken');
      
      if (!storedRefreshToken) {
        throw new Error('Refresh token não encontrado');
      }
      
      const response = await axios.post('/api/auth/refresh', {
        refreshToken: storedRefreshToken
      });
      
      const { accessToken, refreshToken, user } = response.data;
      
      // Atualizar tokens e dados do usuário
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('user', JSON.stringify(user));
      
      // Atualizar token para futuras requisições
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      
      setUser(user);
    } catch (error) {
      console.error('Erro ao renovar token:', error);
      logout();
      throw error;
    }
  };

  const logout = () => {
    // Remover dados do localStorage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    
    // Remover token das requisições
    delete axios.defaults.headers.common['Authorization'];
    
    // Limpar estado do usuário
    setUser(null);
    
    toast({
      title: "Logout realizado",
      description: "Você saiu da plataforma.",
    });
  };

  const isAuthenticated = !!user;
  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isAdmin,
        loading,
        login,
        register,
        logout,
        refreshToken
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
