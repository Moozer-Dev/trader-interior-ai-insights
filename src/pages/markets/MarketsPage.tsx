
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowUp, ArrowDown, ChartBar, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useMarketData } from '@/hooks/useMarketData';

const MarketsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data: marketData, isLoading, isError, refetch } = useMarketData();
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Mercados</h1>
          <p className="text-muted-foreground">Acompanhe cotações em tempo real</p>
        </div>
        <div className="flex items-center gap-2 self-start">
          <Badge variant="outline" className="bg-accent/20 text-accent-foreground">
            {isLoading ? "Carregando dados..." : isError ? "Erro ao carregar dados" : "Dados em tempo real"}
          </Badge>
          <Button size="sm" variant="outline" onClick={() => refetch()} disabled={isLoading}>
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-2/5">
          <Card className="h-full">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Cotações</CardTitle>
                <div>
                  <Input
                    placeholder="Buscar ativo..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="max-w-[200px]"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="stocks">
                <TabsList className="mb-4 w-full">
                  <TabsTrigger value="stocks" className="flex-1">Ações</TabsTrigger>
                  <TabsTrigger value="crypto" className="flex-1">Cripto</TabsTrigger>
                  <TabsTrigger value="forex" className="flex-1">Câmbio</TabsTrigger>
                </TabsList>

                <TabsContent value="stocks" className="space-y-4">
                  {isLoading ? (
                    <div className="flex justify-center items-center h-[450px]">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    </div>
                  ) : isError ? (
                    <div className="h-[450px] flex items-center justify-center">
                      <div className="text-center p-4">
                        <ChartBar className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                        <h3 className="text-lg font-medium">Erro ao carregar dados</h3>
                        <p className="text-muted-foreground mt-2">
                          Não foi possível obter as informações do servidor
                        </p>
                        <Button onClick={() => refetch()} className="mt-4">Tentar novamente</Button>
                      </div>
                    </div>
                  ) : !marketData?.stocks || marketData.stocks.length === 0 ? (
                    <div className="h-[450px] flex items-center justify-center">
                      <div className="text-center p-4">
                        <ChartBar className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                        <h3 className="text-lg font-medium">Nenhum dado disponível</h3>
                        <p className="text-muted-foreground mt-2">
                          Nenhuma ação encontrada para exibição
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="h-[450px] overflow-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Ativo</TableHead>
                            <TableHead>Último</TableHead>
                            <TableHead>Variação</TableHead>
                            <TableHead className="hidden sm:table-cell">Volume</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {marketData.stocks.map((item, index) => (
                            <TableRow key={index} className="cursor-pointer hover:bg-muted/50">
                              <TableCell>
                                <div>
                                  <div className="font-medium">{item.symbol}</div>
                                  <div className="text-xs text-muted-foreground">{item.name}</div>
                                </div>
                              </TableCell>
                              <TableCell>{item.price}</TableCell>
                              <TableCell>
                                <div className={cn(
                                  "flex items-center",
                                  item.change > 0 ? "text-trader-green" : "text-trader-red"
                                )}>
                                  {item.change > 0 ? (
                                    <ArrowUp className="h-4 w-4 mr-1" />
                                  ) : (
                                    <ArrowDown className="h-4 w-4 mr-1" />
                                  )}
                                  {Math.abs(item.change)}%
                                </div>
                              </TableCell>
                              <TableCell className="hidden sm:table-cell">{item.volume}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="crypto" className="space-y-4">
                  {/* Similar structure as stocks tab, but for crypto data */}
                  {isLoading ? (
                    <div className="flex justify-center items-center h-[450px]">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    </div>
                  ) : isError ? (
                    <div className="h-[450px] flex items-center justify-center">
                      <div className="text-center p-4">
                        <ChartBar className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                        <h3 className="text-lg font-medium">Erro ao carregar dados</h3>
                        <p className="text-muted-foreground mt-2">
                          Não foi possível obter as informações do servidor
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="h-[450px] flex items-center justify-center">
                      <div className="text-center p-4">
                        <ChartBar className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                        <h3 className="text-lg font-medium">Dados em carregamento</h3>
                        <p className="text-muted-foreground mt-2">
                          Os dados serão exibidos em breve
                        </p>
                      </div>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="forex" className="space-y-4">
                  {/* Similar structure as stocks tab, but for forex data */}
                  {isLoading ? (
                    <div className="flex justify-center items-center h-[450px]">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    </div>
                  ) : isError ? (
                    <div className="h-[450px] flex items-center justify-center">
                      <div className="text-center p-4">
                        <ChartBar className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                        <h3 className="text-lg font-medium">Erro ao carregar dados</h3>
                        <p className="text-muted-foreground mt-2">
                          Não foi possível obter as informações do servidor
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="h-[450px] flex items-center justify-center">
                      <div className="text-center p-4">
                        <ChartBar className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                        <h3 className="text-lg font-medium">Dados em carregamento</h3>
                        <p className="text-muted-foreground mt-2">
                          Os dados serão exibidos em breve
                        </p>
                      </div>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="md:w-3/5">
          <Card className="h-full">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Selecione um ativo</CardTitle>
                  <CardDescription>
                    Escolha um ativo da lista para ver detalhes
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">D</Button>
                  <Button size="sm" variant="outline">S</Button>
                  <Button size="sm" variant="outline" className="bg-muted/50">M</Button>
                  <Button size="sm" variant="outline">A</Button>
                  <Button size="sm" variant="outline">5A</Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[350px] flex items-center justify-center">
                <div className="text-center p-4">
                  <ChartBar className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">Gráfico não disponível</h3>
                  <p className="text-muted-foreground mt-2">
                    Selecione um ativo da lista para visualizar o gráfico
                  </p>
                </div>
              </div>
              
              <div className="mt-6 flex justify-between">
                <Button className="gap-2">
                  <ChartBar className="h-4 w-4" />
                  Análise Técnica
                </Button>
                <div className="flex gap-2">
                  <Button variant="outline">Configurar Alerta</Button>
                  <Button>Adicionar ao Portfólio</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MarketsPage;
