
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Check, X, Edit, Plus, Trash } from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock plan data
const plansData = [
  {
    id: 'free',
    name: 'Free',
    description: 'Para usuários iniciantes',
    price: 0,
    period: 'mensal',
    active: true,
    features: [
      { name: 'Acesso a cotações com delay de 15 minutos', included: true },
      { name: 'Alertas de preço (máximo 3)', included: true },
      { name: 'Dashboard básico', included: true },
      { name: 'Análise técnica automatizada', included: false },
      { name: 'Recomendações de IA', included: false },
      { name: 'Portfólio ilimitado', included: false },
      { name: 'Exportação de dados', included: false },
      { name: 'Acesso à API', included: false },
    ],
    subscribers: 1240,
    revenue: 0
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'Para investidores ativos',
    price: 49.90,
    period: 'mensal',
    active: true,
    features: [
      { name: 'Acesso a cotações com delay de 15 minutos', included: true },
      { name: 'Alertas de preço (máximo 3)', included: true },
      { name: 'Dashboard básico', included: true },
      { name: 'Análise técnica automatizada', included: true },
      { name: 'Recomendações de IA', included: true },
      { name: 'Portfólio ilimitado', included: true },
      { name: 'Exportação de dados', included: true },
      { name: 'Acesso à API', included: false },
    ],
    subscribers: 560,
    revenue: 27944
  },
  {
    id: 'api',
    name: 'API',
    description: 'Para integração com sistemas',
    price: 299.90,
    period: 'mensal',
    active: true,
    features: [
      { name: 'Acesso a cotações com delay de 15 minutos', included: true },
      { name: 'Alertas de preço (máximo 3)', included: true },
      { name: 'Dashboard básico', included: true },
      { name: 'Análise técnica automatizada', included: true },
      { name: 'Recomendações de IA', included: true },
      { name: 'Portfólio ilimitado', included: true },
      { name: 'Exportação de dados', included: true },
      { name: 'Acesso à API', included: true },
    ],
    subscribers: 42,
    revenue: 12595.80
  }
];

const PlansPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Planos</h1>
          <p className="text-muted-foreground">Gerencie planos de assinatura e preços</p>
        </div>
        <div className="flex items-center gap-2 self-start">
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Novo Plano
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plansData.map((plan) => (
          <Card key={plan.id} className={cn(
            "relative overflow-hidden",
            plan.id === 'pro' && "border-accent"
          )}>
            {plan.id === 'pro' && (
              <div className="absolute top-0 left-0 w-full text-center bg-accent text-accent-foreground text-xs py-1">
                MAIS POPULAR
              </div>
            )}
            <CardHeader className={cn(
              "pb-4",
              plan.id === 'pro' && "pt-8"
            )}>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </div>
                <Switch checked={plan.active} />
              </div>
              <div className="mt-4">
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold">
                    {plan.price === 0 ? 'Grátis' : `R$ ${plan.price.toFixed(2)}`}
                  </span>
                  {plan.price > 0 && (
                    <span className="text-muted-foreground ml-2">/{plan.period}</span>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="pb-8">
              <div className="space-y-4">
                <h4 className="text-sm font-medium">Recursos incluídos</h4>
                <ul className="space-y-2.5">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      {feature.included ? (
                        <Check className="h-4 w-4 text-trader-green mr-2 mt-0.5" />
                      ) : (
                        <X className="h-4 w-4 text-muted-foreground mr-2 mt-0.5" />
                      )}
                      <span className={cn(
                        "text-sm",
                        !feature.included && "text-muted-foreground"
                      )}>
                        {feature.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
            <CardFooter className="bg-muted/30 flex justify-between border-t py-4">
              <Button variant="ghost" size="sm" className="gap-1">
                <Edit className="h-4 w-4" />
                Editar
              </Button>
              <div className="text-right">
                <div className="text-sm font-medium">{plan.subscribers} assinantes</div>
                {plan.price > 0 && (
                  <div className="text-xs text-muted-foreground">
                    Receita: R$ {plan.revenue.toLocaleString('pt-BR')}
                  </div>
                )}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Histórico de mudanças</CardTitle>
          <CardDescription>Registro de alterações em planos e preços</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Plano</TableHead>
                <TableHead>Alteração</TableHead>
                <TableHead>Autor</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>05/06/2023</TableCell>
                <TableCell>Pro</TableCell>
                <TableCell>Alteração de preço (R$ 39,90 → R$ 49,90)</TableCell>
                <TableCell>Admin</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">Detalhes</Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>01/06/2023</TableCell>
                <TableCell>API</TableCell>
                <TableCell>Adição do recurso "Exportação de dados"</TableCell>
                <TableCell>Admin</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">Detalhes</Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>15/05/2023</TableCell>
                <TableCell>Free</TableCell>
                <TableCell>Limitação de alertas (5 → 3)</TableCell>
                <TableCell>Admin</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">Detalhes</Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default PlansPage;
