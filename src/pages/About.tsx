
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LineChart, Users, Award, Zap, BarChart4, ArrowRight } from 'lucide-react';

const About: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto p-4 flex justify-between items-center">
          <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
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
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">Nossa História</h1>
          <p className="text-xl text-gray-700 mb-10 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Conheça a equipe por trás da plataforma de investimentos mais inovadora do Brasil
          </p>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-12 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-col md:flex-row items-center gap-10 mb-16">
            <div className="md:w-1/2 animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80" 
                alt="Equipe TradeMaster" 
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="md:w-1/2 animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <h2 className="text-3xl font-bold mb-4">Nossa Missão</h2>
              <p className="text-lg text-gray-700 mb-4">
                Fundada em 2020, a TradeMaster nasceu da visão de democratizar o acesso a ferramentas avançadas de análise 
                de investimentos, antes disponíveis apenas para grandes instituições financeiras.
              </p>
              <p className="text-lg text-gray-700">
                Nossa missão é capacitar investidores de todos os níveis com tecnologia de ponta e análises baseadas em IA, 
                permitindo que tomem decisões mais informadas e estratégicas.
              </p>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row-reverse items-center gap-10">
            <div className="md:w-1/2 animate-fade-in" style={{ animationDelay: "0.5s" }}>
              <img 
                src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80" 
                alt="Tecnologia TradeMaster" 
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="md:w-1/2 animate-fade-in" style={{ animationDelay: "0.6s" }}>
              <h2 className="text-3xl font-bold mb-4">Nossa Tecnologia</h2>
              <p className="text-lg text-gray-700 mb-4">
                Combinamos algoritmos avançados de aprendizado de máquina com análises fundamentalistas e técnicas 
                para oferecer insights precisos e personalizados.
              </p>
              <p className="text-lg text-gray-700">
                Nossa plataforma processa milhões de pontos de dados em tempo real, identificando padrões e oportunidades 
                que seriam impossíveis de detectar manualmente.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">Nossa Equipe</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6 text-center hover:shadow-lg transition-all animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <div className="w-24 h-24 mx-auto bg-gray-200 rounded-full mb-4"></div>
              <h3 className="text-xl font-bold mb-1">André Silva</h3>
              <p className="text-primary mb-3">CEO & Fundador</p>
              <p className="text-gray-600">
                Ex-analista do mercado financeiro com mais de 15 anos de experiência em tecnologia e investimentos.
              </p>
            </Card>
            
            <Card className="p-6 text-center hover:shadow-lg transition-all animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <div className="w-24 h-24 mx-auto bg-gray-200 rounded-full mb-4"></div>
              <h3 className="text-xl font-bold mb-1">Mariana Costa</h3>
              <p className="text-primary mb-3">CTO</p>
              <p className="text-gray-600">
                Especialista em IA e ciência de dados com PhD em Machine Learning aplicado a séries temporais financeiras.
              </p>
            </Card>
            
            <Card className="p-6 text-center hover:shadow-lg transition-all animate-fade-in" style={{ animationDelay: "0.5s" }}>
              <div className="w-24 h-24 mx-auto bg-gray-200 rounded-full mb-4"></div>
              <h3 className="text-xl font-bold mb-1">Rafael Mendes</h3>
              <p className="text-primary mb-3">Head de Análise</p>
              <p className="text-gray-600">
                Economista e analista CNPI com vasta experiência em análise fundamentalista e técnica em diversos mercados.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold text-center mb-12">Nossos Valores</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-start animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <div className="mr-4">
                <Users className="h-12 w-12 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Foco no Cliente</h3>
                <p className="text-gray-700">
                  Desenvolvemos nossas soluções sempre pensando nas necessidades reais dos investidores, 
                  com foco em experiência do usuário e resultados práticos.
                </p>
              </div>
            </div>
            
            <div className="flex items-start animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <div className="mr-4">
                <BarChart4 className="h-12 w-12 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Precisão Analítica</h3>
                <p className="text-gray-700">
                  Comprometemo-nos com a excelência técnica e a precisão dos dados, 
                  fornecendo análises confiáveis para decisões informadas.
                </p>
              </div>
            </div>
            
            <div className="flex items-start animate-fade-in" style={{ animationDelay: "0.5s" }}>
              <div className="mr-4">
                <Zap className="h-12 w-12 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Inovação Constante</h3>
                <p className="text-gray-700">
                  Investimos continuamente em pesquisa e desenvolvimento para manter nossa 
                  plataforma na vanguarda tecnológica do mercado financeiro.
                </p>
              </div>
            </div>
            
            <div className="flex items-start animate-fade-in" style={{ animationDelay: "0.6s" }}>
              <div className="mr-4">
                <Award className="h-12 w-12 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Educação Financeira</h3>
                <p className="text-gray-700">
                  Acreditamos que a tecnologia deve vir acompanhada de conhecimento, por isso 
                  investimos em conteúdos educativos para nossos usuários.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-primary/10">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6">Junte-se à revolução dos investimentos inteligentes</h2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Transforme sua experiência de investimento com a plataforma líder em análise por IA.
          </p>
          <Button 
            size="lg" 
            className="animate-pulse bg-primary hover:bg-primary/90"
            onClick={() => navigate('/auth/login?tab=register')}
          >
            Começar Gratuitamente <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
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
                <li><a href="/auth/login" className="hover:text-white transition-colors">Dashboard</a></li>
                <li><a href="/auth/login" className="hover:text-white transition-colors">Análise de Mercado</a></li>
                <li><a href="/auth/login" className="hover:text-white transition-colors">Portfólio</a></li>
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
            &copy; {new Date().getFullYear()} TradeMaster. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;
