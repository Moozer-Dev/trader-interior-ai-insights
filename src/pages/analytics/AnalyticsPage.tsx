
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowUp, ArrowDown, ChartBar, CircleArrowDown } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import { cn } from '@/lib/utils';
import { AiPricePredictor } from '@/components/analytics/AiPricePredictor';
import { AiPortfolioSuggestion } from '@/components/analytics/AiPortfolioSuggestion';
import { AiTechnicalAnalysis } from '@/components/analytics/AiTechnicalAnalysis';

const AnalyticsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Análise com IA</h1>
          <p className="text-muted-foreground">Insights baseados em inteligência artificial</p>
        </div>
        <Badge variant="outline" className="bg-accent/20 text-accent-foreground">
          Recurso PRO
        </Badge>
      </div>

      <Tabs defaultValue="predictor" className="space-y-6">
        <TabsList className="w-full">
          <TabsTrigger value="predictor" className="flex-1">Previsão de Preços</TabsTrigger>
          <TabsTrigger value="portfolio" className="flex-1">Sugestão de Portfólio</TabsTrigger>
          <TabsTrigger value="technical" className="flex-1">Análise Técnica</TabsTrigger>
          <TabsTrigger value="patterns" className="flex-1">Padrões de Mercado</TabsTrigger>
        </TabsList>
        
        <TabsContent value="predictor">
          <AiPricePredictor />
        </TabsContent>
        
        <TabsContent value="portfolio">
          <AiPortfolioSuggestion />
        </TabsContent>
        
        <TabsContent value="technical">
          <AiTechnicalAnalysis />
        </TabsContent>
        
        <TabsContent value="patterns">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Detector de Padrões de Mercado</CardTitle>
                <CardDescription>Reconhecimento de padrões gráficos com IA</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Ativo</label>
                    <Input placeholder="PETR4" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Período</label>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">1D</Button>
                      <Button size="sm" variant="outline">1S</Button>
                      <Button size="sm" variant="outline" className="bg-muted/50">1M</Button>
                      <Button size="sm" variant="outline">3M</Button>
                      <Button size="sm" variant="outline">6M</Button>
                      <Button size="sm" variant="outline">1A</Button>
                    </div>
                  </div>
                </div>

                <div className="h-[350px] mb-6">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={[
                        { date: '01/05', price: 31.52 },
                        { date: '02/05', price: 31.78 },
                        { date: '03/05', price: 31.95 },
                        { date: '04/05', price: 32.15 },
                        { date: '05/05', price: 31.85 },
                        { date: '08/05', price: 31.42 },
                        { date: '09/05', price: 31.20 },
                        { date: '10/05', price: 31.05 },
                        { date: '11/05', price: 30.75 },
                        { date: '12/05', price: 30.95 },
                        { date: '15/05', price: 31.32 },
                        { date: '16/05', price: 31.65 },
                        { date: '17/05', price: 31.95 },
                        { date: '18/05', price: 32.25 },
                        { date: '19/05', price: 32.45 },
                        { date: '22/05', price: 32.38 },
                        { date: '23/05', price: 32.55 },
                        { date: '24/05', price: 32.42 },
                        { date: '25/05', price: 32.38 },
                        { date: '26/05', price: 32.55 }
                      ]}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="date" />
                      <YAxis domain={['dataMin - 0.5', 'dataMax + 0.5']} />
                      <Tooltip 
                        formatter={(value: number) => [`R$ ${value.toFixed(2)}`, 'Preço']}
                        contentStyle={{
                          backgroundColor: 'hsl(var(--card))',
                          borderColor: 'hsl(var(--border))',
                          borderRadius: '0.5rem'
                        }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="price" 
                        stroke="hsl(var(--primary))"
                        strokeWidth={2}
                        dot={{ stroke: 'hsl(var(--primary))', strokeWidth: 1, r: 3 }}
                        activeDot={{ stroke: 'hsl(var(--primary))', strokeWidth: 2, r: 5 }}
                      />
                      
                      {/* Pattern Marker: Head and Shoulders */}
                      <ReferenceLine x="03/05" stroke="hsl(var(--accent))" strokeDasharray="3 3" />
                      <ReferenceLine x="11/05" stroke="hsl(var(--accent))" strokeDasharray="3 3" />
                      <ReferenceLine x="19/05" stroke="hsl(var(--accent))" strokeDasharray="3 3" />
                      
                      {/* Support/Resistance Lines */}
                      <ReferenceLine y={30.7} stroke="hsl(var(--destructive))" strokeDasharray="3 3" label={{ value: 'Suporte', position: 'left', fill: 'hsl(var(--destructive))' }} />
                      <ReferenceLine y={32.5} stroke="#1E3A8A" strokeDasharray="3 3" label={{ value: 'Resistência', position: 'right', fill: '#1E3A8A' }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="space-y-6">
                  <Card className="border-accent/30">
                    <CardHeader className="bg-accent/10 py-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base">Padrões Detectados</CardTitle>
                        <Badge className="bg-accent/20 text-accent-foreground">
                          92% de confiança
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="py-4">
                      <div className="space-y-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <ChartBar className="h-4 w-4" />
                            <h4 className="font-medium">Head and Shoulders</h4>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Padrão gráfico de reversão de tendência detectado entre 03/05 e 19/05. 
                            Este padrão geralmente indica uma possível mudança de tendência de alta para baixa.
                          </p>
                        </div>
                        
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <ArrowDown className="h-4 w-4 text-trader-red" />
                            <h4 className="font-medium">Suporte em R$ 30,70</h4>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Nível de suporte identificado, testado em 11/05. Quebra abaixo deste nível pode indicar tendência de baixa.
                          </p>
                        </div>
                        
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <ArrowUp className="h-4 w-4 text-trader-blue" />
                            <h4 className="font-medium">Resistência em R$ 32,50</h4>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Nível de resistência identificado, testado em 19/05 e 23/05. Rompimento deste nível pode indicar continuidade da alta.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Análise IA</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium mb-2">Interpretação do Padrão</h4>
                          <p className="text-sm text-muted-foreground">
                            O padrão "Head and Shoulders" detectado sugere uma possível reversão da tendência de alta. 
                            Combinado com a resistência em R$ 32,50, é possível que o preço encontre dificuldade para subir além deste nível.
                          </p>
                        </div>
                        
                        <div>
                          <h4 className="font-medium mb-2">Probabilidades</h4>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span>Rompimento para cima</span>
                                <span>35%</span>
                              </div>
                              <div className="w-full bg-muted rounded-full h-1.5">
                                <div 
                                  className="rounded-full h-1.5 bg-trader-green"
                                  style={{ width: '35%' }}
                                ></div>
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span>Rompimento para baixo</span>
                                <span>65%</span>
                              </div>
                              <div className="w-full bg-muted rounded-full h-1.5">
                                <div 
                                  className="rounded-full h-1.5 bg-trader-red"
                                  style={{ width: '65%' }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium mb-2">Recomendação</h4>
                          <p className="text-sm text-muted-foreground">
                            Considere aguardar por confirmação do padrão com eventual quebra do nível de suporte em R$ 30,70.
                            Alternativamente, monitore uma possível falha no padrão caso o preço rompa decisivamente acima de R$ 32,50.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between border-t bg-muted/20 py-3">
                      <Button variant="outline">Exportar Análise</Button>
                      <Button>Configurar Alerta</Button>
                    </CardFooter>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalyticsPage;
