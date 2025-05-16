
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';
import { ArrowRight, BarChart, LineChart, PieChart, Shield, Star, Zap, ShoppingCart } from 'lucide-react';
import MainNav from '@/components/layout/MainNav';
import { getFeaturedProducts } from '@/data/products';
import ProductCard from '@/components/products/ProductCard';
import { useCart } from '@/contexts/CartContext';

const Index: React.FC = () => {
  const navigate = useNavigate();
  const featuredProducts = getFeaturedProducts();
  const { totalItems } = useCart();

  const handleLoginClick = () => {
    navigate('/auth/login');
  };

  const handleAdminClick = () => {
    navigate('/auth/login?role=admin');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Main Navigation */}
      <MainNav onLoginClick={handleLoginClick} onAdminClick={handleAdminClick} />
      
      {/* Content with padding for fixed header */}
      <div className="pt-20">
        {/* Hero Section */}
        <section className="pt-16 pb-24 px-4 text-center">
          <div className="container mx-auto max-w-5xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-700 animate-fade-in">
              Transforme seus investimentos com IA
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-gray-700 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: "0.2s" }}>
              A plataforma completa para análise de investimentos, com dados em tempo real, alertas personalizados e insights de IA.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" onClick={() => navigate('/products')}>
                Ver Produtos <ShoppingCart className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Recursos poderosos para investidores</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 border rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow hover:scale-105 transform transition duration-300">
                <BarChart className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Análise de Mercado</h3>
                <p className="text-gray-600">
                  Acompanhe cotações em tempo real, gráficos interativos e indicadores técnicos para tomar as melhores decisões.
                </p>
              </div>
              
              <div className="p-6 border rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow hover:scale-105 transform transition duration-300">
                <PieChart className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Gestão de Portfólio</h3>
                <p className="text-gray-600">
                  Visualize o desempenho da sua carteira, analise a distribuição de ativos e otimize seus investimentos.
                </p>
              </div>
              
              <div className="p-6 border rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow hover:scale-105 transform transition duration-300">
                <Zap className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Alertas Personalizados</h3>
                <p className="text-gray-600">
                  Configure alertas para preço, volume ou variação e receba notificações quando suas condições forem atendidas.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="container mx-auto">
            <div className="max-w-6xl mx-auto">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold">Produtos em Destaque</h2>
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/products')}
                  className="flex items-center"
                >
                  Ver todos <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {featuredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="md:w-1/2 animate-fade-in" style={{ animationDelay: "0.3s" }}>
                <h2 className="text-3xl font-bold mb-6">Tecnologia de ponta para seus investimentos</h2>
                <p className="text-lg text-gray-700 mb-6">
                  Com a Trader Interior, você tem acesso a uma plataforma de análise de investimentos construída com 
                  as mais modernas tecnologias de inteligência artificial e ciência de dados.
                </p>
                <p className="text-lg text-gray-700 mb-6">
                  Nossa equipe de especialistas em finanças e tecnologia trabalha constantemente para 
                  oferecer as melhores ferramentas de análise e previsão de mercado.
                </p>
                <Button 
                  className="bg-primary hover:bg-primary/90"
                  onClick={() => navigate('/about')}
                >
                  Saiba mais sobre nossa tecnologia
                </Button>
              </div>
              <div className="md:w-1/2">
                <div className="rounded-lg overflow-hidden shadow-lg animate-fade-in" style={{ animationDelay: "0.5s" }}>
                  <img 
                    src="https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80" 
                    alt="Tecnologia de Trading" 
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">O que nossos clientes dizem</h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Junte-se a milhares de investidores que transformaram suas estratégias de investimento com a Trader Interior.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
            <Card className="animate-fade-in hover:shadow-lg transition-all" style={{ animationDelay: "0.2s" }}>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">
                  "A Trader Interior revolucionou minha forma de investir. As análises de IA são impressionantes e me ajudaram a tomar decisões muito mais fundamentadas."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gray-300 mr-4"></div>
                  <div>
                    <h4 className="font-semibold">Ricardo Almeida</h4>
                    <p className="text-sm text-gray-500">Investidor desde 2020</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="animate-fade-in hover:shadow-lg transition-all" style={{ animationDelay: "0.4s" }}>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">
                  "Os alertas personalizados me salvaram várias vezes. A plataforma é intuitiva e as análises são profundas. Melhor investimento que fiz!"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gray-300 mr-4"></div>
                  <div>
                    <h4 className="font-semibold">Juliana Costa</h4>
                    <p className="text-sm text-gray-500">Trader Profissional</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="animate-fade-in hover:shadow-lg transition-all" style={{ animationDelay: "0.6s" }}>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">
                  "Nunca vi uma plataforma tão completa. O simulador de investimentos me ajudou a testar estratégias sem riscos. Simplesmente fantástico!"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gray-300 mr-4"></div>
                  <div>
                    <h4 className="font-semibold">Carlos Mendes</h4>
                    <p className="text-sm text-gray-500">Investidor Iniciante</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center mb-4">
                  <LineChart className="h-6 w-6 text-primary mr-2" />
                  <span className="font-bold text-xl">Trader Interior</span>
                </div>
                <p className="text-gray-400 text-sm">
                  Plataforma completa para análise de investimentos com IA.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Recursos</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="/auth/login" className="hover:text-white transition-colors">Dashboard</a></li>
                  <li><a href="/auth/login" className="hover:text-white transition-colors">Análise de Mercado</a></li>
                  <li><a href="/products" className="hover:text-white transition-colors">Produtos</a></li>
                  <li><a href="/auth/login" className="hover:text-white transition-colors">Alertas</a></li>
                  <li><a href="/auth/login" className="hover:text-white transition-colors">IA & Insights</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Empresa</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="/about" className="hover:text-white transition-colors">Sobre nós</a></li>
                  <li><a href="/contact" className="hover:text-white transition-colors">Contato</a></li>
                  <li><a href="/blog" className="hover:text-white transition-colors">Blog</a></li>
                  <li><a href="/careers" className="hover:text-white transition-colors">Carreiras</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Legal</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="/terms" className="hover:text-white transition-colors">Termos de Uso</a></li>
                  <li><a href="/privacy" className="hover:text-white transition-colors">Política de Privacidade</a></li>
                  <li><a href="/cookies" className="hover:text-white transition-colors">Cookies</a></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} Trader Interior. Todos os direitos reservados.
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
