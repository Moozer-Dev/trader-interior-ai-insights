
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useAuth } from '@/contexts/AuthContext';

export function useMarketData() {
  const { user } = useAuth();
  
  // Verificar se o usuário tem acesso a dados em tempo real
  const hasRealTimeData = user?.plan === 'pro' || user?.plan === 'api';

  return useQuery({
    queryKey: ['marketData', hasRealTimeData],
    queryFn: async () => {
      const response = await axios.get('/api/market/overview', {
        params: { 
          realtime: hasRealTimeData 
        }
      });
      return response.data;
    },
    refetchInterval: hasRealTimeData ? 10000 : 60000, // Atualizar com maior frequência para usuários premium
    staleTime: hasRealTimeData ? 5000 : 60000
  });
}
