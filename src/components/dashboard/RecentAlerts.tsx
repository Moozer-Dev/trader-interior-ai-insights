
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const alertsData = [
  { 
    id: '1', 
    asset: 'PETR4', 
    type: 'price-above',
    threshold: 'R$ 32,50', 
    current: 'R$ 32,55',
    time: '10 minutos atrás',
    status: 'triggered'
  },
  { 
    id: '2', 
    asset: 'VALE3', 
    type: 'price-below',
    threshold: 'R$ 68,00', 
    current: 'R$ 67,89',
    time: '30 minutos atrás',
    status: 'triggered'
  },
  { 
    id: '3', 
    asset: 'ITUB4', 
    type: 'price-below',
    threshold: 'R$ 28,00', 
    current: 'R$ 28,75',
    time: '1 hora atrás',
    status: 'active'
  },
  { 
    id: '4', 
    asset: 'WEGE3', 
    type: 'price-above',
    threshold: 'R$ 37,00', 
    current: 'R$ 36,42',
    time: '2 horas atrás',
    status: 'active'
  },
];

export const RecentAlerts: React.FC = () => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Alertas Recentes</CardTitle>
            <CardDescription>Alertas de preço e notificações</CardDescription>
          </div>
          <Button size="sm" variant="outline">Ver Todos</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {alertsData.map((alert) => (
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
                    ) : (
                      <>
                        <ArrowDown className="h-3 w-3 mr-1 text-trader-red" />
                        <span>Abaixo de {alert.threshold}</span>
                      </>
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
      </CardContent>
    </Card>
  );
};
