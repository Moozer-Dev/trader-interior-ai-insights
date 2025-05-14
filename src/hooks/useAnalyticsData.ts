
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useAuth } from '@/contexts/AuthContext';

export function useAnalyticsData() {
  const { user } = useAuth();
  
  // Verificar se o usuário tem acesso a análises de IA
  const hasAiAccess = user?.plan === 'pro' || user?.plan === 'api';

  return useQuery({
    queryKey: ['analyticsData'],
    queryFn: async () => {
      if (!hasAiAccess) {
        throw new Error('Acesso não autorizado');
      }
      
      const response = await axios.get('/api/analytics/overview');
      return response.data;
    },
    retry: hasAiAccess ? 3 : 0,
    enabled: hasAiAccess // Só executa a query se o usuário tiver acesso
  });
}
