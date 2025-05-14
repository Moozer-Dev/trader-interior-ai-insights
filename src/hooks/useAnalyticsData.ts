
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';

export interface AnalyticsData {
  aiModelsAvailable: boolean;
  aiModelStatus: {
    pricePredictor: boolean;
    portfolioSuggestion: boolean;
    technicalAnalysis: boolean;
    patternDetection: boolean;
  };
}

const fetchAnalyticsData = async (): Promise<AnalyticsData> => {
  const response = await apiClient.get('/api/analytics/status');
  return response.data;
};

export const useAnalyticsData = () => {
  return useQuery({
    queryKey: ['analyticsData'],
    queryFn: fetchAnalyticsData,
    refetchInterval: 600000, // Atualiza a cada 10 minutos
    staleTime: 300000, // Considera dados obsoletos após 5 minutos
  });
};
