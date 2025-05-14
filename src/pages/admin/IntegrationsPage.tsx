
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { ArrowUp, ArrowDown, Info, Lock, Check, AlertTriangle } from 'lucide-react';

// Mock integrations data
const dataProviders = [
  { name: 'Alpha Vantage', status: 'active', type: 'stocks', requestsToday: 3240, usage: 65, limit: 5000, credentials: true },
  { name: 'TwelveData', status: 'active', type: 'stocks', requestsToday: 1850, usage: 37, limit: 5000, credentials: true },
  { name: 'Yahoo Finance', status: 'inactive', type: 'stocks', requestsToday: 0, usage: 0, limit: 10000, credentials: false },
  { name: 'Finnhub', status: 'active', type: 'stocks', requestsToday: 960, usage: 48, limit: 2000, credentials: true },
  { name: 'MetaTrader', status: 'active', type: 'forex', requestsToday: 740, usage: 37, limit: 2000, credentials: true },
];

const monitoringTools = [
  { name: 'Sentry', status: 'active', events: 34, usagePercent: 22 },
  { name: 'LogRocket', status: 'active', events: 156, usagePercent: 78 },
];

const IntegrationsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Integrações</h1>
          <p className="text-muted-foreground">Gerencie as integrações externas da plataforma</p>
        </div>
        <div className="flex items-center gap-2 self-start">
          <Button>Adicionar Integração</Button>
        </div>
      </div>

      <Tabs defaultValue="data" className="space-y-6">
        <TabsList className="w-full">
          <TabsTrigger value="data" className="flex-1">Provedores de Dados</TabsTrigger>
          <TabsTrigger value="monitoring" className="flex-1">Monitoramento</TabsTrigger>
          <TabsTrigger value="webhooks" className="flex-1">Webhooks</TabsTrigger>
          <TabsTrigger value="settings" className="flex-1">Configurações</TabsTrigger>
        </TabsList>
        
        <TabsContent value="data">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Provedores de Dados Financeiros</CardTitle>
                <CardDescription>APIs integradas para obtenção de dados do mercado</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {dataProviders.map((provider) => (
                    <div key={provider.name} className="border rounded-lg p-4">
                      <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{provider.name}</h3>
                            {provider.credentials && (
                              <Lock className="h-4 w-4 text-muted-foreground" />
                            )}
                            <Badge variant={provider.status === 'active' ? 'default' : 'outline'}>
                              {provider.status === 'active' ? 'Ativo' : 'Inativo'}
                            </Badge>
                          </div>
                          <div className="text-sm text-muted-foreground mt-1">
                            Provedor de dados para {provider.type === 'stocks' ? 'ações e indices' : 'forex e commodities'}
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="text-sm font-medium">{provider.requestsToday} requisições</div>
                            <div className="text-xs text-muted-foreground">Hoje</div>
                          </div>
                          <Switch checked={provider.status === 'active'} />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Uso da API</span>
                          <span>{provider.usage}% ({provider.requestsToday}/{provider.limit})</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              provider.usage > 80 ? 'bg-destructive' : 
                              provider.usage > 60 ? 'bg-yellow-500' : 
                              'bg-accent'
                            }`} 
                            style={{ width: `${provider.usage}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center mt-4">
                        <Button variant="outline" size="sm">Testar Conexão</Button>
                        <Button variant="outline" size="sm">Configurar</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Endpoints das APIs</CardTitle>
                <CardDescription>Configurações e status dos endpoints</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b pb-4">
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-accent" />
                      <div>
                        <div className="font-medium">Cotações em Tempo Real</div>
                        <div className="text-xs text-muted-foreground">Recebe dados de cotações a cada 5 segundos</div>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                      Online
                    </Badge>
                  </div>
                  
                  <div className="flex justify-between items-center border-b pb-4">
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-accent" />
                      <div>
                        <div className="font-medium">Dados Históricos</div>
                        <div className="text-xs text-muted-foreground">Série histórica de preços para análise</div>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                      Online
                    </Badge>
                  </div>
                  
                  <div className="flex justify-between items-center border-b pb-4">
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-accent" />
                      <div>
                        <div className="font-medium">Indicadores Técnicos</div>
                        <div className="text-xs text-muted-foreground">Cálculo de indicadores técnicos (RSI, MACD, etc)</div>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                      Online
                    </Badge>
                  </div>
                  
                  <div className="flex justify-between items-center border-b pb-4">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-500" />
                      <div>
                        <div className="font-medium">Dados Fundamentalistas</div>
                        <div className="text-xs text-muted-foreground">Balanços e indicadores fundamentalistas</div>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100">
                      Degradado
                    </Badge>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-accent" />
                      <div>
                        <div className="font-medium">Notícias Financeiras</div>
                        <div className="text-xs text-muted-foreground">Notícias do mercado e específicas de ativos</div>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                      Online
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="monitoring">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Ferramentas de Monitoramento</CardTitle>
                <CardDescription>Integrações para monitoramento e logging</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {monitoringTools.map((tool) => (
                    <div key={tool.name} className="border rounded-lg p-4">
                      <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{tool.name}</h3>
                            <Badge variant={tool.status === 'active' ? 'default' : 'outline'}>
                              {tool.status === 'active' ? 'Ativo' : 'Inativo'}
                            </Badge>
                          </div>
                          {tool.name === 'Sentry' && (
                            <div className="text-sm text-muted-foreground mt-1">
                              Monitoramento de erros e exceções
                            </div>
                          )}
                          {tool.name === 'LogRocket' && (
                            <div className="text-sm text-muted-foreground mt-1">
                              Análise de sessões e experiência do usuário
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="text-sm font-medium">{tool.events} eventos</div>
                            <div className="text-xs text-muted-foreground">Hoje</div>
                          </div>
                          <Switch checked={tool.status === 'active'} />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Uso</span>
                          <span>{tool.usagePercent}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className="h-2 rounded-full bg-accent"
                            style={{ width: `${tool.usagePercent}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center mt-4">
                        <Button variant="outline" size="sm">Ver Dashboard</Button>
                        <Button variant="outline" size="sm">Configurar</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="webhooks">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Webhooks</CardTitle>
                <CardDescription>Endpoints para integrações externas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-medium">Webhook para Alertas</h3>
                        <div className="text-sm text-muted-foreground mt-1">
                          Recebe notificações quando alertas são acionados
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                        Ativo
                      </Badge>
                    </div>
                    
                    <div className="flex items-center space-x-2 mb-4">
                      <Input 
                        readOnly 
                        value="https://api.trader-interior.com/webhooks/alerts" 
                        className="font-mono text-xs"
                      />
                      <Button variant="outline" size="sm">Copiar</Button>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="text-sm">
                        <span className="text-muted-foreground">Última resposta:</span>
                        <span className="ml-2 text-green-600">200 OK (15 minutos atrás)</span>
                      </div>
                      <Button variant="outline" size="sm">Testar</Button>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-medium">Webhook para Análises</h3>
                        <div className="text-sm text-muted-foreground mt-1">
                          Recebe novas análises de IA geradas pelo sistema
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                        Ativo
                      </Badge>
                    </div>
                    
                    <div className="flex items-center space-x-2 mb-4">
                      <Input 
                        readOnly 
                        value="https://api.trader-interior.com/webhooks/analysis" 
                        className="font-mono text-xs"
                      />
                      <Button variant="outline" size="sm">Copiar</Button>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="text-sm">
                        <span className="text-muted-foreground">Última resposta:</span>
                        <span className="ml-2 text-green-600">200 OK (2 horas atrás)</span>
                      </div>
                      <Button variant="outline" size="sm">Testar</Button>
                    </div>
                  </div>
                  
                  <Button className="w-full">Adicionar Novo Webhook</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="settings">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Configurações de Integração</CardTitle>
                <CardDescription>Preferências gerais para as integrações externas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Rate Limiting</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Limitar o número de requisições por minuto para as APIs externas
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Fallback Automático</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Alternar automaticamente para um provedor secundário em caso de falha
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Cachear Dados</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Armazenar dados em cache para reduzir o número de chamadas às APIs
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Logs Detalhados</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Registrar informações detalhadas sobre as chamadas de API
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Alertas de Uso Excessivo</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Notificar quando o uso de API atingir 80% do limite
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default IntegrationsPage;
