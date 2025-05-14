
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ArrowUp, ArrowDown, RefreshCw, Plus } from 'lucide-react';
import { usePortfolioData } from '@/hooks/usePortfolioData';
import { useAuth } from '@/contexts/AuthContext';

export const PortfolioSummary = () => {
  const { user } = useAuth();
  const { data: portfolioData, isLoading, isError, refetch } = usePortfolioData();
  
  // Verificar se o usuário é gratuito ou premium
  const isFreeUser = !user?.plan || user.plan === 'free';
  const hasPlanLimitation = isFreeUser && portfolioData?.assets && portfolioData.assets.length >= 5;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle>Visão Geral do Portfólio</CardTitle>
            <div className="flex gap-2">
              {hasPlanLimitation && (
                <Badge variant="outline" className="bg-amber-500/10 text-amber-500">
                  Limite do plano free
                </Badge>
              )}
              <Button size="sm" variant="ghost" onClick={() => refetch()} disabled={isLoading}>
                <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between gap-8">
                <div className="space-y-6 w-full">
                  <Skeleton className="h-20 w-full" />
                  <Skeleton className="h-20 w-full" />
                </div>
                <Skeleton className="h-[200px] w-full sm:w-3/5" />
              </div>
            </div>
          ) : isError ? (
            <div className="py-6 text-center">
              <p className="text-muted-foreground">Erro ao carregar dados do portfólio</p>
              <Button variant="outline" size="sm" className="mt-2" onClick={() => refetch()}>
                Tentar novamente
              </Button>
            </div>
          ) : !portfolioData ? (
            <div className="py-10 text-center">
              <p className="text-muted-foreground mb-4">Você ainda não possui ativos no seu portfólio</p>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Adicionar Ativo
              </Button>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row justify-between gap-8">
              <div className="space-y-6">
                <div>
                  <div className="text-muted-foreground mb-2">Valor Total</div>
                  <div className="text-3xl font-bold">R$ {portfolioData.totalValue.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                  <div className={`flex items-center ${portfolioData.monthlyChange >= 0 ? 'text-trader-green' : 'text-trader-red'} mt-1`}>
                    {portfolioData.monthlyChange >= 0 ? (
                      <ArrowUp className="h-4 w-4 mr-1" />
                    ) : (
                      <ArrowDown className="h-4 w-4 mr-1" />
                    )}
                    <span className="text-sm">{Math.abs(portfolioData.monthlyChange).toFixed(1)}% (este mês)</span>
                  </div>
                </div>
                
                <div>
                  <div className="text-muted-foreground mb-2">Retorno Total</div>
                  <div className="text-2xl font-bold">R$ {portfolioData.totalReturn.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                  <div className={`flex items-center ${portfolioData.totalReturnPercentage >= 0 ? 'text-trader-green' : 'text-trader-red'} mt-1`}>
                    {portfolioData.totalReturnPercentage >= 0 ? (
                      <ArrowUp className="h-4 w-4 mr-1" />
                    ) : (
                      <ArrowDown className="h-4 w-4 mr-1" />
                    )}
                    <span className="text-sm">{Math.abs(portfolioData.totalReturnPercentage).toFixed(1)}% (desde o início)</span>
                  </div>
                </div>
              </div>
              
              <div className="w-full sm:w-3/5 h-[200px]">
                {portfolioData.historicalData && portfolioData.historicalData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={portfolioData.historicalData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))', 
                          borderColor: 'hsl(var(--border))',
                          borderRadius: '0.5rem'
                        }} 
                      />
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
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-muted-foreground">Dados históricos não disponíveis</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle>Ativos no Portfólio</CardTitle>
            <div className="flex gap-2 items-center">
              <Badge variant="outline">
                {portfolioData?.assets ? `${portfolioData.assets.length} ativos` : '0 ativos'}
              </Badge>
              
              <Button size="sm" disabled={hasPlanLimitation}>
                <Plus className="h-4 w-4 mr-1" />
                <span>Adicionar</span>
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
            </div>
          ) : isError ? (
            <div className="py-6 text-center">
              <p className="text-muted-foreground">Erro ao carregar dados dos ativos</p>
              <Button variant="outline" size="sm" className="mt-2" onClick={() => refetch()}>
                Tentar novamente
              </Button>
            </div>
          ) : !portfolioData?.assets || portfolioData.assets.length === 0 ? (
            <div className="py-6 text-center">
              <p className="text-muted-foreground">Nenhum ativo no portfólio</p>
              <Button variant="outline" size="sm" className="mt-2">
                Adicionar ativo
              </Button>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b border-border">
                      <th className="pb-2">Ativo</th>
                      <th className="pb-2">Preço</th>
                      <th className="pb-2">Variação</th>
                      <th className="pb-2">Quantidade</th>
                      <th className="pb-2 text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {portfolioData.assets.map((asset: any, index: number) => (
                      <tr key={index} className="border-b border-border">
                        <td className="py-3 font-medium">{asset.symbol}</td>
                        <td>R$ {asset.price.toFixed(2)}</td>
                        <td>
                          <div className={`flex items-center ${asset.change >= 0 ? 'text-trader-green' : 'text-trader-red'}`}>
                            {asset.change >= 0 ? (
                              <ArrowUp className="h-3 w-3 mr-1" />
                            ) : (
                              <ArrowDown className="h-3 w-3 mr-1" />
                            )}
                            {Math.abs(asset.change)}%
                          </div>
                        </td>
                        <td>{asset.quantity}</td>
                        <td className="text-right">R$ {asset.total.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {hasPlanLimitation && (
                <div className="mt-4 p-3 bg-amber-50 text-amber-800 rounded-md text-sm">
                  <p className="font-medium">Limite do plano gratuito atingido</p>
                  <p className="mt-1">Você atingiu o limite de 5 ativos do plano gratuito. Faça upgrade para o plano Pro para adicionar mais ativos.</p>
                  <Button size="sm" className="mt-2">Fazer Upgrade</Button>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
