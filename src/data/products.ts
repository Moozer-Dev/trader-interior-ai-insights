
import { Product } from '@/types/product';

export const products: Product[] = [
  {
    id: 1,
    name: "Curso Análise Técnica",
    description: "Curso completo de análise técnica para investidores iniciantes e intermediários.",
    price: 297.00,
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&auto=format&fit=crop",
    category: "cursos",
    inStock: true,
    featured: true
  },
  {
    id: 2,
    name: "Mentoria de Investimentos",
    description: "Mentoria personalizada para desenvolvimento de estratégias de investimento.",
    price: 1997.00,
    image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80",
    category: "mentorias",
    inStock: true
  },
  {
    id: 3,
    name: "E-book Fundamentos do Mercado",
    description: "Guia completo sobre os fundamentos do mercado financeiro.",
    price: 49.90,
    image: "https://images.unsplash.com/photo-1553729784-e91953dec042?auto=format&fit=crop&q=80",
    category: "ebooks",
    inStock: true,
    featured: true
  },
  {
    id: 4,
    name: "Software de Análise TradeMaster Pro",
    description: "Software profissional para análise de mercado com indicadores exclusivos.",
    price: 499.00,
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&auto=format&fit=crop",
    category: "softwares",
    inStock: true
  },
  {
    id: 5,
    name: "Workshop Gestão de Risco",
    description: "Workshop intensivo sobre gestão de risco em operações financeiras.",
    price: 197.00,
    image: "https://images.unsplash.com/photo-1543286386-713bdd548da4?auto=format&fit=crop&q=80",
    category: "workshops",
    inStock: true
  },
  {
    id: 6,
    name: "Assinatura Premium",
    description: "Acesso ilimitado a todos os cursos e materiais da plataforma.",
    price: 997.00,
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80",
    category: "assinaturas",
    inStock: true,
    featured: true
  },
  {
    id: 7,
    name: "E-book Análise Fundamentalista",
    description: "Guia prático para análise fundamentalista de ações.",
    price: 49.90,
    image: "https://images.unsplash.com/photo-1553729784-e91953dec042?auto=format&fit=crop&q=80",
    category: "ebooks",
    inStock: true
  },
  {
    id: 8,
    name: "Curso Day Trade",
    description: "Estratégias avançadas para day trade nos mercados financeiros.",
    price: 397.00,
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&auto=format&fit=crop",
    category: "cursos",
    inStock: true
  }
];

export const getProductById = (id: number): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};

export const getAllCategories = (): string[] => {
  const categories = products.map(product => product.category);
  return [...new Set(categories)];
};
