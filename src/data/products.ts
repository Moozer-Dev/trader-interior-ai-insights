
import { Product } from '@/types/product';

export const products: Product[] = [
  {
    id: 1,
    name: "Link de Afiliado ActivTrades",
    description: "Cadastre-se na Corretora ActivTrades usando meu link e tenha acesso às melhores condições para operar no mercado financeiro.",
    price: 0.00,
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&auto=format&fit=crop",
    category: "afiliado",
    inStock: true,
    featured: true,
    affiliateLink: "https://secure.activtrades.com/personalarea/s/7674AC1D"
  },
  {
    id: 2,
    name: "Curso Finanças Pessoais",
    description: "Aprenda como organizar suas finanças pessoais de forma eficiente e prática, construindo uma base sólida para seus investimentos.",
    price: 97.00,
    image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80",
    category: "cursos",
    inStock: true,
    featured: true,
    affiliateLink: "https://go.hotmart.com/M87827482W?dp=1"
  },
  {
    id: 3,
    name: "E-book Guia Completo sobre Fundos Imobiliários",
    description: "Investir com inteligência e diversificação: um guia completo para entender e investir em fundos imobiliários no mercado brasileiro.",
    price: 49.90,
    image: "https://images.unsplash.com/photo-1553729784-e91953dec042?auto=format&fit=crop&q=80",
    category: "ebooks",
    inStock: true,
    featured: true,
    affiliateLink: "https://pay.hotmart.com/H88071071F?off=hcfn3g3j&_hi=eyJjaWQiOiIxNzQ3MTUxNDkzODA4NTgzNzIzMTkwOTEyOTU3NjAwIiwiYmlkIjoiMTc0NzE1MTQ5MzgwODU4MzcyMzE5MDkxMjk1NzYwMCIsInNpZCI6ImRjOTcwN2I4Njg1ZDRiOTFhOGJhNGM2MmRkMDRjNmYxIn0=.1747403319957"
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
