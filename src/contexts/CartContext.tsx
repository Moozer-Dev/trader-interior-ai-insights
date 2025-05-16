
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem } from '@/types/product';
import { useToast } from "@/hooks/use-toast";

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  subtotal: number;
  totalItems: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const { toast } = useToast();

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error parsing cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Calculate total items in cart
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  // Calculate subtotal
  const subtotal = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  // Add product to cart
  const addToCart = (product: Product, quantity = 1) => {
    setCart(prevCart => {
      const existingItemIndex = prevCart.findIndex(item => item.product.id === product.id);
      
      if (existingItemIndex >= 0) {
        // Item exists, update quantity
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += quantity;
        
        toast({
          title: "Carrinho atualizado",
          description: `${product.name} - quantidade: ${updatedCart[existingItemIndex].quantity}`,
        });
        
        return updatedCart;
      } else {
        // Add new item
        toast({
          title: "Produto adicionado",
          description: `${product.name} adicionado ao carrinho`,
        });
        
        return [...prevCart, { product, quantity }];
      }
    });
  };

  // Remove product from cart
  const removeFromCart = (productId: number) => {
    setCart(prevCart => {
      const updatedCart = prevCart.filter(item => item.product.id !== productId);
      
      toast({
        title: "Produto removido",
        description: "Item removido do carrinho",
      });
      
      return updatedCart;
    });
  };

  // Update quantity of an item
  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart(prevCart => {
      return prevCart.map(item => {
        if (item.product.id === productId) {
          return { ...item, quantity };
        }
        return item;
      });
    });
  };

  // Clear cart
  const clearCart = () => {
    setCart([]);
    toast({
      title: "Carrinho esvaziado",
      description: "Todos os produtos foram removidos do carrinho",
    });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        subtotal,
        totalItems
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
