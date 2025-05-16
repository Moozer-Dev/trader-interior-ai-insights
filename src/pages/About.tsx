
import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import MainNav from '@/components/layout/MainNav';
import { Zap, Users, LineChart, BarChart, PieChart } from 'lucide-react';

const About: React.FC = () => {
  const navigate = useNavigate();

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
      <div className="pt-28 pb-16 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-6">Sobre a TradeMaster</h1>
            
            {/* Mission */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Nossa Missão</h2>
              <p className="text-lg text-gray-700 mb-6">
                Na TradeMaster, nossa missão é democratizar o acesso a ferramentas avançadas de análise financeira, 
                tornando a tecnologia de ponta acessível a investidores de todos os níveis.
              </p>
              <p className="text-lg text-gray-700">
                Acreditamos que com os dados certos e ferramentas poderosas, qualquer pessoa pode tomar 
                decisões de investimento mais informadas e alcançar seus objetivos financeiros.
              </p>
            </section>
            
            {/* Our Story */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Nossa História</h2>
              <p className="text-lg text-gray-700 mb-4">
                A TradeMaster foi fundada em 2020 por um grupo de especialistas em finanças e tecnologia que 
                identificaram uma lacuna no mercado: ferramentas avançadas de análise financeira eram acessíveis 
                apenas a grandes instituições e investidores de alto patrimônio.
              </p>
              <p className="text-lg text-gray-700 mb-4">
                Começamos com uma visão clara: criar uma plataforma que combinasse análise técnica sofisticada, 
                inteligência artificial e uma experiência de usuário intuitiva, tudo a um preço acessível.
              </p>
              <p className="text-lg text-gray-700">
                Hoje, atendemos milhares de investidores em todo o Brasil, desde iniciantes até profissionais, 
                ajudando-os a navegar pelos mercados financeiros com confiança e precisão.
              </p>
            </section>
            
            {/* Team */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-6">Nossa Equipe</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="w-20 h-20 bg-gray-200 rounded-full mb-4 mx-auto"></div>
                  <h3 className="text-xl font-medium text-center mb-2">Carlos Silva</h3>
                  <p className="text-primary text-center mb-4">CEO & Fundador</p>
                  <p className="text-gray-600">
                    Ex-analista de investimentos com mais de 15 anos de experiência em mercados financeiros. 
                    Carlos lidera a visão estratégica da TradeMaster.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="w-20 h-20 bg-gray-200 rounded-full mb-4 mx-auto"></div>
                  <h3 className="text-xl font-medium text-center mb-2">Ana Mendes</h3>
                  <p className="text-primary text-center mb-4">CTO</p>
                  <p className="text-gray-600">
                    Especialista em IA e machine learning, Ana lidera o desenvolvimento das tecnologias 
                    preditivas que são o coração da nossa plataforma.
                  </p>
                </div>
              </div>
            </section>
            
            {/* Values */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-6">Nossos Valores</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
                  <Zap className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-medium mb-2">Inovação</h3>
                  <p className="text-gray-600">
                    Constantemente buscando novas tecnologias e abordagens para melhorar nossa plataforma.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
                  <Users className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-medium mb-2">Acessibilidade</h3>
                  <p className="text-gray-600">
                    Comprometidos em tornar ferramentas financeiras poderosas acessíveis a todos.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
                  <LineChart className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-medium mb-2">Precisão</h3>
                  <p className="text-gray-600">
                    Dedicados a fornecer dados e análises precisas para decisões de investimento informadas.
                  </p>
                </div>
              </div>
            </section>
            
            {/* Technology */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-6">Nossa Tecnologia</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <BarChart className="h-12 w-12 text-primary mb-4 mx-auto" />
                  <h3 className="text-xl font-medium text-center mb-3">Análise Preditiva com IA</h3>
                  <p className="text-gray-600">
                    Nossos algoritmos de machine learning analisam milhões de pontos de dados para 
                    identificar padrões e fazer previsões sobre movimentos de mercado com precisão superior.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <PieChart className="h-12 w-12 text-primary mb-4 mx-auto" />
                  <h3 className="text-xl font-medium text-center mb-3">Otimização de Portfólio</h3>
                  <p className="text-gray-600">
                    Nossas ferramentas de otimização de portfólio utilizam modelagem estatística avançada 
                    para ajudar os investidores a alcançar o melhor equilíbrio entre risco e retorno.
                  </p>
                </div>
              </div>
            </section>
            
            {/* CTA */}
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <h2 className="text-2xl font-semibold mb-4">Comece sua jornada de investimento hoje</h2>
              <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
                Junte-se a milhares de investidores que estão transformando sua abordagem de investimento com 
                as ferramentas de análise e insights da TradeMaster.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button size="lg" onClick={() => navigate('/products')}>
                  Ver Nossos Produtos
                </Button>
                <Button variant="outline" size="lg" onClick={handleLoginClick}>
                  Entrar na Plataforma
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
