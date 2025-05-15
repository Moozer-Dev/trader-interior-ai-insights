
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const Cookies: React.FC = () => {
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
          <h1 className="text-4xl font-bold mb-2">Política de Cookies</h1>
          <p className="text-gray-600">Última atualização: 15 de maio de 2025</p>
        </div>

        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <p className="text-lg">
              Esta Política de Cookies explica como a TradeMaster utiliza cookies e tecnologias semelhantes para reconhecê-lo quando você visita nossa plataforma. Ela explica o que são essas tecnologias e por que as utilizamos, além de seus direitos para controlá-las.
            </p>
          </section>

          <section className="mb-8">
            <h2>O que são cookies?</h2>
            <p>
              Cookies são pequenos arquivos de dados armazenados no seu dispositivo (computador ou dispositivo móvel) quando você visita um site. Os cookies são amplamente utilizados pelos proprietários de sites para fazer com que seus sites funcionem ou funcionem de maneira mais eficiente, bem como para fornecer informações aos proprietários do site.
            </p>
            <p>
              Os cookies definidos pelo proprietário do site (neste caso, TradeMaster) são chamados de cookies "primários". Os cookies definidos por partes que não sejam o proprietário do site são chamados de cookies "de terceiros". Os cookies de terceiros permitem que recursos ou funcionalidades de terceiros sejam fornecidos no ou através do site (como análises, publicidade e vídeos interativos).
            </p>
          </section>

          <section className="mb-8">
            <h2>Por que usamos cookies?</h2>
            <p>
              Utilizamos cookies primários e de terceiros por vários motivos. Alguns cookies são necessários por razões técnicas para o funcionamento de nossa plataforma, sendo estes denominados cookies "essenciais" ou "necessários". Outros cookies nos permitem rastrear e direcionar os interesses dos usuários para melhorar a experiência em nossa plataforma. Terceiros também servem cookies através de nossa plataforma para análises, marketing e outros propósitos.
            </p>
          </section>

          <section className="mb-8">
            <h2>Tipos de cookies que utilizamos</h2>
            
            <Table className="my-6">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-1/4">Tipo de Cookie</TableHead>
                  <TableHead className="w-2/4">Descrição</TableHead>
                  <TableHead className="w-1/4">Duração</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Necessários</TableCell>
                  <TableCell>Essenciais para o funcionamento básico da plataforma, como autenticação e segurança.</TableCell>
                  <TableCell>Sessão / Persistente</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Preferências</TableCell>
                  <TableCell>Permitem que a plataforma lembre informações que mudam a aparência ou o comportamento do site.</TableCell>
                  <TableCell>1 ano</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Estatísticas</TableCell>
                  <TableCell>Coletam dados anônimos sobre como os visitantes utilizam a plataforma.</TableCell>
                  <TableCell>2 anos</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Marketing</TableCell>
                  <TableCell>Usados para rastrear visitantes em diferentes sites com o objetivo de exibir anúncios relevantes.</TableCell>
                  <TableCell>90 dias</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </section>

          <Separator className="my-8" />

          <section className="mb-8">
            <h2>Como gerenciar seus cookies</h2>
            <p>
              Você pode controlar e gerenciar cookies de várias maneiras. Observe que a remoção ou bloqueio de cookies pode afetar a experiência do usuário e partes da nossa plataforma podem não funcionar corretamente.
            </p>
            
            <h3>Configurações do navegador</h3>
            <p>
              A maioria dos navegadores permite que você controle cookies através das suas configurações. Para obter mais informações sobre como gerenciar cookies em diferentes navegadores, visite os links abaixo:
            </p>
            <ul>
              <li><a href="https://support.google.com/chrome/answer/95647" className="text-blue-600 hover:underline">Google Chrome</a></li>
              <li><a href="https://support.mozilla.org/pt-BR/kb/gerencie-configuracoes-de-armazenamento-local-de-s" className="text-blue-600 hover:underline">Mozilla Firefox</a></li>
              <li><a href="https://support.apple.com/pt-br/guide/safari/sfri11471/mac" className="text-blue-600 hover:underline">Safari</a></li>
              <li><a href="https://support.microsoft.com/pt-br/microsoft-edge/excluir-cookies-no-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" className="text-blue-600 hover:underline">Microsoft Edge</a></li>
            </ul>
          </section>

          <section className="mb-8">
            <h2>Cookies de terceiros</h2>
            <p>
              Os cookies de terceiros em nossa plataforma são utilizados principalmente para os seguintes serviços:
            </p>
            <ul>
              <li>Google Analytics – para análise de tráfego e comportamento do usuário</li>
              <li>Meta Pixel – para métricas de conversão e remarketing</li>
              <li>Hotjar – para mapas de calor e análise de comportamento</li>
              <li>Zendesk – para suporte ao cliente</li>
            </ul>
            <p>
              Você pode optar por não participar de cookies de terceiros específicos usando as ferramentas de opt-out fornecidas por esses serviços.
            </p>
          </section>

          <section className="mb-8">
            <h2>Atualizações à Política de Cookies</h2>
            <p>
              Podemos atualizar esta Política de Cookies periodicamente para refletir, por exemplo, alterações nas cookies que utilizamos ou por outras razões operacionais, legais ou regulatórias. Visite esta página regularmente para se manter informado sobre o uso de cookies e tecnologias relacionadas.
            </p>
            <p>
              A data na parte superior desta Política indica quando ela foi atualizada pela última vez.
            </p>
          </section>

          <section className="mb-8">
            <h2>Dúvidas e contato</h2>
            <p>
              Se você tiver alguma dúvida sobre nosso uso de cookies ou outras tecnologias, entre em contato conosco pelo e-mail: <a href="mailto:privacy@trademaster.com.br" className="text-blue-600 hover:underline">privacy@trademaster.com.br</a>.
            </p>
          </section>
        </div>

        <div className="mt-12 bg-blue-50 p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-3">Configurações de Cookies</h3>
          <p className="mb-4">
            Você pode personalizar suas preferências de cookies a qualquer momento utilizando nosso painel de preferências.
          </p>
          <Button variant="outline">Gerenciar preferências de cookies</Button>
        </div>
      </div>
    </div>
  );
};

export default Cookies;
