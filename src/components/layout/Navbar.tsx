
import React from "react";
import { NavLink } from "react-router-dom";
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Home, LineChart, BarChart3, PieChart, Bell, Settings, User } from "lucide-react";

const Navbar = () => {
  return (
    <div className="bg-background border-b sticky top-0 z-30 w-full">
      <div className="flex h-16 items-center px-6">
        <div className="flex items-center font-semibold text-lg mr-6">
          <LineChart className="w-6 h-6 mr-2 text-primary" />
          <span>TraderPro</span>
        </div>
        
        <NavigationMenu className="mx-auto">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavLink 
                to="/dashboard" 
                className={({ isActive }) => cn(
                  "flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors",
                  isActive ? "bg-muted text-primary" : "hover:bg-muted/50"
                )}
              >
                <Home className="h-4 w-4 mr-2" />
                Dashboard
              </NavLink>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <NavLink 
                to="/markets" 
                className={({ isActive }) => cn(
                  "flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors",
                  isActive ? "bg-muted text-primary" : "hover:bg-muted/50"
                )}
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                Mercados
              </NavLink>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <NavLink 
                to="/portfolio" 
                className={({ isActive }) => cn(
                  "flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors",
                  isActive ? "bg-muted text-primary" : "hover:bg-muted/50"
                )}
              >
                <PieChart className="h-4 w-4 mr-2" />
                Portfólio
              </NavLink>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <NavLink 
                to="/analytics" 
                className={({ isActive }) => cn(
                  "flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors",
                  isActive ? "bg-muted text-primary" : "hover:bg-muted/50"
                )}
              >
                <LineChart className="h-4 w-4 mr-2" />
                Análises
              </NavLink>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <NavLink 
                to="/alerts" 
                className={({ isActive }) => cn(
                  "flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors",
                  isActive ? "bg-muted text-primary" : "hover:bg-muted/50"
                )}
              >
                <Bell className="h-4 w-4 mr-2" />
                Alertas
              </NavLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <User className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
