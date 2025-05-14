
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowUp, ArrowDown, ChartBar } from 'lucide-react';
import { cn } from '@/lib/utils';

const MarketsPage: React.FC = () => {
  const [apiConfigured, setApiConfigured] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  
  const handleConfigureApi = () => {
    if (apiKey.trim().length > 0) {
      setApiConfigured(true);
      // Aqui você salvaria a chave de API e configuraria as integrações reais
      console.log("API configurada com sucesso");
    }
  };
  
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
            {apiConfigured ? "Dados em tempo real" : "Dados não configurados"}
          </Badge>
        </div>
      </div>

      {!apiConfigured ? (
        <Card>
          <CardHeader>
            <CardTitle>Configure a API de Mercado</CardTitle>
            <CardDescription>
              Para acompanhar as cotações em tempo real, configure sua chave de API
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="marketApiKey">Chave da API de Mercado</label>
                <Input 
                  id="marketApiKey" 
                  placeholder="Insira sua chave da API" 
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                />
              </div>
              <Button onClick={handleConfigureApi}>Configurar API</Button>
            </div>
          </CardContent>
        </Card>
      ) : (
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
                    <div className="h-[450px] flex items-center justify-center">
                      <div className="text-center p-4">
                        <ChartBar className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                        <h3 className="text-lg font-medium">Nenhum dado disponível</h3>
                        <p className="text-muted-foreground mt-2">
                          Os dados serão exibidos quando a API estiver configurada corretamente
                        </p>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="crypto" className="space-y-4">
                    <div className="h-[450px] flex items-center justify-center">
                      <div className="text-center p-4">
                        <ChartBar className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                        <h3 className="text-lg font-medium">Nenhum dado disponível</h3>
                        <p className="text-muted-foreground mt-2">
                          Os dados serão exibidos quando a API estiver configurada corretamente
                        </p>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="forex" className="space-y-4">
                    <div className="h-[450px] flex items-center justify-center">
                      <div className="text-center p-4">
                        <ChartBar className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                        <h3 className="text-lg font-medium">Nenhum dado disponível</h3>
                        <p className="text-muted-foreground mt-2">
                          Os dados serão exibidos quando a API estiver configurada corretamente
                        </p>
                      </div>
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
                  <Button className="gap-2" disabled>
                    <ChartBar className="h-4 w-4" />
                    Análise Técnica
                  </Button>
                  <div className="flex gap-2">
                    <Button variant="outline" disabled>Configurar Alerta</Button>
                    <Button disabled>Adicionar ao Portfólio</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketsPage;
