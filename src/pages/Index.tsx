
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, ChartBar, LineChart, Shield, Users, Wallet } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

const Index = () => {
  const navigate = useNavigate();

  const goToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header/Navbar */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-primary/20 p-1 rounded-md">
              <ChartBar className="w-6 h-6 text-primary" />
            </div>
            <span className="text-xl font-bold">Trader Interior</span>
          </div>
          <div className="flex items-center gap-4">
            <nav className="hidden md:flex items-center gap-6">
              <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Recursos</a>
              <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Planos</a>
              <a href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Sobre</a>
            </nav>
            <Button variant="outline" onClick={goToDashboard}>Entrar</Button>
            <Button onClick={goToDashboard}>Começar Grátis</Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-4 bg-accent/20 text-accent-foreground px-3 py-1 text-sm">Plataforma de análise financeira</Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 max-w-4xl mx-auto">
            Decisões financeiras inteligentes com o poder da IA
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Uma plataforma completa para análise de mercado, gestão de portfólio e insights baseados em inteligência artificial.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" onClick={goToDashboard} className="gap-2">
              Experimentar Agora
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" onClick={goToDashboard}>
              Ver Demonstração
            </Button>
          </div>
          <div className="mt-12 mx-auto max-w-5xl bg-gradient-to-b from-background to-muted p-2 rounded-xl border shadow-lg">
            <img 
              src="https://placehold.co/1200x600/e7e7e7/2027d9?text=Dashboard+Preview" 
              alt="Dashboard Preview" 
              className="rounded-lg w-full" 
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Recursos Poderosos</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Tudo o que você precisa para acompanhar e analisar seus investimentos em um único lugar
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-background p-6 rounded-xl border">
              <div className="bg-primary/10 w-12 h-12 flex items-center justify-center rounded-lg mb-4">
                <LineChart className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Análise em Tempo Real</h3>
              <p className="text-muted-foreground">
                Acompanhe cotações e indicadores de mercado em tempo real com gráficos interativos e personalizáveis
              </p>
            </div>

            <div className="bg-background p-6 rounded-xl border">
              <div className="bg-accent/10 w-12 h-12 flex items-center justify-center rounded-lg mb-4">
                <Wallet className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Gestão de Portfólio</h3>
              <p className="text-muted-foreground">
                Organize e acompanhe o desempenho dos seus investimentos com análises detalhadas e rebalanceamento automático
              </p>
            </div>

            <div className="bg-background p-6 rounded-xl border">
              <div className="bg-primary/10 w-12 h-12 flex items-center justify-center rounded-lg mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Alertas Personalizados</h3>
              <p className="text-muted-foreground">
                Configure alertas para preços, volumes e indicadores técnicos e receba notificações em tempo real
              </p>
            </div>

            <div className="bg-background p-6 rounded-xl border">
              <div className="bg-accent/10 w-12 h-12 flex items-center justify-center rounded-lg mb-4">
                <ChartBar className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Análise Técnica com IA</h3>
              <p className="text-muted-foreground">
                Reconhecimento automático de padrões gráficos e previsões de preços utilizando algoritmos de machine learning
              </p>
            </div>

            <div className="bg-background p-6 rounded-xl border">
              <div className="bg-primary/10 w-12 h-12 flex items-center justify-center rounded-lg mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Recomendações de Carteira</h3>
              <p className="text-muted-foreground">
                Sugestões personalizadas de alocação de ativos baseadas no seu perfil de risco e objetivos financeiros
              </p>
            </div>

            <div className="bg-background p-6 rounded-xl border">
              <div className="bg-accent/10 w-12 h-12 flex items-center justify-center rounded-lg mb-4">
                <ArrowRight className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Simulações de Investimento</h3>
              <p className="text-muted-foreground">
                Ferramentas de simulação para projetar o crescimento do seu patrimônio ao longo do tempo
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Planos para Todos os Perfis</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Escolha o plano que melhor se adapta às suas necessidades de investimento
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <div className="bg-background rounded-xl border p-6">
              <div className="mb-6">
                <h3 className="text-2xl font-bold">Free</h3>
                <p className="text-muted-foreground mt-1">Para investidores iniciantes</p>
              </div>
              <div className="mb-6">
                <span className="text-3xl font-bold">R$ 0</span>
                <span className="text-muted-foreground">/mês</span>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <ArrowRight className="h-4 w-4 mr-2 mt-1 text-accent" />
                  <span>Cotações com delay de 15 minutos</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-4 w-4 mr-2 mt-1 text-accent" />
                  <span>Alertas de preço (até 3)</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-4 w-4 mr-2 mt-1 text-accent" />
                  <span>Dashboard básico</span>
                </li>
              </ul>
              <Button variant="outline" className="w-full" onClick={goToDashboard}>
                Começar Grátis
              </Button>
            </div>

            {/* Pro Plan */}
            <div className="bg-background rounded-xl border border-accent p-6 shadow-lg relative">
              <div className="absolute top-0 left-0 w-full text-center bg-accent text-accent-foreground text-xs py-1 rounded-t-xl">
                MAIS POPULAR
              </div>
              <div className="mb-6 pt-4">
                <h3 className="text-2xl font-bold">Pro</h3>
                <p className="text-muted-foreground mt-1">Para investidores ativos</p>
              </div>
              <div className="mb-6">
                <span className="text-3xl font-bold">R$ 49,90</span>
                <span className="text-muted-foreground">/mês</span>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <ArrowRight className="h-4 w-4 mr-2 mt-1 text-accent" />
                  <span>Tudo do plano Free</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-4 w-4 mr-2 mt-1 text-accent" />
                  <span>Análise técnica automatizada</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-4 w-4 mr-2 mt-1 text-accent" />
                  <span>Recomendações de IA</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-4 w-4 mr-2 mt-1 text-accent" />
                  <span>Portfólio ilimitado</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-4 w-4 mr-2 mt-1 text-accent" />
                  <span>Exportação de dados</span>
                </li>
              </ul>
              <Button className="w-full" onClick={goToDashboard}>
                Começar Agora
              </Button>
            </div>

            {/* API Plan */}
            <div className="bg-background rounded-xl border p-6">
              <div className="mb-6">
                <h3 className="text-2xl font-bold">API</h3>
                <p className="text-muted-foreground mt-1">Para integração com sistemas</p>
              </div>
              <div className="mb-6">
                <span className="text-3xl font-bold">R$ 299,90</span>
                <span className="text-muted-foreground">/mês</span>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <ArrowRight className="h-4 w-4 mr-2 mt-1 text-accent" />
                  <span>Tudo do plano Pro</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-4 w-4 mr-2 mt-1 text-accent" />
                  <span>Acesso via API REST</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-4 w-4 mr-2 mt-1 text-accent" />
                  <span>Suporte técnico prioritário</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-4 w-4 mr-2 mt-1 text-accent" />
                  <span>SLA garantido</span>
                </li>
              </ul>
              <Button variant="outline" className="w-full" onClick={goToDashboard}>
                Contratar
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Pronto para transformar seus investimentos?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Comece a utilizar o Trader Interior hoje mesmo e descubra o poder da análise financeira combinada com inteligência artificial.
          </p>
          <Button size="lg" onClick={goToDashboard} className="gap-2">
            Começar Gratuitamente
            <ArrowRight className="h-4 w-4" />
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            Não é necessário cartão de crédito
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer id="about" className="bg-background border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-primary/20 p-1 rounded-md">
                  <ChartBar className="w-5 h-5 text-primary" />
                </div>
                <span className="text-lg font-bold">Trader Interior</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Plataforma completa para análises financeiras com inteligência artificial
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-4">Recursos</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Dashboard</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Mercados</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Portfólio</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Análise com IA</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Alertas</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Empresa</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Sobre nós</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Carreiras</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Contato</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Suporte</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Ajuda</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Documentação</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">API</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Política de Privacidade</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Termos de Uso</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-12 pt-6 text-sm text-muted-foreground text-center">
            &copy; {new Date().getFullYear()} Trader Interior. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
