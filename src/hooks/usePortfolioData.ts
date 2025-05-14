
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';

export interface PortfolioAsset {
  symbol: string;
  price: number;
  change: number;
  quantity: number;
  total: number;
}

export interface HistoricalDataPoint {
  date: string;
  value: number;
}

export interface PortfolioData {
  totalValue: number;
  monthlyChange: number;
  totalReturn: number;
  totalReturnPercentage: number;
  assets: PortfolioAsset[];
  historicalData: HistoricalDataPoint[];
}

const fetchPortfolioData = async (): Promise<PortfolioData> => {
  const response = await apiClient.get('/api/portfolio');
  return response.data;
};

export const usePortfolioData = () => {
  return useQuery({
    queryKey: ['portfolioData'],
    queryFn: fetchPortfolioData,
    refetchInterval: 300000, // Atualiza a cada 5 minutos
    staleTime: 60000, // Considera dados obsoletos após 1 minuto
  });
};
