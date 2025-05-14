
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowUp, ArrowDown, ChartBar } from 'lucide-react';
import { AiPricePredictor } from '@/components/analytics/AiPricePredictor';
import { AiPortfolioSuggestion } from '@/components/analytics/AiPortfolioSuggestion';
import { AiTechnicalAnalysis } from '@/components/analytics/AiTechnicalAnalysis';

const AnalyticsPage: React.FC = () => {
  const [apiConfigured, setApiConfigured] = useState(false);
  const [apiKey, setApiKey] = useState('');

  const handleConfigureApi = () => {
    if (apiKey.trim().length > 0) {
      setApiConfigured(true);
      // Aqui você salvaria a chave de API e configuraria as integrações reais
      console.log("API configurada com sucesso");
    }
  };

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

      {!apiConfigured ? (
        <Card>
          <CardHeader>
            <CardTitle>Configure a API de Análise</CardTitle>
            <CardDescription>
              Para usar os recursos de análise com IA, configure sua chave de API
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="apiKey">Chave da API</label>
                <Input 
                  id="apiKey" 
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
            <Card>
              <CardHeader>
                <CardTitle>Detector de Padrões de Mercado</CardTitle>
                <CardDescription>Este recurso estará disponível após integração com API</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="py-8 text-center">
                  <ChartBar className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">Dados em tempo real necessários</h3>
                  <p className="text-muted-foreground mb-4">
                    Este recurso requer integração com API de dados em tempo real para funcionar corretamente.
                  </p>
                  <Button variant="outline">Saiba mais sobre integração</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default AnalyticsPage;
