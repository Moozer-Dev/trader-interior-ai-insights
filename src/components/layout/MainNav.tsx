
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { LineChart, Menu, X, Shield, ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const MainNav: React.FC<{ onLoginClick: () => void; onAdminClick: () => void }> = ({
  onLoginClick,
  onAdminClick,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { totalItems } = useCart();
  const { toast } = useToast();
  const { isAuthenticated, isAdmin, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => location.pathname === path;

  // Handler for clicking the admin button
  const handleAdminClick = () => {
    if (isAuthenticated && isAdmin) {
      navigate('/admin/users');
    } else {
      onAdminClick();
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white shadow-md py-2"
          : "bg-transparent py-4"
      )}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <LineChart
            className={cn(
              "h-6 w-6 mr-2 transition-colors",
              isScrolled ? "text-primary" : "text-primary"
            )}
          />
          <span className={cn(
            "font-bold text-xl transition-colors",
            isScrolled ? "text-gray-800" : "text-gray-800"
          )}>
            TradeMaster
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/">
                  <NavigationMenuLink 
                    className={cn(
                      navigationMenuTriggerStyle(),
                      isActive("/") ? "bg-muted text-primary" : ""
                    )}
                  >
                    Home
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/about">
                  <NavigationMenuLink 
                    className={cn(
                      navigationMenuTriggerStyle(),
                      isActive("/about") ? "bg-muted text-primary" : ""
                    )}
                  >
                    Sobre
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/products">
                  <NavigationMenuLink 
                    className={cn(
                      navigationMenuTriggerStyle(),
                      isActive("/products") ? "bg-muted text-primary" : ""
                    )}
                  >
                    Produtos
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className={isActive("/blog") ? "bg-muted text-primary" : ""}>
                  Blog
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <Link
                          to="/blog"
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        >
                          <LineChart className="h-6 w-6" />
                          <div className="mb-2 mt-4 text-lg font-medium">
                            Blog
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Artigos e análises sobre o mercado financeiro, tendências e dicas de investimento.
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <Link to="/blog/category/mercado" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                        <div className="text-sm font-medium leading-none">Mercado</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Análises e notícias sobre o mercado financeiro
                        </p>
                      </Link>
                    </li>
                    <li>
                      <Link to="/blog/category/investimentos" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                        <div className="text-sm font-medium leading-none">Investimentos</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Dicas e estratégias para investidores
                        </p>
                      </Link>
                    </li>
                    <li>
                      <Link to="/blog/category/tecnologia" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                        <div className="text-sm font-medium leading-none">Tecnologia</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Inovações tecnológicas no mercado financeiro
                        </p>
                      </Link>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/contact">
                  <NavigationMenuLink 
                    className={cn(
                      navigationMenuTriggerStyle(),
                      isActive("/contact") ? "bg-muted text-primary" : ""
                    )}
                  >
                    Contato
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <div className="ml-4 flex items-center space-x-2">
            <Link to="/products">
              <Button variant="ghost" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>
            
            {isAuthenticated ? (
              <Button variant="outline" onClick={() => {
                logout();
                toast({
                  description: "Você saiu da sua conta com sucesso"
                });
              }}>
                Sair
              </Button>
            ) : (
              <Button variant="outline" onClick={onLoginClick}>
                Entrar
              </Button>
            )}
            
            <Button onClick={handleAdminClick} className="flex items-center">
              <Shield className="mr-2 h-4 w-4" /> Admin
            </Button>
          </div>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <Link to="/products" className="mr-2">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Button>
          </Link>
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-gray-700" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg py-4 px-4 animate-fade-in">
          <div className="flex flex-col space-y-3">
            <Link 
              to="/" 
              className={cn(
                "px-4 py-2 rounded-md transition-colors",
                isActive("/") ? "bg-muted text-primary font-medium" : "hover:bg-muted/50"
              )}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className={cn(
                "px-4 py-2 rounded-md transition-colors",
                isActive("/about") ? "bg-muted text-primary font-medium" : "hover:bg-muted/50"
              )}
            >
              Sobre
            </Link>
            <Link 
              to="/products" 
              className={cn(
                "px-4 py-2 rounded-md transition-colors",
                isActive("/products") ? "bg-muted text-primary font-medium" : "hover:bg-muted/50"
              )}
            >
              Produtos
            </Link>
            <Link 
              to="/blog" 
              className={cn(
                "px-4 py-2 rounded-md transition-colors",
                isActive("/blog") ? "bg-muted text-primary font-medium" : "hover:bg-muted/50"
              )}
            >
              Blog
            </Link>
            <Link 
              to="/contact" 
              className={cn(
                "px-4 py-2 rounded-md transition-colors",
                isActive("/contact") ? "bg-muted text-primary font-medium" : "hover:bg-muted/50"
              )}
            >
              Contato
            </Link>
            <div className="pt-3 border-t border-gray-200">
              {isAuthenticated ? (
                <Button variant="outline" onClick={() => {
                  logout();
                  toast({
                    description: "Você saiu da sua conta com sucesso"
                  });
                }} className="w-full mb-2">
                  Sair
                </Button>
              ) : (
                <Button variant="outline" onClick={onLoginClick} className="w-full mb-2">
                  Entrar
                </Button>
              )}
              <Button onClick={handleAdminClick} className="w-full flex items-center justify-center">
                <Shield className="mr-2 h-4 w-4" /> Admin
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default MainNav;
