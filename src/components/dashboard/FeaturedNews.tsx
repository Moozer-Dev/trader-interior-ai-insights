
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const newsItems = [
  {
    id: '1',
    title: 'Petrobras anuncia novo plano de investimentos para 2023',
    source: 'Valor Econômico',
    category: 'empresas',
    time: '2 horas atrás',
    summary: 'A Petrobras divulgou seu plano estratégico quinquenal, prevendo investimentos de USD 78 bilhões em exploração e produção até 2027.',
    impact: 'positive'
  },
  {
    id: '2',
    title: 'Banco Central mantém taxa Selic em 10,75% ao ano',
    source: 'InfoMoney',
    category: 'economia',
    time: '5 horas atrás',
    summary: 'O Comitê de Política Monetária (Copom) decidiu, por unanimidade, manter a taxa básica de juros em 10,75% ao ano.',
    impact: 'neutral'
  },
  {
    id: '3',
    title: 'Vale reduz projeção de produção de minério para 2023',
    source: 'Reuters',
    category: 'empresas',
    time: '8 horas atrás',
    summary: 'A mineradora Vale revisou para baixo sua estimativa de produção de minério de ferro para o ano, citando desafios operacionais.',
    impact: 'negative'
  },
];

export const FeaturedNews: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Notícias em Destaque</CardTitle>
            <CardDescription>Informações relevantes para suas decisões</CardDescription>
          </div>
          <Button size="sm" variant="outline">Ver Mais</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {newsItems.map((news) => (
            <div key={news.id} className="border-b pb-5 last:border-0">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium">{news.title}</h3>
                <Badge 
                  className={
                    news.impact === 'positive' 
                      ? "bg-accent/20 text-accent-foreground" 
                      : news.impact === 'negative' 
                      ? "bg-destructive/20 text-destructive" 
                      : "bg-muted/50"
                  }
                >
                  {news.impact === 'positive' ? 'Positivo' : news.impact === 'negative' ? 'Negativo' : 'Neutro'}
                </Badge>
              </div>
              <div className="flex items-center text-xs text-muted-foreground mb-2">
                <span>{news.source}</span>
                <span className="mx-2">•</span>
                <span>{news.category}</span>
                <span className="mx-2">•</span>
                <span>{news.time}</span>
              </div>
              <p className="text-sm text-muted-foreground">{news.summary}</p>
              <div className="mt-3">
                <Button variant="link" className="p-0 h-auto text-primary">Ler mais</Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
