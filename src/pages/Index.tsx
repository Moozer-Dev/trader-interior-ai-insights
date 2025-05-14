
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';
import { ArrowRight, BarChart, LineChart, PieChart, Shield, Star, Zap } from 'lucide-react';

const Index: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto p-4 flex justify-between items-center">
          <div className="flex items-center">
            <LineChart className="h-6 w-6 text-primary mr-2" />
            <span className="font-bold text-xl">TradeMaster</span>
          </div>
          <div>
            <Button 
              variant="outline" 
              className="mr-2" 
              onClick={() => navigate('/auth/login')}
            >
              Entrar
            </Button>
            <Button onClick={() => navigate('/auth/login?tab=register')}>Começar Grátis</Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-16 pb-24 px-4 text-center">
        <div className="container mx-auto max-w-5xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-700">
            Transforme seus investimentos com IA
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-gray-700 max-w-3xl mx-auto">
            A plataforma completa para análise de investimentos, com dados em tempo real, alertas personalizados e insights de IA.
          </p>
          <Button size="lg" className="animate-pulse" onClick={() => navigate('/auth/login?tab=register')}>
            Experimentar Agora <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Recursos poderosos para investidores</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 border rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow">
              <BarChart className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Análise de Mercado</h3>
              <p className="text-gray-600">
                Acompanhe cotações em tempo real, gráficos interativos e indicadores técnicos para tomar as melhores decisões.
              </p>
            </div>
            
            <div className="p-6 border rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow">
              <PieChart className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Gestão de Portfólio</h3>
              <p className="text-gray-600">
                Visualize o desempenho da sua carteira, analise a distribuição de ativos e otimize seus investimentos.
              </p>
            </div>
            
            <div className="p-6 border rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow">
              <Zap className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Alertas Personalizados</h3>
              <p className="text-gray-600">
                Configure alertas para preço, volume ou variação e receba notificações quando suas condições forem atendidas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">Dashboard Preview</h2>
          
          <div className="rounded-lg overflow-hidden shadow-xl mb-8 max-w-5xl mx-auto">
            <div className="bg-white p-4 border-b flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
                  <span>T</span>
                </div>
                <span className="font-medium">TradeMaster Analytics</span>
              </div>
              <div className="flex space-x-3">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
            </div>
            <div className="bg-white p-0">
              <img 
                src="https://via.placeholder.com/1200x600/f8fafc/64748b?text=Dashboard+Preview" 
                alt="Dashboard Preview" 
                className="w-full h-auto"
              />
            </div>
          </div>
          
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90"
            onClick={() => navigate('/auth/login?tab=register')}
          >
            Comece a usar agora <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">Planos para todos os investidores</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Plano Gratuito */}
            <Card className="overflow-hidden transition-all hover:shadow-md">
              <div className="p-6 bg-white">
                <h3 className="text-2xl font-bold mb-2">Plano Grátis</h3>
                <p className="text-gray-500 mb-4">Para investidores iniciantes</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold">R$ 0</span>
                  <span className="text-gray-500">/mês</span>
                </div>
                <Button 
                  className="w-full mb-6"
                  onClick={() => navigate('/auth/login?tab=register')}
                >
                  Começar Grátis
                </Button>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center">
                    <Star className="h-4 w-4 text-primary mr-2" />
                    <span>Cotações com atraso de 15 min</span>
                  </li>
                  <li className="flex items-center">
                    <Star className="h-4 w-4 text-primary mr-2" />
                    <span>Acesso às informações básicas</span>
                  </li>
                  <li className="flex items-center">
                    <Star className="h-4 w-4 text-primary mr-2" />
                    <span>Portfólio limitado (5 ativos)</span>
                  </li>
                  <li className="flex items-center">
                    <Star className="h-4 w-4 text-primary mr-2" />
                    <span>Alertas limitados (3)</span>
                  </li>
                </ul>
              </div>
            </Card>
            
            {/* Plano Pro */}
            <Card className="overflow-hidden border-primary transition-all hover:shadow-md relative">
              <div className="absolute top-0 right-0 bg-primary text-white text-xs font-semibold px-3 py-1 rounded-bl">
                Popular
              </div>
              <div className="p-6 bg-white">
                <h3 className="text-2xl font-bold mb-2">Plano Pro</h3>
                <p className="text-gray-500 mb-4">Para investidores ativos</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold">R$ 39,90</span>
                  <span className="text-gray-500">/mês</span>
                </div>
                <Button 
                  className="w-full mb-6 bg-primary hover:bg-primary/90"
                  onClick={() => navigate('/auth/login?tab=register')}
                >
                  Assinar Pro
                </Button>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center">
                    <Shield className="h-4 w-4 text-primary mr-2" />
                    <span>Cotações em tempo real</span>
                  </li>
                  <li className="flex items-center">
                    <Shield className="h-4 w-4 text-primary mr-2" />
                    <span>Análises fundamentalistas</span>
                  </li>
                  <li className="flex items-center">
                    <Shield className="h-4 w-4 text-primary mr-2" />
                    <span>Portfólio ilimitado</span>
                  </li>
                  <li className="flex items-center">
                    <Shield className="h-4 w-4 text-primary mr-2" />
                    <span>Alertas ilimitados</span>
                  </li>
                  <li className="flex items-center">
                    <Shield className="h-4 w-4 text-primary mr-2" />
                    <span>Suporte prioritário</span>
                  </li>
                </ul>
              </div>
            </Card>
            
            {/* Plano API */}
            <Card className="overflow-hidden transition-all hover:shadow-md">
              <div className="p-6 bg-white">
                <h3 className="text-2xl font-bold mb-2">Plano API</h3>
                <p className="text-gray-500 mb-4">Para desenvolvedores</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold">R$ 99,90</span>
                  <span className="text-gray-500">/mês</span>
                </div>
                <Button 
                  className="w-full mb-6"
                  onClick={() => navigate('/auth/login?tab=register')}
                >
                  Assinar API
                </Button>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center">
                    <Star className="h-4 w-4 text-primary mr-2" />
                    <span>Todos os recursos do Pro</span>
                  </li>
                  <li className="flex items-center">
                    <Star className="h-4 w-4 text-primary mr-2" />
                    <span>API para integração</span>
                  </li>
                  <li className="flex items-center">
                    <Star className="h-4 w-4 text-primary mr-2" />
                    <span>10.000 requisições por dia</span>
                  </li>
                  <li className="flex items-center">
                    <Star className="h-4 w-4 text-primary mr-2" />
                    <span>Suporte técnico dedicado</span>
                  </li>
                  <li className="flex items-center">
                    <Star className="h-4 w-4 text-primary mr-2" />
                    <span>Documentação completa</span>
                  </li>
                </ul>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <LineChart className="h-6 w-6 text-primary mr-2" />
                <span className="font-bold text-xl">TradeMaster</span>
              </div>
              <p className="text-gray-400 text-sm">
                Plataforma completa para análise de investimentos com IA.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Recursos</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Dashboard</li>
                <li>Análise de Mercado</li>
                <li>Portfólio</li>
                <li>Alertas</li>
                <li>IA & Insights</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Empresa</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Sobre nós</li>
                <li>Contato</li>
                <li>Blog</li>
                <li>Carreiras</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Termos de Uso</li>
                <li>Política de Privacidade</li>
                <li>Cookies</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} TradeMaster. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
