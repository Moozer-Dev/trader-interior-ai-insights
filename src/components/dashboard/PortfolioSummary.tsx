
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ArrowUp, ArrowDown } from 'lucide-react';

const portfolioData = [
  { name: 'Jan', value: 10000 },
  { name: 'Fev', value: 12000 },
  { name: 'Mar', value: 9800 },
  { name: 'Abr', value: 11200 },
  { name: 'Mai', value: 13500 },
  { name: 'Jun', value: 14800 },
  { name: 'Jul', value: 16000 },
];

const assets = [
  { id: 1, name: 'PETR4', price: 28.45, change: 2.3, amount: 100, total: 2845.00 },
  { id: 2, name: 'VALE3', price: 67.82, change: -1.4, amount: 50, total: 3391.00 },
  { id: 3, name: 'ITUB4', price: 32.17, change: 0.8, amount: 120, total: 3860.40 },
  { id: 4, name: 'BBDC4', price: 18.23, change: 1.2, amount: 200, total: 3646.00 },
];

export const PortfolioSummary = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Visão Geral do Portfólio</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row justify-between gap-8">
            <div className="space-y-6">
              <div>
                <div className="text-muted-foreground mb-2">Valor Total</div>
                <div className="text-3xl font-bold">R$ 25.689,45</div>
                <div className="flex items-center text-trader-green mt-1">
                  <ArrowUp className="h-4 w-4 mr-1" />
                  <span className="text-sm">2,4% (este mês)</span>
                </div>
              </div>
              
              <div>
                <div className="text-muted-foreground mb-2">Retorno Total</div>
                <div className="text-2xl font-bold">R$ 3.245,18</div>
                <div className="flex items-center text-trader-green mt-1">
                  <ArrowUp className="h-4 w-4 mr-1" />
                  <span className="text-sm">14,5% (desde o início)</span>
                </div>
              </div>
            </div>
            
            <div className="w-full sm:w-3/5 h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={portfolioData}>
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
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle>Ativos no Portfólio</CardTitle>
            <Badge variant="outline">4 ativos</Badge>
          </div>
        </CardHeader>
        <CardContent>
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
                {assets.map((asset) => (
                  <tr key={asset.id} className="border-b border-border">
                    <td className="py-3 font-medium">{asset.name}</td>
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
                    <td>{asset.amount}</td>
                    <td className="text-right">R$ {asset.total.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
