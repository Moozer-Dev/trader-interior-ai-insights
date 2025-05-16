
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from "@/components/ui/card";
import MainNav from '@/components/layout/MainNav';

const blogPosts = [
  {
    id: 1,
    title: "Análise do Mercado Financeiro - Maio 2025",
    excerpt: "Uma análise detalhada dos movimentos do mercado financeiro no último mês e projeções para o futuro próximo.",
    category: "mercado",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&auto=format&fit=crop",
    date: "2025-05-10",
    author: "Carlos Santos"
  },
  {
    id: 2,
    title: "Como Diversificar sua Carteira de Investimentos",
    excerpt: "Estratégias para diversificar seus investimentos e reduzir riscos em tempos de volatilidade.",
    category: "investimentos",
    image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80",
    date: "2025-05-07",
    author: "Mariana Costa"
  },
  {
    id: 3,
    title: "Blockchain e o Futuro das Finanças",
    excerpt: "Como a tecnologia blockchain está revolucionando o mercado financeiro e criando novas oportunidades.",
    category: "tecnologia",
    image: "https://images.unsplash.com/photo-1639815188546-c43c240e8772?auto=format&fit=crop&q=80",
    date: "2025-05-05",
    author: "Ricardo Oliveira"
  },
  {
    id: 4,
    title: "Investimentos Sustentáveis: Um Guia Completo",
    excerpt: "Descubra como alinhar seus investimentos com valores ambientais e sociais sem sacrificar o retorno.",
    category: "investimentos",
    image: "https://images.unsplash.com/photo-1535136104956-115a2cd67fc4?auto=format&fit=crop&q=80",
    date: "2025-05-02",
    author: "Luciana Mendes"
  },
  {
    id: 5,
    title: "Inteligência Artificial no Trading",
    excerpt: "Como algoritmos e IA estão transformando as estratégias de trading e análise de mercado.",
    category: "tecnologia",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80",
    date: "2025-04-28",
    author: "Fernando Silva"
  },
  {
    id: 6,
    title: "Relatório de Inflação e Impactos no Mercado",
    excerpt: "Análise dos recentes índices de inflação e como eles afetam diferentes classes de ativos.",
    category: "mercado",
    image: "https://images.unsplash.com/photo-1543286386-713bdd548da4?auto=format&fit=crop&q=80",
    date: "2025-04-25",
    author: "Amanda Pereira"
  }
];

const Blog: React.FC = () => {
  const navigate = useNavigate();
  
  const handleLoginClick = () => {
    navigate('/auth/login');
  };
  
  const handleAdminClick = () => {
    navigate('/auth/login?role=admin');
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
                      onClick={() => navigate(`/blog/${post.id}`)}
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
    </div>
  );
};

export default Blog;
