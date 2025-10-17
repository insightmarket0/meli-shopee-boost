import {
  Package,
  AlertTriangle,
  TrendingDown,
  TrendingUp,
  Clock,
  FileDown,
  CalendarDays,
  Flame,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
import { cn } from "@/lib/utils";

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

  const getCoverageIndicator = (coverage: number) => {
    if (coverage <= 3) {
      return {
        value: Math.max((coverage / 3) * 100, 8),
        indicatorClass: "bg-destructive",
        trackClass: "bg-destructive/20",
        badgeClass: "bg-destructive/10 text-destructive border border-destructive/20",
        badgeText: "Ruptura <3d",
      };
    }
    if (coverage <= 7) {
      return {
        value: Math.min((coverage / 7) * 100, 100),
        indicatorClass: "bg-warning",
        trackClass: "bg-warning/20",
        badgeClass: "bg-warning/10 text-warning border border-warning/20",
        badgeText: "Reposição 7d",
      };
    }
    if (coverage <= 15) {
      return {
        value: Math.min((coverage / 15) * 100, 100),
        indicatorClass: "bg-success",
        trackClass: "bg-success/20",
        badgeClass: "bg-success/10 text-success border border-success/20",
        badgeText: "Saudável",
      };
    }
    return {
      value: 100,
      indicatorClass: "bg-muted-foreground/70",
      trackClass: "bg-muted/60",
      badgeClass: "bg-muted/70 text-muted-foreground border border-muted",
      badgeText: "Estoque alto",
    };
  };

  const getRowTone = (status: string) => {
    switch (status) {
      case "Crítico":
        return "border-l-4 border-destructive/60 bg-destructive/5 hover:bg-destructive/10";
      case "Atenção":
        return "border-l-4 border-warning/60 bg-warning/5 hover:bg-warning/10";
      case "Excesso":
        return "border-l-4 border-secondary/60 bg-secondary/30 hover:bg-secondary/40";
      default:
        return "border-l-4 border-primary/40 bg-card hover:bg-primary/5";
    }
  };

  const getSuggestedClass = (status: string) => {
    switch (status) {
      case "Crítico":
        return "text-destructive";
      case "Atenção":
        return "text-warning";
      case "Excesso":
        return "text-muted-foreground line-through";
      default:
        return "text-primary";
    }
  };

  const capitalizeWords = (value: string) =>
    value
      .split(" ")
      .map((word) =>
        word
          .split("-")
          .map((segment) => (segment ? segment.charAt(0).toUpperCase() + segment.slice(1) : segment))
          .join("-"),
      )
      .join(" ");

  const longDateFormatter = new Intl.DateTimeFormat("pt-BR", {
    weekday: "short",
    day: "2-digit",
    month: "long",
  });
  const deadlineFormatter = new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
  });
  const unitsFormatter = new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 0 });

  const formatDeadline = (deadline: string) => capitalizeWords(deadlineFormatter.format(new Date(deadline)));

  const criticalProducts = mockStockData.filter((p) => p.status === "Crítico").length;
  const attentionProducts = mockStockData.filter((p) => p.status === "Atenção").length;
  const urgentRestocks = mockStockData.filter((item) => item.coverage <= 3).length;
  const moderateRestocks = mockStockData.filter((item) => item.coverage > 3 && item.coverage <= 7).length;
  const averageCoverage =
    mockStockData.reduce((acc, item) => acc + item.coverage, 0) / mockStockData.length;
  const soonestStockout = mockStockData.reduce(
    (prev, current) => (current.coverage < prev.coverage ? current : prev),
    mockStockData[0],
  );
  const nextDeadlineProduct = mockStockData.reduce(
    (prev, current) =>
      new Date(current.deadline) < new Date(prev.deadline) ? current : prev,
    mockStockData[0],
  );
  const highlightRestock = mockStockData.reduce(
    (prev, current) => (current.suggested > prev.suggested ? current : prev),
    mockStockData[0],
  );
  const totalSuggestedUnits = mockStockData.reduce((acc, item) => acc + item.suggested, 0);
  const formattedAverageCoverage = averageCoverage.toFixed(1).replace(".", ",");
  const formattedNextDeadline = capitalizeWords(
    longDateFormatter.format(new Date(nextDeadlineProduct.deadline)),
  );
  const formattedTotalSuggested = unitsFormatter.format(totalSuggestedUnits);

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
          <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
            <div className="space-y-1">
              <CardTitle>Projeção de Estoque Completa</CardTitle>
              <CardDescription>
                {criticalProducts} SKUs críticos • {attentionProducts} em atenção • Próxima ruptura{" "}
                {formattedNextDeadline}
              </CardDescription>
            </div>
            <Badge
              variant="outline"
              className="self-start rounded-full border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary"
            >
              Atualizado há 1 hora
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-destructive/25 bg-destructive/5 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                  <Flame className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-semibold uppercase tracking-wide text-destructive/80">
                    Ruptura iminente
                  </p>
                  <p className="text-sm font-semibold text-destructive">
                    {urgentRestocks} SKUs em menos de 3 dias
                  </p>
                  <p className="text-xs text-destructive/70">{soonestStockout.name}</p>
                </div>
              </div>
            </div>
            <div className="rounded-xl border border-primary/25 bg-primary/5 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <CalendarDays className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-semibold uppercase tracking-wide text-primary/80">
                    Próxima ruptura
                  </p>
                  <p className="text-sm font-semibold text-primary">{formattedNextDeadline}</p>
                  <p className="text-xs text-primary/70">{nextDeadlineProduct.name}</p>
                </div>
              </div>
            </div>
            <div className="rounded-xl border border-success/25 bg-success/5 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-success/10 text-success">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-semibold uppercase tracking-wide text-success/80">
                    Reposição sugerida
                  </p>
                  <p className="text-sm font-semibold text-success">
                    {formattedTotalSuggested} unidades
                  </p>
                  <p className="text-xs text-success/70">
                    Cobertura média de {formattedAverageCoverage} dias • {moderateRestocks} SKUs em observação
                  </p>
                </div>
              </div>
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>SKU</TableHead>
                <TableHead>Produto</TableHead>
                <TableHead className="text-right">Estoque</TableHead>
                <TableHead className="text-right">Vendas/Dia</TableHead>
                <TableHead className="text-right">Cobertura (dias)</TableHead>
                <TableHead className="text-right">Qtd. Sugerida</TableHead>
                <TableHead className="text-right">Data Limite</TableHead>
                <TableHead className="text-center">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockStockData.map((item) => {
                const coverageIndicator = getCoverageIndicator(item.coverage);
                return (
                  <TableRow key={item.sku} className={cn("transition-all", getRowTone(item.status))}>
                    <TableCell className="font-mono text-sm">{item.sku}</TableCell>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell className="text-right">{item.currentStock}</TableCell>
                    <TableCell className="text-right">{item.avgSales}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex flex-col items-end gap-2">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-foreground">
                            {item.coverage}d
                          </span>
                          <Badge
                            variant="outline"
                            className={cn(
                              "px-2 py-0.5 text-[11px] font-semibold",
                              coverageIndicator.badgeClass,
                            )}
                          >
                            {coverageIndicator.badgeText}
                          </Badge>
                        </div>
                        <Progress
                          value={coverageIndicator.value}
                          className={cn("h-2 w-28", coverageIndicator.trackClass)}
                          indicatorClassName={coverageIndicator.indicatorClass}
                        />
                      </div>
                    </TableCell>
                    <TableCell
                      className={cn(
                        "text-right text-base font-semibold",
                        getSuggestedClass(item.status),
                      )}
                    >
                      {unitsFormatter.format(item.suggested)}
                    </TableCell>
                    <TableCell className="text-right text-sm text-muted-foreground">
                      {formatDeadline(item.deadline)}
                    </TableCell>
                    <TableCell className="text-center">{getStatusBadge(item.status)}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3 rounded-lg border border-primary/20 bg-primary/5 px-4 py-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Package className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-primary/70">
                  Maior reposição sugerida
                </p>
                <p className="text-sm font-semibold text-primary">
                  {highlightRestock.name} • {unitsFormatter.format(highlightRestock.suggested)} unid
                  até {formatDeadline(highlightRestock.deadline)}
                </p>
              </div>
            </div>
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
