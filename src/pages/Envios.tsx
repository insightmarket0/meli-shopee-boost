import { useState } from "react";
import { Calendar, Package, TrendingUp, AlertCircle, FileText, Bell } from "lucide-react";
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
import { Label } from "@/components/ui/label";

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
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

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
    <div className="min-h-screen bg-background p-8 space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Projeção de Envios (Full)</h1>
        <p className="text-muted-foreground mt-1">
          Preveja demanda e otimize seus envios para Fulfillment
        </p>
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

      {/* Date Selection */}
      <Card className="shadow-card animate-slide-up" style={{ animationDelay: "0.1s" }}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Definir Janela de Envio
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div className="space-y-2">
              <Label htmlFor="start-date">Data Início</Label>
              <Input
                id="start-date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="end-date">Data Fim</Label>
              <Input
                id="end-date"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <Button className="gradient-primary">
              Gerar Previsão com IA
            </Button>
          </div>
        </CardContent>
      </Card>

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
  );
};

export default Envios;
