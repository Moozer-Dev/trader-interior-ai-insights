
import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Bell, Settings, LogOut, UserCircle, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Navbar: React.FC = () => {
  const { user, logout, isAdmin } = useAuth();

  return (
    <div className="bg-background border-b h-14 flex items-center px-4 md:px-6 sticky top-0 z-10">
      <div className="flex items-center">
        <SidebarTrigger />
        <Link to="/dashboard" className="flex items-center">
          <h1 className="text-xl font-semibold ml-3">TradeMaster</h1>
        </Link>
      </div>

      <div className="ml-auto flex items-center space-x-2">
        {/* Notificações */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notificações</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-[300px] overflow-y-auto">
              <div className="p-3 hover:bg-muted rounded-md cursor-pointer">
                <div className="font-medium">Alerta de preço acionado</div>
                <div className="text-sm text-muted-foreground">PETR4 atingiu o valor de R$ 32,50</div>
                <div className="text-xs text-muted-foreground mt-1">10 minutos atrás</div>
              </div>
              <div className="p-3 hover:bg-muted rounded-md cursor-pointer">
                <div className="font-medium">Nova análise disponível</div>
                <div className="text-sm text-muted-foreground">Análise técnica para VALE3 foi atualizada</div>
                <div className="text-xs text-muted-foreground mt-1">1 hora atrás</div>
              </div>
              <div className="p-3 hover:bg-muted rounded-md cursor-pointer">
                <div className="font-medium">Movimentação significativa</div>
                <div className="text-sm text-muted-foreground">IBOV teve queda de 1,5% nos últimos 30 minutos</div>
                <div className="text-xs text-muted-foreground mt-1">2 horas atrás</div>
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="justify-center">
              <Link to="/alerts" className="w-full text-center">Ver todas as notificações</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Configurações */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Configurações</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Geral</DropdownMenuItem>
            <DropdownMenuItem>Aparência</DropdownMenuItem>
            <DropdownMenuItem>Notificações</DropdownMenuItem>
            <DropdownMenuItem>Fontes de dados</DropdownMenuItem>
            <DropdownMenuSeparator />
            {isAdmin && (
              <>
                <DropdownMenuLabel>Administração</DropdownMenuLabel>
                <DropdownMenuItem>
                  <Link to="/admin/users" className="w-full">Usuários</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/admin/plans" className="w-full">Planos</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/admin/integrations" className="w-full">Integrações</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
              </>
            )}
            <DropdownMenuItem>
              <Link to="/help" className="flex w-full items-center">
                <HelpCircle className="mr-2 h-4 w-4" />
                <span>Ajuda</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Perfil */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src="" alt={user?.name || "User"} />
                <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <UserCircle className="mr-2 h-4 w-4" />
              <span>Perfil</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Configurações</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sair</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Navbar;
