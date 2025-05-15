import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { 
  LineChart, 
  Users, 
  Award, 
  BarChart, 
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <MainNav 
        onLoginClick={() => navigate('/auth/login')} 
        onRegisterClick={() => navigate('/auth/login?tab=register')}
      />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">Sobre a TradeMaster</h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Somos uma empresa de tecnologia financeira dedicada a democratizar o acesso a ferramentas profissionais de análise de investimentos.
            </p>
          </div>
          
          {/* Our Mission */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
            <div className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <h2 className="text-3xl font-bold mb-6">Nossa Missão</h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Na TradeMaster, nossa missão é democratizar o acesso ao mercado financeiro, fornecendo ferramentas de análise avançadas que anteriormente estavam disponíveis apenas para grandes instituições.
              </p>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Acreditamos que todo investidor, independentemente do tamanho de seu portfólio, merece acesso a dados de qualidade, análises profundas e insights acionáveis para tomar decisões mais informadas.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Com nossa tecnologia proprietária de inteligência artificial, estamos transformando a maneira como as pessoas investem, tornando o processo mais transparente, eficiente e acessível para todos.
              </p>
            </div>
            <div className="relative animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-blue-500/20 rounded-lg transform rotate-3"></div>
              <div className="relative bg-white p-8 rounded-lg shadow-lg">
                <div className="flex items-center mb-6">
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <Award className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Valores Fundamentais</h3>
                  </div>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="bg-primary/10 p-2 rounded-full mr-3 mt-1">
                      <Users className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Foco no cliente</h4>
                      <p className="text-gray-600">Todas as nossas decisões são guiadas pelas necessidades dos nossos usuários.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-primary/10 p-2 rounded-full mr-3 mt-1">
                      <BarChart className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Excelência analítica</h4>
                      <p className="text-gray-600">Compromisso com a precisão e qualidade dos dados e análises.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-primary/10 p-2 rounded-full mr-3 mt-1">
                      <FileText className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Transparência</h4>
                      <p className="text-gray-600">Comunicação clara e honesta em todos os aspectos do nosso negócio.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-primary/10 p-2 rounded-full mr-3 mt-1">
                      <Globe className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Acessibilidade</h4>
                      <p className="text-gray-600">Tornar as ferramentas financeiras sofisticadas acessíveis a todos.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Our Journey */}
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-12 relative inline-block animate-fade-in">
              Nossa Jornada
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-primary"></div>
            </h2>
            
            <div className="max-w-4xl mx-auto">
              <div className="space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center animate-fade-in" style={{ animationDelay: "0.2s" }}>
                  <div className="md:col-span-3 text-right hidden md:block">
                    <span className="text-2xl font-bold text-primary">2018</span>
                  </div>
                  <div className="md:col-span-1 flex justify-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div className="md:col-span-8">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <div className="md:hidden mb-2">
                        <span className="text-xl font-semibold text-primary">2018</span>
                      </div>
                      <h3 className="text-xl font-semibold mb-2">Fundação</h3>
                      <p className="text-gray-700">
                        A TradeMaster foi fundada por um grupo de profissionais de tecnologia e finanças com a visão de democratizar as ferramentas de análise de investimentos. Começamos com uma pequena equipe de 5 pessoas em São Paulo.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center animate-fade-in" style={{ animationDelay: "0.3s" }}>
                  <div className="md:col-span-8 md:order-first order-last">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <div className="md:hidden mb-2">
                        <span className="text-xl font-semibold text-primary">2019</span>
                      </div>
                      <h3 className="text-xl font-semibold mb-2">Primeiro Produto</h3>
                      <p className="text-gray-700">
                        Lançamos a primeira versão da plataforma TradeMaster com recursos básicos de análise de mercado e acompanhamento de portfólio. Alcançamos nossos primeiros 1.000 usuários ainda no primeiro trimestre.
                      </p>
                    </div>
                  </div>
                  <div className="md:col-span-1 flex justify-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <BarChart className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div className="md:col-span-3 text-left hidden md:block">
                    <span className="text-2xl font-bold text-primary">2019</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center animate-fade-in" style={{ animationDelay: "0.4s" }}>
                  <div className="md:col-span-3 text-right hidden md:block">
                    <span className="text-2xl font-bold text-primary">2021</span>
                  </div>
                  <div className="md:col-span-1 flex justify-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Award className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div className="md:col-span-8">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <div className="md:hidden mb-2">
                        <span className="text-xl font-semibold text-primary">2021</span>
                      </div>
                      <h3 className="text-xl font-semibold mb-2">Expansão e Reconhecimento</h3>
                      <p className="text-gray-700">
                        Expandimos para toda América Latina e recebemos o prêmio de "Melhor FinTech de Investimentos" no Latin American FinTech Awards. Nossa base de usuários ultrapassou 100.000 investidores ativos.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center animate-fade-in" style={{ animationDelay: "0.5s" }}>
                  <div className="md:col-span-8 md:order-first order-last">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <div className="md:hidden mb-2">
                        <span className="text-xl font-semibold text-primary">2023</span>
                      </div>
                      <h3 className="text-xl font-semibold mb-2">Inovação com IA</h3>
                      <p className="text-gray-700">
                        Lançamento da nossa tecnologia proprietária de IA para análise preditiva de mercado e otimização de portfólio, revolucionando a maneira como os investidores tomam decisões. A empresa cresceu para mais de 50 funcionários.
                      </p>
                    </div>
                  </div>
                  <div className="md:col-span-1 flex justify-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Briefcase className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div className="md:col-span-3 text-left hidden md:block">
                    <span className="text-2xl font-bold text-primary">2023</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center animate-fade-in" style={{ animationDelay: "0.6s" }}>
                  <div className="md:col-span-3 text-right hidden md:block">
                    <span className="text-2xl font-bold text-primary">Hoje</span>
                  </div>
                  <div className="md:col-span-1 flex justify-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <LineChart className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div className="md:col-span-8">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <div className="md:hidden mb-2">
                        <span className="text-xl font-semibold text-primary">Hoje</span>
                      </div>
                      <h3 className="text-xl font-semibold mb-2">Liderando o Futuro dos Investimentos</h3>
                      <p className="text-gray-700">
                        Atualmente, a TradeMaster é líder em tecnologia financeira no Brasil, com mais de 500.000 usuários e parcerias com as principais instituições financeiras. Continuamos inovando com novas soluções de análise e inteligência artificial.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Our Team */}
          <div className="mb-24">
            <h2 className="text-3xl font-bold mb-12 text-center animate-fade-in">Nosso Time de Liderança</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  name: "Carlos Oliveira",
                  role: "CEO & Fundador",
                  bio: "Ex-executivo de grandes bancos com mais de 15 anos de experiência em mercados financeiros.",
                  image: null
                },
                {
                  name: "Mariana Santos",
                  role: "CTO",
                  bio: "Especialista em IA e machine learning, liderando nossa equipe de engenharia e inovação.",
                  image: null
                },
                {
                  name: "Rafael Mendes",
                  role: "Diretor de Produto",
                  bio: "Apaixonado por design de produto e experiência do usuário em plataformas financeiras.",
                  image: null
                },
                {
                  name: "Juliana Costa",
                  role: "CFO",
                  bio: "Experiente em finanças corporativas e estratégia de crescimento para startups.",
                  image: null
                }
              ].map((member, index) => (
                <Card key={member.name} className="overflow-hidden hover:shadow-lg transition-all animate-fade-in" style={{ animationDelay: `${0.3 + index * 0.1}s` }}>
                  <div className="p-1">
                    <AspectRatio ratio={1 / 1}>
                      <div className="bg-primary/10 w-full h-full flex items-center justify-center">
                        <Avatar className="w-5/6 h-5/6">
                          <AvatarImage src={member.image || ""} alt={member.name} />
                          <AvatarFallback className="text-4xl font-semibold bg-primary/20 text-primary">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                    </AspectRatio>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                    <p className="text-primary font-medium mb-3">{member.role}</p>
                    <p className="text-gray-600 mb-4">{member.bio}</p>
                    <div className="flex space-x-2">
                      <a href="#" className="text-gray-500 hover:text-primary transition-colors" aria-label="LinkedIn">
                        <Linkedin className="h-5 w-5" />
                      </a>
                      <a href="#" className="text-gray-500 hover:text-primary transition-colors" aria-label="Twitter">
                        <Twitter className="h-5 w-5" />
                      </a>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
          
          {/* CTA */}
          <div className="bg-gradient-to-r from-primary to-blue-600 rounded-xl p-8 md:p-12 text-white text-center shadow-lg animate-fade-in" style={{ animationDelay: "0.7s" }}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Pronto para transformar seus investimentos?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Junte-se a mais de 500.000 investidores que já estão usando a TradeMaster para tomar decisões mais inteligentes.
            </p>
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-white text-primary hover:bg-white/90" 
              onClick={() => navigate('/auth/login?tab=register')}
            >
              Comece Gratuitamente
            </Button>
          </div>
        </div>
      </div>
      
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
