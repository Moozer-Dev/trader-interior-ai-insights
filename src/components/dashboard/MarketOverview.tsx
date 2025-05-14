
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowUp, ArrowDown, RefreshCw } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from '@/lib/utils';
import { useMarketData } from '@/hooks/useMarketData';
import { useAuth } from "@/contexts/AuthContext";

export const MarketOverview: React.FC = () => {
  const { user } = useAuth();
  const { data: marketData, isLoading, isError, refetch } = useMarketData();
  
  // Verificar se o usuário tem acesso a dados em tempo real
  const hasRealTimeData = user?.plan === 'pro' || user?.plan === 'api';

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Visão do Mercado</CardTitle>
            <CardDescription>Principais ativos do Brasil</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline">B3</Badge>
            {hasRealTimeData ? (
              <Badge variant="outline" className="bg-trader-green/10 text-trader-green">Tempo real</Badge>
            ) : (
              <Badge variant="outline" className="bg-amber-500/10 text-amber-500">15min atraso</Badge>
            )}
            <Button size="sm" variant="ghost" onClick={() => refetch()} disabled={isLoading}>
              <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-3">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
          </div>
        ) : isError ? (
          <div className="py-6 text-center">
            <p className="text-muted-foreground">Erro ao carregar dados do mercado</p>
            <Button variant="outline" size="sm" className="mt-2" onClick={() => refetch()}>
              Tentar novamente
            </Button>
          </div>
        ) : !marketData?.topStocks || marketData.topStocks.length === 0 ? (
          <div className="py-6 text-center">
            <p className="text-muted-foreground">Nenhum dado disponível no momento</p>
          </div>
        ) : (
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
              {marketData.topStocks.map((item: any, index: number) => (
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
                      parseFloat(item.change) > 0 ? "text-trader-green" : "text-trader-red"
                    )}>
                      {parseFloat(item.change) > 0 ? (
                        <ArrowUp className="h-4 w-4 mr-1" />
                      ) : (
                        <ArrowDown className="h-4 w-4 mr-1" />
                      )}
                      {Math.abs(parseFloat(item.change))}%
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">{item.volume}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};
