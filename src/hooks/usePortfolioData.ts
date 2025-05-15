
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useAuth } from '@/contexts/AuthContext';

export function usePortfolioData() {
  const { user } = useAuth();
  
  // Verificar se o usuário tem acesso a dados em tempo real
  const hasRealTimeData = user?.plan === 'pro' || user?.plan === 'api';

  return useQuery({
    queryKey: ['portfolioData', hasRealTimeData],
    queryFn: async () => {
      try {
        const response = await axios.get('/api/portfolio/summary', {
          params: { 
            realtime: hasRealTimeData 
          }
        });
        return response.data;
      } catch (error) {
        console.error('Erro ao buscar dados do portfólio:', error);
        // Retornar objeto com valores padrão em caso de erro
        return {
          totalValue: 0,
          monthlyChange: 0,
          totalReturn: 0,
          totalReturnPercentage: 0,
          assets: [],
          historicalData: []
        };
      }
    },
    // Fornecer valores padrão para evitar erros
    initialData: {
      totalValue: 0,
      monthlyChange: 0,
      totalReturn: 0,
      totalReturnPercentage: 0,
      assets: [],
      historicalData: []
    },
    refetchInterval: hasRealTimeData ? 15000 : 60000, // Atualizar com maior frequência para usuários premium
    staleTime: hasRealTimeData ? 10000 : 60000
  });
}
