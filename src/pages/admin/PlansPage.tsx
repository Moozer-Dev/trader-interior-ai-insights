
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Check, X } from 'lucide-react';

const plans = [
  {
    id: 'free',
    name: 'Free',
    price: 'Grátis',
    description: 'Para uso pessoal básico',
    features: [
      { name: 'Cotações em tempo real', included: true },
      { name: 'Alertas de preço (máx. 5)', included: true },
      { name: 'Dashboard básico', included: true },
      { name: 'Análise fundamentalista', included: false },
      { name: 'Análise técnica com IA', included: false },
      { name: 'Sugestões de portfólio', included: false },
      { name: 'Previsões de preço', included: false },
      { name: 'Acesso à API', included: false },
    ],
    currentUsers: 325,
    activeAlerts: 840,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 'R$ 39,90/mês',
    description: 'Para investidores ativos',
    popular: true,
    features: [
      { name: 'Cotações em tempo real', included: true },
      { name: 'Alertas de preço ilimitados', included: true },
      { name: 'Dashboard completo', included: true },
      { name: 'Análise fundamentalista', included: true },
      { name: 'Análise técnica com IA', included: true },
      { name: 'Sugestões de portfólio', included: true },
      { name: 'Previsões de preço', included: true },
      { name: 'Acesso à API', included: false },
    ],
    currentUsers: 186,
    activeAlerts: 2450,
  },
  {
    id: 'api',
    name: 'API',
    price: 'R$ 99,90/mês',
    description: 'Para desenvolvedores e empresas',
    features: [
      { name: 'Cotações em tempo real', included: true },
      { name: 'Alertas de preço ilimitados', included: true },
      { name: 'Dashboard completo', included: true },
      { name: 'Análise fundamentalista', included: true },
      { name: 'Análise técnica com IA', included: true },
      { name: 'Sugestões de portfólio', included: true },
      { name: 'Previsões de preço', included: true },
      { name: 'Acesso à API', included: true },
    ],
    currentUsers: 37,
    activeAlerts: 980,
  }
];

// Monthly revenue data
const revenueData = [
  { month: 'Janeiro', free: 0, pro: 4220, api: 2800, total: 7020 },
  { month: 'Fevereiro', free: 0, pro: 4580, api: 2900, total: 7480 },
  { month: 'Março', free: 0, pro: 5120, api: 3100, total: 8220 },
  { month: 'Abril', free: 0, pro: 5540, api: 3300, total: 8840 },
  { month: 'Maio', free: 0, pro: 6250, api: 3500, total: 9750 },
  { month: 'Junho', free: 0, pro: 7420, api: 3700, total: 11120 },
];

const PlansPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Planos</h1>
          <p className="text-muted-foreground">Gerenciamento de planos e assinaturas</p>
        </div>
        <div className="flex items-center gap-2 self-start">
          <Button>Criar Novo Plano</Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="w-full">
          <TabsTrigger value="overview" className="flex-1">Visão Geral</TabsTrigger>
          <TabsTrigger value="revenue" className="flex-1">Receita</TabsTrigger>
          <TabsTrigger value="users" className="flex-1">Usuários</TabsTrigger>
          <TabsTrigger value="settings" className="flex-1">Configurações</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <Card key={plan.id} className="relative">
                {plan.popular && (
                  <div className="absolute -top-3 right-6">
                    <Badge className="bg-accent/70 text-accent-foreground">Popular</Badge>
                  </div>
                )}
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <div className="flex items-end gap-2">
                    <div className="text-3xl font-bold">{plan.price}</div>
                  </div>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        {feature.included ? (
                          <Check className="h-4 w-4 mr-2 text-accent" />
                        ) : (
                          <X className="h-4 w-4 mr-2 text-muted-foreground" />
                        )}
                        <span className={feature.included ? "" : "text-muted-foreground"}>
                          {feature.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex-col items-stretch gap-2 pt-0">
                  <div className="border-t mb-4"></div>
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-muted-foreground">Usuários Ativos</div>
                    <div className="font-medium">{plan.currentUsers}</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-muted-foreground">Alertas Ativos</div>
                    <div className="font-medium">{plan.activeAlerts}</div>
                  </div>
                  <Button variant="outline" className="mt-4">Gerenciar Plano</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="revenue">
          <Card>
            <CardHeader>
              <CardTitle>Receita Mensal por Plano</CardTitle>
              <CardDescription>Último semestre</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Mês</TableHead>
                      <TableHead className="text-right">Free</TableHead>
                      <TableHead className="text-right">Pro</TableHead>
                      <TableHead className="text-right">API</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {revenueData.map((month) => (
                      <TableRow key={month.month}>
                        <TableCell className="font-medium">{month.month}</TableCell>
                        <TableCell className="text-right">R$ {month.free.toLocaleString('pt-BR')}</TableCell>
                        <TableCell className="text-right">R$ {month.pro.toLocaleString('pt-BR')}</TableCell>
                        <TableCell className="text-right">R$ {month.api.toLocaleString('pt-BR')}</TableCell>
                        <TableCell className="text-right font-medium">R$ {month.total.toLocaleString('pt-BR')}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>Distribuição de Usuários</CardTitle>
              <CardDescription>Usuários por plano</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {plans.map((plan) => (
                  <Card key={plan.id}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        Plano {plan.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{plan.currentUsers}</div>
                      <p className="text-xs text-muted-foreground">Usuários ativos</p>
                      <div className="mt-4 flex flex-col space-y-2">
                        <div className="flex justify-between items-center text-sm">
                          <span>Alertas por usuário</span>
                          <span className="font-medium">{(plan.activeAlerts / plan.currentUsers).toFixed(1)}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span>Retenção</span>
                          <span className="font-medium">
                            {plan.id === 'free' ? '62%' : plan.id === 'pro' ? '89%' : '94%'}
                          </span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span>Churn rate</span>
                          <span className="font-medium">
                            {plan.id === 'free' ? '8.5%' : plan.id === 'pro' ? '3.2%' : '1.8%'}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Pagamento</CardTitle>
              <CardDescription>Integrações com provedores de pagamento</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between border p-4 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="font-medium">PagBank</div>
                    <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                      Ativo
                    </Badge>
                  </div>
                  <Button variant="outline" size="sm">Configurar</Button>
                </div>
                
                <div className="flex items-center justify-between border p-4 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="font-medium">Mercado Pago</div>
                    <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                      Ativo
                    </Badge>
                  </div>
                  <Button variant="outline" size="sm">Configurar</Button>
                </div>
                
                <div className="flex items-center justify-between border p-4 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="font-medium">Stripe</div>
                    <Badge variant="outline">
                      Inativo
                    </Badge>
                  </div>
                  <Button variant="outline" size="sm">Configurar</Button>
                </div>
              </div>
              
              <div className="mt-8 border-t pt-6">
                <h3 className="text-lg font-medium mb-4">Webhooks de Pagamento</h3>
                <div className="space-y-4">
                  <div className="border p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">Confirmação de Pagamento</h4>
                      <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                        Ativo
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      Webhook para receber confirmações de pagamento dos provedores
                    </p>
                    <div className="flex justify-between items-center">
                      <code className="text-xs bg-muted p-2 rounded">
                        https://api.trader-interior.com/webhooks/payment/confirm
                      </code>
                      <Button variant="outline" size="sm">Copiar</Button>
                    </div>
                  </div>
                  
                  <div className="border p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">Renovação de Assinatura</h4>
                      <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                        Ativo
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      Webhook para processar renovações automáticas de assinaturas
                    </p>
                    <div className="flex justify-between items-center">
                      <code className="text-xs bg-muted p-2 rounded">
                        https://api.trader-interior.com/webhooks/subscription/renew
                      </code>
                      <Button variant="outline" size="sm">Copiar</Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PlansPage;
