
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronDown, Database, Plus, RefreshCw, Code, Link, Key, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock integrations data
const integrationsData = [
  {
    id: 'alphavantage',
    name: 'Alpha Vantage',
    type: 'market-data',
    description: 'API para cotações de ações, forex e criptomoedas',
    status: 'active',
    configured: true,
    lastSync: '10 minutos atrás',
    requests: 1240,
    quota: 5000,
  },
  {
    id: 'twelvedata',
    name: 'Twelve Data',
    type: 'market-data',
    description: 'Dados de mercado em tempo real e históricos',
    status: 'active',
    configured: true,
    lastSync: '35 minutos atrás',
    requests: 850,
    quota: 1000,
  },
  {
    id: 'yahoo-finance',
    name: 'Yahoo Finance',
    type: 'market-data',
    description: 'Cotações de ativos financeiros e notícias',
    status: 'active',
    configured: true,
    lastSync: '1 hora atrás',
    requests: 320,
    quota: 500,
  },
  {
    id: 'finnhub',
    name: 'Finnhub',
    type: 'market-data',
    description: 'API para dados de mercado em tempo real',
    status: 'inactive',
    configured: false,
    lastSync: 'Nunca',
    requests: 0,
    quota: 1000,
  },
  {
    id: 'metatrader',
    name: 'MetaTrader',
    type: 'trading',
    description: 'Plataforma de negociação para Forex e CFDs',
    status: 'active',
    configured: true,
    lastSync: '25 minutos atrás',
    requests: 156,
    quota: 300,
  },
  {
    id: 'sentry',
    name: 'Sentry',
    type: 'monitoring',
    description: 'Monitoramento de erros em tempo real',
    status: 'active',
    configured: true,
    lastSync: '5 minutos atrás',
    requests: 45,
    quota: 10000,
  },
  {
    id: 'logrocket',
    name: 'LogRocket',
    type: 'monitoring',
    description: 'Reprodução de sessões de usuários e analytics',
    status: 'active',
    configured: true,
    lastSync: '15 minutos atrás',
    requests: 220,
    quota: 1000,
  },
];

// Mock webhooks data
const webhooksData = [
  {
    id: 'payment-success',
    name: 'Pagamento Bem-sucedido',
    url: 'https://api.traderinterior.com/webhooks/payment-success',
    source: 'PagBank',
    active: true,
    events: 342,
    lastEvent: '5 minutos atrás',
  },
  {
    id: 'payment-failed',
    name: 'Pagamento Falhou',
    url: 'https://api.traderinterior.com/webhooks/payment-failed',
    source: 'PagBank',
    active: true,
    events: 28,
    lastEvent: '2 horas atrás',
  },
  {
    id: 'subscription-renewed',
    name: 'Assinatura Renovada',
    url: 'https://api.traderinterior.com/webhooks/subscription-renewed',
    source: 'Mercado Pago',
    active: true,
    events: 156,
    lastEvent: '30 minutos atrás',
  },
  {
    id: 'subscription-canceled',
    name: 'Assinatura Cancelada',
    url: 'https://api.traderinterior.com/webhooks/subscription-canceled',
    source: 'Mercado Pago',
    active: true,
    events: 12,
    lastEvent: '1 dia atrás',
  }
];

const IntegrationsPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Integrações</h1>
          <p className="text-muted-foreground">Gerencie conexões com APIs externas e webhooks</p>
        </div>
        <div className="flex items-center gap-2 self-start">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Nova Integração
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Adicionar Nova Integração</DialogTitle>
                <DialogDescription>
                  Configure uma nova fonte de dados externa para o sistema
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Nome</Label>
                  <Input className="col-span-3" placeholder="Nome da integração" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Tipo</Label>
                  <Input className="col-span-3" placeholder="Tipo de integração" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">API Key</Label>
                  <Input className="col-span-3" type="password" placeholder="Chave de API" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">URL Base</Label>
                  <Input className="col-span-3" placeholder="https://" />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline">Cancelar</Button>
                <Button type="submit">Salvar</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="api" className="space-y-6">
        <TabsList className="w-full">
          <TabsTrigger value="api" className="flex-1">APIs Externas</TabsTrigger>
          <TabsTrigger value="webhooks" className="flex-1">Webhooks</TabsTrigger>
          <TabsTrigger value="logs" className="flex-1">Logs</TabsTrigger>
        </TabsList>
        
        <TabsContent value="api">
          <Card>
            <CardHeader>
              <CardTitle>Integrações de API</CardTitle>
              <CardDescription>Serviços externos conectados ao sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Integração</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Última Sincronização</TableHead>
                    <TableHead>Requisições</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {integrationsData.map((integration) => (
                    <TableRow key={integration.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{integration.name}</div>
                          <div className="text-xs text-muted-foreground">{integration.description}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {integration.type === 'market-data' ? 'Dados de Mercado' :
                           integration.type === 'trading' ? 'Trading' : 'Monitoramento'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <div className={cn(
                            "h-2 w-2 rounded-full mr-2",
                            integration.status === 'active' ? "bg-trader-green" : "bg-muted"
                          )}></div>
                          <span>{integration.status === 'active' ? 'Ativo' : 'Inativo'}</span>
                        </div>
                      </TableCell>
                      <TableCell>{integration.lastSync}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="text-sm">{integration.requests} / {integration.quota}</div>
                          <div className="w-full bg-muted rounded-full h-1.5">
                            <div 
                              className={cn(
                                "rounded-full h-1.5",
                                (integration.requests / integration.quota) > 0.8 
                                  ? "bg-trader-red" 
                                  : "bg-trader-green"
                              )}
                              style={{ width: `${(integration.requests / integration.quota) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <RefreshCw className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Code className="h-4 w-4" />
                          </Button>
                          <Switch 
                            checked={integration.status === 'active'} 
                            aria-label="Toggle integration"
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Uso de API por Categoria</CardTitle>
                <CardDescription>Distribuição de requisições por tipo de integração</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  {/* API usage chart would go here */}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Monitoramento de APIs</CardTitle>
                <CardDescription>Status e tempos de resposta</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {integrationsData.filter(i => i.status === 'active').slice(0, 5).map((integration) => (
                    <div key={integration.id} className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="bg-green-500/20 rounded-full p-1">
                          <Database className="h-4 w-4 text-trader-green" />
                        </div>
                        <span>{integration.name}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className="bg-green-500/10 text-trader-green">Operacional</Badge>
                        <span className="text-sm">235ms</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="border-t flex justify-center py-3">
                <Button variant="ghost" size="sm">Ver Todas as APIs</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="webhooks">
          <Card>
            <CardHeader>
              <CardTitle>Webhooks Configurados</CardTitle>
              <CardDescription>Endpoints para receber notificações de eventos externos</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>URL</TableHead>
                    <TableHead>Origem</TableHead>
                    <TableHead>Total de Eventos</TableHead>
                    <TableHead>Último Evento</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {webhooksData.map((webhook) => (
                    <TableRow key={webhook.id}>
                      <TableCell className="font-medium">{webhook.name}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm">
                          <span className="truncate max-w-[200px]">{webhook.url}</span>
                          <Button variant="ghost" size="icon" className="h-5 w-5">
                            <ExternalLink className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell>{webhook.source}</TableCell>
                      <TableCell>{webhook.events}</TableCell>
                      <TableCell>{webhook.lastEvent}</TableCell>
                      <TableCell>
                        <Switch checked={webhook.active} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="border-t py-4">
              <Button className="ml-auto">Adicionar Webhook</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="logs">
          <Card>
            <CardHeader>
              <CardTitle>Logs de Integração</CardTitle>
              <CardDescription>Registro de atividades e erros de integrações</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 border rounded-md bg-muted/20">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-green-500/10 text-trader-green">INFO</Badge>
                      <span className="font-medium">Alpha Vantage API</span>
                    </div>
                    <span className="text-xs text-muted-foreground">15/06/2023 16:45:23</span>
                  </div>
                  <p className="text-sm">Sincronização concluída com sucesso. 123 ativos atualizados.</p>
                </div>
                
                <div className="p-3 border rounded-md bg-muted/20">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500">WARN</Badge>
                      <span className="font-medium">Twelve Data API</span>
                    </div>
                    <span className="text-xs text-muted-foreground">15/06/2023 16:30:12</span>
                  </div>
                  <p className="text-sm">Tempo de resposta acima do limite esperado (2.3s)</p>
                </div>
                
                <div className="p-3 border rounded-md bg-muted/20">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-red-500/10 text-trader-red">ERROR</Badge>
                      <span className="font-medium">Yahoo Finance API</span>
                    </div>
                    <span className="text-xs text-muted-foreground">15/06/2023 15:22:05</span>
                  </div>
                  <p className="text-sm">Falha na autenticação. Verifique a chave de API.</p>
                </div>
                
                <div className="p-3 border rounded-md bg-muted/20">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-green-500/10 text-trader-green">INFO</Badge>
                      <span className="font-medium">PagBank Webhook</span>
                    </div>
                    <span className="text-xs text-muted-foreground">15/06/2023 14:56:37</span>
                  </div>
                  <p className="text-sm">Evento de pagamento processado com sucesso para o usuário ID #1234</p>
                </div>
                
                <div className="p-3 border rounded-md bg-muted/20">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-green-500/10 text-trader-green">INFO</Badge>
                      <span className="font-medium">Mercado Pago Webhook</span>
                    </div>
                    <span className="text-xs text-muted-foreground">15/06/2023 14:12:45</span>
                  </div>
                  <p className="text-sm">Renovação de assinatura processada para o usuário ID #2345</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t py-4 flex justify-between">
              <Button variant="outline">Limpar Logs</Button>
              <Button>Ver Todos os Logs</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default IntegrationsPage;
