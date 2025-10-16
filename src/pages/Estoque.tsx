import { Package, AlertTriangle, TrendingDown, Clock, FileDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AlertCard } from "@/components/AlertCard";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const mockStockData = [
  {
    sku: "PROD-001",
    name: "Fone Bluetooth Premium",
    currentStock: 45,
    avgSales: 18,
    coverage: 2.5,
    suggested: 200,
    deadline: "2024-01-15",
    status: "Crítico",
  },
  {
    sku: "PROD-002",
    name: "Carregador USB-C 65W",
    currentStock: 82,
    avgSales: 14,
    coverage: 5.8,
    suggested: 150,
    deadline: "2024-01-20",
    status: "Atenção",
  },
  {
    sku: "PROD-003",
    name: "Mouse Gamer RGB",
    currentStock: 38,
    avgSales: 12,
    coverage: 3.1,
    suggested: 180,
    deadline: "2024-01-17",
    status: "Crítico",
  },
  {
    sku: "PROD-004",
    name: "Teclado Mecânico",
    currentStock: 95,
    avgSales: 9,
    coverage: 10.5,
    suggested: 100,
    deadline: "2024-01-28",
    status: "Normal",
  },
  {
    sku: "PROD-005",
    name: "Webcam Full HD",
    currentStock: 67,
    avgSales: 7,
    coverage: 9.5,
    suggested: 80,
    deadline: "2024-01-26",
    status: "Normal",
  },
  {
    sku: "PROD-006",
    name: "Hub USB 4 Portas",
    currentStock: 124,
    avgSales: 5,
    coverage: 24.8,
    suggested: 50,
    deadline: "2024-02-10",
    status: "Excesso",
  },
];

const Estoque = () => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Crítico":
        return <Badge className="bg-destructive">{status}</Badge>;
      case "Atenção":
        return <Badge className="bg-warning">{status}</Badge>;
      case "Normal":
        return <Badge className="bg-success">{status}</Badge>;
      case "Excesso":
        return <Badge variant="secondary">{status}</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getCoverageProgress = (coverage: number) => {
    if (coverage <= 3) return { value: (coverage / 3) * 100, color: "bg-destructive" };
    if (coverage <= 7) return { value: 100, color: "bg-warning" };
    return { value: 100, color: "bg-success" };
  };

  const criticalProducts = mockStockData.filter((p) => p.status === "Crítico").length;
  const attentionProducts = mockStockData.filter((p) => p.status === "Atenção").length;

  return (
    <div className="min-h-screen bg-background p-8 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Projeção de Estoque</h1>
          <p className="text-muted-foreground mt-1">
            Previsão inteligente de demanda e reabastecimento
          </p>
        </div>
        <div className="flex gap-3">
          <Select defaultValue="60">
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Histórico" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="30">30 dias</SelectItem>
              <SelectItem value="60">60 dias</SelectItem>
              <SelectItem value="90">90 dias</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <FileDown className="h-4 w-4 mr-2" />
            Exportar PDF
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 animate-slide-up">
        <Card className="shadow-card border-l-4 border-l-destructive">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Estoque Crítico</p>
                <h3 className="text-2xl font-bold text-foreground">{criticalProducts} SKUs</h3>
                <p className="text-xs text-muted-foreground mt-1">Reposição urgente</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-destructive" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card border-l-4 border-l-warning">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Requer Atenção</p>
                <h3 className="text-2xl font-bold text-foreground">{attentionProducts} SKUs</h3>
                <p className="text-xs text-muted-foreground mt-1">Planejar reposição</p>
              </div>
              <Clock className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card border-l-4 border-l-primary">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Valor de Reposição</p>
                <h3 className="text-2xl font-bold text-foreground">R$ 18.450</h3>
                <p className="text-xs text-muted-foreground mt-1">Investimento sugerido</p>
              </div>
              <TrendingDown className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card border-l-4 border-l-success">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Total de SKUs</p>
                <h3 className="text-2xl font-bold text-foreground">{mockStockData.length}</h3>
                <p className="text-xs text-muted-foreground mt-1">Em monitoramento</p>
              </div>
              <Package className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts */}
      <div className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
        <h2 className="text-xl font-semibold text-foreground mb-4">Alertas Automáticos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AlertCard
            icon={AlertTriangle}
            title="3 produtos em estoque crítico"
            description="Fone Bluetooth Premium ficará sem estoque em 2 dias. Ação imediata necessária."
            impact="Possível perda: R$ 8.500"
            variant="danger"
            action={{
              label: "Ver Produtos",
              onClick: () => console.log("View critical products"),
            }}
          />
          <AlertCard
            icon={Clock}
            title="Reposição atrasada detectada"
            description="Mouse Gamer RGB deveria ter sido reposto há 3 dias."
            impact="Perda de vendas: R$ 2.100"
            variant="warning"
            action={{
              label: "Planejar Compra",
              onClick: () => console.log("Plan purchase"),
            }}
          />
          <AlertCard
            icon={TrendingDown}
            title="Alta demanda inesperada"
            description="Carregador USB-C teve aumento de 40% nas vendas. Ajustar previsão."
            impact="Oportunidade: +R$ 3.200"
            variant="success"
            action={{
              label: "Ajustar Previsão",
              onClick: () => console.log("Adjust forecast"),
            }}
          />
          <AlertCard
            icon={Package}
            title="Produto parado há 30 dias"
            description="Hub USB 4 Portas tem estoque alto e vendas baixas. Considere promoção."
            impact="Capital parado: R$ 1.240"
            variant="info"
            action={{
              label: "Criar Promoção",
              onClick: () => console.log("Create promotion"),
            }}
          />
        </div>
      </div>

      {/* Stock Projection Table */}
      <Card className="shadow-card animate-slide-up" style={{ animationDelay: "0.2s" }}>
        <CardHeader>
          <CardTitle>Projeção de Estoque Completa</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>SKU</TableHead>
                <TableHead>Produto</TableHead>
                <TableHead className="text-right">Estoque</TableHead>
                <TableHead className="text-right">Vendas/Dia</TableHead>
                <TableHead className="text-right">Cobertura</TableHead>
                <TableHead className="text-right">Qtd. Sugerida</TableHead>
                <TableHead className="text-right">Data Limite</TableHead>
                <TableHead className="text-center">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockStockData.map((item) => {
                const progressData = getCoverageProgress(item.coverage);
                return (
                  <TableRow key={item.sku}>
                    <TableCell className="font-mono text-sm">{item.sku}</TableCell>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell className="text-right">{item.currentStock}</TableCell>
                    <TableCell className="text-right">{item.avgSales}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center gap-2">
                        <Progress value={progressData.value} className="h-2 w-16" />
                        <span className="text-sm font-medium">{item.coverage}d</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-bold text-primary">
                      {item.suggested}
                    </TableCell>
                    <TableCell className="text-right text-sm text-muted-foreground">
                      {new Date(item.deadline).toLocaleDateString("pt-BR")}
                    </TableCell>
                    <TableCell className="text-center">{getStatusBadge(item.status)}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <div className="mt-6 flex justify-end">
            <Button size="lg" className="gradient-primary">
              Gerar Lista de Reposição
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Footer Info */}
      <div className="text-center text-sm text-muted-foreground animate-slide-up" style={{ animationDelay: "0.3s" }}>
        <p>
          Algoritmo de previsão: Regressão Linear + Sazonalidade + Tendências • Histórico: 60 dias
        </p>
      </div>
    </div>
  );
};

export default Estoque;
