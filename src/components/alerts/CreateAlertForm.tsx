
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ArrowUp, ArrowDown, Volume2, Bell, ChartBar } from 'lucide-react';

export const CreateAlertForm: React.FC = () => {
  const [alertType, setAlertType] = useState('price-above');
  
  return (
    <div className="space-y-4 py-4">
      <div className="space-y-2">
        <Label htmlFor="asset">Ativo</Label>
        <Input id="asset" placeholder="Ex: PETR4" />
        <p className="text-xs text-muted-foreground mt-1">
          Digite o código do ativo na bolsa brasileira (B3)
        </p>
      </div>
      
      <Separator className="my-4" />
      
      <div className="space-y-2">
        <Label>Tipo de Alerta</Label>
        <RadioGroup defaultValue="price-above" className="flex flex-col space-y-2" onValueChange={setAlertType}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="price-above" id="price-above" />
            <Label htmlFor="price-above" className="flex items-center cursor-pointer">
              <ArrowUp className="mr-2 h-4 w-4 text-trader-green" />
              Preço acima de
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="price-below" id="price-below" />
            <Label htmlFor="price-below" className="flex items-center cursor-pointer">
              <ArrowDown className="mr-2 h-4 w-4 text-trader-red" />
              Preço abaixo de
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="volume-above" id="volume-above" />
            <Label htmlFor="volume-above" className="flex items-center cursor-pointer">
              <ChartBar className="mr-2 h-4 w-4 text-trader-blue" />
              Volume acima de
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="price-change" id="price-change" />
            <Label htmlFor="price-change" className="flex items-center cursor-pointer">
              <Volume2 className="mr-2 h-4 w-4" />
              Variação percentual
            </Label>
          </div>
        </RadioGroup>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="threshold">
          {alertType === 'price-above' || alertType === 'price-below' ? 'Preço-alvo' : 
          alertType === 'volume-above' ? 'Volume-alvo' : 'Variação-alvo'}
        </Label>
        <div className="flex items-center">
          {(alertType === 'price-above' || alertType === 'price-below') && 
            <span className="mr-2 text-muted-foreground">R$</span>
          }
          <Input 
            id="threshold" 
            placeholder={
              alertType === 'price-above' || alertType === 'price-below' ? '0,00' : 
              alertType === 'volume-above' ? '1000000' : '5,0'
            } 
          />
          {alertType === 'price-change' && 
            <span className="ml-2 text-muted-foreground">%</span>
          }
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          {alertType === 'price-above' && 'Você será notificado quando o preço estiver acima deste valor'}
          {alertType === 'price-below' && 'Você será notificado quando o preço estiver abaixo deste valor'}
          {alertType === 'volume-above' && 'Você será notificado quando o volume diário de negociação ultrapassar este valor'}
          {alertType === 'price-change' && 'Você será notificado quando o preço variar este percentual (para cima ou para baixo)'}
        </p>
      </div>
      
      <Separator className="my-4" />
      
      <div className="space-y-2">
        <Label>Período de Monitoramento</Label>
        <Select defaultValue="daily">
          <SelectTrigger>
            <SelectValue placeholder="Selecione o período" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="realtime">Tempo real</SelectItem>
            <SelectItem value="hourly">A cada hora</SelectItem>
            <SelectItem value="daily">Diário</SelectItem>
            <SelectItem value="weekly">Semanal</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label>Validade</Label>
        <Select defaultValue="indefinite">
          <SelectTrigger>
            <SelectValue placeholder="Selecione a validade" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1day">1 dia</SelectItem>
            <SelectItem value="1week">1 semana</SelectItem>
            <SelectItem value="1month">1 mês</SelectItem>
            <SelectItem value="indefinite">Indeterminado</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <Separator className="my-4" />
      
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <span className="font-medium">Notificação por Email</span>
          <span className="text-xs text-muted-foreground">Receber alertas por email</span>
        </div>
        <Switch defaultChecked />
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <span className="font-medium">Notificação no App</span>
          <span className="text-xs text-muted-foreground">Receber alertas no aplicativo</span>
        </div>
        <Switch defaultChecked />
      </div>
      
      <div className="mt-6 flex justify-end gap-2">
        <Button type="button" variant="outline">Cancelar</Button>
        <Button type="submit" className="flex items-center">
          <Bell className="mr-2 h-4 w-4" />
          Criar Alerta
        </Button>
      </div>
    </div>
  );
};
