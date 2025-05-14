
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChartBar } from 'lucide-react';
import { AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Mock prediction data
const predictionData = [
  { date: '01/06', actual: 32.5, predicted: 32.4, lower: 32.2, upper: 32.6 },
  { date: '02/06', actual: 32.7, predicted: 32.8, lower: 32.5, upper: 33.1 },
  { date: '03/06', actual: 32.9, predicted: 33.1, lower: 32.7, upper: 33.5 },
  { date: '04/06', actual: 33.2, predicted: 33.4, lower: 33.0, upper: 33.8 },
  { date: '05/06', actual: 33.5, predicted: 33.7, lower: 33.2, upper: 34.2 },
  { date: '06/06', actual: null, predicted: 33.9, lower: 33.3, upper: 34.5 },
  { date: '07/06', actual: null, predicted: 34.2, lower: 33.5, upper: 34.9 },
  { date: '08/06', actual: null, predicted: 34.5, lower: 33.7, upper: 35.3 },
  { date: '09/06', actual: null, predicted: 34.8, lower: 33.9, upper: 35.7 },
  { date: '10/06', actual: null, predicted: 35.1, lower: 34.0, upper: 36.2 },
];

// Accuracy metrics
const accuracyMetrics = [
  { name: 'MAPE', value: '2.8%', description: 'Erro percentual médio absoluto' },
  { name: 'RMSE', value: '0.32', description: 'Raiz do erro quadrático médio' },
  { name: 'MAE', value: '0.24', description: 'Erro absoluto médio' },
  { name: 'R²', value: '0.86', description: 'Coeficiente de determinação' },
];

export const AiPricePredictor: React.FC = () => {
  const [selectedStock, setSelectedStock] = useState('PETR4');
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>Previsão de Preços com IA</CardTitle>
              <CardDescription>Projeção de preços futuros baseada em machine learning</CardDescription>
            </div>
            <Badge className="flex items-center gap-1 bg-accent/20 text-accent-foreground">
              <ChartBar className="h-3 w-3" />
              Precisão: 92%
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Input Controls */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Ativo</label>
              <Input 
                value={selectedStock}
                onChange={(e) => setSelectedStock(e.target.value)}
                placeholder="Ex: PETR4"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Modelo</label>
              <Select defaultValue="arima">
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o modelo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="arima">ARIMA (Séries Temporais)</SelectItem>
                  <SelectItem value="lstm">LSTM (Deep Learning)</SelectItem>
                  <SelectItem value="prophet">Prophet (Facebook)</SelectItem>
                  <SelectItem value="ensemble">Ensemble (Combinado)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Horizonte de Previsão</label>
              <Select defaultValue="5days">
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o período" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3days">3 dias</SelectItem>
                  <SelectItem value="5days">5 dias</SelectItem>
                  <SelectItem value="1week">1 semana</SelectItem>
                  <SelectItem value="2weeks">2 semanas</SelectItem>
                  <SelectItem value="1month">1 mês</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Prediction Chart */}
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={predictionData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                <YAxis 
                  domain={['dataMin - 1', 'dataMax + 1']} 
                  stroke="hsl(var(--muted-foreground))" 
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    borderColor: 'hsl(var(--border))',
                    borderRadius: '0.5rem'
                  }}
                  formatter={(value: number) => value ? [`R$ ${value.toFixed(2)}`, ''] : ['N/A', '']}
                />
                <Legend />
                
                {/* Confidence Interval */}
                <Area 
                  type="monotone" 
                  dataKey="upper" 
                  stroke="transparent"
                  fill="url(#splitColor)" 
                  name="Intervalo de Confiança (95%)"
                />
                <Area 
                  type="monotone" 
                  dataKey="lower" 
                  stroke="transparent"
                  fill="transparent"
                  name=" "
                />
                
                {/* Actual & Predicted Lines */}
                <Line 
                  type="monotone" 
                  dataKey="actual" 
                  name="Preço Real" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  dot={{ stroke: 'hsl(var(--primary))', strokeWidth: 2, r: 4, fill: 'hsl(var(--background))' }}
                  activeDot={{ stroke: 'hsl(var(--primary))', strokeWidth: 2, r: 6, fill: 'hsl(var(--primary))' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="predicted" 
                  name="Preço Previsto" 
                  stroke="hsl(var(--accent))" 
                  strokeWidth={2}
                  strokeDasharray="4 4"
                  dot={{ stroke: 'hsl(var(--accent))', strokeWidth: 2, r: 3 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {accuracyMetrics.map((metric) => (
              <Card key={metric.name} className="text-center">
                <CardHeader className="pb-2 pt-4">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{metric.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{metric.value}</div>
                  <p className="text-xs text-muted-foreground mt-1">{metric.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Análise de Fatores</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Principais Fatores de Influência</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Tendência histórica</span>
                        <span>40%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-1.5">
                        <div className="rounded-full h-1.5 bg-primary" style={{ width: '40%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Preço do petróleo</span>
                        <span>25%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-1.5">
                        <div className="rounded-full h-1.5 bg-primary" style={{ width: '25%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Câmbio USD/BRL</span>
                        <span>15%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-1.5">
                        <div className="rounded-full h-1.5 bg-primary" style={{ width: '15%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Índice Ibovespa</span>
                        <span>10%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-1.5">
                        <div className="rounded-full h-1.5 bg-primary" style={{ width: '10%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Sazonalidade</span>
                        <span>8%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-1.5">
                        <div className="rounded-full h-1.5 bg-primary" style={{ width: '8%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Outros fatores</span>
                        <span>2%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-1.5">
                        <div className="rounded-full h-1.5 bg-primary" style={{ width: '2%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-2">Insights do Modelo</h4>
                  <p className="text-sm text-muted-foreground">
                    A tendência de alta observada nos últimos 5 dias deve continuar nos próximos períodos, 
                    impulsionada principalmente pela valorização do petróleo no mercado internacional e pela 
                    estabilidade do dólar. Espera-se uma possível aceleração da alta caso o preço rompa a resistência 
                    em R$ 34,00, com potencial para atingir R$ 36,00 no médio prazo.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </CardContent>
        <CardFooter className="flex justify-between border-t py-4">
          <Button variant="outline">Exportar Dados</Button>
          <div className="flex gap-2">
            <Button variant="outline">Configurar Alerta</Button>
            <Button>Gerar Nova Previsão</Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};
