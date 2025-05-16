
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShoppingBag, CreditCard, Check, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { cart, subtotal, clearCart } = useCart();
  const { toast } = useToast();
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    address: '',
    city: '',
    state: '',
    zip: '',
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  
  if (cart.length === 0 && !paymentCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardContent className="p-6 text-center">
            <div className="mb-4">
              <ShoppingBag className="h-12 w-12 mx-auto text-gray-400" />
            </div>
            <h1 className="text-xl font-semibold mb-2">Seu carrinho está vazio</h1>
            <p className="text-gray-500 mb-4">Adicione produtos ao carrinho antes de finalizar a compra.</p>
            <Button onClick={() => navigate('/products')}>
              Explorar produtos
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentCompleted(true);
      clearCart();
      toast({
        title: "Pagamento processado com sucesso!",
        description: "Seu pedido foi confirmado.",
      });
    }, 2000);
  };
  
  // Format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };
  
  if (paymentCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="h-8 w-8 text-green-500" />
            </div>
            <h1 className="text-2xl font-semibold mb-2">Pagamento concluído!</h1>
            <p className="text-gray-600 mb-6">
              Seu pedido foi processado com sucesso. Você receberá uma confirmação por e-mail em breve.
            </p>
            <div className="space-y-2">
              <Button onClick={() => navigate('/products')} className="w-full">
                Continuar comprando
              </Button>
              <Button variant="outline" onClick={() => navigate('/')} className="w-full">
                Voltar para a página inicial
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <Button 
          variant="ghost" 
          className="mb-6 flex items-center"
          onClick={() => navigate('/products')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> Voltar para produtos
        </Button>
        
        <h1 className="text-3xl font-bold mb-8">Finalizar compra</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-6 flex items-center">
                  <CreditCard className="h-5 w-5 mr-2" /> Informações de pagamento
                </h2>
                
                <form onSubmit={handleSubmit}>
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="font-medium">Detalhes pessoais</h3>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Nome completo</Label>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="font-medium">Endereço de cobrança</h3>
                      
                      <div className="space-y-2">
                        <Label htmlFor="address">Endereço</Label>
                        <Input
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="city">Cidade</Label>
                          <Input
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="state">Estado</Label>
                          <Input
                            id="state"
                            name="state"
                            value={formData.state}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="zip">CEP</Label>
                          <Input
                            id="zip"
                            name="zip"
                            value={formData.zip}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="font-medium">Informações do cartão</h3>
                      
                      <div className="space-y-2">
                        <Label htmlFor="cardName">Nome no cartão</Label>
                        <Input
                          id="cardName"
                          name="cardName"
                          value={formData.cardName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">Número do cartão</Label>
                        <Input
                          id="cardNumber"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          placeholder="1234 5678 9012 3456"
                          required
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiry">Data de validade (MM/AA)</Label>
                          <Input
                            id="expiry"
                            name="expiry"
                            value={formData.expiry}
                            onChange={handleInputChange}
                            placeholder="MM/AA"
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="cvv">CVV</Label>
                          <Input
                            id="cvv"
                            name="cvv"
                            value={formData.cvv}
                            onChange={handleInputChange}
                            placeholder="123"
                            required
                          />
                        </div>
                      </div>
                    </div>
                    
                    <Button type="submit" className="w-full" disabled={isProcessing}>
                      {isProcessing ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processando pagamento...
                        </>
                      ) : (
                        'Finalizar compra'
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card className="sticky top-6">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Resumo do pedido</h2>
                
                <div className="space-y-4 mb-6">
                  {cart.map(item => (
                    <div key={item.product.id} className="flex justify-between py-2 border-b">
                      <div>
                        <span className="font-medium">{item.product.name}</span>
                        <div className="text-sm text-gray-500">
                          Quantidade: {item.quantity}
                        </div>
                      </div>
                      <span>{formatPrice(item.product.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex justify-between mb-2">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
