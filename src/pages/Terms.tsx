
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Terms: React.FC = () => {
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
          <h1 className="text-4xl font-bold mb-2">Termos de Uso</h1>
          <p className="text-gray-600">Última atualização: 15 de maio de 2025</p>
        </div>

        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2>1. Aceitação dos Termos</h2>
            <p>
              Ao acessar ou usar o TradeMaster ("Plataforma"), você concorda com os termos e condições estabelecidos neste documento ("Termos de Uso"). Se você não concordar com qualquer parte destes termos, não deverá usar nossa plataforma.
            </p>
          </section>

          <section className="mb-8">
            <h2>2. Descrição do Serviço</h2>
            <p>
              A TradeMaster oferece uma plataforma de análise de investimentos que inclui dados de mercado, ferramentas de análise, recomendações baseadas em inteligência artificial e outras funcionalidades relacionadas ao mercado financeiro.
            </p>
            <p>
              Nossos serviços estão disponíveis em diferentes planos, incluindo opções gratuitas e pagas, cada um com diferentes níveis de acesso e funcionalidades.
            </p>
          </section>

          <section className="mb-8">
            <h2>3. Cadastro e Conta do Usuário</h2>
            <p>
              Para acessar determinadas funcionalidades da plataforma, é necessário criar uma conta. Você é responsável por manter a confidencialidade da sua senha e por todas as atividades que ocorrem em sua conta.
            </p>
            <p>
              As informações fornecidas durante o cadastro devem ser precisas, completas e atualizadas. A TradeMaster reserva-se o direito de recusar cadastros ou cancelar contas a seu critério.
            </p>
          </section>

          <section className="mb-8">
            <h2>4. Uso da Plataforma</h2>
            <p>
              Ao usar nossa plataforma, você concorda em:
            </p>
            <ul>
              <li>Não usar a plataforma para fins ilegais ou não autorizados;</li>
              <li>Não tentar obter acesso não autorizado a sistemas ou contas;</li>
              <li>Não interferir ou interromper a integridade ou o desempenho da plataforma;</li>
              <li>Não coletar ou armazenar informações pessoais de outros usuários sem autorização;</li>
              <li>Não reproduzir, duplicar, copiar, vender ou revender qualquer parte da plataforma sem autorização expressa.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2>5. Conteúdo e Direitos de Propriedade</h2>
            <p>
              Todo o conteúdo disponibilizado na plataforma, incluindo textos, gráficos, logotipos, imagens, dados de mercado e análises, está protegido por direitos autorais e outros direitos de propriedade intelectual.
            </p>
            <p>
              Você não pode modificar, publicar, transmitir, participar na transferência ou venda, criar obras derivadas ou explorar qualquer conteúdo da plataforma sem nossa autorização prévia por escrito.
            </p>
          </section>

          <section className="mb-8">
            <h2>6. Isenção de Responsabilidade e Riscos</h2>
            <p>
              As informações fornecidas pela plataforma têm caráter meramente informativo e educacional, não constituindo recomendações de investimento ou aconselhamento financeiro.
            </p>
            <p>
              Investimentos no mercado financeiro envolvem riscos, incluindo possível perda do valor principal. O desempenho passado não é garantia de resultados futuros. A TradeMaster não se responsabiliza por decisões de investimento tomadas com base nas informações fornecidas pela plataforma.
            </p>
          </section>

          <section className="mb-8">
            <h2>7. Modificações dos Termos</h2>
            <p>
              A TradeMaster reserva-se o direito de modificar estes Termos de Uso a qualquer momento, a seu critério exclusivo. As alterações entrarão em vigor imediatamente após a publicação dos termos atualizados na plataforma.
            </p>
            <p>
              O uso continuado da plataforma após as alterações constituirá sua aceitação dos novos termos.
            </p>
          </section>

          <section className="mb-8">
            <h2>8. Lei Aplicável</h2>
            <p>
              Estes Termos de Uso são regidos e interpretados de acordo com as leis do Brasil. Qualquer disputa relacionada a estes termos será submetida à jurisdição exclusiva dos tribunais brasileiros.
            </p>
          </section>

          <section className="mb-8">
            <h2>9. Contato</h2>
            <p>
              Se você tiver alguma dúvida sobre estes Termos de Uso, entre em contato conosco pelo email: <a href="mailto:legal@trademaster.com.br" className="text-blue-600 hover:underline">legal@trademaster.com.br</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Terms;
