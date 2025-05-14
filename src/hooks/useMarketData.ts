
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';

export interface MarketStock {
  symbol: string;
  name: string;
  price: string;
  change: number;
  volume: string;
}

export interface MarketData {
  topStocks: MarketStock[];
  stocks: MarketStock[];
  crypto: MarketStock[];
  forex: MarketStock[];
  lastUpdated: string;
}

const fetchMarketData = async (): Promise<MarketData> => {
  const response = await apiClient.get('/api/market/data');
  return response.data;
};

export const useMarketData = () => {
  return useQuery({
    queryKey: ['marketData'],
    queryFn: fetchMarketData,
    refetchInterval: 60000, // Atualiza a cada minuto
    staleTime: 30000, // Considera dados obsoletos após 30 segundos
  });
};
