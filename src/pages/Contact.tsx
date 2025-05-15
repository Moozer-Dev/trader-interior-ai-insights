
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainNav from '@/components/layout/MainNav';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Linkedin, 
  MapPin, 
  Phone, 
  Mail, 
  Send,
  CheckCircle,
  LineChart
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Contact: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      toast({
        title: "Mensagem enviada!",
        description: "Entraremos em contato em breve.",
      });
      
      // Reset form after showing success state
      setTimeout(() => {
        setIsSuccess(false);
        setForm({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
      }, 3000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <MainNav 
        onLoginClick={() => navigate('/auth/login')} 
        onRegisterClick={() => navigate('/auth/login?tab=register')} 
      />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">Fale Conosco</h1>
            <p className="text-xl text-gray-700 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Estamos sempre disponíveis para ajudar. Entre em contato conosco por qualquer um dos canais abaixo.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* Contact Information */}
            <div className="lg:col-span-1">
              <div className="space-y-8">
                <Card className="p-6 hover:shadow-lg transition-all animate-fade-in" style={{ animationDelay: "0.3s" }}>
                  <div className="flex items-start">
                    <div className="bg-primary/10 p-3 rounded-full mr-4">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Endereço</h3>
                      <p className="text-gray-600">
                        Av. Paulista, 1000<br />
                        Bela Vista, São Paulo - SP<br />
                        CEP: 01310-100
                      </p>
                    </div>
                  </div>
                </Card>
                
                <Card className="p-6 hover:shadow-lg transition-all animate-fade-in" style={{ animationDelay: "0.4s" }}>
                  <div className="flex items-start">
                    <div className="bg-primary/10 p-3 rounded-full mr-4">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Telefones</h3>
                      <p className="text-gray-600 mb-2">
                        Suporte: (11) 3456-7890<br />
                        Comercial: (11) 3456-7891
                      </p>
                      <p className="text-gray-600 text-sm">
                        Segunda a Sexta: 9h às 18h
                      </p>
                    </div>
                  </div>
                </Card>
                
                <Card className="p-6 hover:shadow-lg transition-all animate-fade-in" style={{ animationDelay: "0.5s" }}>
                  <div className="flex items-start">
                    <div className="bg-primary/10 p-3 rounded-full mr-4">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Email</h3>
                      <p className="text-gray-600">
                        Suporte: suporte@trademaster.com<br />
                        Comercial: vendas@trademaster.com<br />
                        Imprensa: imprensa@trademaster.com
                      </p>
                    </div>
                  </div>
                </Card>
                
                <div className="mt-8">
                  <h3 className="font-semibold text-lg mb-3">Siga-nos nas redes sociais</h3>
                  <div className="flex space-x-4">
                    <a 
                      href="#" 
                      className="bg-white hover:bg-primary hover:text-white text-primary p-3 rounded-full shadow-sm transition-colors"
                      aria-label="Facebook"
                    >
                      <Facebook className="h-5 w-5" />
                    </a>
                    <a 
                      href="#" 
                      className="bg-white hover:bg-primary hover:text-white text-primary p-3 rounded-full shadow-sm transition-colors"
                      aria-label="Instagram"
                    >
                      <Instagram className="h-5 w-5" />
                    </a>
                    <a 
                      href="#" 
                      className="bg-white hover:bg-primary hover:text-white text-primary p-3 rounded-full shadow-sm transition-colors"
                      aria-label="Twitter"
                    >
                      <Twitter className="h-5 w-5" />
                    </a>
                    <a 
                      href="#" 
                      className="bg-white hover:bg-primary hover:text-white text-primary p-3 rounded-full shadow-sm transition-colors"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <Card className="p-8 lg:col-span-2 animate-fade-in hover:shadow-lg" style={{ animationDelay: "0.6s" }}>
              <h2 className="text-2xl font-bold mb-6">Envie uma mensagem</h2>
              
              {isSuccess ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <div className="bg-green-100 p-4 rounded-full mb-4">
                    <CheckCircle className="h-12 w-12 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Mensagem enviada com sucesso!</h3>
                  <p className="text-gray-600 mb-6">
                    Obrigado por entrar em contato. Responderemos o mais breve possível.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Nome completo
                      </label>
                      <Input 
                        id="name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        placeholder="Seu nome completo"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <Input 
                        id="email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        placeholder="seu.email@exemplo.com"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                        Telefone
                      </label>
                      <Input 
                        id="phone"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="(00) 00000-0000"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                        Assunto
                      </label>
                      <Input 
                        id="subject"
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        required
                        placeholder="Assunto da mensagem"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                      Mensagem
                    </label>
                    <Textarea 
                      id="message"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="Escreva sua mensagem aqui..."
                      className="resize-none"
                    />
                  </div>
                  
                  <div className="pt-2">
                    <Button 
                      type="submit" 
                      className="w-full sm:w-auto" 
                      disabled={isSubmitting}
                    >
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
                          <Send className="mr-2 h-4 w-4" />
                          Enviar mensagem
                        </span>
                      )}
                    </Button>
                  </div>
                </form>
              )}
            </Card>
          </div>
          
          {/* Map */}
          <div className="rounded-xl overflow-hidden shadow-lg h-[400px] animate-fade-in" style={{ animationDelay: "0.7s" }}>
            <div className="relative w-full h-full bg-gray-200">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.098370521624!2d-46.65390688503358!3d-23.563199184685214!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8da0aa315%3A0xd59f9431f2c9776a!2sAv.%20Paulista%20-%20Bela%20Vista%2C%20S%C3%A3o%20Paulo%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1621633401973!5m2!1spt-BR!2sbr" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }}
                allowFullScreen 
                loading="lazy" 
                title="Localização TradeMaster"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <LineChart className="h-6 w-6 text-primary mr-2" />
                <span className="font-bold text-xl">TradeMaster</span>
              </div>
              <p className="text-gray-400 text-sm">
                Plataforma completa para análise de investimentos com IA.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Recursos</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/auth/login" className="hover:text-white transition-colors">Dashboard</a></li>
                <li><a href="/auth/login" className="hover:text-white transition-colors">Análise de Mercado</a></li>
                <li><a href="/auth/login" className="hover:text-white transition-colors">Portfólio</a></li>
                <li><a href="/auth/login" className="hover:text-white transition-colors">Alertas</a></li>
                <li><a href="/auth/login" className="hover:text-white transition-colors">IA & Insights</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Empresa</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/about" className="hover:text-white transition-colors">Sobre nós</a></li>
                <li><a href="/contact" className="hover:text-white transition-colors">Contato</a></li>
                <li><a href="/blog" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="/careers" className="hover:text-white transition-colors">Carreiras</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/terms" className="hover:text-white transition-colors">Termos de Uso</a></li>
                <li><a href="/privacy" className="hover:text-white transition-colors">Política de Privacidade</a></li>
                <li><a href="/cookies" className="hover:text-white transition-colors">Cookies</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} TradeMaster. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Contact;
