
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import MainNav from '@/components/layout/MainNav';
import { Send, Mail, Phone, MapPin } from 'lucide-react';

const Contact: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const handleLoginClick = () => {
    navigate('/auth/login');
  };
  
  const handleAdminClick = () => {
    navigate('/auth/login?role=admin');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Mensagem enviada",
        description: "Agradecemos seu contato. Responderemos em breve!",
      });
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <MainNav onLoginClick={handleLoginClick} onAdminClick={handleAdminClick} />
      
      <div className="pt-28 pb-16 px-4">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto mb-10 text-center">
            <h1 className="text-4xl font-bold mb-4">Entre em Contato</h1>
            <p className="text-lg text-gray-600">
              Estamos à disposição para ajudar e responder a quaisquer perguntas
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 max-w-5xl mx-auto">
            <div className="md:col-span-3">
              <Card>
                <CardContent className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nome</Label>
                        <Input 
                          id="name" 
                          name="name" 
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Seu nome completo" 
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
                          onChange={handleChange}
                          placeholder="seu@email.com" 
                          required 
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Assunto</Label>
                      <Input 
                        id="subject" 
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Assunto da mensagem" 
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Mensagem</Label>
                      <Textarea 
                        id="message" 
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Digite sua mensagem aqui..." 
                        rows={6}
                        required 
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Enviando...
                        </span>
                      ) : (
                        <span className="flex items-center">
                          <Send className="mr-2 h-4 w-4" /> Enviar Mensagem
                        </span>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
            
            <div className="md:col-span-2">
              <Card>
                <CardContent className="p-6 space-y-6">
                  <h3 className="text-xl font-semibold mb-4">Informações de Contato</h3>
                  
                  <div className="flex items-start space-x-3">
                    <Mail className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-medium">Email</h4>
                      <p className="text-gray-600">contato@trademaster.com</p>
                      <p className="text-gray-600">suporte@trademaster.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Phone className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-medium">Telefone</h4>
                      <p className="text-gray-600">+55 (11) 3456-7890</p>
                      <p className="text-gray-600">+55 (11) 9876-5432</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-medium">Endereço</h4>
                      <p className="text-gray-600">
                        Av. Paulista, 1000, Bela Vista<br />
                        São Paulo - SP, 01310-100<br />
                        Brasil
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
