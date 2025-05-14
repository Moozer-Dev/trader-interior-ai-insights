
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowUp, ArrowDown, ChartBar, Filter, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AlertHistoryList } from '@/components/alerts/AlertHistoryList';
import { CreateAlertForm } from '@/components/alerts/CreateAlertForm';
import { useAuth } from '@/contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// Interface para dados de alerta
interface AlertItem {
  id: string;
  asset: string;
  name: string;
  type: string;
  threshold: string;
  current: string;
  created: string;
  status: string;
  distance: string;
  triggered?: string;
  value?: string;
}

const AlertsPage: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [autoUpdate, setAutoUpdate] = useState(true);
  
  // Verificar se o usuário tem limitação de plano
  const isFreeUser = !user?.plan || user.plan === 'free';
  
  // Buscar dados de alertas da API
  const { 
    data: alertsData,
    isLoading,
    isError,
    refetch
  } = useQuery({
    queryKey: ['alerts'],
    queryFn: async () => {
      const response = await axios.get('/api/alerts');
      return response.data;
    },
    refetchInterval: autoUpdate ? 30000 : false // Atualizar a cada 30 segundos se autoUpdate estiver ativo
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  // Filtrar alertas com base no termo de busca
  const filteredActiveAlerts = alertsData?.activeAlerts 
    ? alertsData.activeAlerts.filter((alert: AlertItem) => 
        alert.asset.toLowerCase().includes(searchTerm.toLowerCase()) || 
        alert.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const filteredTriggeredAlerts = alertsData?.triggeredAlerts 
    ? alertsData.triggeredAlerts.filter((alert: AlertItem) => 
        alert.asset.toLowerCase().includes(searchTerm.toLowerCase()) || 
        alert.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  // Verificar limitação de plano para alertas
  const hasAlertLimit = isFreeUser && filteredActiveAlerts.length >= 3;
  
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
              <Button disabled={hasAlertLimit && isFreeUser}>Criar Novo Alerta</Button>
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
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar alertas..."
              value={searchTerm}
              onChange={handleSearch}
              className="pl-10 max-w-[250px]"
            />
          </div>
          <Button variant="outline" size="sm" className="h-10">
            <Filter className="h-4 w-4 mr-2" />
            Filtrar
          </Button>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Atualização automática</span>
          <Switch checked={autoUpdate} onCheckedChange={setAutoUpdate} />
        </div>
      </div>

      {hasAlertLimit && (
        <Card className="bg-amber-50 border-amber-200">
          <CardContent className="py-4">
            <div className="flex items-start">
              <div className="flex-1">
                <h3 className="font-medium text-amber-800">Limite de alertas atingido</h3>
                <p className="text-sm text-amber-700 mt-1">
                  O plano gratuito permite apenas 3 alertas ativos. Faça upgrade para o plano Pro para criar alertas ilimitados.
                </p>
              </div>
              <Button className="ml-4" size="sm">Fazer Upgrade</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="active" className="space-y-6">
        <TabsList className="w-full">
          <TabsTrigger value="active" className="flex-1">
            Alertas Ativos
            <Badge className="ml-2" variant="secondary">
              {isLoading ? "..." : alertsData?.activeAlerts?.length || 0}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="triggered" className="flex-1">
            Alertas Acionados
            <Badge className="ml-2" variant="secondary">
              {isLoading ? "..." : alertsData?.triggeredAlerts?.length || 0}
            </Badge>
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
              {isLoading ? (
                <div className="space-y-4">
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                </div>
              ) : isError ? (
                <div className="py-8 text-center">
                  <p className="text-muted-foreground">Erro ao carregar alertas ativos</p>
                  <Button variant="outline" size="sm" className="mt-2" onClick={() => refetch()}>
                    Tentar novamente
                  </Button>
                </div>
              ) : filteredActiveAlerts.length === 0 ? (
                <div className="py-8 text-center">
                  <p className="text-muted-foreground">Nenhum alerta ativo encontrado</p>
                  
                  {searchTerm ? (
                    <Button variant="outline" size="sm" className="mt-2" onClick={() => setSearchTerm('')}>
                      Limpar busca
                    </Button>
                  ) : (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="mt-4" disabled={hasAlertLimit && isFreeUser}>
                          Criar Alerta
                        </Button>
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
                  )}
                </div>
              ) : (
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
                    {filteredActiveAlerts.map((alert: AlertItem) => (
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
              {isLoading ? (
                <div className="space-y-4">
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                </div>
              ) : isError ? (
                <div className="py-8 text-center">
                  <p className="text-muted-foreground">Erro ao carregar alertas acionados</p>
                  <Button variant="outline" size="sm" className="mt-2" onClick={() => refetch()}>
                    Tentar novamente
                  </Button>
                </div>
              ) : filteredTriggeredAlerts.length === 0 ? (
                <div className="py-8 text-center">
                  <p className="text-muted-foreground">Nenhum alerta acionado encontrado</p>
                  
                  {searchTerm && (
                    <Button variant="outline" size="sm" className="mt-2" onClick={() => setSearchTerm('')}>
                      Limpar busca
                    </Button>
                  )}
                </div>
              ) : (
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
                    {filteredTriggeredAlerts.map((alert: AlertItem) => (
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
