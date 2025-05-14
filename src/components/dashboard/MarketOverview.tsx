
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowUp, ArrowDown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const marketData = [
  { asset: 'PETR4', name: 'Petrobras', price: 'R$ 32,55', change: 2.43, volume: '45.7M' },
  { asset: 'VALE3', name: 'Vale', price: 'R$ 67,89', change: -1.18, volume: '32.1M' },
  { asset: 'ITUB4', name: 'Itaú', price: 'R$ 28,75', change: 0.87, volume: '23.5M' },
  { asset: 'BBDC4', name: 'Bradesco', price: 'R$ 14,26', change: -0.33, volume: '18.9M' },
  { asset: 'WEGE3', name: 'WEG', price: 'R$ 36,42', change: 1.56, volume: '12.3M' },
];

export const MarketOverview: React.FC = () => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Visão do Mercado</CardTitle>
            <CardDescription>Principais ativos do Brasil</CardDescription>
          </div>
          <Badge variant="outline">B3</Badge>
        </div>
      </CardHeader>
      <CardContent>
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
            {marketData.map((item) => (
              <TableRow key={item.asset} className="cursor-pointer hover:bg-muted/50">
                <TableCell>
                  <div>
                    <div className="font-medium">{item.asset}</div>
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
      </CardContent>
    </Card>
  );
};
