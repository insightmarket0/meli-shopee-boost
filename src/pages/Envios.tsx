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
  Filter,
  ArrowUpDown,
  Circle,
  Sparkles,
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
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [riskFilter, setRiskFilter] = useState<string>("Todos");
  const [curveFilter, setCurveFilter] = useState<string>("Todos");

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
        return (
          <Badge className="bg-destructive/10 text-destructive border-destructive/20 hover:bg-destructive/20">
            <Circle className="h-2 w-2 mr-1 fill-current" />
            {risk}
          </Badge>
        );
      case "Médio":
        return (
          <Badge className="bg-warning/10 text-warning border-warning/20 hover:bg-warning/20">
            <Circle className="h-2 w-2 mr-1 fill-current" />
            {risk}
          </Badge>
        );
      case "Baixo":
        return (
          <Badge className="bg-success/10 text-success border-success/20 hover:bg-success/20">
            <Circle className="h-2 w-2 mr-1 fill-current" />
            {risk}
          </Badge>
        );
      default:
        return <Badge variant="outline">{risk}</Badge>;
    }
  };

  const getCurveBadge = (curve: string) => {
    switch (curve) {
      case "A":
        return (
          <Badge className="bg-primary/10 text-primary border-primary/20 font-semibold">
            <Sparkles className="h-2.5 w-2.5 mr-1" />
            {curve}
          </Badge>
        );
      case "B":
        return (
          <Badge className="bg-muted text-muted-foreground border-muted-foreground/20">
            {curve}
          </Badge>
        );
      case "C":
        return (
          <Badge variant="outline" className="text-muted-foreground">
            {curve}
          </Badge>
        );
      default:
        return <Badge variant="outline">{curve}</Badge>;
    }
  };

  const toggleProductSelection = (sku: string) => {
    setSelectedProducts((prev) =>
      prev.includes(sku) ? prev.filter((s) => s !== sku) : [...prev, sku]
    );
  };

  const toggleSelectAll = () => {
    if (selectedProducts.length === filteredPlan.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(filteredPlan.map((p) => p.sku));
    }
  };

  const filteredPlan = mockShipmentPlan.filter((item) => {
    const matchesRisk = riskFilter === "Todos" || item.risk === riskFilter;
    const matchesCurve = curveFilter === "Todos" || item.curve === curveFilter;
    return matchesRisk && matchesCurve;
  });

  const totalCost = filteredPlan.reduce((sum, item) => {
    return sum + parseFloat(item.cost.replace("R$ ", "").replace(".", "").replace(",", "."));
  }, 0);

  const totalUnits = filteredPlan.reduce((sum, item) => sum + item.suggested, 0);
  
  const selectedCost = filteredPlan
    .filter((item) => selectedProducts.includes(item.sku))
    .reduce((sum, item) => {
      return sum + parseFloat(item.cost.replace("R$ ", "").replace(".", "").replace(",", "."));
    }, 0);

  const selectedUnits = filteredPlan
    .filter((item) => selectedProducts.includes(item.sku))
    .reduce((sum, item) => sum + item.suggested, 0);

  const highRiskCount = filteredPlan.filter((p) => p.risk === "Alto").length;
  const priorityACount = filteredPlan.filter((p) => p.curve === "A").length;

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
          <Card className="shadow-card animate-slide-up border-l-4 border-l-primary">
            <CardContent className="space-y-5 p-6">
              {/* Header */}
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-2xl font-bold text-foreground">Plano #PLN-2024-001</h2>
                    <Badge className="bg-amber-500/10 text-amber-700 border-amber-500/20 hover:bg-amber-500/20">
                      Rascunho
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Criado em {createdAtLabel}</p>
                </div>
                <Button className="gradient-primary shadow-md hover:shadow-lg transition-all">
                  <Check className="mr-2 h-4 w-4" />
                  Aprovar Plano
                </Button>
              </div>

              {/* Collection Window - Highlighted */}
              <div className="rounded-xl border-2 border-primary/30 bg-primary/5 p-4">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-primary" />
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                      Janela de Coleta
                    </p>
                    <Input
                      type="date"
                      value={collectionDate}
                      onChange={(e) => setCollectionDate(e.target.value)}
                      className="h-9 max-w-[200px] border-primary/40 bg-background font-semibold"
                    />
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Previsão</p>
                    <p className="text-lg font-bold text-primary">{formattedCollectionDate}</p>
                  </div>
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    SKUs
                  </p>
                  <p className="text-2xl font-bold text-foreground">{totalSkus}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    Unidades
                  </p>
                  <p className="text-2xl font-bold text-foreground">{totalUnits}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    Custo Total
                  </p>
                  <p className="text-2xl font-bold text-success">
                    R$ {(totalCost / 1000).toFixed(1)}k
                  </p>
                </div>
              </div>

              {/* Progress Stepper */}
              <div className="flex items-center gap-2 pt-2">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white">
                    <Check className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-medium text-foreground">Criação</span>
                </div>
                <div className="h-[2px] flex-1 bg-gradient-to-r from-primary to-muted" />
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-muted text-muted-foreground">
                    2
                  </div>
                  <span className="text-sm text-muted-foreground">Aprovação</span>
                </div>
                <div className="h-[2px] flex-1 bg-muted" />
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-muted text-muted-foreground">
                    3
                  </div>
                  <span className="text-sm text-muted-foreground">Execução</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card animate-slide-up border-l-4 border-l-success">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-bold text-foreground">Próxima Coleta</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3 rounded-lg border border-success/20 bg-success/5 p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-2xl font-bold text-foreground">Hoje</p>
                    <p className="text-sm text-muted-foreground">08:00 - 10:00</p>
                  </div>
                  <Badge className="bg-success/10 text-success border-success/20">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    Confirmado
                  </Badge>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Store className="h-4 w-4 text-primary" />
                    <span>Mercado Livre - Loja Principal</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Package className="h-4 w-4 text-primary" />
                    <span className="font-semibold text-foreground">120 unidades</span>
                  </div>
                </div>

                <div className="space-y-1.5 pt-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-muted-foreground">Capacidade</span>
                    <span className="text-foreground">35/50 SKUs</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div className="h-full w-[70%] rounded-full bg-gradient-to-r from-success to-warning transition-all" />
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Edit3 className="h-3.5 w-3.5 mr-1" />
                  Editar
                </Button>
                <Button size="sm" className="flex-1 bg-success text-success-foreground hover:bg-success/90">
                  <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
                  Concluir
                </Button>
              </div>

              <div className="pt-2 border-t">
                <p className="text-xs text-muted-foreground">
                  <AlertCircle className="h-3 w-3 inline mr-1" />
                  Próxima: Amanhã 09:00 - 11:00
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Summary Cards - Compact & Visual */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 animate-slide-up">
          <Card className="shadow-sm border-l-4 border-l-primary hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Package className="h-5 w-5 text-primary" />
                  <span className="text-xs text-success font-semibold">+12%</span>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium">Total Unidades</p>
                  <p className="text-2xl font-bold text-foreground">{totalUnits}</p>
                </div>
                <div className="h-1 bg-muted rounded-full overflow-hidden">
                  <div className="h-full w-[75%] bg-primary rounded-full" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-l-4 border-l-success hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <TrendingUp className="h-5 w-5 text-success" />
                  <span className="text-xs text-success font-semibold">+8%</span>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium">Custo Total</p>
                  <p className="text-2xl font-bold text-success">
                    R$ {(totalCost / 1000).toFixed(1)}k
                  </p>
                </div>
                <div className="h-1 bg-muted rounded-full overflow-hidden">
                  <div className="h-full w-[60%] bg-success rounded-full" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-l-4 border-l-destructive hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <AlertCircle className="h-5 w-5 text-destructive" />
                  {highRiskCount > 0 && (
                    <Badge className="h-5 px-1.5 text-[10px] bg-destructive">Alto</Badge>
                  )}
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium">Risco Alto</p>
                  <p className="text-2xl font-bold text-foreground">{highRiskCount}</p>
                </div>
                <div className="h-1 bg-muted rounded-full overflow-hidden">
                  <div className="h-full w-[90%] bg-destructive rounded-full" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-l-4 border-l-primary hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <Badge className="h-5 px-1.5 text-[10px] bg-primary">A</Badge>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium">Curva A</p>
                  <p className="text-2xl font-bold text-foreground">{priorityACount}</p>
                </div>
                <div className="h-1 bg-muted rounded-full overflow-hidden">
                  <div className="h-full w-[100%] bg-primary rounded-full" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Shipment Plan Table */}
        <Card className="shadow-card animate-slide-up">
          <CardHeader>
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <CardTitle className="text-xl font-bold">Plano de Envio Sugerido</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  Previsão baseada em 60 dias + sazonalidade
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm">
                  <FileText className="h-4 w-4 mr-2" />
                  Exportar
                </Button>
                <Button variant="outline" size="sm">
                  <Bell className="h-4 w-4 mr-2" />
                  Lembrete
                </Button>
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2 pt-4">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium text-muted-foreground">Filtros:</span>
              </div>
              <select
                value={riskFilter}
                onChange={(e) => setRiskFilter(e.target.value)}
                className="text-sm border border-input rounded-md px-3 py-1 bg-background hover:bg-accent transition-colors"
              >
                <option value="Todos">Todos os Riscos</option>
                <option value="Alto">Alto Risco</option>
                <option value="Médio">Médio Risco</option>
                <option value="Baixo">Baixo Risco</option>
              </select>
              <select
                value={curveFilter}
                onChange={(e) => setCurveFilter(e.target.value)}
                className="text-sm border border-input rounded-md px-3 py-1 bg-background hover:bg-accent transition-colors"
              >
                <option value="Todos">Todas as Curvas</option>
                <option value="A">Curva A</option>
                <option value="B">Curva B</option>
                <option value="C">Curva C</option>
              </select>
              {(riskFilter !== "Todos" || curveFilter !== "Todos") && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setRiskFilter("Todos");
                    setCurveFilter("Todos");
                  }}
                  className="text-xs"
                >
                  Limpar filtros
                </Button>
              )}
            </div>
          </CardHeader>

          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="w-12">
                      <input
                        type="checkbox"
                        checked={selectedProducts.length === filteredPlan.length && filteredPlan.length > 0}
                        onChange={toggleSelectAll}
                        className="rounded border-input"
                      />
                    </TableHead>
                    <TableHead className="font-semibold">SKU</TableHead>
                    <TableHead className="font-semibold">Produto</TableHead>
                    <TableHead className="text-right font-semibold">
                      <div className="flex items-center justify-end gap-1">
                        Estoque
                        <ArrowUpDown className="h-3 w-3" />
                      </div>
                    </TableHead>
                    <TableHead className="text-right font-semibold">Vendas/Dia</TableHead>
                    <TableHead className="text-right font-semibold">Cobertura</TableHead>
                    <TableHead className="text-right font-semibold text-primary">Sugerido</TableHead>
                    <TableHead className="text-right font-semibold">Custo</TableHead>
                    <TableHead className="text-center font-semibold">Curva</TableHead>
                    <TableHead className="text-center font-semibold">Risco</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPlan.map((item, index) => (
                    <TableRow
                      key={item.sku}
                      className={`
                        transition-colors hover:bg-muted/50
                        ${index % 2 === 0 ? "bg-background" : "bg-muted/20"}
                        ${item.risk === "Alto" ? "border-l-4 border-l-destructive/40" : ""}
                        ${selectedProducts.includes(item.sku) ? "bg-primary/5" : ""}
                      `}
                    >
                      <TableCell>
                        <input
                          type="checkbox"
                          checked={selectedProducts.includes(item.sku)}
                          onChange={() => toggleProductSelection(item.sku)}
                          className="rounded border-input"
                        />
                      </TableCell>
                      <TableCell className="font-mono text-xs text-muted-foreground">
                        {item.sku}
                      </TableCell>
                      <TableCell className="font-medium text-sm">{item.name}</TableCell>
                      <TableCell className="text-right text-sm">{item.currentStock}</TableCell>
                      <TableCell className="text-right text-sm font-semibold">
                        {item.avgSales}
                      </TableCell>
                      <TableCell className="text-right text-xs text-muted-foreground">
                        {item.coverage}
                      </TableCell>
                      <TableCell className="text-right text-sm font-bold text-primary">
                        {item.suggested}
                      </TableCell>
                      <TableCell className="text-right text-sm font-semibold">
                        {item.cost}
                      </TableCell>
                      <TableCell className="text-center">{getCurveBadge(item.curve)}</TableCell>
                      <TableCell className="text-center">{getRiskBadge(item.risk)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Footer with Selection Summary */}
            <div className="border-t bg-muted/30 p-4">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="space-y-1">
                  {selectedProducts.length > 0 ? (
                    <>
                      <p className="text-sm font-semibold text-foreground">
                        {selectedProducts.length} produtos selecionados
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {selectedUnits} unidades • R${" "}
                        {selectedCost.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-sm font-semibold text-foreground">
                        {filteredPlan.length} produtos no plano
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {totalUnits} unidades • R${" "}
                        {totalCost.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                      </p>
                    </>
                  )}
                </div>
                <Button
                  size="lg"
                  className="gradient-success shadow-md hover:shadow-lg transition-all"
                  disabled={filteredPlan.length === 0}
                >
                  <Check className="mr-2 h-4 w-4" />
                  Aprovar Plano de Envio
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Envios;
