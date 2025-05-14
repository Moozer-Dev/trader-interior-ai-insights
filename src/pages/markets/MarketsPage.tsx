
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowUp, ArrowDown, ChartBar } from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock data for stock prices
const stocksData = [
  { id: 'PETR4', name: 'Petrobras', price: 32.55, change: 2.43, volume: '45.7M', sector: 'Petróleo' },
  { id: 'VALE3', name: 'Vale', price: 67.89, change: -1.18, volume: '32.1M', sector: 'Mineração' },
  { id: 'ITUB4', name: 'Itaú', price: 28.75, change: 0.87, volume: '23.5M', sector: 'Financeiro' },
  { id: 'BBDC4', name: 'Bradesco', price: 14.26, change: -0.33, volume: '18.9M', sector: 'Financeiro' },
  { id: 'WEGE3', name: 'WEG', price: 36.42, change: 1.56, volume: '12.3M', sector: 'Bens Industriais' },
  { id: 'MGLU3', name: 'Magazine Luiza', price: 5.12, change: -2.84, volume: '35.2M', sector: 'Varejo' },
  { id: 'B3SA3', name: 'B3', price: 12.32, change: 0.57, volume: '14.8M', sector: 'Financeiro' },
  { id: 'ABEV3', name: 'Ambev', price: 13.89, change: 0.22, volume: '22.5M', sector: 'Bebidas' },
  { id: 'RENT3', name: 'Localiza', price: 57.45, change: 1.32, volume: '8.3M', sector: 'Locação de Veículos' },
  { id: 'LREN3', name: 'Lojas Renner', price: 22.18, change: -0.84, volume: '10.2M', sector: 'Varejo' },
];

// Mock data for crypto prices
const cryptoData = [
  { id: 'BTC', name: 'Bitcoin', price: 35842.67, change: 2.85, volume: '$28.5B', marketCap: '$687.4B' },
  { id: 'ETH', name: 'Ethereum', price: 2045.36, change: 1.45, volume: '$14.2B', marketCap: '$243.8B' },
  { id: 'BNB', name: 'Binance Coin', price: 302.56, change: -0.72, volume: '$1.8B', marketCap: '$46.5B' },
  { id: 'XRP', name: 'Ripple', price: 0.58, change: -1.23, volume: '$2.1B', marketCap: '$29.8B' },
  { id: 'SOL', name: 'Solana', price: 102.34, change: 5.67, volume: '$3.2B', marketCap: '$41.2B' },
  { id: 'ADA', name: 'Cardano', price: 0.38, change: 0.45, volume: '$632.4M', marketCap: '$13.4B' },
  { id: 'DOGE', name: 'Dogecoin', price: 0.078, change: -2.15, volume: '$982.3M', marketCap: '$10.9B' },
  { id: 'AVAX', name: 'Avalanche', price: 22.45, change: 3.26, volume: '$542.1M', marketCap: '$7.8B' },
];

// Mock data for forex prices
const forexData = [
  { id: 'USD/BRL', name: 'Dólar/Real', price: 5.18, change: -0.35, high: 5.22, low: 5.16 },
  { id: 'EUR/BRL', name: 'Euro/Real', price: 5.65, change: -0.21, high: 5.68, low: 5.62 },
  { id: 'GBP/BRL', name: 'Libra/Real', price: 6.58, change: 0.12, high: 6.61, low: 6.56 },
  { id: 'JPY/BRL', name: 'Iene/Real', price: 0.038, change: 0.05, high: 0.039, low: 0.037 },
  { id: 'EUR/USD', name: 'Euro/Dólar', price: 1.09, change: 0.18, high: 1.10, low: 1.08 },
  { id: 'USD/JPY', name: 'Dólar/Iene', price: 137.25, change: 0.42, high: 138.1, low: 136.8 },
];

// Mock chart data
const chartData = [
  { date: '09:30', value: 32.40 },
  { date: '10:00', value: 32.35 },
  { date: '10:30', value: 32.45 },
  { date: '11:00', value: 32.50 },
  { date: '11:30', value: 32.48 },
  { date: '12:00', value: 32.52 },
  { date: '12:30', value: 32.58 },
  { date: '13:00', value: 32.62 },
  { date: '13:30', value: 32.55 },
  { date: '14:00', value: 32.50 },
  { date: '14:30', value: 32.53 },
  { date: '15:00', value: 32.55 },
  { date: '15:30', value: 32.60 },
  { date: '16:00', value: 32.55 },
];

const MarketsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMarket, setSelectedMarket] = useState<string | null>(null);
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const handleSelectMarket = (id: string) => {
    setSelectedMarket(id);
  };

  const filteredStocks = stocksData.filter(stock => 
    stock.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
    stock.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredCrypto = cryptoData.filter(crypto => 
    crypto.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
    crypto.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredForex = forexData.filter(forex => 
    forex.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
    forex.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Mercados</h1>
          <p className="text-muted-foreground">Acompanhe cotações em tempo real</p>
        </div>
        <div className="flex items-center gap-2 self-start">
          <Badge variant="outline" className="bg-accent/20 text-accent-foreground">
            Última atualização: há 30 segundos
          </Badge>
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
                  <div className="h-[450px] overflow-y-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Ativo</TableHead>
                          <TableHead className="text-right">Último</TableHead>
                          <TableHead className="text-right">Var</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredStocks.map((stock) => (
                          <TableRow 
                            key={stock.id}
                            className={cn(
                              "cursor-pointer hover:bg-muted/50",
                              selectedMarket === stock.id && "bg-muted"
                            )}
                            onClick={() => handleSelectMarket(stock.id)}
                          >
                            <TableCell>
                              <div>
                                <div className="font-medium">{stock.id}</div>
                                <div className="text-xs text-muted-foreground">{stock.name}</div>
                              </div>
                            </TableCell>
                            <TableCell className="text-right">R$ {stock.price.toFixed(2)}</TableCell>
                            <TableCell className={cn(
                              "text-right",
                              stock.change > 0 ? "text-trader-green" : "text-trader-red"
                            )}>
                              <div className="flex items-center justify-end">
                                {stock.change > 0 ? (
                                  <ArrowUp className="h-3 w-3 mr-1" />
                                ) : (
                                  <ArrowDown className="h-3 w-3 mr-1" />
                                )}
                                {Math.abs(stock.change)}%
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>

                <TabsContent value="crypto" className="space-y-4">
                  <div className="h-[450px] overflow-y-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Cripto</TableHead>
                          <TableHead className="text-right">Último</TableHead>
                          <TableHead className="text-right">Var</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredCrypto.map((crypto) => (
                          <TableRow 
                            key={crypto.id}
                            className={cn(
                              "cursor-pointer hover:bg-muted/50",
                              selectedMarket === crypto.id && "bg-muted"
                            )}
                            onClick={() => handleSelectMarket(crypto.id)}
                          >
                            <TableCell>
                              <div>
                                <div className="font-medium">{crypto.id}</div>
                                <div className="text-xs text-muted-foreground">{crypto.name}</div>
                              </div>
                            </TableCell>
                            <TableCell className="text-right">$ {crypto.price.toFixed(2)}</TableCell>
                            <TableCell className={cn(
                              "text-right",
                              crypto.change > 0 ? "text-trader-green" : "text-trader-red"
                            )}>
                              <div className="flex items-center justify-end">
                                {crypto.change > 0 ? (
                                  <ArrowUp className="h-3 w-3 mr-1" />
                                ) : (
                                  <ArrowDown className="h-3 w-3 mr-1" />
                                )}
                                {Math.abs(crypto.change)}%
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>

                <TabsContent value="forex" className="space-y-4">
                  <div className="h-[450px] overflow-y-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Par</TableHead>
                          <TableHead className="text-right">Último</TableHead>
                          <TableHead className="text-right">Var</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredForex.map((forex) => (
                          <TableRow 
                            key={forex.id}
                            className={cn(
                              "cursor-pointer hover:bg-muted/50",
                              selectedMarket === forex.id && "bg-muted"
                            )}
                            onClick={() => handleSelectMarket(forex.id)}
                          >
                            <TableCell>
                              <div>
                                <div className="font-medium">{forex.id}</div>
                                <div className="text-xs text-muted-foreground">{forex.name}</div>
                              </div>
                            </TableCell>
                            <TableCell className="text-right">{forex.price.toFixed(2)}</TableCell>
                            <TableCell className={cn(
                              "text-right",
                              forex.change > 0 ? "text-trader-green" : "text-trader-red"
                            )}>
                              <div className="flex items-center justify-end">
                                {forex.change > 0 ? (
                                  <ArrowUp className="h-3 w-3 mr-1" />
                                ) : (
                                  <ArrowDown className="h-3 w-3 mr-1" />
                                )}
                                {Math.abs(forex.change)}%
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
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
                  <CardTitle>PETR4 - Petrobras</CardTitle>
                  <CardDescription>
                    <div className="flex items-center mt-1">
                      <span>R$ 32,55</span>
                      <div className="mx-2 flex items-center text-trader-green">
                        <ArrowUp className="h-3 w-3 mr-1" />
                        <span>2,43%</span>
                      </div>
                      <span className="text-xs text-muted-foreground">Hoje</span>
                    </div>
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
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                    <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                    <YAxis 
                      domain={['dataMin - 0.2', 'dataMax + 0.2']}
                      stroke="hsl(var(--muted-foreground))"
                      tickFormatter={(value) => `${value.toFixed(2)}`}
                    />
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
                      dataKey="value" 
                      name="Preço"
                      stroke="hsl(var(--primary))" 
                      strokeWidth={2}
                      dot={{ stroke: 'hsl(var(--primary))', strokeWidth: 2, r: 4, fill: 'hsl(var(--background))' }}
                      activeDot={{ stroke: 'hsl(var(--primary))', strokeWidth: 2, r: 6, fill: 'hsl(var(--primary))' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-3 border rounded-md">
                  <div className="text-sm text-muted-foreground">Abertura</div>
                  <div className="font-medium">R$ 32,20</div>
                </div>
                <div className="p-3 border rounded-md">
                  <div className="text-sm text-muted-foreground">Máxima</div>
                  <div className="font-medium">R$ 32,75</div>
                </div>
                <div className="p-3 border rounded-md">
                  <div className="text-sm text-muted-foreground">Mínima</div>
                  <div className="font-medium">R$ 32,05</div>
                </div>
                <div className="p-3 border rounded-md">
                  <div className="text-sm text-muted-foreground">Volume</div>
                  <div className="font-medium">45,7M</div>
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
