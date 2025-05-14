
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, AreaChart, BarChart, Line, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { Badge } from '@/components/ui/badge';
import { ChartBar, ArrowDown, ArrowUp } from 'lucide-react';
import { MarketOverview } from '@/components/dashboard/MarketOverview';
import { PortfolioSummary } from '@/components/dashboard/PortfolioSummary';
import { RecentAlerts } from '@/components/dashboard/RecentAlerts';
import { AiInsights } from '@/components/dashboard/AiInsights';
import { FeaturedNews } from '@/components/dashboard/FeaturedNews';

const data = [
  { name: 'Jan', value: 4000 },
  { name: 'Fev', value: 3000 },
  { name: 'Mar', value: 5000 },
  { name: 'Abr', value: 2780 },
  { name: 'Mai', value: 1890 },
  { name: 'Jun', value: 2390 },
  { name: 'Jul', value: 3490 },
  { name: 'Ago', value: 3200 },
  { name: 'Set', value: 2800 },
  { name: 'Out', value: 4300 },
  { name: 'Nov', value: 5300 },
  { name: 'Dez', value: 6200 },
];

const DashboardPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Acompanhe seu desempenho financeiro</p>
        </div>
        <div className="flex items-center gap-2 self-start">
          <Badge variant="outline" className="bg-accent/20 text-accent-foreground">
            Última atualização: há 5 minutos
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Portfólio Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold">R$ 25.689,45</div>
              <div className="flex items-center text-trader-green">
                <ArrowUp className="h-4 w-4 mr-1" />
                <span className="text-sm">2,4%</span>
              </div>
            </div>
            <div className="mt-2 h-[60px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="hsl(var(--accent))" 
                    strokeWidth={2}
                    fill="url(#colorValue)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Rentabilidade Mensal</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold">R$ 1.245,00</div>
              <div className="flex items-center text-trader-green">
                <ArrowUp className="h-4 w-4 mr-1" />
                <span className="text-sm">4,8%</span>
              </div>
            </div>
            <div className="mt-2 h-[60px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.slice(-6)}>
                  <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Alertas Ativos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold">7</div>
              <Badge className="bg-primary/20 text-primary">3 acionados hoje</Badge>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-trader-green mr-2"></div>
                  Preço acima
                </span>
                <span>4</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-trader-red mr-2"></div>
                  Preço abaixo
                </span>
                <span>2</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-trader-blue mr-2"></div>
                  Volume
                </span>
                <span>1</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="portfolio">Portfólio</TabsTrigger>
          <TabsTrigger value="ai-insights">Insights IA</TabsTrigger>
          <TabsTrigger value="news">Notícias</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <MarketOverview />
            <RecentAlerts />
          </div>
        </TabsContent>
        
        <TabsContent value="portfolio" className="space-y-4">
          <PortfolioSummary />
        </TabsContent>
        
        <TabsContent value="ai-insights" className="space-y-4">
          <AiInsights />
        </TabsContent>

        <TabsContent value="news" className="space-y-4">
          <FeaturedNews />
        </TabsContent>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Análise de Desempenho</CardTitle>
            <CardDescription>Histórico de rentabilidade do portfólio</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
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
                    dataKey="value" 
                    name="Valor (R$)"
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    dot={{ stroke: 'hsl(var(--primary))', strokeWidth: 2, r: 4, fill: 'hsl(var(--background))' }}
                    activeDot={{ stroke: 'hsl(var(--primary))', strokeWidth: 2, r: 6, fill: 'hsl(var(--primary))' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Distribuição de Ativos</CardTitle>
            <CardDescription>Tipos de investimentos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-primary mr-2"></div>
                  <span>Ações</span>
                </div>
                <div>
                  <span className="font-medium">45%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-accent mr-2"></div>
                  <span>Renda Fixa</span>
                </div>
                <div>
                  <span className="font-medium">30%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-trader-blue mr-2"></div>
                  <span>Criptomoedas</span>
                </div>
                <div>
                  <span className="font-medium">15%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-trader-red mr-2"></div>
                  <span>Fundos</span>
                </div>
                <div>
                  <span className="font-medium">10%</span>
                </div>
              </div>
            </div>
            
            <div className="h-[180px] mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[
                  { name: 'Ações', value: 45 },
                  { name: 'Renda Fixa', value: 30 },
                  { name: 'Criptomoedas', value: 15 },
                  { name: 'Fundos', value: 10 },
                ]}>
                  <XAxis dataKey="name" tick={false} axisLine={false} />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                    {[
                      { fill: 'hsl(var(--primary))' },
                      { fill: 'hsl(var(--accent))' },
                      { fill: '#1E3A8A' },
                      { fill: '#DC2626' },
                    ].map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
