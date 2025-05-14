
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowUp, ArrowDown, ChartBar } from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock alert history data
const alertHistory = [
  {
    id: '1',
    date: '15/06/2023',
    events: [
      {
        id: 'e1',
        time: '16:42',
        asset: 'PETR4',
        type: 'price-above',
        threshold: 'R$ 33,50',
        value: 'R$ 33,65',
        status: 'triggered'
      },
      {
        id: 'e2',
        time: '10:15',
        asset: 'MGLU3',
        type: 'price-below',
        threshold: 'R$ 5,20',
        value: 'R$ 5,12',
        status: 'triggered'
      }
    ]
  },
  {
    id: '2',
    date: '14/06/2023',
    events: [
      {
        id: 'e3',
        time: '14:30',
        asset: 'VALE3',
        type: 'price-below',
        threshold: 'R$ 64,00',
        value: '-',
        status: 'created'
      },
      {
        id: 'e4',
        time: '11:05',
        asset: 'ABEV3',
        type: 'price-above',
        threshold: 'R$ 13,80',
        value: 'R$ 13,89',
        status: 'triggered'
      }
    ]
  },
  {
    id: '3',
    date: '10/06/2023',
    events: [
      {
        id: 'e5',
        time: '17:22',
        asset: 'WEGE3',
        type: 'volume-above',
        threshold: '2.000.000',
        value: '-',
        status: 'created'
      },
      {
        id: 'e6',
        time: '15:48',
        asset: 'ITUB4',
        type: 'price-below',
        threshold: 'R$ 27,50',
        value: '-',
        status: 'created'
      },
      {
        id: 'e7',
        time: '10:32',
        asset: 'PETR4',
        type: 'price-above',
        threshold: 'R$ 32,00',
        value: 'R$ 32,15',
        status: 'triggered'
      }
    ]
  }
];

export const AlertHistoryList: React.FC = () => {
  const [timeFilter, setTimeFilter] = useState('all');
  
  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-center">
        <div>
          <CardTitle>Histórico de Alertas</CardTitle>
          <CardDescription>Registro de criação e acionamento de alertas</CardDescription>
        </div>
        <div className="flex gap-2 items-center">
          <Select
            defaultValue="all"
            onValueChange={setTimeFilter}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrar por período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os períodos</SelectItem>
              <SelectItem value="today">Hoje</SelectItem>
              <SelectItem value="week">Esta semana</SelectItem>
              <SelectItem value="month">Este mês</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {alertHistory.map((day) => (
            <div key={day.id} className="space-y-3">
              <div className="sticky top-0 bg-background z-10 py-1">
                <h3 className="font-medium text-sm text-muted-foreground">{day.date}</h3>
              </div>
              <div className="space-y-2">
                {day.events.map((event) => (
                  <div 
                    key={event.id} 
                    className={cn(
                      "p-3 border rounded-lg",
                      event.status === 'triggered' ? "bg-muted/30" : ""
                    )}
                  >
                    <div className="flex justify-between mb-1">
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-muted-foreground">{event.time}</span>
                        <span className="text-xs"> • </span>
                        <Badge 
                          variant={event.status === 'triggered' ? 'default' : 'outline'}
                          className="text-xs"
                        >
                          {event.status === 'triggered' ? 'Acionado' : 'Criado'}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium flex items-center">
                          <span className="mr-2">{event.asset}</span>
                          {event.type === 'price-above' && (
                            <div className="flex items-center text-xs text-trader-green">
                              <ArrowUp className="h-3 w-3 mr-1" />
                              <span>Acima de {event.threshold}</span>
                            </div>
                          )}
                          {event.type === 'price-below' && (
                            <div className="flex items-center text-xs text-trader-red">
                              <ArrowDown className="h-3 w-3 mr-1" />
                              <span>Abaixo de {event.threshold}</span>
                            </div>
                          )}
                          {event.type === 'volume-above' && (
                            <div className="flex items-center text-xs text-trader-blue">
                              <ChartBar className="h-3 w-3 mr-1" />
                              <span>Volume > {event.threshold}</span>
                            </div>
                          )}
                        </div>
                        {event.value !== '-' && (
                          <div className="text-xs text-muted-foreground mt-1">
                            Valor acionado: {event.value}
                          </div>
                        )}
                      </div>
                      
                      <div>
                        {event.status === 'triggered' ? (
                          <Button size="sm" variant="ghost">Recriar</Button>
                        ) : (
                          <Button size="sm" variant="ghost">Editar</Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 text-center">
          <Button variant="outline">Carregar Mais</Button>
        </div>
      </CardContent>
    </Card>
  );
};
