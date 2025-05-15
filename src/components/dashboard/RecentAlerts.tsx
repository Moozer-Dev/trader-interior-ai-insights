
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowUp, ArrowDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

// Interface para dados de alerta
interface AlertItem {
  id: string;
  asset: string;
  type: 'price-above' | 'price-below' | 'volume-above';
  threshold: string;
  current: string;
  time: string;
  status: 'triggered' | 'active';
}

export const RecentAlerts: React.FC = () => {
  // Buscar dados de alertas da API
  const { data: alertsData, isLoading, isError, refetch } = useQuery({
    queryKey: ['recentAlerts'],
    queryFn: async () => {
      try {
        const response = await axios.get('/api/alerts/recent');
        return response.data;
      } catch (error) {
        console.error('Erro ao buscar alertas recentes:', error);
        // Retornar array vazio em caso de erro para não quebrar o map
        return [];
      }
    },
    // Fornecer um valor padrão para evitar erros com map
    initialData: []
  });

  // Para evitar erros, garantir que alertsData é um array antes de chamar map
  const alerts = Array.isArray(alertsData) ? alertsData : [];
  
  // Adicionando log para debug
  console.log('Dados de alertas recebidos:', alertsData);

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Alertas Recentes</CardTitle>
            <CardDescription>Alertas de preço e notificações</CardDescription>
          </div>
          <Button size="sm" variant="outline" asChild>
            <Link to="/alerts">Ver Todos</Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
          </div>
        ) : isError ? (
          <div className="py-6 text-center">
            <p className="text-muted-foreground">Erro ao carregar alertas</p>
            <Button variant="outline" size="sm" className="mt-2" onClick={() => refetch()}>
              Tentar novamente
            </Button>
          </div>
        ) : alerts.length === 0 ? (
          <div className="py-10 text-center">
            <p className="text-muted-foreground mb-4">Nenhum alerta configurado</p>
            <Button asChild>
              <Link to="/alerts">Criar Alerta</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {alerts.map((alert: AlertItem) => (
              <div key={alert.id} className={cn(
                "p-3 rounded-lg border",
                alert.status === 'triggered' ? "bg-muted/50" : "bg-background"
              )}>
                <div className="flex justify-between">
                  <div className="flex items-center space-x-2">
                    <Badge variant={alert.status === 'triggered' ? "default" : "outline"}>
                      {alert.status === 'triggered' ? "Acionado" : "Ativo"}
                    </Badge>
                    <span className="font-medium">{alert.asset}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{alert.time}</span>
                </div>
                
                <div className="mt-2 flex justify-between items-center">
                  <div>
                    <div className="text-sm flex items-center">
                      {alert.type === 'price-above' ? (
                        <>
                          <ArrowUp className="h-3 w-3 mr-1 text-trader-green" />
                          <span>Acima de {alert.threshold}</span>
                        </>
                      ) : alert.type === 'price-below' ? (
                        <>
                          <ArrowDown className="h-3 w-3 mr-1 text-trader-red" />
                          <span>Abaixo de {alert.threshold}</span>
                        </>
                      ) : (
                        <span>Volume acima de {alert.threshold}</span>
                      )}
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground">
                      Cotação atual: {alert.current}
                    </div>
                  </div>
                  
                  <Button size="sm" variant="ghost">
                    {alert.status === 'triggered' ? "Remover" : "Editar"}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
