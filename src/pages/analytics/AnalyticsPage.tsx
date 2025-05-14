
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartBar } from 'lucide-react';
import { AiPricePredictor } from '@/components/analytics/AiPricePredictor';
import { AiPortfolioSuggestion } from '@/components/analytics/AiPortfolioSuggestion';
import { AiTechnicalAnalysis } from '@/components/analytics/AiTechnicalAnalysis';
import { useAnalyticsData } from '@/hooks/useAnalyticsData';

const AnalyticsPage: React.FC = () => {
  const { isLoading, isError } = useAnalyticsData();

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

      {isLoading ? (
        <Card>
          <CardHeader>
            <CardTitle>Carregando Análises</CardTitle>
            <CardDescription>
              Aguarde enquanto carregamos os modelos de IA para análise
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="py-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <h3 className="text-lg font-medium mb-2">Inicializando modelos de IA</h3>
              <p className="text-muted-foreground">
                Isso pode levar alguns instantes...
              </p>
            </div>
          </CardContent>
        </Card>
      ) : isError ? (
        <Card>
          <CardHeader>
            <CardTitle>Erro ao Carregar Análises</CardTitle>
            <CardDescription>
              Não foi possível carregar os modelos de análise de IA
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="py-8 text-center">
              <ChartBar className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">Serviço temporariamente indisponível</h3>
              <p className="text-muted-foreground mb-4">
                Estamos trabalhando para resolver o problema. Por favor, tente novamente mais tarde.
              </p>
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
                <CardDescription>Este recurso estará disponível em breve</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="py-8 text-center">
                  <ChartBar className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">Em desenvolvimento</h3>
                  <p className="text-muted-foreground mb-4">
                    Este recurso será lançado na próxima atualização da plataforma.
                  </p>
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
