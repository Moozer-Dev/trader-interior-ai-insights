
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainNav from '@/components/layout/MainNav';
import ProductList from '@/components/products/ProductList';
import CartDrawer from '@/components/cart/CartDrawer';
import { Button } from "@/components/ui/button";
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

const Products: React.FC = () => {
  const navigate = useNavigate();
  const { totalItems } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const handleLoginClick = () => {
    navigate('/auth/login');
  };
  
  const handleAdminClick = () => {
    navigate('/auth/login?role=admin');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <MainNav onLoginClick={handleLoginClick} onAdminClick={handleAdminClick} />
      
      {/* Cart button (fixed) */}
      <Button 
        onClick={() => setIsCartOpen(true)}
        className="fixed bottom-4 right-4 z-20 rounded-full shadow-lg flex items-center"
        size="lg"
      >
        <ShoppingCart className="h-5 w-5 mr-2" />
        <span>{totalItems}</span>
      </Button>
      
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      
      <div className="pt-28 pb-16 px-4">
        <div className="container mx-auto">
          <div className="max-w-6xl mx-auto mb-10">
            <h1 className="text-4xl font-bold mb-2">Produtos</h1>
            <p className="text-lg text-gray-600 mb-8">
              Explore nossos cursos, mentorias e materiais educativos para o mercado financeiro
            </p>
            
            <ProductList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
