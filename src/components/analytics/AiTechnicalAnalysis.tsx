
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { ArrowUp, ArrowDown, ChartBar, CircleArrowDown, CircleArrowUp } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import { cn } from '@/lib/utils';

// Mock price data
const priceData = [
  { date: '01/06', price: 32.55, volume: 4500000, ema20: 31.85, ema50: 31.20, rsi: 62 },
  { date: '02/06', price: 32.80, volume: 5200000, ema20: 32.05, ema50: 31.25, rsi: 65 },
  { date: '03/06', price: 33.10, volume: 6100000, ema20: 32.20, ema50: 31.30, rsi: 68 },
  { date: '04/06', price: 32.85, volume: 4800000, ema20: 32.30, ema50: 31.35, rsi: 64 },
  { date: '05/06', price: 33.25, volume: 5500000, ema20: 32.45, ema50: 31.40, rsi: 67 },
  { date: '06/06', price: 33.50, volume: 5800000, ema20: 32.60, ema50: 31.45, rsi: 70 },
  { date: '07/06', price: 33.75, volume: 6500000, ema20: 32.75, ema50: 31.50, rsi: 72 },
  { date: '08/06', price: 33.40, volume: 4900000, ema20: 32.85, ema50: 31.55, rsi: 66 },
  { date: '09/06', price: 33.65, volume: 5100000, ema20: 32.95, ema50: 31.60, rsi: 68 },
  { date: '10/06', price: 34.10, volume: 7200000, ema20: 33.10, ema50: 31.70, rsi: 73 },
  { date: '13/06', price: 34.30, volume: 6800000, ema20: 33.25, ema50: 31.80, rsi: 75 },
  { date: '14/06', price: 34.05, volume: 5700000, ema20: 33.35, ema50: 31.90, rsi: 71 },
  { date: '15/06', price: 34.50, volume: 6200000, ema20: 33.45, ema50: 32.00, rsi: 74 },
];

// Mock technical indicators
const indicators = [
  { name: 'Tendência', value: 'Alta', sentiment: 'positive', strength: 85 },
  { name: 'RSI (14)', value: '74', sentiment: 'neutral', strength: 60 },
  { name: 'MACD', value: 'Positivo', sentiment: 'positive', strength: 75 },
  { name: 'Médias Móveis', value: 'Acima', sentiment: 'positive', strength: 80 },
  { name: 'Suporte/Resistência', value: 'Próximo a resistência', sentiment: 'neutral', strength: 55 },
  { name: 'Bollinger Bands', value: 'Limite superior', sentiment: 'negative', strength: 40 },
  { name: 'Volume', value: 'Acima da média', sentiment: 'positive', strength: 70 },
  { name: 'Fibonacci', value: '38.2% retracement', sentiment: 'neutral', strength: 50 },
];

// Support and resistance levels
const levels = [
  { type: 'resistance', level: 34.80, strength: 'forte' },
  { type: 'resistance', level: 34.20, strength: 'moderada' },
  { type: 'current', level: 34.50, strength: 'atual' },
  { type: 'support', level: 33.80, strength: 'moderada' },
  { type: 'support', level: 33.20, strength: 'forte' },
];

export const AiTechnicalAnalysis: React.FC = () => {
  const [selectedStock, setSelectedStock] = useState('PETR4');
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>Análise Técnica com IA</CardTitle>
              <CardDescription>Interpretação automática de indicadores técnicos</CardDescription>
            </div>
            <Badge className="bg-accent/20 text-accent-foreground">
              Atualizado: Hoje, 16:30
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Stock Selection */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Ativo</label>
              <Input 
                value={selectedStock}
                onChange={(e) => setSelectedStock(e.target.value)}
                placeholder="Ex: PETR4"
                className="mb-2"
              />
              <div className="flex items-center text-sm">
                <span className="font-medium mr-2">Petrobras PN</span>
                <span className="text-muted-foreground">• B3 (BVMF)</span>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Timeframe</label>
              <Select defaultValue="daily">
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o período" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="minutes">15 minutos</SelectItem>
                  <SelectItem value="hourly">1 hora</SelectItem>
                  <SelectItem value="daily">Diário</SelectItem>
                  <SelectItem value="weekly">Semanal</SelectItem>
                  <SelectItem value="monthly">Mensal</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Preço Atual</label>
              <div className="flex items-center">
                <span className="text-2xl font-bold mr-3">R$ 34,50</span>
                <div className="flex items-center text-trader-green">
                  <ArrowUp className="h-4 w-4 mr-1" />
                  <span className="text-sm">1,3%</span>
                </div>
              </div>
              <div className="flex items-center mt-1 text-xs text-muted-foreground">
                <span>Volume: 6,2M</span>
                <span className="mx-2">•</span>
                <span>Abertura: R$ 34,05</span>
              </div>
            </div>
          </div>

          {/* Price Chart */}
          <Tabs defaultValue="price">
            <TabsList className="w-full">
              <TabsTrigger value="price" className="flex-1">Preço</TabsTrigger>
              <TabsTrigger value="indicators" className="flex-1">Indicadores</TabsTrigger>
              <TabsTrigger value="volume" className="flex-1">Volume</TabsTrigger>
              <TabsTrigger value="momentum" className="flex-1">Momentum</TabsTrigger>
            </TabsList>
            
            <TabsContent value="price" className="pt-4">
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={priceData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                    <XAxis dataKey="date" />
                    <YAxis domain={['dataMin - 0.5', 'dataMax + 0.5']} />
                    <Tooltip 
                      formatter={(value: number) => [`R$ ${value.toFixed(2)}`, '']}
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        borderColor: 'hsl(var(--border))',
                        borderRadius: '0.5rem'
                      }}
                    />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="price" 
                      name="Preço" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={2}
                      dot={{ stroke: 'hsl(var(--primary))', strokeWidth: 1, r: 3 }}
                      activeDot={{ stroke: 'hsl(var(--primary))', strokeWidth: 2, r: 5 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="ema20" 
                      name="EMA 20" 
                      stroke="hsl(var(--accent))" 
                      strokeWidth={1.5}
                      dot={false}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="ema50" 
                      name="EMA 50" 
                      stroke="#1E3A8A" 
                      strokeWidth={1.5}
                      strokeDasharray="3 3"
                      dot={false}
                    />
                    
                    {/* Support and resistance lines */}
                    {levels.filter(l => l.type !== 'current').map((level, i) => (
                      <ReferenceLine 
                        key={i} 
                        y={level.level} 
                        stroke={level.type === 'resistance' ? '#DC2626' : '#059669'} 
                        strokeDasharray="3 3"
                        label={{ 
                          value: `${level.type === 'resistance' ? 'R' : 'S'}: ${level.level.toFixed(2)}`, 
                          position: 'right',
                          fill: level.type === 'resistance' ? '#DC2626' : '#059669'
                        }}
                      />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
            
            <TabsContent value="indicators" className="pt-4">
              <div className="h-[400px]">
                {/* Chart content for indicators tab */}
              </div>
            </TabsContent>
            
            <TabsContent value="volume" className="pt-4">
              <div className="h-[400px]">
                {/* Chart content for volume tab */}
              </div>
            </TabsContent>
            
            <TabsContent value="momentum" className="pt-4">
              <div className="h-[400px]">
                {/* Chart content for momentum tab */}
              </div>
            </TabsContent>
          </Tabs>

          {/* Technical Analysis Summary */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Análise Técnica</CardTitle>
                <Badge 
                  className="bg-accent/20 text-accent-foreground"
                >
                  Recomendação: Compra
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-4">Resumo dos Indicadores</h4>
                  <div className="space-y-4">
                    {indicators.map((indicator, index) => (
                      <div key={index} className="space-y-1">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            {indicator.sentiment === 'positive' && (
                              <ArrowUp className="h-3 w-3 mr-2 text-trader-green" />
                            )}
                            {indicator.sentiment === 'negative' && (
                              <ArrowDown className="h-3 w-3 mr-2 text-trader-red" />
                            )}
                            {indicator.sentiment === 'neutral' && (
                              <span className="h-3 w-3 mr-2 inline-block border-t border-muted-foreground"></span>
                            )}
                            <span>{indicator.name}</span>
                          </div>
                          <span 
                            className={cn(
                              "font-medium",
                              indicator.sentiment === 'positive' && "text-trader-green",
                              indicator.sentiment === 'negative' && "text-trader-red"
                            )}
                          >
                            {indicator.value}
                          </span>
                        </div>
                        <Progress value={indicator.strength} className="h-1" />
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-4">Níveis Chave</h4>
                  <div className="space-y-3">
                    {levels.map((level, index) => (
                      <div 
                        key={index} 
                        className={cn(
                          "p-3 border rounded-md flex items-center justify-between",
                          level.type === 'resistance' ? "border-trader-red/30" : 
                          level.type === 'current' ? "bg-muted/30 border-primary/30" : 
                          "border-trader-green/30"
                        )}
                      >
                        <div className="flex items-center">
                          {level.type === 'resistance' ? (
                            <ArrowUp className="h-4 w-4 mr-2 text-trader-red" />
                          ) : level.type === 'current' ? (
                            <ChartBar className="h-4 w-4 mr-2 text-primary" />
                          ) : (
                            <ArrowDown className="h-4 w-4 mr-2 text-trader-green" />
                          )}
                          <span>
                            {level.type === 'resistance' && 'Resistência'}
                            {level.type === 'current' && 'Preço Atual'}
                            {level.type === 'support' && 'Suporte'}
                            {level.strength !== 'atual' && ` (${level.strength})`}
                          </span>
                        </div>
                        <span className="font-medium">R$ {level.level.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6">
                    <h4 className="font-medium mb-2">Próximos Movimentos</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <CircleArrowUp className="h-4 w-4 text-trader-green" />
                        <span>Alvo de alta: <span className="font-medium">R$ 36,20</span> (+4,9%)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CircleArrowDown className="h-4 w-4 text-trader-red" />
                        <span>Alvo de baixa: <span className="font-medium">R$ 33,20</span> (-3,8%)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 border-t pt-6">
                <h4 className="font-medium mb-3">Análise da IA</h4>
                <p className="text-sm text-muted-foreground">
                  A análise técnica da PETR4 indica uma tendência de alta de curto prazo, com o preço acima das médias móveis 
                  EMA de 20 e 50 períodos, sinalizando momentum positivo. O RSI em 74 sugere condições ligeiramente sobrecompradas, 
                  mas o volume de negociação acima da média confirma a força compradora. 
                  <br /><br />
                  O ativo encontra-se próximo à resistência em R$ 34,80, cuja superação pode abrir caminho para novos patamares de preço. 
                  A configuração do MACD permanece positiva, reforçando o viés de alta. No entanto, a proximidade com níveis de 
                  resistência e o RSI elevado sugerem cautela no curto prazo.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Trading Suggestions */}
          <Card>
            <CardHeader>
              <CardTitle>Sugestões Operacionais</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border-trader-green/30">
                  <CardHeader className="py-4">
                    <CardTitle className="text-trader-green flex items-center gap-2">
                      <ArrowUp className="h-4 w-4" />
                      Compra
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="py-2 space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Entrada</span>
                      <span className="font-medium">R$ 34,50</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Alvo 1</span>
                      <span className="font-medium">R$ 35,30</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Alvo 2</span>
                      <span className="font-medium">R$ 36,20</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Stop Loss</span>
                      <span className="font-medium">R$ 33,80</span>
                    </div>
                    <div className="flex justify-between text-sm mt-2">
                      <span>Risco/Retorno</span>
                      <span className="font-medium">1:2,4</span>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t py-3">
                    <Button className="w-full" variant="outline">Configurar Ordem</Button>
                  </CardFooter>
                </Card>

                <Card className="border-trader-red/30">
                  <CardHeader className="py-4">
                    <CardTitle className="text-trader-red flex items-center gap-2">
                      <ArrowDown className="h-4 w-4" />
                      Venda
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="py-2 space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Entrada</span>
                      <span className="font-medium">R$ 34,90</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Alvo 1</span>
                      <span className="font-medium">R$ 33,80</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Alvo 2</span>
                      <span className="font-medium">R$ 33,20</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Stop Loss</span>
                      <span className="font-medium">R$ 35,50</span>
                    </div>
                    <div className="flex justify-between text-sm mt-2">
                      <span>Risco/Retorno</span>
                      <span className="font-medium">1:1,8</span>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t py-3">
                    <Button className="w-full" variant="outline">Configurar Ordem</Button>
                  </CardFooter>
                </Card>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Considerações</h4>
                    <ul className="space-y-2 text-sm list-disc list-inside">
                      <li>Tendência geral de alta no médio prazo</li>
                      <li>Possibilidade de correção de curto prazo (RSI elevado)</li>
                      <li>Volume crescente confirmando movimento</li>
                      <li>Atenção ao rompimento da resistência em R$ 34,80</li>
                      <li>Divergências no MACD podem indicar reversão</li>
                    </ul>
                  </div>
                  
                  <div className="p-3 bg-muted/20 rounded-lg">
                    <h4 className="font-medium mb-2">Correlações</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Ibovespa</span>
                        <span className="text-trader-green">+0,85</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Petróleo Brent</span>
                        <span className="text-trader-green">+0,72</span>
                      </div>
                      <div className="flex justify-between">
                        <span>USD/BRL</span>
                        <span className="text-trader-red">-0,58</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </CardContent>
        <CardFooter className="flex justify-between border-t py-4">
          <Button variant="outline">Exportar Análise</Button>
          <div className="flex gap-2">
            <Button variant="outline">Criar Alerta</Button>
            <Button>Atualizar Análise</Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};
