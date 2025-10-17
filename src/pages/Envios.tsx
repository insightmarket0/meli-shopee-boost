import { useState } from "react";
import {
  Calendar,
  Package,
  TrendingUp,
  AlertCircle,
  FileText,
  Bell,
  Check,
  Store,
  Edit3,
  CheckCircle2,
} from "lucide-react";
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
import { Input } from "@/components/ui/input";

const mockShipmentPlan = [
  {
    sku: "PROD-001",
    name: "Fone Bluetooth Premium",
    currentStock: 45,
    avgSales: 18,
    coverage: "2.5 dias",
    suggested: 150,
    cost: "R$ 4.500,00",
    curve: "A",
    risk: "Alto",
  },
  {
    sku: "PROD-002",
    name: "Carregador USB-C 65W",
    currentStock: 82,
    avgSales: 14,
    coverage: "5.8 dias",
    suggested: 120,
    cost: "R$ 2.400,00",
    curve: "A",
    risk: "Médio",
  },
  {
    sku: "PROD-003",
    name: "Mouse Gamer RGB",
    currentStock: 38,
    avgSales: 12,
    coverage: "3.1 dias",
    suggested: 100,
    cost: "R$ 2.800,00",
    curve: "A",
    risk: "Alto",
  },
  {
    sku: "PROD-004",
    name: "Teclado Mecânico",
    currentStock: 95,
    avgSales: 9,
    coverage: "10.5 dias",
    suggested: 75,
    cost: "R$ 3.750,00",
    curve: "B",
    risk: "Baixo",
  },
  {
    sku: "PROD-005",
    name: "Webcam Full HD",
    currentStock: 67,
    avgSales: 7,
    coverage: "9.5 dias",
    suggested: 60,
    cost: "R$ 1.800,00",
    curve: "B",
    risk: "Baixo",
  },
];

const Envios = () => {
  const [collectionDate, setCollectionDate] = useState("2024-10-15");

  const createdAtLabel = new Date("2024-10-11T00:00:00").toLocaleDateString("pt-BR");
  const totalSkus = mockShipmentPlan.length;
  const formattedCollectionDate = collectionDate
    ? (() => {
        const [year, month, day] = collectionDate.split("-");
        if (!year || !month || !day) {
          return "--/--";
        }
        return `${day}/${month}`;
      })()
    : "--/--";

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case "Alto":
        return <Badge className="bg-destructive">{risk}</Badge>;
      case "Médio":
        return <Badge className="bg-warning">{risk}</Badge>;
      case "Baixo":
        return <Badge className="bg-success">{risk}</Badge>;
      default:
        return <Badge variant="outline">{risk}</Badge>;
    }
  };

  const getCurveBadge = (curve: string) => {
    switch (curve) {
      case "A":
        return <Badge variant="default">{curve}</Badge>;
      case "B":
        return <Badge variant="secondary">{curve}</Badge>;
      case "C":
        return <Badge variant="outline">{curve}</Badge>;
      default:
        return <Badge variant="outline">{curve}</Badge>;
    }
  };

  const totalCost = mockShipmentPlan.reduce((sum, item) => {
    return sum + parseFloat(item.cost.replace("R$ ", "").replace(".", "").replace(",", "."));
  }, 0);

  const totalUnits = mockShipmentPlan.reduce((sum, item) => sum + item.suggested, 0);

  return (
    <div className="min-h-screen bg-background p-6 md:p-10">
      <div className="mx-auto max-w-6xl space-y-8 animate-fade-in">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Projeção de Envios (Full)</h1>
          <p className="text-muted-foreground mt-1">
            Preveja demanda e otimize seus envios para Fulfillment
          </p>
        </div>

        {/* Plan Overview */}
        <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
          <Card
            className="shadow-card animate-slide-up border border-border/60 bg-gradient-to-br from-background via-background to-muted/40"
            style={{ animationDelay: "0.05s" }}
          >
            <CardContent className="space-y-6 p-6 md:p-8">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-2xl font-semibold leading-tight text-foreground md:text-[28px]">
                      Plano #PLN-2024-001
                    </h2>
                    <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">Rascunho</Badge>
                  </div>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                        Criado em
                      </span>
                      <span className="text-base font-semibold text-foreground">{createdAtLabel}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                        Total SKUs
                      </span>
                      <span className="text-base font-semibold text-foreground">{totalSkus}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                        Custo Estimado
                      </span>
                      <span className="text-base font-semibold text-foreground">
                        R$ {totalCost.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                        Janela de Coleta
                      </span>
                      <div className="rounded-xl border border-primary/30 bg-background/80 p-3 shadow-sm">
                        <div className="flex flex-col gap-2">
                          <Input
                            type="date"
                            value={collectionDate}
                            onChange={(e) => setCollectionDate(e.target.value)}
                            className="h-10 rounded-lg border border-primary/40 bg-background text-sm font-semibold text-foreground shadow-inner"
                          />
                          <span className="text-xs text-muted-foreground">
                            Visualização: {formattedCollectionDate}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex w-full flex-col gap-2.5 lg:w-auto lg:min-w-[220px]">
                  <Button
                    size="sm"
                    className="gradient-primary w-full px-6 py-2 text-sm font-semibold shadow-md"
                  >
                    <Check className="mr-2 h-4 w-4" />
                    Aprovar Plano
                  </Button>
                  <span className="text-xs text-muted-foreground text-right">
                    Ações adicionais disponíveis em breve
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-2 text-sm sm:flex-row sm:items-center sm:gap-5">
                <div className="flex items-center gap-2 text-foreground">
                  <span className="h-2 w-2 rounded-full bg-primary" />
                  <span className="font-medium">Criação</span>
                </div>
                <div className="hidden sm:flex h-px flex-1 bg-muted-foreground/20" />
                <div className="flex items-center gap-2 text-muted-foreground">
                  <span className="h-2 w-2 rounded-full bg-muted-foreground/30" />
                  <span>Aprovação</span>
                </div>
                <div className="hidden sm:flex h-px flex-1 bg-muted-foreground/20" />
                <div className="flex items-center gap-2 text-muted-foreground">
                  <span className="h-2 w-2 rounded-full bg-muted-foreground/30" />
                  <span>Execução</span>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-card animate-slide-up lg:min-h-full" style={{ animationDelay: "0.1s" }}>
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-foreground">Próxima Coleta</CardTitle>
              <p className="text-xs text-muted-foreground">
                Acompanhe as coletas aprovadas e confirme a execução
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3.5 rounded-2xl border border-border/50 bg-background/90 p-4 shadow-sm">
                <div className="flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm text-foreground">
                      <span className="text-lg font-semibold">Hoje</span>
                      <span className="text-muted-foreground">08:00 - 10:00</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-medium text-amber-600">
                      <AlertCircle className="h-3.5 w-3.5" />
                      <span>Amanhã: 09:00 - 11:00</span>
                    </div>
                  </div>
                  <Badge className="rounded-full border-none bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                    Confirmado
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <span className="flex h-2 w-2 rounded-full bg-amber-500" />
                  <span>Plano aprovado em 14/10</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Store className="h-4 w-4 text-primary" />
                  <span>Mercado Livre - Loja Principal</span>
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground">
                    <span>Capacidade</span>
                    <span className="text-foreground">35/50</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted">
                    <div className="h-2 w-[70%] rounded-full bg-amber-500" />
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <TrendingUp className="h-3.5 w-3.5 text-primary" />
                    <span>120 unidades planejadas</span>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-3 pt-1 text-sm font-medium">
                  <button className="flex items-center gap-2 text-primary transition-colors hover:text-primary/80">
                    <Edit3 className="h-4 w-4" />
                    Editar
                  </button>
                  <button className="flex items-center gap-2 text-emerald-600 transition-colors hover:text-emerald-500">
                    <CheckCircle2 className="h-4 w-4" />
                    Concluir
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 animate-slide-up">
          <Card className="shadow-card border-l-4 border-l-primary">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Total de Unidades</p>
                  <h3 className="text-2xl font-bold text-foreground">{totalUnits}</h3>
                </div>
                <Package className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card border-l-4 border-l-success">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Custo Total</p>
                  <h3 className="text-2xl font-bold text-foreground">
                    R$ {totalCost.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </h3>
                </div>
                <TrendingUp className="h-8 w-8 text-success" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card border-l-4 border-l-warning">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Produtos em Risco</p>
                  <h3 className="text-2xl font-bold text-foreground">3</h3>
                </div>
                <AlertCircle className="h-8 w-8 text-warning" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card border-l-4 border-l-primary">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Prioridade A</p>
                  <h3 className="text-2xl font-bold text-foreground">3 SKUs</h3>
                </div>
                <Calendar className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Shipment Plan Table */}
        <Card className="shadow-card animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Plano de Envio Sugerido</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <FileText className="h-4 w-4 mr-2" />
                Exportar PDF
              </Button>
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                Criar Lembrete
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>SKU</TableHead>
                  <TableHead>Produto</TableHead>
                  <TableHead className="text-right">Estoque Atual</TableHead>
                  <TableHead className="text-right">Vendas/Dia</TableHead>
                  <TableHead className="text-right">Cobertura</TableHead>
                  <TableHead className="text-right">Qtd. Sugerida</TableHead>
                  <TableHead className="text-right">Custo</TableHead>
                  <TableHead className="text-center">Curva</TableHead>
                  <TableHead className="text-center">Risco</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockShipmentPlan.map((item) => (
                  <TableRow key={item.sku}>
                    <TableCell className="font-mono text-sm">{item.sku}</TableCell>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell className="text-right">{item.currentStock}</TableCell>
                    <TableCell className="text-right">{item.avgSales}</TableCell>
                    <TableCell className="text-right text-muted-foreground">{item.coverage}</TableCell>
                    <TableCell className="text-right font-bold text-primary">
                      {item.suggested}
                    </TableCell>
                    <TableCell className="text-right font-semibold">{item.cost}</TableCell>
                    <TableCell className="text-center">{getCurveBadge(item.curve)}</TableCell>
                    <TableCell className="text-center">{getRiskBadge(item.risk)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="mt-6 flex justify-between items-center p-4 bg-muted rounded-lg">
              <div className="text-sm text-muted-foreground">
                Previsão baseada em histórico de 60 dias + sazonalidade
              </div>
              <Button size="lg" className="gradient-success">
                Aprovar Plano de Envio
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Envios;
