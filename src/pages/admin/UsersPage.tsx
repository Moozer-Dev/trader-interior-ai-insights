
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, UserPlus, Search, Filter } from 'lucide-react';

// Mock user data
const users = [
  { id: '1', name: 'João Silva', email: 'joao.silva@exemplo.com', plan: 'Pro', status: 'active', lastLogin: '2 horas atrás' },
  { id: '2', name: 'Maria Santos', email: 'maria.santos@exemplo.com', plan: 'Free', status: 'active', lastLogin: '5 minutos atrás' },
  { id: '3', name: 'Pedro Costa', email: 'pedro.costa@exemplo.com', plan: 'Pro', status: 'inactive', lastLogin: '3 dias atrás' },
  { id: '4', name: 'Ana Oliveira', email: 'ana.oliveira@exemplo.com', plan: 'API', status: 'active', lastLogin: '1 hora atrás' },
  { id: '5', name: 'Lucas Ferreira', email: 'lucas.ferreira@exemplo.com', plan: 'Free', status: 'active', lastLogin: '1 dia atrás' },
  { id: '6', name: 'Clara Gomes', email: 'clara.gomes@exemplo.com', plan: 'Pro', status: 'active', lastLogin: '20 minutos atrás' },
  { id: '7', name: 'Ricardo Alves', email: 'ricardo.alves@exemplo.com', plan: 'Free', status: 'suspended', lastLogin: '1 semana atrás' },
  { id: '8', name: 'Sofia Pereira', email: 'sofia.pereira@exemplo.com', plan: 'Pro', status: 'active', lastLogin: '3 horas atrás' },
  { id: '9', name: 'Gustavo Ribeiro', email: 'gustavo.ribeiro@exemplo.com', plan: 'API', status: 'active', lastLogin: '2 dias atrás' },
  { id: '10', name: 'Tatiana Cardoso', email: 'tatiana.cardoso@exemplo.com', plan: 'Free', status: 'inactive', lastLogin: '5 dias atrás' },
];

const UsersPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const handleSelectUser = (userId: string) => {
    setSelectedUsers(prev => 
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };
  
  const handleSelectAll = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers.map(user => user.id));
    }
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Usuários</h1>
          <p className="text-muted-foreground">Gerenciamento de contas de usuários</p>
        </div>
        <div className="flex items-center gap-2 self-start">
          <Button className="flex items-center gap-2">
            <UserPlus className="h-4 w-4" />
            <span>Novo Usuário</span>
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle>Lista de Usuários</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar usuários..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <CardDescription>
            Gerenciamento de usuários do Trader Interior
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">
                    <Checkbox 
                      checked={selectedUsers.length > 0 && selectedUsers.length === filteredUsers.length}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead>Nome / Email</TableHead>
                  <TableHead>Plano</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Último Login</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <Checkbox 
                        checked={selectedUsers.includes(user.id)}
                        onCheckedChange={() => handleSelectUser(user.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-muted-foreground">{user.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={
                        user.plan === 'Pro' 
                          ? 'default'
                          : user.plan === 'API'
                          ? 'secondary'
                          : 'outline'
                      }>
                        {user.plan}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={
                        user.status === 'active' 
                          ? 'outline'
                          : user.status === 'inactive'
                          ? 'secondary'
                          : 'destructive'
                      } className={
                        user.status === 'active' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100' 
                          : ''
                      }>
                        {user.status === 'active' && 'Ativo'}
                        {user.status === 'inactive' && 'Inativo'}
                        {user.status === 'suspended' && 'Suspenso'}
                      </Badge>
                    </TableCell>
                    <TableCell>{user.lastLogin}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Abrir menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Ações</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>Ver detalhes</DropdownMenuItem>
                          <DropdownMenuItem>Editar</DropdownMenuItem>
                          <DropdownMenuItem>Alterar plano</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className={user.status === 'active' ? 'text-destructive' : 'text-primary'}>
                            {user.status === 'active' ? 'Desativar usuário' : 'Ativar usuário'}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredUsers.length === 0 && (
            <div className="py-24 text-center text-muted-foreground">
              Nenhum usuário encontrado para "<span className="font-medium">{searchTerm}</span>"
            </div>
          )}

          {selectedUsers.length > 0 && (
            <div className="mt-4 flex items-center justify-between bg-muted p-3 rounded-md">
              <span className="text-sm font-medium">{selectedUsers.length} usuários selecionados</span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Alterar plano</Button>
                <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">Desativar</Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UsersPage;
