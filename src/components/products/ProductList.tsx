
import React, { useState } from 'react';
import { products, getAllCategories } from '@/data/products';
import ProductCard from './ProductCard';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Product } from '@/types/product';
import { Filter, Search, X } from 'lucide-react';

const ProductList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [sortBy, setSortBy] = useState<'price_asc' | 'price_desc' | 'name'>('name');
  const [showFilters, setShowFilters] = useState(false);
  
  const categories = getAllCategories();

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '' || product.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price_asc') {
      return a.price - b.price;
    } else if (sortBy === 'price_desc') {
      return b.price - a.price;
    } else {
      return a.name.localeCompare(b.name);
    }
  });

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSortBy('name');
  };

  // For smaller screens
  const handleToggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div>
      <div className="mb-8">
        {/* Mobile filter toggle */}
        <div className="md:hidden mb-4">
          <Button 
            variant="outline" 
            onClick={handleToggleFilters}
            className="w-full flex items-center justify-center"
          >
            <Filter className="h-4 w-4 mr-2" />
            {showFilters ? 'Ocultar filtros' : 'Mostrar filtros'}
          </Button>
        </div>

        <div className={`transition-all ${showFilters ? 'block' : 'hidden'} md:block`}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                type="text"
                placeholder="Pesquisar produtos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            
            <div>
              <select 
                value={selectedCategory} 
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Todas as categorias</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value as 'price_asc' | 'price_desc' | 'name')}
                className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="name">Nome (A-Z)</option>
                <option value="price_asc">Preço (menor para maior)</option>
                <option value="price_desc">Preço (maior para menor)</option>
              </select>
            </div>
          </div>
          
          <div className="flex justify-between items-center mb-6">
            <div>
              <span className="text-sm text-gray-500">
                {sortedProducts.length} produtos encontrados
              </span>
            </div>
            {(searchTerm || selectedCategory || sortBy !== 'name') && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleClearFilters}
                className="flex items-center text-gray-500 hover:text-gray-700"
              >
                <X className="h-4 w-4 mr-1" />
                Limpar filtros
              </Button>
            )}
          </div>
        </div>
      </div>
      
      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">Nenhum produto encontrado com os filtros selecionados.</p>
          <Button onClick={handleClearFilters}>Limpar filtros</Button>
        </div>
      )}
    </div>
  );
};

export default ProductList;
