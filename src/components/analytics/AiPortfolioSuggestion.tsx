
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { ArrowUp, ArrowDown, CircleArrowDown } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { cn } from '@/lib/utils';

// Risk profiles
const riskProfiles = [
  { id: 'conservative', name: 'Conservador', description: 'Prioriza segurança e preservação do capital' },
  { id: 'moderate', name: 'Moderado', description: 'Equilíbrio entre segurança e crescimento' },
  { id: 'aggressive', name: 'Arrojado', description: 'Busca maximizar retornos, aceitando maior volatilidade' }
];

// Portfolio suggestions based on risk
const portfolioSuggestions = {
  conservative: [
    { name: 'Renda Fixa', allocation: 65, color: 'hsl(var(--primary))' },
    { name: 'Multimercado', allocation: 15, color: 'hsl(var(--accent))' },
    { name: 'Ações', allocation: 10, color: '#1E3A8A' },
    { name: 'Internacional', allocation: 5, color: '#DC2626' },
    { name: 'Criptomoedas', allocation: 5, color: '#059669' },
  ],
  moderate: [
    { name: 'Renda Fixa', allocation: 40, color: 'hsl(var(--primary))' },
    { name: 'Ações', allocation: 30, color: '#1E3A8A' },
    { name: 'Multimercado', allocation: 15, color: 'hsl(var(--accent))' },
    { name: 'Internacional', allocation: 10, color: '#DC2626' },
    { name: 'Criptomoedas', allocation: 5, color: '#059669' },
  ],
  aggressive: [
    { name: 'Ações', allocation: 45, color: '#1E3A8A' },
    { name: 'Renda Fixa', allocation: 20, color: 'hsl(var(--primary))' },
    { name: 'Internacional', allocation: 15, color: '#DC2626' },
    { name: 'Criptomoedas', allocation: 10, color: '#059669' },
    { name: 'Multimercado', allocation: 10, color: 'hsl(var(--accent))' },
  ],
};

// Asset recommendations
const assetRecommendations = {
  conservative: [
    { type: 'Tesouro Direto', name: 'Tesouro IPCA+ 2026', allocation: 30, expected: 6.2 },
    { type: 'CDB', name: 'Banco XYZ 120% CDI', allocation: 20, expected: 5.8 },
    { type: 'Fundo RF', name: 'Fundo Crédito Privado', allocation: 15, expected: 7.0 },
    { type: 'Fundo Multimercado', name: 'Fundo Macro Brasil', allocation: 15, expected: 8.5 },
    { type: 'ETF', name: 'BOVA11', allocation: 10, expected: 9.0 },
    { type: 'Fundo Internacional', name: 'Fundo Global Tech', allocation: 5, expected: 10.0 },
    { type: 'ETF Cripto', name: 'HASH11', allocation: 5, expected: 12.0 },
  ],
  moderate: [
    { type: 'Tesouro Direto', name: 'Tesouro IPCA+ 2026', allocation: 20, expected: 6.2 },
    { type: 'CDB', name: 'Banco XYZ 120% CDI', allocation: 20, expected: 5.8 },
    { type: 'Ações', name: 'PETR4, VALE3, ITUB4', allocation: 20, expected: 11.5 },
    { type: 'ETF', name: 'BOVA11', allocation: 10, expected: 9.0 },
    { type: 'Fundo Multimercado', name: 'Fundo Macro Brasil', allocation: 15, expected: 8.5 },
    { type: 'Fundo Internacional', name: 'Fundo Global Tech', allocation: 10, expected: 10.0 },
    { type: 'ETF Cripto', name: 'HASH11', allocation: 5, expected: 12.0 },
  ],
  aggressive: [
    { type: 'Ações', name: 'PETR4, VALE3, ITUB4, MGLU3', allocation: 30, expected: 12.5 },
    { type: 'Small Caps', name: 'CASH3, LWSA3, PETZ3', allocation: 15, expected: 14.0 },
    { type: 'Tesouro Direto', name: 'Tesouro IPCA+ 2026', allocation: 10, expected: 6.2 },
    { type: 'CDB', name: 'Banco XYZ 120% CDI', allocation: 10, expected: 5.8 },
    { type: 'Fundo Internacional', name: 'Fundo Global Tech', allocation: 15, expected: 10.0 },
    { type: 'Criptomoedas', name: 'BTC, ETH, SOL', allocation: 10, expected: 15.0 },
    { type: 'Fundo Multimercado', name: 'Fundo Macro Brasil', allocation: 10, expected: 8.5 },
  ],
};

export const AiPortfolioSuggestion: React.FC = () => {
  const [selectedRisk, setSelectedRisk] = useState('moderate');
  const [riskTolerance, setRiskTolerance] = useState([5]); // 1-10 scale

  // Dynamically adjust portfolio based on risk tolerance slider
  const getAdjustedRiskProfile = () => {
    const riskValue = riskTolerance[0];
    
    if (riskValue <= 3) return 'conservative';
    if (riskValue <= 7) return 'moderate';
    return 'aggressive';
  };
  
  const currentRiskProfile = getAdjustedRiskProfile();
  const currentPortfolio = portfolioSuggestions[currentRiskProfile as keyof typeof portfolioSuggestions];
  const currentAssets = assetRecommendations[currentRiskProfile as keyof typeof assetRecommendations];

  // Calculate expected return based on current portfolio
  const calculateExpectedReturn = () => {
    let totalReturn = 0;
    currentAssets.forEach(asset => {
      totalReturn += (asset.allocation / 100) * asset.expected;
    });
    return totalReturn.toFixed(1);
  };

  const handleRiskChange = (value: number[]) => {
    setRiskTolerance(value);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Sugestão de Portfólio com IA</CardTitle>
          <CardDescription>Recomendações personalizadas baseadas no seu perfil de risco</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Risk Profile Selection */}
          <div>
            <h3 className="text-base font-medium mb-4">Defina seu perfil de risco</h3>
            <div className="space-y-3">
              <label className="text-sm font-medium block">Tolerância ao risco</label>
              <div className="px-1">
                <Slider
                  defaultValue={[5]}
                  value={riskTolerance}
                  onValueChange={handleRiskChange}
                  max={10}
                  step={1}
                />
                <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                  <span>Conservador</span>
                  <span>Moderado</span>
                  <span>Arrojado</span>
                </div>
              </div>
            </div>
            
            <div className="mt-6 p-4 border rounded-lg bg-muted/20">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">Perfil Atual: {currentRiskProfile === 'conservative' ? 'Conservador' : currentRiskProfile === 'moderate' ? 'Moderado' : 'Arrojado'}</h4>
                <Badge variant="outline" className="bg-accent/20 text-accent-foreground">
                  Retorno esperado: {calculateExpectedReturn()}% a.a.
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                {currentRiskProfile === 'conservative' && 'Você prioriza a segurança e preservação do capital, aceitando retornos moderados com baixa volatilidade.'}
                {currentRiskProfile === 'moderate' && 'Você busca um equilíbrio entre segurança e crescimento, aceitando alguma volatilidade em troca de retornos maiores.'}
                {currentRiskProfile === 'aggressive' && 'Você busca maximizar os retornos e aceita maior volatilidade e risco em troca de potenciais ganhos superiores.'}
              </p>
            </div>
          </div>

          {/* Portfolio Allocation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            <div>
              <h3 className="text-base font-medium mb-4">Alocação Recomendada</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={currentPortfolio}
                      dataKey="allocation"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={120}
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {currentPortfolio.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value) => [`${value}%`, 'Alocação']}
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        borderColor: 'hsl(var(--border))',
                        borderRadius: '0.5rem'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div>
              <h3 className="text-base font-medium mb-4">Distribuição por Classe de Ativo</h3>
              <div className="space-y-4">
                {currentPortfolio.map((item, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                        <span className="font-medium">{item.name}</span>
                      </div>
                      <span>{item.allocation}%</span>
                    </div>
                    <Progress value={item.allocation} className="h-1.5" />
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 border rounded-lg bg-muted/20">
                <h4 className="font-medium mb-2">Justificativa da IA</h4>
                <p className="text-sm text-muted-foreground">
                  {currentRiskProfile === 'conservative' && 'Esta alocação prioriza ativos de menor risco como renda fixa e fundos multimercado, com exposição limitada a ativos de maior volatilidade. Adequada para preservação de capital com retorno acima da inflação.'}
                  {currentRiskProfile === 'moderate' && 'Esta alocação equilibra segurança e crescimento, com exposição moderada a ativos de crescimento como ações e fundos internacionais, mantendo uma base em renda fixa para estabilidade.'}
                  {currentRiskProfile === 'aggressive' && 'Esta alocação maximiza o potencial de retorno com maior exposição a ações e criptoativos, mantendo uma parcela em renda fixa para reduzir a volatilidade geral da carteira.'}
                </p>
              </div>
            </div>
          </div>

          {/* Asset Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle>Ativos Recomendados</CardTitle>
              <CardDescription>Sugestões específicas para cada categoria de investimento</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 text-sm font-medium">Tipo</th>
                      <th className="text-left py-3 px-2 text-sm font-medium">Ativo</th>
                      <th className="text-center py-3 px-2 text-sm font-medium">Alocação</th>
                      <th className="text-right py-3 px-2 text-sm font-medium">Retorno Esperado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentAssets.map((asset, index) => (
                      <tr key={index} className="border-b last:border-0">
                        <td className="py-3 px-2 text-sm">{asset.type}</td>
                        <td className="py-3 px-2 text-sm">{asset.name}</td>
                        <td className="py-3 px-2 text-sm text-center">{asset.allocation}%</td>
                        <td className="py-3 px-2 text-sm text-right">{asset.expected.toFixed(1)}% a.a.</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Implementation Strategy */}
          <Card>
            <CardHeader>
              <CardTitle>Estratégia de Implementação</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Abordagem Recomendada</h4>
                  <p className="text-sm text-muted-foreground">
                    Para implementar esta carteira de forma eficiente, recomendamos uma estratégia de entrada gradual no mercado, 
                    utilizando compras parceladas ao longo de 3 meses para reduzir o risco de timing. 
                    Priorize inicialmente a alocação em renda fixa para garantir uma base estável, seguida por ativos de maior risco.
                  </p>
                </div>
                
                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-2">Ordem de Prioridade</h4>
                  <ol className="space-y-2 list-decimal list-inside text-sm">
                    <li>Estabelecer a base em renda fixa (Tesouro Direto e CDBs)</li>
                    <li>Adicionar posição em fundos multimercado</li>
                    <li>Iniciar posições em ETFs de índice</li>
                    <li>Adicionar ações individuais</li>
                    <li>Incorporar exposição internacional</li>
                    {currentRiskProfile !== 'conservative' && <li>Adicionar exposição a criptoativos (de modo conservador)</li>}
                  </ol>
                </div>
                
                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-2">Rebalanceamento</h4>
                  <p className="text-sm text-muted-foreground">
                    Revise a carteira trimestralmente e faça rebalanceamento quando a alocação real desviar mais de 5% da alocação alvo.
                    Considere aspectos tributários no rebalanceamento para otimizar o resultado após impostos.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </CardContent>
        <CardFooter className="flex justify-between border-t py-4">
          <Button variant="outline">Exportar Recomendação</Button>
          <div className="flex gap-2">
            <Button>Implementar Estratégia</Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};
