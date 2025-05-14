
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown, Download } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// Mock data
const usageData = [
  { month: 'Jan', apiCalls: 182450, alerts: 5840, aiAnalyses: 2400 },
  { month: 'Fev', apiCalls: 195600, alerts: 6320, aiAnalyses: 2650 },
  { month: 'Mar', apiCalls: 210450, alerts: 7100, aiAnalyses: 3200 },
  { month: 'Abr', apiCalls: 215800, alerts: 7450, aiAnalyses: 3450 },
  { month: 'Mai', apiCalls: 230700, alerts: 8200, aiAnalyses: 3800 },
  { month: 'Jun', apiCalls: 248500, alerts: 8840, aiAnalyses: 4250 },
];

const revenueData = [
  { month: 'Jan', revenue: 7020, costs: 2850, profit: 4170 },
  { month: 'Fev', revenue: 7480, costs: 2920, profit: 4560 },
  { month: 'Mar', revenue: 8220, costs: 3150, profit: 5070 },
  { month: 'Abr', revenue: 8840, costs: 3280, profit: 5560 },
  { month: 'Mai', revenue: 9750, costs: 3510, profit: 6240 },
  { month: 'Jun', revenue: 11120, costs: 3820, profit: 7300 },
];

const userSegmentation = [
  { name: 'Pessoa Física', value: 65, color: '#3b82f6' },
  { name: 'Day Trader', value: 18, color: '#10b981' },
  { name: 'Empresas', value: 12, color: '#6366f1' },
  { name: 'Instituições', value: 5, color: '#f59e0b' },
];

const ReportsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Relatórios</h1>
          <p className="text-muted-foreground">Análise de desempenho e métricas</p>
        </div>
        <div className="flex items-center gap-2 self-start">
          <Button className="gap-2">
            <Download className="h-4 w-4" />
            Exportar Dados
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Receita Mensal</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold">R$ 11.120,00</div>
              <div className="flex items-center text-trader-green">
                <ArrowUp className="h-4 w-4 mr-1" />
                <span className="text-sm">14,1%</span>
              </div>
            </div>
            <div className="mt-1 text-xs text-muted-foreground">
              Comparado ao mês anterior
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Número de Usuários</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold">548</div>
              <div className="flex items-center text-trader-green">
                <ArrowUp className="h-4 w-4 mr-1" />
                <span className="text-sm">5,8%</span>
              </div>
            </div>
            <div className="mt-1 text-xs text-muted-foreground">
              Crescimento mensal
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Chamadas API</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold">248.500</div>
              <div className="flex items-center text-trader-green">
                <ArrowUp className="h-4 w-4 mr-1" />
                <span className="text-sm">7,7%</span>
              </div>
            </div>
            <div className="mt-1 text-xs text-muted-foreground">
              Total do último mês
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="usage" className="space-y-6">
        <TabsList className="w-full">
          <TabsTrigger value="usage" className="flex-1">Uso</TabsTrigger>
          <TabsTrigger value="finance" className="flex-1">Financeiro</TabsTrigger>
          <TabsTrigger value="users" className="flex-1">Usuários</TabsTrigger>
          <TabsTrigger value="performance" className="flex-1">Performance</TabsTrigger>
        </TabsList>
        
        <TabsContent value="usage">
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Uso da Plataforma</CardTitle>
                <CardDescription>Métricas de utilização nos últimos 6 meses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={usageData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'hsl(var(--card))',
                          borderColor: 'hsl(var(--border))',
                          borderRadius: '0.5rem'
                        }}
                      />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="apiCalls"
                        name="Chamadas API"
                        stroke="hsl(var(--primary))"
                        strokeWidth={2}
                        activeDot={{ r: 8 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="alerts"
                        name="Alertas"
                        stroke="hsl(var(--accent))"
                        strokeWidth={2}
                      />
                      <Line
                        type="monotone"
                        dataKey="aiAnalyses"
                        name="Análises IA"
                        stroke="#1E3A8A"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <Card>
                    <CardHeader className="py-3">
                      <CardTitle className="text-sm">Total de Chamadas API</CardTitle>
                    </CardHeader>
                    <CardContent className="py-0">
                      <div className="text-2xl font-bold">1.283.500</div>
                      <p className="text-xs text-muted-foreground">Nos últimos 6 meses</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="py-3">
                      <CardTitle className="text-sm">Alertas Criados</CardTitle>
                    </CardHeader>
                    <CardContent className="py-0">
                      <div className="text-2xl font-bold">43.750</div>
                      <p className="text-xs text-muted-foreground">Nos últimos 6 meses</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="py-3">
                      <CardTitle className="text-sm">Análises com IA</CardTitle>
                    </CardHeader>
                    <CardContent className="py-0">
                      <div className="text-2xl font-bold">19.750</div>
                      <p className="text-xs text-muted-foreground">Nos últimos 6 meses</p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="finance">
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Relatório Financeiro</CardTitle>
                <CardDescription>Receitas, custos e lucro nos últimos 6 meses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={revenueData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip
                        formatter={(value) => [`R$ ${value.toLocaleString('pt-BR')}`, '']}
                        contentStyle={{
                          backgroundColor: 'hsl(var(--card))',
                          borderColor: 'hsl(var(--border))',
                          borderRadius: '0.5rem'
                        }}
                      />
                      <Legend />
                      <Bar dataKey="revenue" name="Receita" fill="hsl(var(--accent))" />
                      <Bar dataKey="costs" name="Custos" fill="hsl(var(--destructive))" />
                      <Bar dataKey="profit" name="Lucro" fill="hsl(var(--primary))" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <Card>
                    <CardHeader className="py-3">
                      <CardTitle className="text-sm">Receita Total</CardTitle>
                    </CardHeader>
                    <CardContent className="py-0">
                      <div className="text-2xl font-bold">R$ 52.430,00</div>
                      <div className="flex items-center text-xs text-trader-green mt-1">
                        <ArrowUp className="h-3 w-3 mr-1" />
                        <span>10,2% de crescimento</span>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="py-3">
                      <CardTitle className="text-sm">Custos Operacionais</CardTitle>
                    </CardHeader>
                    <CardContent className="py-0">
                      <div className="text-2xl font-bold">R$ 19.530,00</div>
                      <div className="flex items-center text-xs text-trader-red mt-1">
                        <ArrowUp className="h-3 w-3 mr-1" />
                        <span>4,8% de aumento</span>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="py-3">
                      <CardTitle className="text-sm">Lucro Líquido</CardTitle>
                    </CardHeader>
                    <CardContent className="py-0">
                      <div className="text-2xl font-bold">R$ 32.900,00</div>
                      <div className="flex items-center text-xs text-trader-green mt-1">
                        <ArrowUp className="h-3 w-3 mr-1" />
                        <span>14,5% de crescimento</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="users">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Segmentação de Usuários</CardTitle>
                <CardDescription>Distribuição por perfil de cliente</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={userSegmentation}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={120}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {userSegmentation.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value) => [`${value}%`, 'Porcentagem']}
                        contentStyle={{
                          backgroundColor: 'hsl(var(--card))',
                          borderColor: 'hsl(var(--border))',
                          borderRadius: '0.5rem'
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Métricas de Usuários</CardTitle>
                <CardDescription>Indicadores de engajamento e retenção</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <h3 className="text-sm font-medium">Taxa de Ativação</h3>
                      <span className="text-sm">78%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: '78%' }}></div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Percentual de usuários que completaram o onboarding e criaram pelo menos um alerta.
                    </p>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <h3 className="text-sm font-medium">Retenção em 30 dias</h3>
                      <span className="text-sm">72%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-accent h-2 rounded-full" style={{ width: '72%' }}></div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Percentual de usuários que continuam ativos após 30 dias.
                    </p>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <h3 className="text-sm font-medium">Churn Rate</h3>
                      <span className="text-sm">4.2%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-destructive h-2 rounded-full" style={{ width: '4.2%' }}></div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Taxa de cancelamento mensal.
                    </p>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <h3 className="text-sm font-medium">Conversão Free para Pro</h3>
                      <span className="text-sm">18%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: '18%' }}></div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Taxa de conversão de usuários gratuitos para plano pago.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="performance">
          <Card>
            <CardHeader>
              <CardTitle>Performance do Sistema</CardTitle>
              <CardDescription>Métricas de disponibilidade e tempo de resposta</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Card>
                  <CardHeader className="py-3">
                    <CardTitle className="text-sm">Uptime</CardTitle>
                  </CardHeader>
                  <CardContent className="py-0">
                    <div className="text-2xl font-bold">99.98%</div>
                    <p className="text-xs text-muted-foreground">Nos últimos 30 dias</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="py-3">
                    <CardTitle className="text-sm">Tempo de Resposta API</CardTitle>
                  </CardHeader>
                  <CardContent className="py-0">
                    <div className="text-2xl font-bold">120ms</div>
                    <p className="text-xs text-muted-foreground">Média do último mês</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="py-3">
                    <CardTitle className="text-sm">Erros API</CardTitle>
                  </CardHeader>
                  <CardContent className="py-0">
                    <div className="text-2xl font-bold">0.03%</div>
                    <p className="text-xs text-muted-foreground">Taxa de falhas</p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-base font-medium mb-4">Monitoramento de Disponibilidade</h3>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">API Principal</h4>
                        <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                          Online
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Tempo de resposta</span>
                          <span>120ms</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Uptime</span>
                          <span>99.98%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Último incidente</span>
                          <span>15 dias atrás</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">Serviço de IA</h4>
                        <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                          Online
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Tempo de resposta</span>
                          <span>580ms</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Uptime</span>
                          <span>99.95%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Último incidente</span>
                          <span>3 dias atrás</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">Sistema de Alertas</h4>
                        <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                          Online
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Tempo de processamento</span>
                          <span>210ms</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Uptime</span>
                          <span>99.99%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Último incidente</span>
                          <span>30 dias atrás</span>
                        </div>
                      </div>
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

export default ReportsPage;
