
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CircleArrowDown, CircleArrowUp, UserPlus, Search, Filter, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock users data
const usersData = [
  { id: 1, name: 'João Silva', email: 'joao.silva@example.com', plan: 'Pro', status: 'active', signupDate: '12/04/2023', lastLogin: '1 hora atrás' },
  { id: 2, name: 'Maria Oliveira', email: 'maria.oliveira@example.com', plan: 'Free', status: 'active', signupDate: '23/05/2023', lastLogin: '3 dias atrás' },
  { id: 3, name: 'Carlos Santos', email: 'carlos.santos@example.com', plan: 'API', status: 'active', signupDate: '05/03/2023', lastLogin: '5 horas atrás' },
  { id: 4, name: 'Ana Pereira', email: 'ana.pereira@example.com', plan: 'Pro', status: 'inactive', signupDate: '18/01/2023', lastLogin: '2 semanas atrás' },
  { id: 5, name: 'Pedro Costa', email: 'pedro.costa@example.com', plan: 'Free', status: 'active', signupDate: '30/05/2023', lastLogin: 'Agora' },
  { id: 6, name: 'Lucia Fernandes', email: 'lucia.fernandes@example.com', plan: 'Pro', status: 'active', signupDate: '14/04/2023', lastLogin: '2 dias atrás' },
  { id: 7, name: 'Roberto Alves', email: 'roberto.alves@example.com', plan: 'API', status: 'suspended', signupDate: '22/02/2023', lastLogin: '1 mês atrás' },
  { id: 8, name: 'Sofia Mendes', email: 'sofia.mendes@example.com', plan: 'Free', status: 'active', signupDate: '07/06/2023', lastLogin: '12 horas atrás' },
];

const UsersPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Usuários</h1>
          <p className="text-muted-foreground">Gerencie contas de usuários e permissões</p>
        </div>
        <div className="flex items-center gap-2 self-start">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <UserPlus className="h-4 w-4" />
                Adicionar Usuário
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px]">
              <DialogHeader>
                <DialogTitle>Adicionar Novo Usuário</DialogTitle>
                <DialogDescription>
                  Preencha as informações para adicionar um novo usuário ao sistema
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Nome</Label>
                  <Input className="col-span-3" placeholder="Nome do usuário" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Email</Label>
                  <Input className="col-span-3" type="email" placeholder="email@exemplo.com" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Plano</Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Selecione o plano" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="free">Free</SelectItem>
                      <SelectItem value="pro">Pro</SelectItem>
                      <SelectItem value="api">API</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Status</Label>
                  <Select defaultValue="active">
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Selecione o status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Ativo</SelectItem>
                      <SelectItem value="inactive">Inativo</SelectItem>
                      <SelectItem value="suspended">Suspenso</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline">Cancelar</Button>
                <Button type="submit">Adicionar</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar usuários..."
              className="pl-9 w-[250px]"
            />
          </div>
          <Button variant="outline" size="sm" className="h-10 gap-1">
            <Filter className="h-4 w-4" />
            Filtros
          </Button>
        </div>
        
        <Tabs defaultValue="all" className="w-auto">
          <TabsList>
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="active">Ativos</TabsTrigger>
            <TabsTrigger value="inactive">Inativos</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <Card>
        <CardHeader className="py-4">
          <div className="flex justify-between items-center">
            <CardTitle>Lista de Usuários</CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="rounded-sm">
                Total: {usersData.length}
              </Badge>
              <Select defaultValue="newest">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Ordenar por" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Mais recentes</SelectItem>
                  <SelectItem value="oldest">Mais antigos</SelectItem>
                  <SelectItem value="name-asc">Nome (A-Z)</SelectItem>
                  <SelectItem value="name-desc">Nome (Z-A)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Usuário</TableHead>
                <TableHead>Plano</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">Data de Cadastro</TableHead>
                <TableHead className="hidden lg:table-cell">Último Login</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {usersData.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {user.name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-xs text-muted-foreground">{user.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={
                      user.plan === 'Pro' ? 'default' :
                      user.plan === 'API' ? 'secondary' : 'outline'
                    }>
                      {user.plan}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={cn(
                      "bg-opacity-20 text-foreground",
                      user.status === 'active' ? "bg-trader-green" : 
                      user.status === 'inactive' ? "bg-muted" : 
                      "bg-trader-red"
                    )}>
                      {user.status === 'active' ? 'Ativo' : 
                       user.status === 'inactive' ? 'Inativo' : 
                       'Suspenso'}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{user.signupDate}</TableCell>
                  <TableCell className="hidden lg:table-cell">{user.lastLogin}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm">Editar</Button>
                      <Button variant="ghost" size="sm" className="text-destructive">Suspender</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex items-center justify-between border-t px-6 py-4">
          <div className="text-xs text-muted-foreground">
            Mostrando <span className="font-medium">1</span> a <span className="font-medium">8</span> de <span className="font-medium">8</span> usuários
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>Anterior</Button>
            <Button variant="outline" size="sm" disabled>Próxima</Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default UsersPage;
