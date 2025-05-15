
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import MainNav from '@/components/layout/MainNav';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { LineChart, Search, Calendar, User, Tag, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  date: string;
  category: string;
  tags: string[];
  featured?: boolean;
}

const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    title: "Como a Inteligência Artificial está revolucionando o mercado financeiro",
    excerpt: "Descubra como os algoritmos de IA estão mudando a forma como investidores tomam decisões e analisam o mercado.",
    content: "Conteúdo completo do artigo...",
    image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80&w=1024",
    author: "Mariana Costa",
    date: "15 de Maio, 2025",
    category: "tecnologia",
    tags: ["Inteligência Artificial", "Mercado Financeiro", "Tecnologia"],
    featured: true
  },
  {
    id: 2,
    title: "5 indicadores técnicos essenciais para investidores de médio prazo",
    excerpt: "Conheça os principais indicadores que todo investidor deveria acompanhar para tomar melhores decisões.",
    content: "Conteúdo completo do artigo...",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=1024",
    author: "Rafael Mendes",
    date: "10 de Maio, 2025",
    category: "investimentos",
    tags: ["Análise Técnica", "Indicadores", "Investimentos"]
  },
  {
    id: 3,
    title: "Diversificação de carteira: por que é importante e como fazer",
    excerpt: "Entenda como diversificar seus investimentos pode proteger seu patrimônio contra volatilidade do mercado.",
    content: "Conteúdo completo do artigo...",
    image: "https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?auto=format&fit=crop&q=80&w=1024",
    author: "André Silva",
    date: "05 de Maio, 2025",
    category: "investimentos",
    tags: ["Diversificação", "Portfólio", "Risco"]
  },
  {
    id: 4,
    title: "O impacto das decisões do banco central no mercado de ações",
    excerpt: "Análise detalhada de como mudanças na taxa de juros afetam diferentes setores da economia.",
    content: "Conteúdo completo do artigo...",
    image: "https://images.unsplash.com/photo-1543286386-713bdd548da4?auto=format&fit=crop&q=80&w=1024",
    author: "Carla Rocha",
    date: "01 de Maio, 2025",
    category: "mercado",
    tags: ["Banco Central", "Taxa de Juros", "Análise Setorial"]
  },
  {
    id: 5,
    title: "Blockchain e o futuro do sistema financeiro",
    excerpt: "Como a tecnologia blockchain está transformando o setor financeiro e criando novas oportunidades de investimento.",
    content: "Conteúdo completo do artigo...",
    image: "https://images.unsplash.com/photo-1644143379190-08a5f055de1d?auto=format&fit=crop&q=80&w=1024",
    author: "Lucas Pereira",
    date: "28 de Abril, 2025",
    category: "tecnologia",
    tags: ["Blockchain", "Criptomoedas", "Tecnologia"]
  },
  {
    id: 6,
    title: "Análise fundamentalista: como avaliar empresas para investir",
    excerpt: "Guia completo sobre os principais indicadores e métricas para analisar a saúde financeira de empresas.",
    content: "Conteúdo completo do artigo...",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&q=80&w=1024",
    author: "Rafael Mendes",
    date: "25 de Abril, 2025",
    category: "investimentos",
    tags: ["Análise Fundamentalista", "Empresas", "Indicadores"]
  }
];

const Blog: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter((post) => {
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);
  
  const featuredPost = BLOG_POSTS.find(post => post.featured);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <MainNav 
        onLoginClick={() => navigate('/auth/login')} 
        onRegisterClick={() => navigate('/auth/login?tab=register')} 
      />
      
      {/* Content with padding for fixed header */}
      <div className="pt-24">
        {/* Hero Section */}
        <section className="py-12 px-4 bg-white">
          <div className="container mx-auto text-center max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">Blog TradeMaster</h1>
            <p className="text-xl text-gray-700 mb-10 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Insights, análises e estratégias para ajudar você a tomar decisões de investimento mais inteligentes
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <Search className="absolute top-3 left-4 h-5 w-5 text-gray-400" />
              <Input 
                type="text"
                placeholder="Buscar artigos, tópicos ou tags..." 
                className="pl-12 h-12 rounded-full" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </section>
        
        {/* Featured Post */}
        {featuredPost && (
          <section className="py-12 px-4">
            <div className="container mx-auto max-w-6xl">
              <h2 className="text-2xl font-bold mb-8">Artigo em Destaque</h2>
              
              <Card className="overflow-hidden hover:shadow-lg transition-all animate-fade-in" style={{ animationDelay: "0.4s" }}>
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/2">
                    <div className="h-full">
                      <AspectRatio ratio={16/9} className="h-full">
                        <img 
                          src={featuredPost.image} 
                          alt={featuredPost.title}
                          className="object-cover w-full h-full"
                        />
                      </AspectRatio>
                    </div>
                  </div>
                  <div className="md:w-1/2 p-8 flex flex-col justify-between">
                    <div>
                      <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm inline-block mb-4">
                        {featuredPost.category.charAt(0).toUpperCase() + featuredPost.category.slice(1)}
                      </div>
                      <h3 className="text-2xl font-bold mb-4">{featuredPost.title}</h3>
                      <p className="text-gray-600 mb-6">{featuredPost.excerpt}</p>
                    </div>
                    
                    <div>
                      <div className="flex items-center text-gray-500 text-sm mb-4">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>{featuredPost.date}</span>
                        <User className="h-4 w-4 ml-4 mr-2" />
                        <span>{featuredPost.author}</span>
                      </div>
                      
                      <Button variant="outline" className="w-full md:w-auto">
                        Ler artigo completo
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </section>
        )}
        
        {/* Blog Posts */}
        <section className="py-12 px-4 bg-gray-50">
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center mb-8">
              <h2 className="text-2xl font-bold mb-4 md:mb-0">Artigos Recentes</h2>
              
              <Tabs 
                defaultValue="all" 
                onValueChange={setSelectedCategory}
                className="w-full md:w-auto"
              >
                <TabsList>
                  <TabsTrigger value="all">Todos</TabsTrigger>
                  <TabsTrigger value="mercado">Mercado</TabsTrigger>
                  <TabsTrigger value="investimentos">Investimentos</TabsTrigger>
                  <TabsTrigger value="tecnologia">Tecnologia</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            
            {filteredPosts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">Nenhum artigo encontrado com os critérios de busca atuais.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPosts.map((post, index) => (
                  <Card 
                    key={post.id} 
                    className="overflow-hidden hover:shadow-lg transition-all animate-fade-in cursor-pointer" 
                    style={{ animationDelay: `${0.2 + (index * 0.1)}s` }}
                    onClick={() => navigate(`/blog/${post.id}`)}
                  >
                    <div>
                      <AspectRatio ratio={16/9}>
                        <img 
                          src={post.image} 
                          alt={post.title}
                          className="object-cover w-full h-full"
                        />
                      </AspectRatio>
                    </div>
                    <div className="p-6">
                      <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium inline-block mb-3">
                        {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
                      </div>
                      <h3 className="text-lg font-bold mb-2 line-clamp-2">{post.title}</h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">{post.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <div className="text-gray-500 text-xs">
                          <div className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            <span>{post.date}</span>
                          </div>
                        </div>
                        <div className="text-gray-500 text-xs">
                          <div className="flex items-center">
                            <User className="h-3 w-3 mr-1" />
                            <span>{post.author}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
            
            <div className="mt-12 text-center">
              <Button>
                Carregar mais artigos
              </Button>
            </div>
          </div>
        </section>
        
        {/* Newsletter */}
        <section className="py-16 px-4 bg-primary/10">
          <div className="container mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold mb-6">Inscreva-se em nossa newsletter</h2>
            <p className="text-lg text-gray-700 mb-8">
              Receba os melhores insights sobre o mercado e dicas de investimento diretamente na sua caixa de entrada.
            </p>
            
            <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-2 max-w-lg mx-auto">
              <Input 
                type="email" 
                placeholder="Seu melhor e-mail" 
                className="flex-grow" 
              />
              <Button className="bg-primary hover:bg-primary/90">
                Inscrever-se
              </Button>
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

export default Blog;
