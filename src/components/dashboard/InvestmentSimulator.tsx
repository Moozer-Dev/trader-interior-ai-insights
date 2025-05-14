
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CandlestickChart, Calculator, RefreshCw } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export const InvestmentSimulator: React.FC = () => {
  const { user } = useAuth();
  const isPremiumUser = user?.plan === 'pro' || user?.plan === 'api';

  const [initialAmount, setInitialAmount] = useState<number>(1000);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(200);
  const [years, setYears] = useState<number>(5);
  const [returnRate, setReturnRate] = useState<number>(8);
  const [simulationData, setSimulationData] = useState<any[]>([]);
  const [totalInvested, setTotalInvested] = useState<number>(0);
  const [totalReturns, setTotalReturns] = useState<number>(0);
  const [finalAmount, setFinalAmount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSimulate = () => {
    setLoading(true);
    
    // Simulação de carregamento
    setTimeout(() => {
      const data = [];
      let totalInvested = initialAmount;
      let accumulated = initialAmount;
      const monthlyRate = returnRate / 100 / 12;
      const totalMonths = years * 12;
      
      for (let month = 0; month <= totalMonths; month++) {
        if (month > 0) {
          accumulated = accumulated * (1 + monthlyRate) + monthlyContribution;
          totalInvested += monthlyContribution;
        }
        
        if (month % 6 === 0 || month === totalMonths) {
          data.push({
            month,
            year: Math.floor(month / 12),
            accumulated: Math.round(accumulated * 100) / 100,
            invested: Math.round(totalInvested * 100) / 100,
            returns: Math.round((accumulated - totalInvested) * 100) / 100
          });
        }
      }
      
      setSimulationData(data);
      setTotalInvested(Math.round(totalInvested * 100) / 100);
      setFinalAmount(Math.round(accumulated * 100) / 100);
      setTotalReturns(Math.round((accumulated - totalInvested) * 100) / 100);
      setLoading(false);
    }, 1000);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Simulador de Investimentos</CardTitle>
            <CardDescription>Projete o crescimento do seu patrimônio</CardDescription>
          </div>
          <CandlestickChart className="h-6 w-6 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {!isPremiumUser ? (
          <div className="text-center py-6">
            <CandlestickChart className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-medium mb-2">Recurso exclusivo para assinantes</h3>
            <p className="text-muted-foreground mb-4">
              Faça upgrade para um plano pago para acessar o simulador de investimentos
            </p>
            <Button>Fazer Upgrade</Button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Investimento Inicial
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 bg-muted border border-r-0 border-input rounded-l-md">
                      R$
                    </span>
                    <Input
                      type="number"
                      value={initialAmount}
                      onChange={(e) => setInitialAmount(Number(e.target.value))}
                      className="rounded-l-none"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Aporte Mensal
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 bg-muted border border-r-0 border-input rounded-l-md">
                      R$
                    </span>
                    <Input
                      type="number"
                      value={monthlyContribution}
                      onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                      className="rounded-l-none"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Período em Anos: {years}
                  </label>
                  <Slider
                    value={[years]}
                    min={1}
                    max={30}
                    step={1}
                    onValueChange={(value) => setYears(value[0])}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Rentabilidade ao Ano: {returnRate}%
                  </label>
                  <Slider
                    value={[returnRate]}
                    min={1}
                    max={20}
                    step={0.5}
                    onValueChange={(value) => setReturnRate(value[0])}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Tipo de Investimento
                  </label>
                  <Select defaultValue="cdb">
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo de investimento" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cdb">CDB</SelectItem>
                      <SelectItem value="tesouro">Tesouro Direto</SelectItem>
                      <SelectItem value="acoes">Ações</SelectItem>
                      <SelectItem value="fii">Fundos Imobiliários</SelectItem>
                      <SelectItem value="personalizado">Personalizado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button 
                  className="w-full" 
                  onClick={handleSimulate}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Calculando...
                    </>
                  ) : (
                    <>
                      <Calculator className="mr-2 h-4 w-4" />
                      Simular Investimento
                    </>
                  )}
                </Button>
              </div>
              
              <div className="space-y-4">
                {simulationData.length > 0 && (
                  <>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-muted/50 p-3 rounded-lg">
                        <div className="text-sm text-muted-foreground mb-1">Total Investido</div>
                        <div className="font-bold">{formatCurrency(totalInvested)}</div>
                      </div>
                      <div className="bg-muted/50 p-3 rounded-lg">
                        <div className="text-sm text-muted-foreground mb-1">Rendimentos</div>
                        <div className="font-bold text-trader-green">{formatCurrency(totalReturns)}</div>
                      </div>
                      <div className="bg-muted/50 p-3 rounded-lg">
                        <div className="text-sm text-muted-foreground mb-1">Montante Final</div>
                        <div className="font-bold">{formatCurrency(finalAmount)}</div>
                      </div>
                    </div>
                    
                    <div className="h-[250px] mt-4">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                          data={simulationData}
                          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" vertical={false} />
                          <XAxis 
                            dataKey="year" 
                            label={{ value: 'Anos', position: 'insideBottom', offset: -5 }} 
                          />
                          <YAxis 
                            tickFormatter={(value) => `R$ ${value.toLocaleString('pt-BR')}`}
                          />
                          <Tooltip 
                            formatter={(value: number) => [`${formatCurrency(value)}`, '']}
                            labelFormatter={(label) => `Ano ${label}`}
                            contentStyle={{ 
                              backgroundColor: 'hsl(var(--card))', 
                              borderColor: 'hsl(var(--border))',
                              borderRadius: '0.5rem'
                            }} 
                          />
                          <Area 
                            type="monotone" 
                            dataKey="invested" 
                            name="Investido" 
                            stackId="1"
                            stroke="hsl(var(--muted-foreground))" 
                            fill="hsl(var(--muted))" 
                          />
                          <Area 
                            type="monotone" 
                            dataKey="returns" 
                            name="Rendimentos" 
                            stackId="1"
                            stroke="hsl(var(--primary))" 
                            fill="hsl(var(--primary)/0.3)" 
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                    
                    <div className="text-xs text-muted-foreground">
                      * Esta simulação é apenas uma estimativa e não garante resultados futuros.
                    </div>
                  </>
                )}
                
                {simulationData.length === 0 && !loading && (
                  <div className="flex flex-col items-center justify-center h-full py-10">
                    <CandlestickChart className="h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-center text-muted-foreground">
                      Configure os parâmetros e clique em "Simular Investimento" para visualizar os resultados.
                    </p>
                  </div>
                )}
                
                {loading && (
                  <div className="flex flex-col items-center justify-center h-full py-10">
                    <RefreshCw className="h-12 w-12 text-primary animate-spin mb-4" />
                    <p className="text-center">
                      Calculando sua simulação...
                    </p>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};
