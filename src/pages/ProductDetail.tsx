
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import MainNav from '@/components/layout/MainNav';
import CartDrawer from '@/components/cart/CartDrawer';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ShoppingCart, Plus, Minus, ArrowLeft } from 'lucide-react';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, totalItems } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const product = id ? getProductById(Number(id)) : undefined;
  
  const handleLoginClick = () => {
    navigate('/auth/login');
  };
  
  const handleAdminClick = () => {
    navigate('/auth/login?role=admin');
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };

  // Format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <MainNav onLoginClick={handleLoginClick} onAdminClick={handleAdminClick} />
        <div className="pt-28 pb-16 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <h1 className="text-3xl font-bold mb-4">Produto não encontrado</h1>
            <p className="mb-6">O produto que você está procurando não existe ou foi removido.</p>
            <Button onClick={() => navigate('/products')}>
              <ArrowLeft className="h-4 w-4 mr-2" /> Voltar para produtos
            </Button>
          </div>
        </div>
      </div>
    );
  }

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
        <div className="container mx-auto max-w-6xl">
          <Button 
            variant="ghost" 
            className="mb-6 flex items-center"
            onClick={() => navigate('/products')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" /> Voltar para produtos
          </Button>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative">
              <div 
                className="h-80 md:h-96 bg-white rounded-lg overflow-hidden"
                style={{
                  backgroundImage: `url(${product.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                {!product.inStock && (
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-md font-medium">
                    Esgotado
                  </div>
                )}
                {product.featured && (
                  <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-md font-medium">
                    Destaque
                  </div>
                )}
              </div>
            </div>
            
            <div>
              <div className="mb-1 text-sm uppercase tracking-wider text-gray-500">
                {product.category}
              </div>
              <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
              <div className="text-2xl font-bold mb-6 text-primary">
                {formatPrice(product.price)}
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Descrição</h3>
                <p className="text-gray-600">{product.description}</p>
              </div>
              
              {product.inStock ? (
                <Card className="p-5 mb-6 bg-white/80">
                  <div className="flex flex-col space-y-4">
                    <div>
                      <h3 className="font-medium mb-2">Quantidade</h3>
                      <div className="flex items-center border rounded w-fit">
                        <button 
                          onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                          className="px-3 py-2 hover:bg-gray-100"
                          disabled={quantity <= 1}
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="px-6 py-2">{quantity}</span>
                        <button 
                          onClick={() => setQuantity(prev => prev + 1)}
                          className="px-3 py-2 hover:bg-gray-100"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    
                    <Button 
                      onClick={handleAddToCart} 
                      className="flex items-center justify-center"
                      size="lg"
                    >
                      <ShoppingCart className="h-5 w-5 mr-2" />
                      Adicionar ao carrinho
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        handleAddToCart();
                        setIsCartOpen(true);
                      }}
                    >
                      Comprar agora
                    </Button>
                  </div>
                </Card>
              ) : (
                <Card className="p-5 mb-6 bg-gray-50">
                  <div className="text-center">
                    <h3 className="font-medium text-red-500 mb-2">Produto esgotado</h3>
                    <p className="text-sm text-gray-500">
                      Infelizmente este produto está esgotado.
                    </p>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
