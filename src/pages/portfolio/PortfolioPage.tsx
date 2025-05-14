
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowUp, ArrowDown, ChartBar, CircleArrowDown } from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import { PortfolioSummary } from '@/components/dashboard/PortfolioSummary';
import { cn } from '@/lib/utils';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, AreaChart, Area, ReferenceLine } from 'recharts';

// Portfolio data
const portfolioDistribution = [
  { name: 'Ações', value: 45, color: 'hsl(var(--primary))' },
  { name: 'Renda Fixa', value: 30, color: 'hsl(var(--accent))' },
  { name: 'Criptomoedas', value: 15, color: '#1E3A8A' },
  { name: 'Fundos', value: 10, color: '#DC2626' },
];

const historicalPerformance = [
  { month: 'Jan', return: 3.5 },
  { month: 'Fev', return: 2.1 },
  { month: 'Mar', return: -1.2 },
  { month: 'Abr', return: 4.3 },
  { month: 'Mai', return: 2.8 },
  { month: 'Jun', return: -0.7 },
  { month: 'Jul', return: 1.5 },
  { month: 'Ago', return: 0.9 },
  { month: 'Set', return: 3.2 },
  { month: 'Out', return: -1.8 },
  { month: 'Nov', return: 2.4 },
  { month: 'Dez', return: 4.1 },
];

const simulationData = [
  { id: 1, name: 'Conservadora', assets: 'Tesouro Direto, CDBs, LCI/LCA', return: '8.5% a.a.', risk: 'Baixo' },
  { id: 2, name: 'Moderada', assets: 'Tesouro Direto, Fundos, Ações', return: '12.7% a.a.', risk: 'Médio' },
  { id: 3, name: 'Arrojada', assets: 'Ações, ETFs, Cripto', return: '18.2% a.a.', risk: 'Alto' },
];

const PortfolioPage: React.FC = () => {
  const [selectedSimulation, setSelectedSimulation] = useState<number | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Portfólio</h1>
          <p className="text-muted-foreground">Gerenciamento de investimentos</p>
        </div>
        <div className="flex items-center gap-2 self-start">
          <Button>Adicionar Investimento</Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="w-full">
          <TabsTrigger value="overview" className="flex-1">Visão Geral</TabsTrigger>
          <TabsTrigger value="assets" className="flex-1">Ativos</TabsTrigger>
          <TabsTrigger value="performance" className="flex-1">Desempenho</TabsTrigger>
          <TabsTrigger value="simulation" className="flex-1">Simulação</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Investido</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div className="text-2xl font-bold">R$ 25.689,45</div>
                </div>
                <div className="mt-2">
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>Depósitos: R$ 22.500,00</span>
                    <span>Rendimento: +14,2%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Rentabilidade Anual</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div className="text-2xl font-bold">+10,7%</div>
                  <Badge variant="outline" className="bg-accent/20 text-accent-foreground">
                    +2,5% CDI
                  </Badge>
                </div>
                <div className="mt-2">
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>IBOV: +8,3%</span>
                    <span>CDI: +8,2%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Patrimônio Total</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div className="text-2xl font-bold">R$ 32.456,78</div>
                  <div className="flex items-center text-trader-green">
                    <ArrowUp className="h-4 w-4 mr-1" />
                    <span className="text-sm">+1,8% hoje</span>
                  </div>
                </div>
                <div className="mt-2">
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>Mês passado: R$ 31.240,45</span>
                    <span>+3,9% mensal</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Ativos em Carteira</CardTitle>
                <CardDescription>Visão detalhada do seu portfólio</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <PortfolioSummary />
              </CardContent>
              <CardFooter className="flex justify-between items-center border-t p-4">
                <span className="text-sm text-muted-foreground">Última atualização: 10 minutos atrás</span>
                <Button size="sm" variant="outline">Ver Detalhes</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Distribuição</CardTitle>
                <CardDescription>Alocação por classe de ativos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={portfolioDistribution}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {portfolioDistribution.map((entry, index) => (
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
                
                <div className="mt-4 space-y-3">
                  {portfolioDistribution.map((item, index) => (
                    <div key={index} className="flex justify-between items-center text-sm">
                      <div className="flex items-center">
                        <div className="h-3 w-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
                        <span>{item.name}</span>
                      </div>
                      <div>
                        <span>{item.value}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="assets" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <Card className="md:col-span-8">
              <CardHeader>
                <CardTitle>Detalhamento dos Ativos</CardTitle>
                <CardDescription>Análise completa por tipo de investimento</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Ativo</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead className="text-right">Qtde</TableHead>
                      <TableHead className="text-right">Preço Médio</TableHead>
                      <TableHead className="text-right">Preço Atual</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                      <TableHead className="text-right">Rentab.</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow className="cursor-pointer hover:bg-muted/50">
                      <TableCell>
                        <div className="font-medium">PETR4</div>
                        <div className="text-xs text-muted-foreground">Petrobras</div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Ação</Badge>
                      </TableCell>
                      <TableCell className="text-right">100</TableCell>
                      <TableCell className="text-right">R$ 28,75</TableCell>
                      <TableCell className="text-right">R$ 32,55</TableCell>
                      <TableCell className="text-right">R$ 3.255,00</TableCell>
                      <TableCell>
                        <div className="flex items-center justify-end text-trader-green">
                          <ArrowUp className="h-3 w-3 mr-1" />
                          <span>12,5%</span>
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow className="cursor-pointer hover:bg-muted/50">
                      <TableCell>
                        <div className="font-medium">VALE3</div>
                        <div className="text-xs text-muted-foreground">Vale</div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Ação</Badge>
                      </TableCell>
                      <TableCell className="text-right">50</TableCell>
                      <TableCell className="text-right">R$ 71,62</TableCell>
                      <TableCell className="text-right">R$ 67,89</TableCell>
                      <TableCell className="text-right">R$ 3.394,50</TableCell>
                      <TableCell>
                        <div className="flex items-center justify-end text-trader-red">
                          <ArrowDown className="h-3 w-3 mr-1" />
                          <span>5,2%</span>
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow className="cursor-pointer hover:bg-muted/50">
                      <TableCell>
                        <div className="font-medium">Tesouro IPCA+</div>
                        <div className="text-xs text-muted-foreground">2028</div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Renda Fixa</Badge>
                      </TableCell>
                      <TableCell className="text-right">1</TableCell>
                      <TableCell className="text-right">R$ 5.000,00</TableCell>
                      <TableCell className="text-right">R$ 5.485,32</TableCell>
                      <TableCell className="text-right">R$ 5.485,32</TableCell>
                      <TableCell>
                        <div className="flex items-center justify-end text-trader-green">
                          <ArrowUp className="h-3 w-3 mr-1" />
                          <span>9,7%</span>
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow className="cursor-pointer hover:bg-muted/50">
                      <TableCell>
                        <div className="font-medium">Bitcoin</div>
                        <div className="text-xs text-muted-foreground">BTC</div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Cripto</Badge>
                      </TableCell>
                      <TableCell className="text-right">0,05</TableCell>
                      <TableCell className="text-right">R$ 180.000,00</TableCell>
                      <TableCell className="text-right">R$ 185.420,00</TableCell>
                      <TableCell className="text-right">R$ 9.271,00</TableCell>
                      <TableCell>
                        <div className="flex items-center justify-end text-trader-green">
                          <ArrowUp className="h-3 w-3 mr-1" />
                          <span>3,0%</span>
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow className="cursor-pointer hover:bg-muted/50">
                      <TableCell>
                        <div className="font-medium">CDB Banco XYZ</div>
                        <div className="text-xs text-muted-foreground">120% CDI</div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Renda Fixa</Badge>
                      </TableCell>
                      <TableCell className="text-right">1</TableCell>
                      <TableCell className="text-right">R$ 3.000,00</TableCell>
                      <TableCell className="text-right">R$ 3.245,75</TableCell>
                      <TableCell className="text-right">R$ 3.245,75</TableCell>
                      <TableCell>
                        <div className="flex items-center justify-end text-trader-green">
                          <ArrowUp className="h-3 w-3 mr-1" />
                          <span>8,2%</span>
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow className="cursor-pointer hover:bg-muted/50">
                      <TableCell>
                        <div className="font-medium">FII XPLG11</div>
                        <div className="text-xs text-muted-foreground">XP Log</div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Fundo</Badge>
                      </TableCell>
                      <TableCell className="text-right">30</TableCell>
                      <TableCell className="text-right">R$ 104,23</TableCell>
                      <TableCell className="text-right">R$ 98,45</TableCell>
                      <TableCell className="text-right">R$ 2.953,50</TableCell>
                      <TableCell>
                        <div className="flex items-center justify-end text-trader-red">
                          <ArrowDown className="h-3 w-3 mr-1" />
                          <span>5,5%</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card className="md:col-span-4">
              <CardHeader>
                <CardTitle>Estatísticas</CardTitle>
                <CardDescription>Métricas da carteira</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <h3 className="text-sm font-medium">Diversificação</h3>
                    <span className="text-sm">70%</span>
                  </div>
                  <Progress value={70} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-2">
                    Sua carteira possui uma diversificação adequada, mas pode melhorar a exposição em diferentes setores.
                  </p>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <h3 className="text-sm font-medium">Risco</h3>
                    <span className="text-sm">65%</span>
                  </div>
                  <Progress value={65} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-2">
                    Perfil moderado com leve tendência para agressivo. Considere balancear com mais ativos de renda fixa.
                  </p>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <h3 className="text-sm font-medium">Performance vs. IBOV</h3>
                    <span className="text-sm text-trader-green">+2,4%</span>
                  </div>
                  <Progress value={65} className="h-2 bg-muted" />
                  <div className="h-2 w-3/5 bg-accent absolute top-0 rounded-full"></div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Sua carteira está performando acima do Ibovespa nos últimos 12 meses.
                  </p>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <h3 className="text-sm font-medium">Liquidez</h3>
                    <span className="text-sm">85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-2">
                    Grande parte dos seus investimentos pode ser resgatada em D+1.
                  </p>
                </div>
                
                <Button className="w-full mt-4">Análise Completa</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Histórico de Rentabilidade</CardTitle>
                <CardDescription>Desempenho mensal da carteira</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={historicalPerformance}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="month" />
                      <YAxis 
                        tickFormatter={(value) => `${value}%`}
                        domain={[-3, 5]}
                      />
                      <Tooltip 
                        formatter={(value: number) => [`${value.toFixed(2)}%`, 'Rentabilidade']}
                        contentStyle={{
                          backgroundColor: 'hsl(var(--card))',
                          borderColor: 'hsl(var(--border))',
                          borderRadius: '0.5rem'
                        }}
                      />
                      <Bar dataKey="return" name="Rentabilidade">
                        {historicalPerformance.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={entry.return >= 0 ? 'hsl(var(--accent))' : 'hsl(var(--destructive))'}
                          />
                        ))}
                      </Bar>
                      <ReferenceLine y={0} stroke="hsl(var(--border))" />
                      <Legend />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="py-3">
                      <CardTitle className="text-sm">Retorno Anualizado</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-trader-green">+12,8%</div>
                      <p className="text-xs text-muted-foreground mt-1">Últimos 12 meses</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="py-3">
                      <CardTitle className="text-sm">Volatilidade</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">18,5%</div>
                      <p className="text-xs text-muted-foreground mt-1">Desvio padrão anualizado</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="py-3">
                      <CardTitle className="text-sm">Índice de Sharpe</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">0,68</div>
                      <p className="text-xs text-muted-foreground mt-1">Risco/retorno ajustado</p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Comparativo de Performance</CardTitle>
                <CardDescription>Seu portfólio vs. Benchmarks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="portfolio" 
                        name="Seu Portfólio" 
                        stroke="hsl(var(--primary))" 
                        strokeWidth={3} 
                        dot={{ stroke: 'hsl(var(--primary))', strokeWidth: 2, r: 5 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="ibovespa" 
                        name="Ibovespa" 
                        stroke="hsl(var(--accent))"
                        strokeWidth={2} 
                        strokeDasharray="5 5"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="cdi" 
                        name="CDI" 
                        stroke="#1E3A8A"
                        strokeWidth={2}
                        strokeDasharray="3 3" 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="mt-6 text-sm">
                  <div className="border-t pt-4">
                    <h4 className="font-medium mb-2">Análise de Desempenho</h4>
                    <p className="text-muted-foreground">
                      Sua carteira tem superado o Ibovespa em 8 dos últimos 12 meses, com uma rentabilidade acumulada 4,3% superior. 
                      Em relação ao CDI, a performance é 2,5% acima, indicando um bom equilíbrio entre risco e retorno.
                    </p>
                  </div>
                  
                  <div className="border-t pt-4 mt-4">
                    <h4 className="font-medium mb-2">Recomendações</h4>
                    <ul className="space-y-2 list-disc pl-5">
                      <li>Aumente exposição em renda fixa para reduzir a volatilidade</li>
                      <li>Rebalanceie os ativos para manter a alocação desejada</li>
                      <li>Considere diversificar com ativos internacionais</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="simulation" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <Card className="lg:col-span-5">
              <CardHeader>
                <CardTitle>Simulações de Carteira</CardTitle>
                <CardDescription>Modelos de alocação baseados no seu perfil</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {simulationData.map((simulation) => (
                    <div 
                      key={simulation.id} 
                      className={cn(
                        "p-4 border rounded-lg cursor-pointer hover:border-primary transition-all",
                        selectedSimulation === simulation.id ? "border-primary bg-primary/5" : ""
                      )}
                      onClick={() => setSelectedSimulation(simulation.id)}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium">{simulation.name}</h3>
                        <Badge variant={
                          simulation.risk === 'Baixo' 
                            ? 'outline' 
                            : simulation.risk === 'Médio'
                            ? 'secondary'
                            : 'default'
                        }>
                          {simulation.risk}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground mb-2">
                        {simulation.assets}
                      </div>
                      <div className="flex items-center">
                        <CircleArrowDown className="h-4 w-4 mr-2 text-accent" />
                        <span>Retorno esperado: {simulation.return}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-7">
              <CardHeader>
                <CardTitle>Simulação de Investimento</CardTitle>
                <CardDescription>Projeção de crescimento ao longo do tempo</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Valor Inicial</label>
                    <div className="relative">
                      <span className="absolute left-3 top-[9px] text-muted-foreground">R$</span>
                      <input type="text" className="w-full pl-8 rounded-md border border-input bg-transparent px-3 py-2" placeholder="1.000,00" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Aporte Mensal</label>
                    <div className="relative">
                      <span className="absolute left-3 top-[9px] text-muted-foreground">R$</span>
                      <input type="text" className="w-full pl-8 rounded-md border border-input bg-transparent px-3 py-2" placeholder="500,00" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Período (anos)</label>
                    <input type="number" className="w-full rounded-md border border-input bg-transparent px-3 py-2" placeholder="10" min="1" max="50" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Rentabilidade</label>
                    <div className="relative">
                      <input type="text" className="w-full pr-8 rounded-md border border-input bg-transparent px-3 py-2" placeholder="10,0" />
                      <span className="absolute right-3 top-[9px] text-muted-foreground">%</span>
                    </div>
                  </div>
                </div>

                <div className="h-[200px] mb-6">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={[
                        { year: '2023', value: 10000 },
                        { year: '2024', value: 16500 },
                        { year: '2025', value: 23800 },
                        { year: '2026', value: 32000 },
                        { year: '2027', value: 41200 },
                        { year: '2028', value: 51500 },
                        { year: '2029', value: 63000 },
                        { year: '2030', value: 75800 },
                        { year: '2031', value: 90000 },
                        { year: '2032', value: 105700 },
                      ]}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="year" />
                      <YAxis />
                      <Tooltip 
                        formatter={(value: number) => [`R$ ${value.toLocaleString('pt-BR')}`, 'Patrimônio']}
                        contentStyle={{
                          backgroundColor: 'hsl(var(--card))',
                          borderColor: 'hsl(var(--border))',
                          borderRadius: '0.5rem'
                        }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="value" 
                        name="Patrimônio" 
                        stroke="hsl(var(--primary))" 
                        fillOpacity={1} 
                        strokeWidth={2}
                        fill="url(#colorValue)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-3 border rounded-md">
                      <div className="text-sm text-muted-foreground">Total Investido</div>
                      <div className="font-medium">R$ 70.000,00</div>
                    </div>
                    <div className="p-3 border rounded-md">
                      <div className="text-sm text-muted-foreground">Juros Acumulados</div>
                      <div className="font-medium">R$ 35.700,00</div>
                    </div>
                    <div className="p-3 border rounded-md">
                      <div className="text-sm text-muted-foreground">Patrimônio Final</div>
                      <div className="font-medium">R$ 105.700,00</div>
                    </div>
                  </div>
                  
                  <div className="flex justify-center">
                    <Button>Simular Novamente</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PortfolioPage;
