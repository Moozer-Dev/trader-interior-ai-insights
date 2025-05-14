
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ArrowUp, ArrowDown, ChartBar, CircleArrowDown, CircleArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AlertHistoryList } from '@/components/alerts/AlertHistoryList';
import { CreateAlertForm } from '@/components/alerts/CreateAlertForm';

// Mock active alerts
const activeAlerts = [
  {
    id: '1',
    asset: 'PETR4',
    name: 'Petrobras',
    type: 'price-above',
    threshold: 'R$ 35,00',
    current: 'R$ 34,50',
    created: '2 dias atrás',
    status: 'active',
    distance: '1,45%'
  },
  {
    id: '2',
    asset: 'VALE3',
    name: 'Vale',
    type: 'price-below',
    threshold: 'R$ 64,00',
    current: 'R$ 67,89',
    created: '5 dias atrás',
    status: 'active',
    distance: '6,08%'
  },
  {
    id: '3',
    asset: 'IBOV',
    name: 'Ibovespa',
    type: 'price-above',
    threshold: '130.000',
    current: '127.450',
    created: '1 semana atrás',
    status: 'active',
    distance: '2,00%'
  },
  {
    id: '4',
    asset: 'WEGE3',
    name: 'WEG',
    type: 'volume-above',
    threshold: '2.000.000',
    current: '1.350.000',
    created: '3 dias atrás',
    status: 'active',
    distance: '48,15%'
  },
  {
    id: '5',
    asset: 'ITUB4',
    name: 'Itaú',
    type: 'price-below',
    threshold: 'R$ 27,50',
    current: 'R$ 28,75',
    created: '1 dia atrás',
    status: 'active',
    distance: '4,55%'
  }
];

// Mock triggered alerts
const triggeredAlerts = [
  {
    id: '6',
    asset: 'MGLU3',
    name: 'Magazine Luiza',
    type: 'price-below',
    threshold: 'R$ 5,20',
    value: 'R$ 5,12',
    triggered: 'há 2 horas',
    status: 'triggered'
  },
  {
    id: '7',
    asset: 'ABEV3',
    name: 'Ambev',
    type: 'price-above',
    threshold: 'R$ 13,80',
    value: 'R$ 13,89',
    triggered: 'há 5 horas',
    status: 'triggered'
  },
  {
    id: '8',
    asset: 'PETR4',
    name: 'Petrobras',
    type: 'price-above',
    threshold: 'R$ 33,50',
    value: 'R$ 33,65',
    triggered: 'ontem',
    status: 'triggered'
  }
];

const AlertsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredActiveAlerts = activeAlerts.filter(alert => 
    alert.asset.toLowerCase().includes(searchTerm.toLowerCase()) || 
    alert.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredTriggeredAlerts = triggeredAlerts.filter(alert => 
    alert.asset.toLowerCase().includes(searchTerm.toLowerCase()) || 
    alert.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Alertas</h1>
          <p className="text-muted-foreground">Configure e gerencie notificações personalizadas</p>
        </div>
        <div className="flex items-center gap-2 self-start">
          <Dialog>
            <DialogTrigger asChild>
              <Button>Criar Novo Alerta</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Criar Alerta</DialogTitle>
                <DialogDescription>
                  Configure um novo alerta para ser notificado quando as condições forem atendidas
                </DialogDescription>
              </DialogHeader>
              <CreateAlertForm />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Buscar alertas..."
            value={searchTerm}
            onChange={handleSearch}
            className="max-w-[250px]"
          />
          <Button variant="outline" size="sm" className="h-10">Filtrar</Button>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Atualização automática</span>
          <Switch defaultChecked />
        </div>
      </div>

      <Tabs defaultValue="active" className="space-y-6">
        <TabsList className="w-full">
          <TabsTrigger value="active" className="flex-1">
            Alertas Ativos
            <Badge className="ml-2" variant="secondary">{activeAlerts.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="triggered" className="flex-1">
            Alertas Acionados
            <Badge className="ml-2" variant="secondary">{triggeredAlerts.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="history" className="flex-1">Histórico</TabsTrigger>
        </TabsList>
        
        <TabsContent value="active">
          <Card>
            <CardHeader>
              <CardTitle>Alertas Ativos</CardTitle>
              <CardDescription>Alertas configurados e aguardando ativação</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ativo</TableHead>
                    <TableHead>Condição</TableHead>
                    <TableHead>Valor Atual</TableHead>
                    <TableHead className="hidden sm:table-cell">Distância</TableHead>
                    <TableHead className="hidden md:table-cell">Criado</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredActiveAlerts.map((alert) => (
                    <TableRow key={alert.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{alert.asset}</div>
                          <div className="text-xs text-muted-foreground">{alert.name}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {alert.type === 'price-above' && (
                            <div className="flex items-center">
                              <ArrowUp className="h-3 w-3 text-trader-green mr-1" />
                              <span>Acima de {alert.threshold}</span>
                            </div>
                          )}
                          {alert.type === 'price-below' && (
                            <div className="flex items-center">
                              <ArrowDown className="h-3 w-3 text-trader-red mr-1" />
                              <span>Abaixo de {alert.threshold}</span>
                            </div>
                          )}
                          {alert.type === 'volume-above' && (
                            <div className="flex items-center">
                              <ChartBar className="h-3 w-3 text-trader-blue mr-1" />
                              <span>Volume {'>'} {alert.threshold}</span>
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{alert.current}</TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <Badge 
                          variant="outline" 
                          className={
                            (alert.type === 'price-above' && parseFloat(alert.distance) < 5) || 
                            (alert.type === 'price-below' && parseFloat(alert.distance) < 5) || 
                            (alert.type === 'volume-above' && parseFloat(alert.distance) < 20)
                              ? "bg-accent/20 text-accent-foreground"
                              : ""
                          }
                        >
                          {alert.distance}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{alert.created}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm">Editar</Button>
                          <Button variant="ghost" size="sm" className="text-destructive">Excluir</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {filteredActiveAlerts.length === 0 && (
                <div className="py-8 text-center">
                  <p className="text-muted-foreground">Nenhum alerta ativo encontrado</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="triggered">
          <Card>
            <CardHeader>
              <CardTitle>Alertas Acionados</CardTitle>
              <CardDescription>Alertas que foram acionados recentemente</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ativo</TableHead>
                    <TableHead>Condição</TableHead>
                    <TableHead>Valor Acionado</TableHead>
                    <TableHead className="hidden md:table-cell">Quando</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTriggeredAlerts.map((alert) => (
                    <TableRow key={alert.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{alert.asset}</div>
                          <div className="text-xs text-muted-foreground">{alert.name}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {alert.type === 'price-above' && (
                            <div className="flex items-center">
                              <ArrowUp className="h-3 w-3 text-trader-green mr-1" />
                              <span>Acima de {alert.threshold}</span>
                            </div>
                          )}
                          {alert.type === 'price-below' && (
                            <div className="flex items-center">
                              <ArrowDown className="h-3 w-3 text-trader-red mr-1" />
                              <span>Abaixo de {alert.threshold}</span>
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{alert.value}</TableCell>
                      <TableCell className="hidden md:table-cell">{alert.triggered}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm">Recriar</Button>
                          <Button variant="ghost" size="sm" className="text-destructive">Arquivar</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {filteredTriggeredAlerts.length === 0 && (
                <div className="py-8 text-center">
                  <p className="text-muted-foreground">Nenhum alerta acionado encontrado</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="history">
          <AlertHistoryList />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AlertsPage;
