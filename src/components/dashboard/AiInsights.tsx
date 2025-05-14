
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChartBar, ArrowUp, ArrowDown } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const predictionData = [
  { date: '01/06', actual: 32.5, predicted: 32.4 },
  { date: '02/06', actual: 32.7, predicted: 32.8 },
  { date: '03/06', actual: 32.9, predicted: 33.1 },
  { date: '04/06', actual: 33.2, predicted: 33.4 },
  { date: '05/06', actual: 33.5, predicted: 33.7 },
  { date: '06/06', actual: 33.8, predicted: null },
  { date: '07/06', actual: null, predicted: 34.0 },
  { date: '08/06', actual: null, predicted: 34.2 },
  { date: '09/06', actual: null, predicted: 34.4 },
  { date: '10/06', actual: null, predicted: 34.7 },
];

const aiRecommendations = [
  {
    asset: 'PETR4',
    action: 'buy',
    confidence: 85,
    reason: 'Tendência de alta baseada em dados históricos e indicadores técnicos positivos',
  },
  {
    asset: 'VALE3',
    action: 'hold',
    confidence: 72,
    reason: 'Volatilidade esperada no curto prazo devido a incertezas no mercado global',
  },
  {
    asset: 'BBDC4',
    action: 'sell',
    confidence: 64,
    reason: 'Indicadores fundamentalistas apontam para possível desvalorização',
  }
];

export const AiInsights: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-2">
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
            <div>
              <CardTitle>Previsão de Preços</CardTitle>
              <CardDescription>IA Forecast para PETR4</CardDescription>
            </div>
            <Badge variant="outline" className="flex items-center gap-1 bg-accent/20 text-accent-foreground self-start">
              <ChartBar className="h-3 w-3" />
              Precisão: 92%
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={predictionData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  formatter={(value: number) => [`${value.toFixed(2)}%`, 'Rentabilidade']}
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    borderColor: 'hsl(var(--border))',
                    borderRadius: '0.5rem'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="actual" 
                  name="Preço Atual" 
                  stroke="hsl(var(--primary))" 
                  fillOpacity={1} 
                  strokeWidth={2}
                  fill="url(#colorActual)" 
                  isAnimationActive={false}
                />
                <Area 
                  type="monotone" 
                  dataKey="predicted" 
                  name="Previsão" 
                  stroke="hsl(var(--accent))" 
                  fillOpacity={1} 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  fill="url(#colorPredicted)" 
                  isAnimationActive={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex flex-wrap gap-2 items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Previsão baseada em dados históricos, indicadores técnicos e sentimento do mercado
            </div>
            <Button>Gerar Nova Previsão</Button>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Recomendações de IA</CardTitle>
          <CardDescription>Análise baseada em machine learning</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {aiRecommendations.map((rec, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="font-medium">{rec.asset}</div>
                  <Badge variant={rec.action === 'buy' ? 'default' : rec.action === 'sell' ? 'destructive' : 'outline'}>
                    {rec.action === 'buy' && (
                      <div className="flex items-center">
                        <ArrowUp className="h-3 w-3 mr-1" />
                        Comprar
                      </div>
                    )}
                    {rec.action === 'sell' && (
                      <div className="flex items-center">
                        <ArrowDown className="h-3 w-3 mr-1" />
                        Vender
                      </div>
                    )}
                    {rec.action === 'hold' && 'Manter'}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Confiança</span>
                  <span className="font-medium">{rec.confidence}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-1.5">
                  <div 
                    className="rounded-full h-1.5" 
                    style={{ 
                      width: `${rec.confidence}%`,
                      backgroundColor: rec.action === 'buy' 
                        ? 'hsl(var(--accent))' 
                        : rec.action === 'sell' 
                          ? 'hsl(var(--destructive))' 
                          : 'hsl(var(--primary))',
                    }}
                  ></div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{rec.reason}</p>
              </div>
            ))}
            <Button className="w-full" variant="outline">Ver Análise Completa</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
