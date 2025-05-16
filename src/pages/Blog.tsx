
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from "@/components/ui/card";
import MainNav from '@/components/layout/MainNav';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const blogPosts = [
  {
    id: 1,
    title: "Análise do Mercado Financeiro - Maio 2025",
    excerpt: "Uma análise detalhada dos movimentos do mercado financeiro no último mês e projeções para o futuro próximo.",
    content: `
      <h2>Análise do Mercado Financeiro - Maio 2025</h2>
      <p>No mês de maio de 2025, observamos uma significativa volatilidade nos principais índices globais. O Ibovespa apresentou uma valorização de 2,3%, impulsionado principalmente pelos setores bancário e de commodities. Por outro lado, mercados internacionais como S&P 500 e Nasdaq mostraram leve retração, com quedas de 1,2% e 1,5% respectivamente.</p>
      <p>Entre os destaques, a política monetária do Banco Central continua sendo um fator determinante para os investimentos de renda fixa. A taxa Selic mantida em 8,75% a.a. tem atraído investidores conservadores, enquanto a inflação sob controle (4,2% nos últimos 12 meses) dá espaço para planejamento de longo prazo.</p>
      <p>Para o próximo trimestre, vemos oportunidades interessantes em empresas de tecnologia nacionais, que têm mostrado resiliência mesmo com a desaceleração do setor globalmente. Além disso, fundos imobiliários voltados para ativos logísticos continuam apresentando bom desempenho e distribuição de dividendos acima da média.</p>
      <p>Os investidores devem ficar atentos aos próximos dados de emprego nos EUA, que podem influenciar decisões do Federal Reserve e, consequentemente, o fluxo de capital para mercados emergentes como o Brasil.</p>
    `,
    category: "mercado",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&auto=format&fit=crop",
    date: "2025-05-10",
    author: "Moozer Charles"
  },
  {
    id: 2,
    title: "Como Diversificar sua Carteira de Investimentos",
    excerpt: "Estratégias para diversificar seus investimentos e reduzir riscos em tempos de volatilidade.",
    content: `
      <h2>Como Diversificar sua Carteira de Investimentos</h2>
      <p>A diversificação é um dos pilares fundamentais para qualquer estratégia de investimento de sucesso. Quando distribuímos nossos recursos em diferentes classes de ativos, reduzimos significativamente o risco sem necessariamente comprometer o retorno potencial.</p>
      <p>Uma carteira bem diversificada deve conter:</p>
      <ul>
        <li><strong>Renda Fixa:</strong> Títulos públicos, CDBs, LCIs e LCAs para formar a base segura do portfólio</li>
        <li><strong>Renda Variável:</strong> Ações de empresas de diferentes setores e tamanhos</li>
        <li><strong>Fundos Imobiliários:</strong> Exposição ao mercado imobiliário com liquidez de bolsa</li>
        <li><strong>Ativos Internacionais:</strong> BDRs, ETFs ou fundos com exposição global para proteger contra riscos locais</li>
        <li><strong>Reserva de Emergência:</strong> Recursos em instrumentos de alta liquidez para necessidades imediatas</li>
      </ul>
      <p>A proporção ideal entre estas classes varia conforme o perfil do investidor, horizonte de tempo e objetivos financeiros. Para investidores iniciantes, recomendo começar com 70% em renda fixa e 30% em renda variável, ajustando gradualmente conforme ganha experiência e confiança.</p>
      <p>Lembre-se: diversificação não é simplesmente ter muitos investimentos, mas ter investimentos que se comportam de maneiras diferentes diante dos mesmos cenários econômicos.</p>
    `,
    category: "investimentos",
    image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80",
    date: "2025-05-07",
    author: "Moozer Charles"
  },
  {
    id: 3,
    title: "Blockchain e o Futuro das Finanças",
    excerpt: "Como a tecnologia blockchain está revolucionando o mercado financeiro e criando novas oportunidades.",
    content: `
      <h2>Blockchain e o Futuro das Finanças</h2>
      <p>A tecnologia blockchain tem sido muito mais do que apenas a base para criptomoedas. Nos últimos anos, testemunhamos sua aplicação transformadora em diversos segmentos do mercado financeiro tradicional.</p>
      <p>No Brasil, vemos avanços significativos com o PIX e o Drex (moeda digital do Banco Central), ambos inspirados nos princípios de descentralização e segurança que o blockchain trouxe à tona. Mas as aplicações vão muito além:</p>
      <p><strong>Contratos Inteligentes (Smart Contracts):</strong> Acordos autoexecutáveis que eliminam intermediários em transações financeiras, reduzindo custos e aumentando a eficiência.</p>
      <p><strong>Tokenização de Ativos:</strong> Transformação de ativos físicos como imóveis e obras de arte em tokens digitais, permitindo fracionamento e maior liquidez.</p>
      <p><strong>DeFi (Finanças Descentralizadas):</strong> Ecossistema de aplicações financeiras construídas em redes blockchain que possibilitam empréstimos, seguros e investimentos sem a necessidade de bancos tradicionais.</p>
      <p>Para investidores atentos, há oportunidades tanto em empresas tradicionais que adotam essas tecnologias quanto em projetos nativamente digitais. O futuro do setor financeiro será híbrido, combinando a segurança e regulamentação do sistema tradicional com a inovação e eficiência proporcionadas pelo blockchain.</p>
    `,
    category: "tecnologia",
    image: "https://images.unsplash.com/photo-1639815188546-c43c240e8772?auto=format&fit=crop&q=80",
    date: "2025-05-05",
    author: "Moozer Charles"
  },
  {
    id: 4,
    title: "Investimentos Sustentáveis: Um Guia Completo",
    excerpt: "Descubra como alinhar seus investimentos com valores ambientais e sociais sem sacrificar o retorno.",
    content: `
      <h2>Investimentos Sustentáveis: Um Guia Completo</h2>
      <p>Investimentos ESG (Environmental, Social and Governance) deixaram de ser apenas uma tendência para se tornarem um aspecto fundamental na análise de empresas e alocação de recursos. No Brasil, o mercado de investimentos sustentáveis cresceu mais de 300% nos últimos cinco anos.</p>
      <p>Para quem deseja começar nesta jornada, é importante entender os diferentes níveis de abordagem:</p>
      <p><strong>Exclusão:</strong> Evitar setores como tabaco, armas ou combustíveis fósseis.</p>
      <p><strong>Integração ESG:</strong> Incorporar critérios ambientais, sociais e de governança na análise tradicional de investimentos.</p>
      <p><strong>Investimento de Impacto:</strong> Direcionar recursos para empresas e projetos que geram impacto positivo mensurável, além do retorno financeiro.</p>
      <p>Existem diversas opções acessíveis no mercado brasileiro, desde ETFs e fundos ESG até debêntures incentivadas para projetos de infraestrutura sustentável. Um ponto importante: estudos recentes da B3 mostram que empresas com melhor performance em critérios ESG tendem a apresentar menor volatilidade e melhor desempenho no longo prazo.</p>
      <p>Ao alinhar seus investimentos com seus valores, você não apenas contribui para um mundo melhor, mas também pode construir um portfólio mais resiliente para o futuro.</p>
    `,
    category: "investimentos",
    image: "https://images.unsplash.com/photo-1535136104956-115a2cd67fc4?auto=format&fit=crop&q=80",
    date: "2025-05-02",
    author: "Moozer Charles"
  },
  {
    id: 5,
    title: "Inteligência Artificial no Trading",
    excerpt: "Como algoritmos e IA estão transformando as estratégias de trading e análise de mercado.",
    content: `
      <h2>Inteligência Artificial no Trading</h2>
      <p>A inteligência artificial revolucionou completamente a forma como operamos nos mercados financeiros. Hoje, desde grandes instituições até traders individuais utilizam alguma forma de IA para obter vantagem competitiva.</p>
      <p>As principais aplicações que vemos no mercado incluem:</p>
      <p><strong>Análise de Sentimento:</strong> Algoritmos que processam milhões de notícias, posts em redes sociais e fóruns para prever movimentos de mercado baseados no sentimento dos investidores.</p>
      <p><strong>Reconhecimento de Padrões:</strong> Identificação de formações gráficas e padrões de preço com precisão muito superior à análise humana tradicional.</p>
      <p><strong>Modelos Preditivos:</strong> Sistemas que combinam centenas de variáveis para projetar preços futuros e identificar oportunidades.</p>
      <p><strong>Execução Algorítmica:</strong> Programas que executam ordens automaticamente, garantindo melhor preço e reduzindo o impacto no mercado.</p>
      <p>É importante ressaltar que a IA não substitui completamente o julgamento humano - ela é uma ferramenta poderosa que amplia nossas capacidades. Os melhores resultados são obtidos quando combinamos a velocidade e capacidade de processamento das máquinas com a experiência e intuição humanas.</p>
      <p>Para investidores individuais, existem hoje plataformas acessíveis que oferecem funcionalidades de IA anteriormente disponíveis apenas para grandes instituições. Esta democratização da tecnologia está nivelando o campo de jogo no mercado financeiro.</p>
    `,
    category: "tecnologia",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80",
    date: "2025-04-28",
    author: "Moozer Charles"
  },
  {
    id: 6,
    title: "Relatório de Inflação e Impactos no Mercado",
    excerpt: "Análise dos recentes índices de inflação e como eles afetam diferentes classes de ativos.",
    content: `
      <h2>Relatório de Inflação e Impactos no Mercado</h2>
      <p>O mais recente relatório de inflação trouxe números que merecem atenção dos investidores. O IPCA acumulado nos últimos 12 meses ficou em 4,2%, ligeiramente acima da meta central do Banco Central (3,5%), mas ainda dentro do intervalo de tolerância.</p>
      <p>Os principais vetores desta inflação foram alimentos (alta de 6,3%) e serviços (5,1%), enquanto preços administrados como energia e combustíveis tiveram pressão menor que o esperado.</p>
      <p>O impacto nas diferentes classes de ativos tende a ser:</p>
      <p><strong>Renda Fixa Pós-fixada:</strong> Beneficiada pela manutenção ou eventual alta da taxa Selic em resposta à pressão inflacionária.</p>
      <p><strong>Renda Fixa Pré-fixada:</strong> Pode sofrer volatilidade no curto prazo, especialmente títulos de prazo mais longo.</p>
      <p><strong>Ações:</strong> Setores defensivos como utilities tendem a performar melhor, enquanto empresas muito endividadas podem enfrentar pressão.</p>
      <p><strong>Fundos Imobiliários:</strong> FIIs de papel, especialmente com indexadores robustos à inflação (IPCA+), ganham atratividade.</p>
      <p>Para o investidor individual, este cenário sugere manter uma alocação diversificada, com parte da carteira em ativos protegidos contra a inflação, como Tesouro IPCA+ e ações de empresas com poder de repasse de preços.</p>
      <p>É importante acompanhar as próximas decisões do Copom, que sinalizará se considera este nível de inflação transitório ou se há necessidade de resposta mais contundente via política monetária.</p>
    `,
    category: "mercado",
    image: "https://images.unsplash.com/photo-1543286386-713bdd548da4?auto=format&fit=crop&q=80",
    date: "2025-04-25",
    author: "Moozer Charles"
  }
];

const Blog: React.FC = () => {
  const navigate = useNavigate();
  const [selectedPost, setSelectedPost] = useState<typeof blogPosts[0] | null>(null);
  
  const handleLoginClick = () => {
    navigate('/auth/login');
  };
  
  const handleAdminClick = () => {
    navigate('/auth/login?role=admin');
  };

  const handleReadMore = (post: typeof blogPosts[0]) => {
    setSelectedPost(post);
  };

  const handleCloseDialog = () => {
    setSelectedPost(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <MainNav onLoginClick={handleLoginClick} onAdminClick={handleAdminClick} />
      
      <div className="pt-28 pb-16 px-4">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto mb-10 text-center">
            <h1 className="text-4xl font-bold mb-4">Blog</h1>
            <p className="text-lg text-gray-600">
              Notícias, análises e insights sobre o mercado financeiro
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div 
                  className="h-48 bg-gray-200 overflow-hidden"
                  style={{
                    backgroundImage: `url(${post.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-gray-500">{post.date}</span>
                    <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                      {post.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Por {post.author}</span>
                    <button 
                      onClick={() => handleReadMore(post)}
                      className="text-primary hover:underline text-sm font-medium"
                    >
                      Ler mais
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <Dialog open={selectedPost !== null} onOpenChange={handleCloseDialog}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          {selectedPost && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl mb-2">{selectedPost.title}</DialogTitle>
                <DialogDescription className="flex justify-between text-sm text-gray-500">
                  <span>Por {selectedPost.author}</span>
                  <span>{selectedPost.date}</span>
                </DialogDescription>
              </DialogHeader>
              <div className="my-4">
                <div 
                  className="h-64 bg-gray-200 rounded-md overflow-hidden mb-6"
                  style={{
                    backgroundImage: `url(${selectedPost.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                ></div>
                <div 
                  className="prose prose-sm md:prose-base max-w-none"
                  dangerouslySetInnerHTML={{ __html: selectedPost.content }}
                />
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Blog;
