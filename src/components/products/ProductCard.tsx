
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Product } from '@/types/product';
import { useCart } from '@/contexts/CartContext';
import { ShoppingCart, ExternalLink } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const handleViewDetails = () => {
    if (product.affiliateLink) {
      window.open(product.affiliateLink, '_blank');
    } else {
      navigate(`/products/${product.id}`);
    }
  };
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (product.affiliateLink) {
      window.open(product.affiliateLink, '_blank');
    } else {
      addToCart(product);
    }
  };

  // Format price
  const formattedPrice = product.price === 0 ? 
    "Gratuito" : 
    new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(product.price);

  return (
    <Card 
      className="overflow-hidden hover:shadow-lg transition-all cursor-pointer h-full flex flex-col"
      onClick={handleViewDetails}
    >
      <div 
        className="h-48 bg-gray-100 overflow-hidden"
        style={{
          backgroundImage: `url(${product.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {!product.inStock && (
          <div className="bg-red-500 text-white px-2 py-1 text-xs font-medium absolute top-2 right-2 rounded">
            Esgotado
          </div>
        )}
        {product.featured && (
          <div className="bg-primary text-white px-2 py-1 text-xs font-medium absolute top-2 left-2 rounded">
            Destaque
          </div>
        )}
      </div>
      
      <CardContent className="p-4 flex flex-col flex-grow">
        <div className="flex-grow">
          <span className="text-xs text-gray-500 uppercase tracking-wider">
            {product.category}
          </span>
          <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
        </div>
        
        <div className="flex justify-between items-center mt-auto">
          <span className="font-bold text-lg">{formattedPrice}</span>
          <Button 
            size="sm" 
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="flex items-center"
          >
            {product.affiliateLink ? (
              <>
                <ExternalLink className="h-4 w-4 mr-1" />
                Acessar
              </>
            ) : (
              <>
                <ShoppingCart className="h-4 w-4 mr-1" />
                Adicionar
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
