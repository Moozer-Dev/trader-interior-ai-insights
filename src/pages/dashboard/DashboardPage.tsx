
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from '@/components/ui/badge';
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowDown, ArrowUp, LineChart, RefreshCw } from 'lucide-react';
import { MarketOverview } from '@/components/dashboard/MarketOverview';
import { PortfolioSummary } from '@/components/dashboard/PortfolioSummary';
import { RecentAlerts } from '@/components/dashboard/RecentAlerts';
import { AiInsights } from '@/components/dashboard/AiInsights';
import { FeaturedNews } from '@/components/dashboard/FeaturedNews';
import { InvestmentSimulator } from '@/components/dashboard/InvestmentSimulator';
import { useAuth } from '@/contexts/AuthContext';
import axios from 'axios';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [lastUpdate, setLastUpdate] = useState<string>('');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/dashboard/summary');
      setDashboardData(response.data);
      setLastUpdate(new Date().toLocaleTimeString());
    } catch (error) {
      console.error('Erro ao carregar dados do dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Bem-vindo de volta, {user?.name || 'Investidor'}</p>
        </div>
        <div className="flex items-center gap-2 self-start">
          <Badge variant="outline" className="bg-accent/20 text-accent-foreground">
            {loading ? (
              <Skeleton className="h-4 w-40" />
            ) : (
              <>Última atualização: {lastUpdate}</>
            )}
          </Badge>
          <Button size="sm" variant="outline" onClick={fetchDashboardData} disabled={loading}>
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {loading ? (
          <>
            <Card>
              <CardHeader className="pb-2">
                <Skeleton className="h-5 w-40" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-7 w-36 mb-2" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-[60px] w-full mt-2" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <Skeleton className="h-5 w-40" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-7 w-36 mb-2" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-[60px] w-full mt-2" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <Skeleton className="h-5 w-40" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-7 w-36 mb-2" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-[60px] w-full mt-2" />
              </CardContent>
            </Card>
          </>
        ) : dashboardData ? (
          <>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Portfólio Total</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div className="text-2xl font-bold">
                    {dashboardData.portfolioValue ? (
                      `R$ ${dashboardData.portfolioValue.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                    ) : (
                      "Sem dados"
                    )}
                  </div>
                  <div className="flex items-center text-trader-green">
                    {dashboardData.portfolioChange >= 0 ? (
                      <>
                        <ArrowUp className="h-4 w-4 mr-1" />
                        <span className="text-sm">{dashboardData.portfolioChange}%</span>
                      </>
                    ) : (
                      <>
                        <ArrowDown className="h-4 w-4 mr-1 text-trader-red" />
                        <span className="text-sm text-trader-red">{Math.abs(dashboardData.portfolioChange)}%</span>
                      </>
                    )}
                  </div>
                </div>
                {dashboardData.portfolioChart && (
                  <div className="mt-2 h-[60px]">
                    {/* Gráfico renderizado com dados reais aqui */}
                    <div className="w-full h-full bg-muted/30 rounded flex items-center justify-center">
                      <LineChart className="h-5 w-5 text-primary/40" />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Rentabilidade Mensal</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div className="text-2xl font-bold">
                    {dashboardData.monthlyReturn ? (
                      `R$ ${dashboardData.monthlyReturn.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                    ) : (
                      "Sem dados"
                    )}
                  </div>
                  <div className="flex items-center text-trader-green">
                    {dashboardData.monthlyReturnPercentage >= 0 ? (
                      <>
                        <ArrowUp className="h-4 w-4 mr-1" />
                        <span className="text-sm">{dashboardData.monthlyReturnPercentage}%</span>
                      </>
                    ) : (
                      <>
                        <ArrowDown className="h-4 w-4 mr-1 text-trader-red" />
                        <span className="text-sm text-trader-red">{Math.abs(dashboardData.monthlyReturnPercentage)}%</span>
                      </>
                    )}
                  </div>
                </div>
                {dashboardData.monthlyReturnChart && (
                  <div className="mt-2 h-[60px]">
                    {/* Gráfico renderizado com dados reais aqui */}
                    <div className="w-full h-full bg-muted/30 rounded flex items-center justify-center">
                      <LineChart className="h-5 w-5 text-primary/40" />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Alertas Ativos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div className="text-2xl font-bold">{dashboardData.activeAlerts || 0}</div>
                  {dashboardData.triggeredToday > 0 && (
                    <Badge className="bg-primary/20 text-primary">{dashboardData.triggeredToday} acionados hoje</Badge>
                  )}
                </div>
                {dashboardData.alertsBreakdown && (
                  <div className="mt-4 space-y-2">
                    {dashboardData.alertsBreakdown.map((alert: any, index: number) => (
                      <div key={index} className="flex justify-between items-center text-sm">
                        <span className="flex items-center">
                          <div className={`h-2 w-2 rounded-full mr-2 ${
                            alert.type === 'price-above' ? 'bg-trader-green' : 
                            alert.type === 'price-below' ? 'bg-trader-red' : 
                            'bg-trader-blue'
                          }`}></div>
                          {alert.label}
                        </span>
                        <span>{alert.count}</span>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </>
        ) : (
          <>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Portfólio Total</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-4">
                  <p className="text-muted-foreground text-sm">Sem dados disponíveis</p>
                  <Button variant="outline" size="sm" className="mt-2" onClick={fetchDashboardData}>
                    Atualizar
                  </Button>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Rentabilidade Mensal</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-4">
                  <p className="text-muted-foreground text-sm">Sem dados disponíveis</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Alertas Ativos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-4">
                  <p className="text-muted-foreground text-sm">Sem alertas configurados</p>
                  <Button variant="outline" size="sm" className="mt-2" onClick={() => window.location.href = '/alerts'}>
                    Criar Alerta
                  </Button>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="portfolio">Portfólio</TabsTrigger>
          <TabsTrigger value="simulator">Simulador</TabsTrigger>
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
        
        <TabsContent value="simulator" className="space-y-4">
          <InvestmentSimulator />
        </TabsContent>
        
        <TabsContent value="ai-insights" className="space-y-4">
          <AiInsights />
        </TabsContent>

        <TabsContent value="news" className="space-y-4">
          <FeaturedNews />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardPage;
