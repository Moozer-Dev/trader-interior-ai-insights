
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Iniciar o app React
createRoot(document.getElementById("root")!).render(<App />);

// Configurar Axios globalmente para interceptar erros de rede
import axios from 'axios';
import { toast } from '@/components/ui/use-toast';

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      toast({
        title: 'Erro de conexão',
        description: 'Verifique sua conexão com a internet',
        variant: 'destructive',
      });
    }
    return Promise.reject(error);
  }
);
