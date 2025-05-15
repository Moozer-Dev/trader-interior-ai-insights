
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowRight } from "lucide-react";

interface JobPosition {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
}

const jobOpenings: JobPosition[] = [
  {
    id: "dev-1",
    title: "Desenvolvedor(a) Full Stack",
    department: "Tecnologia",
    location: "Remoto - Brasil",
    type: "Integral",
    description: "Buscamos um desenvolvedor full stack experiente para trabalhar em nossa plataforma de análise de investimentos, utilizando tecnologias modernas como React, Node.js e PostgreSQL."
  },
  {
    id: "analyst-1",
    title: "Analista de Mercado Financeiro",
    department: "Pesquisa",
    location: "São Paulo - Brasil",
    type: "Integral",
    description: "Procuramos um analista de mercado com conhecimento profundo em ações, FIIs e outros ativos para ajudar a desenvolver análises e relatórios para nossos clientes."
  },
  {
    id: "marketing-1",
    title: "Especialista em Marketing Digital",
    department: "Marketing",
    location: "Remoto - Brasil",
    type: "Integral",
    description: "Buscamos um especialista em marketing digital para liderar nossa estratégia de aquisição de usuários e crescimento da plataforma."
  },
  {
    id: "support-1",
    title: "Atendimento ao Cliente",
    department: "Suporte",
    location: "Híbrido - São Paulo",
    type: "Integral/Meio-período",
    description: "Procuramos profissional para atendimento ao cliente com conhecimento em mercado financeiro para auxiliar nossos usuários."
  }
];

const benefits = [
  "Trabalho remoto ou híbrido",
  "Vale-refeição ou alimentação",
  "Plano de saúde e odontológico",
  "Ambiente descontraído e horizontal",
  "Horário flexível",
  "Oportunidades de crescimento",
  "Bonificação por performance",
  "Incentivo a cursos e certificações"
];

const Careers: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 py-20 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Construa sua carreira na TradeMaster</h1>
            <p className="text-lg opacity-90 mb-8">
              Junte-se à nossa equipe e ajude a transformar a forma como as pessoas investem e 
              analisam o mercado financeiro.
            </p>
            <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50">
              Ver vagas disponíveis
            </Button>
          </div>
        </div>
      </section>
      
      {/* Main Content */}
      <section className="container mx-auto px-6 py-16">
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Nossa cultura</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-700 mb-4">
                Na TradeMaster, valorizamos a inovação, transparência e excelência. Nosso ambiente de trabalho
                estimula a colaboração e o desenvolvimento contínuo, com foco em resultados e no impacto que
                geramos para nossos usuários.
              </p>
              <p className="text-gray-700 mb-4">
                Buscamos profissionais apaixonados por tecnologia e mercado financeiro, que queiram contribuir
                para uma plataforma que ajuda milhares de investidores a tomarem melhores decisões.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">Benefícios</h3>
              <ul className="space-y-2">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center">
                    <span className="inline-block w-2 h-2 rounded-full bg-blue-600 mr-3"></span>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        <Separator className="my-10" />
        
        <div>
          <h2 className="text-3xl font-bold mb-8">Vagas disponíveis</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {jobOpenings.map(job => (
              <Card key={job.id} className="border-l-4 border-l-blue-600">
                <CardHeader>
                  <CardTitle>{job.title}</CardTitle>
                  <CardDescription className="flex flex-col gap-1 mt-2">
                    <span>{job.department}</span>
                    <span>{job.location} • {job.type}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{job.description}</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full flex items-center justify-between">
                    Ver detalhes e candidatar-se 
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
        
        <div className="mt-20 bg-gray-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Não encontrou uma vaga para você?</h2>
          <p className="text-gray-700 mb-6 max-w-xl mx-auto">
            Envie seu currículo para nossa base de talentos e entraremos em contato quando 
            surgir uma oportunidade alinhada ao seu perfil.
          </p>
          <Button>
            Enviar currículo
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Careers;
