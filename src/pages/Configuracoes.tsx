import { ShoppingBag, Bell, Database, Key, User, Mail } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

const Configuracoes = () => {
  return (
    <div className="min-h-screen bg-background p-8 space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Configurações</h1>
        <p className="text-muted-foreground mt-1">
          Gerencie suas integrações e preferências
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Settings */}
        <div className="lg:col-span-2 space-y-6">
          {/* Account Settings */}
          <Card className="shadow-card animate-slide-up">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Informações da Conta
              </CardTitle>
              <CardDescription>Gerencie suas informações pessoais</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome Completo</Label>
                <Input id="name" placeholder="Seu nome" defaultValue="João Silva" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  defaultValue="joao@empresa.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Empresa</Label>
                <Input id="company" placeholder="Nome da empresa" defaultValue="Minha Loja LTDA" />
              </div>
              <Button className="gradient-primary">Salvar Alterações</Button>
            </CardContent>
          </Card>

          {/* Marketplace Integrations */}
          <Card className="shadow-card animate-slide-up" style={{ animationDelay: "0.1s" }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5" />
                Integrações de Marketplace
              </CardTitle>
              <CardDescription>Conecte suas contas de venda</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Mercado Livre */}
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-lg bg-warning/10 flex items-center justify-center">
                    <ShoppingBag className="h-6 w-6 text-warning" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Mercado Livre</h4>
                    <p className="text-sm text-success">● Conectado</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Reautorizar
                  </Button>
                  <Button variant="destructive" size="sm">
                    Desconectar
                  </Button>
                </div>
              </div>

              {/* Shopee */}
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-lg bg-destructive/10 flex items-center justify-center">
                    <ShoppingBag className="h-6 w-6 text-destructive" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Shopee</h4>
                    <p className="text-sm text-success">● Conectado</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Reautorizar
                  </Button>
                  <Button variant="destructive" size="sm">
                    Desconectar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data Sync Settings */}
          <Card className="shadow-card animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Sincronização de Dados
              </CardTitle>
              <CardDescription>Configure como seus dados são atualizados</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Atualização Automática (07h)</Label>
                  <p className="text-sm text-muted-foreground">Sincroniza todos os dados pela manhã</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Atualização Automática (13h)</Label>
                  <p className="text-sm text-muted-foreground">Sincroniza todos os dados à tarde</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Sincronização Manual</Label>
                  <p className="text-sm text-muted-foreground">Última sincronização: Hoje às 13:00</p>
                </div>
                <Button size="sm" variant="outline">
                  Sincronizar Agora
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Settings */}
        <div className="space-y-6">
          {/* Notifications */}
          <Card className="shadow-card animate-slide-up" style={{ animationDelay: "0.1s" }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notificações
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-sm">Estoque Crítico</Label>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <Label className="text-sm">Alertas de IA</Label>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <Label className="text-sm">Relatórios Diários</Label>
                <Switch />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <Label className="text-sm">Email Semanal</Label>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          {/* API Keys */}
          <Card className="shadow-card animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5" />
                API Keys
              </CardTitle>
              <CardDescription className="text-xs">
                Chaves de acesso às APIs
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-xs font-mono break-all">
                  sk_live_xxxxxxxxxxxxx
                </p>
              </div>
              <Button variant="outline" size="sm" className="w-full">
                Gerar Nova Chave
              </Button>
            </CardContent>
          </Card>

          {/* Support */}
          <Card className="shadow-card border-primary/20 bg-primary/5 animate-slide-up" style={{ animationDelay: "0.3s" }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Mail className="h-5 w-5" />
                Suporte
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Precisa de ajuda? Nossa equipe está pronta para te ajudar.
              </p>
              <Button className="w-full gradient-primary" size="sm">
                Entrar em Contato
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Configuracoes;
