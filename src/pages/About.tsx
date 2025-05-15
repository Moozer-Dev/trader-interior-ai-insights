
import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { 
  LineChart, 
  Users, 
  Award, 
  Zap, 
  BarChart4, 
  ArrowRight, 
  FileText, 
  Briefcase, 
  Clock, 
  Globe,
  Linkedin,
  Twitter
} from 'lucide-react';
import MainNav from '@/components/layout/MainNav';

const About: React.FC = () => {
  const navigate = useNavigate();
  const timelineRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
        }
      });
    }, { threshold: 0.1 });
    
    const timelineItems = timelineRef.current?.querySelectorAll('.timeline-item');
    timelineItems?.forEach((item) => {
      observer.observe(item);
    });
    
    return () => {
      timelineItems?.forEach((item) => {
        observer.unobserve(item);
      });
    };
  }, []);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <MainNav 
        onLoginClick={() => navigate('/auth/login')} 
        onRegisterClick={() => navigate('/auth/login?tab=register')} 
      />
      
      {/* Content with padding for fixed header */}
      <div className="pt-24">
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
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-col md:flex-row items-center gap-10 mb-16">
              <div className="md:w-1/2 animate-fade-in" style={{ animationDelay: "0.3s" }}>
                <div className="rounded-lg overflow-hidden shadow-lg">
                  <AspectRatio ratio={16/9}>
                    <img 
                      src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80" 
                      alt="Equipe TradeMaster" 
                      className="object-cover w-full h-full"
                    />
                  </AspectRatio>
                </div>
              </div>
              <div className="md:w-1/2 animate-fade-in" style={{ animationDelay: "0.4s" }}>
                <h2 className="text-3xl font-bold mb-4">Nossa Missão</h2>
                <p className="text-lg text-gray-700 mb-4">
                  Fundada em 2020, a TradeMaster nasceu da visão de democratizar o acesso a ferramentas avançadas de análise 
                  de investimentos, antes disponíveis apenas para grandes instituições financeiras.
                </p>
                <p className="text-lg text-gray-700 mb-6">
                  Nossa missão é capacitar investidores de todos os níveis com tecnologia de ponta e análises baseadas em IA, 
                  permitindo que tomem decisões mais informadas e estratégicas.
                </p>
                <div className="flex space-x-4">
                  <div className="flex items-center">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <span className="ml-2 font-medium">50+ Especialistas</span>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Globe className="h-5 w-5 text-primary" />
                    </div>
                    <span className="ml-2 font-medium">15+ Países</span>
                  </div>
                </div>
              </div>
            </div>
          
            <div className="flex flex-col md:flex-row-reverse items-center gap-10">
              <div className="md:w-1/2 animate-fade-in" style={{ animationDelay: "0.5s" }}>
                <div className="rounded-lg overflow-hidden shadow-lg">
                  <AspectRatio ratio={16/9}>
                    <img 
                      src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80" 
                      alt="Tecnologia TradeMaster" 
                      className="object-cover w-full h-full"
                    />
                  </AspectRatio>
                </div>
              </div>
              <div className="md:w-1/2 animate-fade-in" style={{ animationDelay: "0.6s" }}>
                <h2 className="text-3xl font-bold mb-4">Nossa Tecnologia</h2>
                <p className="text-lg text-gray-700 mb-4">
                  Combinamos algoritmos avançados de aprendizado de máquina com análises fundamentalistas e técnicas 
                  para oferecer insights precisos e personalizados.
                </p>
                <p className="text-lg text-gray-700 mb-6">
                  Nossa plataforma processa milhões de pontos de dados em tempo real, identificando padrões e oportunidades 
                  que seriam impossíveis de detectar manualmente.
                </p>
                <div className="flex space-x-4">
                  <div className="flex items-center">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <span className="ml-2 font-medium">100+ Indicadores</span>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <span className="ml-2 font-medium">Dados em tempo real</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-16 px-4 bg-gray-50" ref={timelineRef}>
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-16">Nossa Jornada</h2>
            
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary/30"></div>
              
              {/* Timeline items */}
              <div className="timeline-item opacity-0 mb-12 flex justify-between items-center w-full right-timeline">
                <div className="order-1 w-5/12"></div>
                <div className="order-2 w-6 h-6 rounded-full bg-primary border-4 border-white shadow-xl z-10"></div>
                <div className="order-3 bg-white rounded-lg shadow-md w-5/12 px-6 py-4">
                  <h3 className="font-bold text-primary mb-1">2020</h3>
                  <h4 className="font-semibold text-lg mb-2">Fundação da TradeMaster</h4>
                  <p className="text-gray-600">Nossa equipe fundadora de 5 especialistas em finanças e tecnologia lança a primeira versão da plataforma.</p>
                </div>
              </div>
              
              <div className="timeline-item opacity-0 mb-12 flex justify-between items-center w-full left-timeline">
                <div className="order-3 bg-white rounded-lg shadow-md w-5/12 px-6 py-4">
                  <h3 className="font-bold text-primary mb-1">2021</h3>
                  <h4 className="font-semibold text-lg mb-2">Primeira rodada de investimentos</h4>
                  <p className="text-gray-600">Recebemos aporte de R$ 10 milhões para expandir nossa equipe e melhorar nossa tecnologia de IA.</p>
                </div>
                <div className="order-2 w-6 h-6 rounded-full bg-primary border-4 border-white shadow-xl z-10"></div>
                <div className="order-1 w-5/12"></div>
              </div>
              
              <div className="timeline-item opacity-0 mb-12 flex justify-between items-center w-full right-timeline">
                <div className="order-1 w-5/12"></div>
                <div className="order-2 w-6 h-6 rounded-full bg-primary border-4 border-white shadow-xl z-10"></div>
                <div className="order-3 bg-white rounded-lg shadow-md w-5/12 px-6 py-4">
                  <h3 className="font-bold text-primary mb-1">2022</h3>
                  <h4 className="font-semibold text-lg mb-2">Expansão internacional</h4>
                  <p className="text-gray-600">Expandimos nossas operações para América Latina, atingindo mais de 100.000 usuários.</p>
                </div>
              </div>
              
              <div className="timeline-item opacity-0 mb-12 flex justify-between items-center w-full left-timeline">
                <div className="order-3 bg-white rounded-lg shadow-md w-5/12 px-6 py-4">
                  <h3 className="font-bold text-primary mb-1">2023</h3>
                  <h4 className="font-semibold text-lg mb-2">Lançamento da API</h4>
                  <p className="text-gray-600">Desenvolvemos nossa API pública, permitindo integrações com outras plataformas financeiras.</p>
                </div>
                <div className="order-2 w-6 h-6 rounded-full bg-primary border-4 border-white shadow-xl z-10"></div>
                <div className="order-1 w-5/12"></div>
              </div>
              
              <div className="timeline-item opacity-0 flex justify-between items-center w-full right-timeline">
                <div className="order-1 w-5/12"></div>
                <div className="order-2 w-6 h-6 rounded-full bg-primary border-4 border-white shadow-xl z-10"></div>
                <div className="order-3 bg-white rounded-lg shadow-md w-5/12 px-6 py-4">
                  <h3 className="font-bold text-primary mb-1">2024</h3>
                  <h4 className="font-semibold text-lg mb-2">Nova versão da plataforma</h4>
                  <p className="text-gray-600">Lançamento do TradeMaster 2.0 com ferramentas de IA ainda mais avançadas e um alcance de mais de 500.000 usuários.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-12">Nossa Equipe</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="p-6 text-center hover:shadow-lg transition-all animate-fade-in" style={{ animationDelay: "0.3s" }}>
                <div className="w-32 h-32 mx-auto bg-gray-200 rounded-full mb-6 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&q=80&w=256" 
                    alt="André Silva" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold mb-1">André Silva</h3>
                <p className="text-primary mb-3">CEO & Fundador</p>
                <p className="text-gray-600 mb-4">
                  Ex-analista do mercado financeiro com mais de 15 anos de experiência em tecnologia e investimentos.
                </p>
                <div className="flex justify-center space-x-3">
                  <a href="#" className="text-gray-500 hover:text-primary">
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-gray-500 hover:text-primary">
                    <Twitter className="h-5 w-5" />
                  </a>
                </div>
              </Card>
              
              <Card className="p-6 text-center hover:shadow-lg transition-all animate-fade-in" style={{ animationDelay: "0.4s" }}>
                <div className="w-32 h-32 mx-auto bg-gray-200 rounded-full mb-6 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=256" 
                    alt="Mariana Costa" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold mb-1">Mariana Costa</h3>
                <p className="text-primary mb-3">CTO</p>
                <p className="text-gray-600 mb-4">
                  Especialista em IA e ciência de dados com PhD em Machine Learning aplicado a séries temporais financeiras.
                </p>
                <div className="flex justify-center space-x-3">
                  <a href="#" className="text-gray-500 hover:text-primary">
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-gray-500 hover:text-primary">
                    <Twitter className="h-5 w-5" />
                  </a>
                </div>
              </Card>
              
              <Card className="p-6 text-center hover:shadow-lg transition-all animate-fade-in" style={{ animationDelay: "0.5s" }}>
                <div className="w-32 h-32 mx-auto bg-gray-200 rounded-full mb-6 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=256" 
                    alt="Rafael Mendes" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold mb-1">Rafael Mendes</h3>
                <p className="text-primary mb-3">Head de Análise</p>
                <p className="text-gray-600 mb-4">
                  Economista e analista CNPI com vasta experiência em análise fundamentalista e técnica em diversos mercados.
                </p>
                <div className="flex justify-center space-x-3">
                  <a href="#" className="text-gray-500 hover:text-primary">
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-gray-500 hover:text-primary">
                    <Twitter className="h-5 w-5" />
                  </a>
                </div>
              </Card>
            </div>
            
            <div className="text-center mt-12">
              <Button variant="outline" onClick={() => navigate('/careers')} className="animate-pulse">
                Junte-se à nossa equipe
                <Briefcase className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-3xl font-bold text-center mb-12">Nossos Valores</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex items-start animate-fade-in" style={{ animationDelay: "0.3s" }}>
                <div className="mr-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
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
                  <div className="bg-primary/10 p-3 rounded-full">
                    <BarChart4 className="h-8 w-8 text-primary" />
                  </div>
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
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Zap className="h-8 w-8 text-primary" />
                  </div>
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
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Award className="h-8 w-8 text-primary" />
                  </div>
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
              className="bg-primary hover:bg-primary/90"
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
    </div>
  );
};

export default About;
