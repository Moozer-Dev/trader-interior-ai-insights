
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowUp, ArrowDown, RefreshCw } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';
import { useMarketData } from '@/hooks/useMarketData';

export const MarketOverview: React.FC = () => {
  const { data: marketData, isLoading, isError, refetch } = useMarketData();

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
            <Button size="sm" variant="ghost" onClick={() => refetch()} disabled={isLoading}>
              <RefreshCw className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
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
              {marketData.topStocks.map((item, index) => (
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
        )}
      </CardContent>
    </Card>
  );
};
