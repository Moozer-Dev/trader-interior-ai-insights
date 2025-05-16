
import React from 'react';
import { ShoppingCart, X, Plus, Minus, Trash } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useCart } from '@/contexts/CartContext';
import { useNavigate } from 'react-router-dom';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, updateQuantity, clearCart, subtotal, totalItems } = useCart();
  const navigate = useNavigate();
  
  const handleCheckout = () => {
    onClose();
    navigate('/checkout');
  };

  // Format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? 'block' : 'hidden'}`}>
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50" 
        onClick={onClose} 
        aria-hidden="true"
      ></div>
      
      {/* Drawer */}
      <div 
        className={`absolute top-0 right-0 h-full w-full max-w-md bg-white shadow-lg transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="px-4 py-3 border-b flex justify-between items-center">
            <div className="flex items-center text-lg font-semibold">
              <ShoppingCart className="h-5 w-5 mr-2" />
              Carrinho ({totalItems})
            </div>
            <button 
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          {/* Cart items */}
          <div className="flex-grow overflow-y-auto p-4">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <ShoppingCart className="h-12 w-12 text-gray-300 mb-2" />
                <p className="text-gray-500">Seu carrinho está vazio</p>
                <Button 
                  variant="link" 
                  className="mt-2" 
                  onClick={() => {
                    onClose();
                    navigate('/products');
                  }}
                >
                  Continuar comprando
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.product.id} className="flex border-b pb-4">
                    <div 
                      className="w-20 h-20 bg-gray-100 rounded"
                      style={{
                        backgroundImage: `url(${item.product.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                    ></div>
                    
                    <div className="ml-3 flex-grow">
                      <div className="flex justify-between">
                        <div>
                          <h4 className="font-medium">{item.product.name}</h4>
                          <p className="text-sm text-gray-500">
                            {formatPrice(item.product.price)} cada
                          </p>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-gray-400 hover:text-red-500"
                        >
                          <Trash className="h-4 w-4" />
                        </button>
                      </div>
                      
                      <div className="mt-2 flex justify-between items-center">
                        <div className="flex items-center border rounded">
                          <button 
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="px-2 py-1 hover:bg-gray-100"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="px-3">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="px-2 py-1 hover:bg-gray-100"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <span className="font-medium">
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
                
                <div className="text-right">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={clearCart}
                    className="text-red-500 hover:text-red-700"
                  >
                    Limpar carrinho
                  </Button>
                </div>
              </div>
            )}
          </div>
          
          {/* Footer */}
          {cart.length > 0 && (
            <div className="border-t p-4">
              <div className="flex justify-between items-center mb-4">
                <span className="font-medium">Subtotal</span>
                <span className="font-semibold text-lg">{formatPrice(subtotal)}</span>
              </div>
              <Button 
                onClick={handleCheckout}
                className="w-full"
              >
                Finalizar compra
              </Button>
              <Button 
                variant="outline" 
                className="w-full mt-2"
                onClick={onClose}
              >
                Continuar comprando
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
