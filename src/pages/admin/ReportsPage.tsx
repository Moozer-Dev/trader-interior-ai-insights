
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { DownloadCloud, CalendarRange, ArrowUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock data for revenue
const revenueData = [
  { month: 'Jan', revenue: 15200, users: 120 },
  { month: 'Fev', revenue: 16800, users: 145 },
  { month: 'Mar', revenue: 18500, users: 175 },
  { month: 'Abr', revenue: 22300, users: 210 },
  { month: 'Mai', revenue: 26700, users: 240 },
  { month: 'Jun', revenue: 28900, users: 265 },
  { month: 'Jul', revenue: 31200, users: 290 },
  { month: 'Ago', revenue: 35800, users: 320 },
  { month: 'Set', revenue: 39500, users: 355 },
  { month: 'Out', revenue: 42100, users: 385 },
  { month: 'Nov', revenue: 45800, users: 410 },
  { month: 'Dez', revenue: 48200, users: 430 },
];

// Mock data for user distribution
const userDistributionData = [
  { name: 'Free', value: 1240, color: '#1E3A8A' },
  { name: 'Pro', value: 560, color: 'hsl(var(--accent))' },
  { name: 'API', value: 42, color: '#DC2626' },
];

// Mock data for conversions
const conversionData = [
  { week: 'Semana 1', visitors: 2450, signups: 320, conversions: 42 },
  { week: 'Semana 2', visitors: 2800, signups: 380, conversions: 51 },
  { week: 'Semana 3', visitors: 3200, signups: 410, conversions: 56 },
  { week: 'Semana 4', visitors: 2950, signups: 390, conversions: 48 },
];

// Most active users
const activeUsersData = [
  { id: 1, name: 'João Silva', plan: 'Pro', logins: 87, lastActive: '5 minutos atrás', actions: 342 },
  { id: 2, name: 'Maria Oliveira', plan: 'Pro', logins: 73, lastActive: '1 hora atrás', actions: 287 },
  { id: 3, name: 'Pedro Santos', plan: 'API', logins: 65, lastActive: '30 minutos atrás', actions: 256 },
  { id: 4, name: 'Ana Costa', plan: 'Free', logins: 62, lastActive: '2 horas atrás', actions: 231 },
  { id: 5, name: 'Carlos Ferreira', plan: 'Pro', logins: 58, lastActive: '1 dia atrás', actions: 215 },
];

const ReportsPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Relatórios</h1>
          <p className="text-muted-foreground">Análise de uso e faturamento</p>
        </div>
        <div className="flex items-center gap-2 self-start">
          <Button variant="outline" className="flex items-center gap-2">
            <CalendarRange className="h-4 w-4" />
            Último mês
          </Button>
          <Button className="flex items-center gap-2">
            <DownloadCloud className="h-4 w-4" />
            Exportar Dados
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Receita Mensal</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold">R$ 48.200,00</div>
              <Badge variant="outline" className="bg-accent/20 text-accent-foreground">
                +5,2% em relação ao mês anterior
              </Badge>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Usuários Ativos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold">1.842</div>
              <Badge variant="outline" className="bg-accent/20 text-accent-foreground">
                +4,9% em relação ao mês anterior
              </Badge>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Taxa de Conversão</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold">13,2%</div>
              <Badge variant="outline" className="bg-accent/20 text-accent-foreground">
                +1,5% em relação ao mês anterior
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="w-full">
          <TabsTrigger value="overview" className="flex-1">Visão Geral</TabsTrigger>
          <TabsTrigger value="revenue" className="flex-1">Receita</TabsTrigger>
          <TabsTrigger value="users" className="flex-1">Usuários</TabsTrigger>
          <TabsTrigger value="engagement" className="flex-1">Engajamento</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Receita vs. Usuários</CardTitle>
                <CardDescription>Análise da receita e crescimento de usuários nos últimos 12 meses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="month" />
                      <YAxis yAxisId="left" orientation="left" stroke="hsl(var(--primary))" />
                      <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--accent))" />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'hsl(var(--card))',
                          borderColor: 'hsl(var(--border))',
                          borderRadius: '0.5rem'
                        }}
                        formatter={(value: number, name: string) => [
                          name === 'revenue' ? `R$ ${value.toLocaleString('pt-BR')}` : value,
                          name === 'revenue' ? 'Receita' : 'Usuários'
                        ]}
                      />
                      <Legend />
                      <Line 
                        yAxisId="left"
                        type="monotone" 
                        dataKey="revenue" 
                        name="Receita" 
                        stroke="hsl(var(--primary))" 
                        strokeWidth={2}
                        dot={{ stroke: 'hsl(var(--primary))', strokeWidth: 2, r: 4, fill: 'hsl(var(--background))' }}
                      />
                      <Line 
                        yAxisId="right"
                        type="monotone" 
                        dataKey="users" 
                        name="Usuários" 
                        stroke="hsl(var(--accent))" 
                        strokeWidth={2}
                        dot={{ stroke: 'hsl(var(--accent))', strokeWidth: 2, r: 4, fill: 'hsl(var(--background))' }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Distribuição de Usuários</CardTitle>
                <CardDescription>Por plano de assinatura</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={userDistributionData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {userDistributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value: number) => [`${value} usuários`, '']}
                        contentStyle={{
                          backgroundColor: 'hsl(var(--card))',
                          borderColor: 'hsl(var(--border))',
                          borderRadius: '0.5rem'
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Conversões Semanais</CardTitle>
                <CardDescription>Visitantes, cadastros e conversões</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={conversionData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="week" />
                      <YAxis />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'hsl(var(--card))',
                          borderColor: 'hsl(var(--border))',
                          borderRadius: '0.5rem'
                        }}
                      />
                      <Legend />
                      <Bar dataKey="visitors" name="Visitantes" fill="#1E3A8A" />
                      <Bar dataKey="signups" name="Cadastros" fill="hsl(var(--primary))" />
                      <Bar dataKey="conversions" name="Conversões" fill="hsl(var(--accent))" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="revenue">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Análise de Receita</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  {/* Revenue content */}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="users">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Análise de Usuários</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  {/* Users content */}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="engagement">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Análise de Engajamento</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  {/* Engagement content */}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Usuários Mais Ativos</CardTitle>
          <CardDescription>Usuários com maior número de interações nos últimos 30 dias</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Usuário</TableHead>
                <TableHead>Plano</TableHead>
                <TableHead>Logins</TableHead>
                <TableHead>Ações</TableHead>
                <TableHead>Última Atividade</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activeUsersData.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>
                    <Badge variant={
                      user.plan === 'Pro' ? 'default' :
                      user.plan === 'API' ? 'secondary' : 'outline'
                    }>
                      {user.plan}
                    </Badge>
                  </TableCell>
                  <TableCell>{user.logins}</TableCell>
                  <TableCell>{user.actions}</TableCell>
                  <TableCell>{user.lastActive}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="border-t py-4">
          <Button variant="outline" className="w-full">Ver Todos os Usuários</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ReportsPage;
