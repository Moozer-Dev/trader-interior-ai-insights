
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
          <Button variant="outline" size="sm">Exportar</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {alertHistory.map((day) => (
            <div key={day.id} className="space-y-3">
              <div className="sticky top-0 bg-background z-10 py-1">
                <h3 className="text-sm font-medium">{day.date}</h3>
              </div>
              <div className="space-y-3">
                {day.events.map((event) => (
                  <div key={event.id} className="flex items-start gap-3 border-b pb-3 last:border-0">
                    <div className="text-xs text-muted-foreground w-12">{event.time}</div>
                    <div className={cn(
                      "h-full flex flex-col items-center",
                      event.status === 'triggered' ? "text-trader-green" : "text-muted-foreground"
                    )}>
                      <div className="w-2 h-2 rounded-full bg-current"></div>
                      <div className="flex-1 w-[1px] bg-current my-1"></div>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-medium">{event.asset}</div>
                          <div className="text-sm">
                            {event.type === 'price-above' && (
                              <div className="flex items-center text-muted-foreground">
                                <ArrowUp className="h-3 w-3 mr-1 text-trader-green" />
                                <span>Acima de {event.threshold}</span>
                              </div>
                            )}
                            {event.type === 'price-below' && (
                              <div className="flex items-center text-muted-foreground">
                                <ArrowDown className="h-3 w-3 mr-1 text-trader-red" />
                                <span>Abaixo de {event.threshold}</span>
                              </div>
                            )}
                            {event.type === 'volume-above' && (
                              <div className="flex items-center text-muted-foreground">
                                <ChartBar className="h-3 w-3 mr-1 text-trader-blue" />
                                <span>Volume > {event.threshold}</span>
                              </div>
                            )}
                          </div>
                        </div>
                        <Badge variant={event.status === 'triggered' ? 'default' : 'outline'}>
                          {event.status === 'triggered' ? 'Acionado' : 'Criado'}
                        </Badge>
                      </div>
                      {event.status === 'triggered' && (
                        <div className="mt-2 text-sm flex items-center">
                          <span className="text-muted-foreground mr-1">Valor acionado:</span>
                          <span className="font-medium">{event.value}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
