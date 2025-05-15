
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Privacy: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <div className="mb-10">
          <Button variant="ghost" className="mb-4" asChild>
            <Link to="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              <span>Voltar para home</span>
            </Link>
          </Button>
          <h1 className="text-4xl font-bold mb-2">Política de Privacidade</h1>
          <p className="text-gray-600">Última atualização: 15 de maio de 2025</p>
        </div>

        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <p className="lead">
              A TradeMaster valoriza a sua privacidade e está comprometida em proteger seus dados pessoais. Esta Política de Privacidade descreve como coletamos, usamos e compartilhamos suas informações quando você utiliza nossa plataforma.
            </p>
          </section>

          <section className="mb-8">
            <h2>1. Informações que Coletamos</h2>
            
            <h3>1.1 Informações que você nos fornece</h3>
            <p>
              Quando você se cadastra em nossa plataforma, podemos coletar:
            </p>
            <ul>
              <li>Nome completo</li>
              <li>Endereço de e-mail</li>
              <li>Senha (armazenada de forma criptografada)</li>
              <li>Informações de perfil, como foto e biografia (opcionais)</li>
              <li>Informações de pagamento (quando aplicável)</li>
            </ul>
            
            <h3>1.2 Informações coletadas automaticamente</h3>
            <p>
              Quando você utiliza nossa plataforma, podemos coletar automaticamente:
            </p>
            <ul>
              <li>Endereço IP</li>
              <li>Tipo de navegador e dispositivo</li>
              <li>Páginas visitadas e tempo gasto na plataforma</li>
              <li>Interações com recursos e ferramentas da plataforma</li>
              <li>Informações sobre portfólio e preferências de investimento</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2>2. Como Usamos Suas Informações</h2>
            <p>
              Utilizamos suas informações para:
            </p>
            <ul>
              <li>Fornecer, manter e melhorar nossos serviços</li>
              <li>Processar transações e gerenciar sua conta</li>
              <li>Personalizar sua experiência na plataforma</li>
              <li>Enviar notificações, atualizações e comunicações relacionadas ao serviço</li>
              <li>Analisar o uso da plataforma e desenvolver novos recursos</li>
              <li>Detectar, prevenir e solucionar problemas técnicos e de segurança</li>
              <li>Cumprir obrigações legais e regulatórias</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2>3. Compartilhamento de Informações</h2>
            <p>
              Podemos compartilhar suas informações com:
            </p>
            <ul>
              <li>Prestadores de serviços que nos auxiliam na operação da plataforma</li>
              <li>Parceiros comerciais, com seu consentimento prévio</li>
              <li>Autoridades regulatórias ou governamentais, quando exigido por lei</li>
              <li>Em caso de fusão, aquisição ou venda de ativos, mediante aviso prévio</li>
            </ul>
            <p>
              Não vendemos suas informações pessoais a terceiros.
            </p>
          </section>

          <section className="mb-8">
            <h2>4. Segurança de Dados</h2>
            <p>
              Implementamos medidas de segurança técnicas e organizacionais adequadas para proteger suas informações contra acesso não autorizado, alteração, divulgação ou destruição.
            </p>
            <p>
              No entanto, nenhum método de transmissão pela internet ou de armazenamento eletrônico é 100% seguro. Portanto, não podemos garantir sua segurança absoluta.
            </p>
          </section>

          <section className="mb-8">
            <h2>5. Seus Direitos</h2>
            <p>
              De acordo com as leis de proteção de dados aplicáveis, você pode ter os seguintes direitos:
            </p>
            <ul>
              <li>Acesso às suas informações pessoais</li>
              <li>Correção de informações inexatas</li>
              <li>Exclusão de suas informações pessoais</li>
              <li>Restrição ou oposição ao processamento de suas informações</li>
              <li>Portabilidade de dados</li>
              <li>Retirada de consentimento</li>
            </ul>
            <p>
              Para exercer esses direitos, entre em contato conosco através dos canais indicados abaixo.
            </p>
          </section>

          <section className="mb-8">
            <h2>6. Retenção de Dados</h2>
            <p>
              Mantemos suas informações pessoais pelo tempo necessário para cumprir as finalidades descritas nesta Política de Privacidade, a menos que um período de retenção mais longo seja exigido ou permitido por lei.
            </p>
          </section>

          <section className="mb-8">
            <h2>7. Alterações nesta Política</h2>
            <p>
              Podemos atualizar nossa Política de Privacidade periodicamente. Notificaremos você sobre quaisquer alterações significativas através de um aviso em nossa plataforma ou por e-mail.
            </p>
          </section>

          <section className="mb-8">
            <h2>8. Contato</h2>
            <p>
              Se você tiver dúvidas ou preocupações sobre esta Política de Privacidade ou sobre o tratamento de seus dados pessoais, entre em contato conosco pelo e-mail: <a href="mailto:privacy@trademaster.com.br" className="text-blue-600 hover:underline">privacy@trademaster.com.br</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
