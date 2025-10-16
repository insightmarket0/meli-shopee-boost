import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const mockData = [
  { day: "Seg", meli: 4200, shopee: 2800 },
  { day: "Ter", meli: 5100, shopee: 3200 },
  { day: "Qua", meli: 4800, shopee: 2900 },
  { day: "Qui", meli: 6300, shopee: 4100 },
  { day: "Sex", meli: 7200, shopee: 4800 },
  { day: "Sáb", meli: 8100, shopee: 5400 },
  { day: "Dom", meli: 6900, shopee: 4600 },
];

export function SalesChart() {
  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Vendas por Dia</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={mockData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="day"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <YAxis
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickFormatter={(value) => `R$${value}`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
              formatter={(value) => `R$ ${value}`}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="meli"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              name="Mercado Livre"
              dot={{ fill: "hsl(var(--primary))" }}
            />
            <Line
              type="monotone"
              dataKey="shopee"
              stroke="hsl(var(--success))"
              strokeWidth={2}
              name="Shopee"
              dot={{ fill: "hsl(var(--success))" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
