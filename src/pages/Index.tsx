import { DollarSign, TrendingUp, TrendingDown, Package, AlertTriangle, Rocket, Target } from "lucide-react";
import { KPICard } from "@/components/KPICard";
import { AlertCard } from "@/components/AlertCard";
import { SalesChart } from "@/components/SalesChart";
import { ProductsTable } from "@/components/ProductsTable";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="p-8 space-y-8 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground mt-1">Visão geral do seu negócio em tempo real</p>
          </div>
          <div className="flex gap-3">
            <Select defaultValue="todos">
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Marketplace" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="meli">Mercado Livre</SelectItem>
                <SelectItem value="shopee">Shopee</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="mes">
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hoje">Hoje</SelectItem>
                <SelectItem value="semana">7 dias</SelectItem>
                <SelectItem value="mes">30 dias</SelectItem>
                <SelectItem value="custom">Customizado</SelectItem>
              </SelectContent>
            </Select>
            <Button className="gradient-primary">
              Atualizar Dados
            </Button>
          </div>
        </div>

        {/* KPIs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-slide-up">
          <KPICard
            title="Faturamento Bruto"
            value="R$ 87.340,00"
            subtitle="Últimos 30 dias"
            trend={{ value: "12.5%", isPositive: true }}
            icon={DollarSign}
            variant="success"
          />
          <KPICard
            title="Total de Taxas"
            value="R$ 14.280,00"
            subtitle="Comissão + Frete + Ads"
            trend={{ value: "3.2%", isPositive: false }}
            icon={TrendingDown}
            variant="danger"
          />
          <KPICard
            title="Lucro Líquido"
            value="R$ 48.960,00"
            subtitle="Margem de 56%"
            trend={{ value: "18.3%", isPositive: true }}
            icon={TrendingUp}
            variant="success"
          />
          <KPICard
            title="Devoluções"
            value="2.8%"
            subtitle="R$ 2.445,00 devolvidos"
            trend={{ value: "0.5%", isPositive: false }}
            icon={Package}
            variant="warning"
          />
        </div>

        {/* Alerts Section */}
        <div className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-foreground">Alertas e Recomendações</h2>
            <Button variant="ghost" size="sm">Ver todos</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AlertCard
              icon={Rocket}
              title="Vendas em Alta +28%"
              description="Fone Bluetooth Premium teve aumento significativo. Considere aumentar estoque Full."
              impact="+R$ 4.200 na última semana"
              variant="success"
              action={{
                label: "Ver Produto",
                onClick: () => console.log("View product"),
              }}
            />
            <AlertCard
              icon={AlertTriangle}
              title="Estoque Crítico"
              description="3 produtos estão prestes a esgotar. Prazo médio: 5 dias."
              impact="Possível perda de R$ 8.500"
              variant="warning"
              action={{
                label: "Ver Estoque",
                onClick: () => console.log("View stock"),
              }}
            />
            <AlertCard
              icon={TrendingDown}
              title="Queda nas Vendas -15%"
              description="Mouse Gamer RGB apresentou queda. Verifique anúncios e concorrência."
              impact="-R$ 1.800 vs. semana anterior"
              variant="danger"
              action={{
                label: "Analisar",
                onClick: () => console.log("Analyze"),
              }}
            />
            <AlertCard
              icon={Target}
              title="Oportunidade de Anúncio"
              description="Teclado Mecânico tem boa margem mas baixa visibilidade. Invista em Ads."
              impact="Potencial +R$ 3.200/mês"
              variant="info"
              action={{
                label: "Criar Campanha",
                onClick: () => console.log("Create campaign"),
              }}
            />
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <SalesChart />
          <div className="space-y-4">
            <ProductsTable />
          </div>
        </div>

        {/* Update Info */}
        <div className="text-center text-sm text-muted-foreground animate-slide-up" style={{ animationDelay: "0.3s" }}>
          <p>Última atualização: Hoje às 13:00 • Próxima atualização: Hoje às 19:00</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
