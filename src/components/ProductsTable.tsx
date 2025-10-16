import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const mockProducts = [
  { sku: "PROD-001", name: "Fone Bluetooth Premium", sales: 124, curve: "A", revenue: "R$ 15.480,00" },
  { sku: "PROD-002", name: "Carregador USB-C 65W", sales: 98, curve: "A", revenue: "R$ 8.820,00" },
  { sku: "PROD-003", name: "Mouse Gamer RGB", sales: 87, curve: "A", revenue: "R$ 7.830,00" },
  { sku: "PROD-004", name: "Teclado Mecânico", sales: 64, curve: "B", revenue: "R$ 9.600,00" },
  { sku: "PROD-005", name: "Webcam Full HD", sales: 52, curve: "B", revenue: "R$ 6.240,00" },
  { sku: "PROD-006", name: "Hub USB 4 Portas", sales: 38, curve: "C", revenue: "R$ 1.520,00" },
];

export function ProductsTable() {
  const getCurveBadgeVariant = (curve: string) => {
    switch (curve) {
      case "A":
        return "default";
      case "B":
        return "secondary";
      case "C":
        return "outline";
      default:
        return "outline";
    }
  };

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Produtos Mais Vendidos - Curva ABC</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>SKU</TableHead>
              <TableHead>Produto</TableHead>
              <TableHead className="text-right">Vendas</TableHead>
              <TableHead className="text-right">Receita</TableHead>
              <TableHead className="text-center">Curva</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockProducts.map((product) => (
              <TableRow key={product.sku}>
                <TableCell className="font-mono text-sm">{product.sku}</TableCell>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell className="text-right">{product.sales}</TableCell>
                <TableCell className="text-right font-semibold">{product.revenue}</TableCell>
                <TableCell className="text-center">
                  <Badge variant={getCurveBadgeVariant(product.curve)}>
                    {product.curve}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
