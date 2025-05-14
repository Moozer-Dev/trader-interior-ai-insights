
import React from "react";
import { Outlet } from "react-router-dom";
import { Sidebar, SidebarProvider, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarGroup, SidebarGroupLabel, SidebarGroupContent } from "@/components/ui/sidebar";
import Navbar from "./Navbar";
import { useAuth } from "@/contexts/AuthContext";
import { NavLink, useLocation } from "react-router-dom";
import { LayoutDashboard, BarChart, PieChart, BellRing, LineChart, Users, FileText, Settings, Package } from "lucide-react";

const Dashboard = () => {
  const { user, isAdmin } = useAuth();
  const location = useLocation();
  const currentPath = location.pathname;

  // Verifica se o caminho atual está ativo
  const isActive = (path: string) => currentPath === path;

  // Classes para links de navegação
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? "bg-muted text-primary font-medium" : "hover:bg-muted/50";

  // Verifica se o usuário tem acesso premium (plano Pro ou API)
  const isPremiumUser = user?.plan === 'pro' || user?.plan === 'api';

  return (
    <SidebarProvider>
      <div className="flex flex-col min-h-screen w-full">
        <Navbar />
        <div className="flex flex-1 w-full">
          <Sidebar className="border-r">
            <SidebarContent>
              <SidebarGroup defaultOpen>
                <SidebarGroupLabel>Principal</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <NavLink to="/dashboard" end className={getNavCls}>
                          <LayoutDashboard className="mr-2 h-4 w-4" />
                          <span>Dashboard</span>
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <NavLink to="/markets" className={getNavCls}>
                          <BarChart className="mr-2 h-4 w-4" />
                          <span>Mercados</span>
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <NavLink to="/portfolio" className={getNavCls}>
                          <PieChart className="mr-2 h-4 w-4" />
                          <span>Portfólio</span>
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <NavLink to="/alerts" className={getNavCls}>
                          <BellRing className="mr-2 h-4 w-4" />
                          <span>Alertas</span>
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <NavLink to="/analytics" className={getNavCls}>
                          <LineChart className="mr-2 h-4 w-4" />
                          <span>Análise com IA {!isPremiumUser && "🔒"}</span>
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>

              {isAdmin && (
                <SidebarGroup>
                  <SidebarGroupLabel>Administração</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                          <NavLink to="/admin/users" className={getNavCls}>
                            <Users className="mr-2 h-4 w-4" />
                            <span>Usuários</span>
                          </NavLink>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                          <NavLink to="/admin/plans" className={getNavCls}>
                            <Package className="mr-2 h-4 w-4" />
                            <span>Planos</span>
                          </NavLink>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                          <NavLink to="/admin/reports" className={getNavCls}>
                            <FileText className="mr-2 h-4 w-4" />
                            <span>Relatórios</span>
                          </NavLink>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                          <NavLink to="/admin/integrations" className={getNavCls}>
                            <Settings className="mr-2 h-4 w-4" />
                            <span>Integrações</span>
                          </NavLink>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              )}
            </SidebarContent>
          </Sidebar>
          <div className="flex-1 p-6 max-w-7xl mx-auto">
            <Outlet />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
