
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, BarChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { Badge } from "@/components/ui/badge";
import { ChevronDown, Download, Filter, Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Sample data for the reports
const monthlyData = [
  { name: 'Jan', value: 65 },
  { name: 'Fev', value: 59 },
  { name: 'Mar', value: 80 },
  { name: 'Abr', value: 81 },
  { name: 'Mai', value: 56 },
  { name: 'Jun', value: 55 },
  { name: 'Jul', value: 40 },
  { name: 'Ago', value: 70 },
  { name: 'Set', value: 90 },
  { name: 'Out', value: 50 },
  { name: 'Nov', value: 45 },
  { name: 'Dez', value: 60 },
];

const usageData = [
  { name: 'Dashboard', value: 120 },
  { name: 'Analytics', value: 85 },
  { name: 'Markets', value: 110 },
  { name: 'Portfolio', value: 95 },
  { name: 'Alerts', value: 40 },
];

const activityData = [
  { 
    id: 1, 
    user: 'João Silva', 
    email: 'joao.silva@example.com', 
    activity: 'Login', 
    status: 'success', 
    timestamp: '2023-10-15 08:23:15' 
  },
  { 
    id: 2, 
    user: 'Maria Oliveira', 
    email: 'maria@example.com', 
    activity: 'Created Alert', 
    status: 'success', 
    timestamp: '2023-10-15 09:45:22' 
  },
  { 
    id: 3, 
    user: 'Pedro Santos', 
    email: 'pedro@example.com', 
    activity: 'Updated Portfolio', 
    status: 'success', 
    timestamp: '2023-10-15 10:12:33' 
  },
  { 
    id: 4, 
    user: 'Ana Costa', 
    email: 'ana@example.com', 
    activity: 'Failed Login', 
    status: 'error', 
    timestamp: '2023-10-15 11:05:44' 
  },
  { 
    id: 5, 
    user: 'Carlos Mendes', 
    email: 'carlos@example.com', 
    activity: 'Exported Report', 
    status: 'success', 
    timestamp: '2023-10-15 13:30:51' 
  },
];

const usersReportData = [
  { 
    id: 1, 
    month: 'Janeiro', 
    newUsers: 45, 
    activeUsers: 120, 
    churnRate: 2.1 
  },
  { 
    id: 2, 
    month: 'Fevereiro', 
    newUsers: 52, 
    activeUsers: 145, 
    churnRate: 1.8 
  },
  { 
    id: 3, 
    month: 'Março', 
    newUsers: 48, 
    activeUsers: 160, 
    churnRate: 2.3 
  },
  { 
    id: 4, 
    month: 'Abril', 
    newUsers: 61, 
    activeUsers: 175, 
    churnRate: 1.5 
  },
  { 
    id: 5, 
    month: 'Maio', 
    newUsers: 55, 
    activeUsers: 190, 
    churnRate: 1.9 
  },
];

const ReportsPage = () => {
  const [dateRange, setDateRange] = useState('30d');
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Relatórios</h1>
          <p className="text-muted-foreground">Visualize dados e estatísticas da plataforma</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filtrar
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
          <Select
            defaultValue={dateRange}
            onValueChange={(value) => setDateRange(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Selecionar período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Últimos 7 dias</SelectItem>
              <SelectItem value="30d">Últimos 30 dias</SelectItem>
              <SelectItem value="90d">Últimos 90 dias</SelectItem>
              <SelectItem value="1y">Último ano</SelectItem>
              <SelectItem value="custom">Personalizado</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="users">Usuários</TabsTrigger>
          <TabsTrigger value="activity">Atividade</TabsTrigger>
          <TabsTrigger value="engagement">Engajamento</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total de Usuários</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2,458</div>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="text-trader-green">+12%</span> desde o último mês
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Usuários Ativos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,893</div>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="text-trader-green">+8%</span> desde o último mês
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Taxa de Retenção</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">89.3%</div>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="text-trader-green">+2.5%</span> desde o último mês
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Alertas Criados</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5,234</div>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="text-trader-green">+15%</span> desde o último mês
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Crescimento Mensal</CardTitle>
                <CardDescription>Novos usuários por mês</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'hsl(var(--card))',
                          borderColor: 'hsl(var(--border))',
                          borderRadius: '0.5rem'
                        }}
                      />
                      <Legend />
                      <Bar 
                        dataKey="value"
                        name="Novos Usuários" 
                        fill="hsl(var(--primary))" 
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Uso por Recurso</CardTitle>
                <CardDescription>Acessos por seção</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={usageData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                      <XAxis type="number" />
                      <YAxis type="category" dataKey="name" width={100} />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'hsl(var(--card))',
                          borderColor: 'hsl(var(--border))',
                          borderRadius: '0.5rem'
                        }}
                      />
                      <Legend />
                      <Bar 
                        dataKey="value" 
                        name="Acessos"
                        fill="hsl(var(--accent))" 
                        radius={[0, 4, 4, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Relatório de Usuários</CardTitle>
              <CardDescription>Análise mensal de usuários</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Mês</TableHead>
                      <TableHead>Novos Usuários</TableHead>
                      <TableHead>Usuários Ativos</TableHead>
                      <TableHead>Taxa de Cancelamento</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {usersReportData.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell className="font-medium">{row.month}</TableCell>
                        <TableCell>{row.newUsers}</TableCell>
                        <TableCell>{row.activeUsers}</TableCell>
                        <TableCell>{row.churnRate}%</TableCell>
                        <TableCell>
                          {row.churnRate < 2 ? (
                            <Badge className="bg-trader-green text-white">Bom</Badge>
                          ) : (
                            <Badge className="bg-trader-yellow text-white">Médio</Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Distribuição por Plano</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <div>Básico</div>
                    <div className="font-medium">45%</div>
                  </div>
                  <div className="flex justify-between">
                    <div>Premium</div>
                    <div className="font-medium">35%</div>
                  </div>
                  <div className="flex justify-between">
                    <div>Enterprise</div>
                    <div className="font-medium">20%</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Novos vs Recorrentes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <div>Novos Usuários</div>
                    <div className="font-medium">35%</div>
                  </div>
                  <div className="flex justify-between">
                    <div>Recorrentes</div>
                    <div className="font-medium">65%</div>
                  </div>
                  <div className="flex items-center justify-center mt-2">
                    <Badge className="bg-trader-green text-white">Retenção Alta</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Status de Autenticação</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <div>Email Verificado</div>
                    <div className="font-medium">92%</div>
                  </div>
                  <div className="flex justify-between">
                    <div>2FA Ativado</div>
                    <div className="font-medium">58%</div>
                  </div>
                  <div className="flex items-center justify-center mt-2">
                    <Badge className="bg-trader-yellow text-white">Segurança Média</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Log de Atividades</CardTitle>
                  <CardDescription>Atividades recentes dos usuários</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <ChevronDown className="h-4 w-4 mr-2" />
                  Filtrar
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Usuário</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Atividade</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Data/Hora</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {activityData.map((activity) => (
                      <TableRow key={activity.id}>
                        <TableCell className="font-medium">{activity.user}</TableCell>
                        <TableCell>{activity.email}</TableCell>
                        <TableCell>{activity.activity}</TableCell>
                        <TableCell>
                          {activity.status === 'success' ? (
                            <Badge className="bg-trader-green text-white">Sucesso</Badge>
                          ) : (
                            <Badge className="bg-trader-red text-white">Erro</Badge>
                          )}
                        </TableCell>
                        <TableCell>{activity.timestamp}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="engagement" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Métricas de Engajamento</CardTitle>
              <CardDescription>Como os usuários interagem com a plataforma</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={[
                    { name: 'Seg', pageViews: 150, timeSpent: 25, alerts: 12 },
                    { name: 'Ter', pageViews: 230, timeSpent: 40, alerts: 18 },
                    { name: 'Qua', pageViews: 224, timeSpent: 45, alerts: 16 },
                    { name: 'Qui', pageViews: 218, timeSpent: 48, alerts: 22 },
                    { name: 'Sex', pageViews: 235, timeSpent: 50, alerts: 20 },
                    { name: 'Sáb', pageViews: 147, timeSpent: 30, alerts: 8 },
                    { name: 'Dom', pageViews: 120, timeSpent: 28, alerts: 10 },
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        borderColor: 'hsl(var(--border))',
                        borderRadius: '0.5rem'
                      }}
                    />
                    <Legend />
                    <Line 
                      yAxisId="left"
                      type="monotone" 
                      dataKey="pageViews" 
                      name="Visualizações"
                      stroke="hsl(var(--primary))" 
                      strokeWidth={2}
                      activeDot={{ r: 6 }}
                    />
                    <Line 
                      yAxisId="left"
                      type="monotone" 
                      dataKey="timeSpent" 
                      name="Tempo (min)"
                      stroke="hsl(var(--accent))" 
                      strokeWidth={2}
                      activeDot={{ r: 6 }}
                    />
                    <Line 
                      yAxisId="right"
                      type="monotone" 
                      dataKey="alerts" 
                      name="Alertas"
                      stroke="#1E3A8A" 
                      strokeWidth={2}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReportsPage;
