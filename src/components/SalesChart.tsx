import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ReferenceLine,
} from "recharts";

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
  const currencyFormatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  });

  const formatCurrency = (value: number) => currencyFormatter.format(value);

  const totalMeli = mockData.reduce((acc, item) => acc + item.meli, 0);
  const totalShopee = mockData.reduce((acc, item) => acc + item.shopee, 0);
  const totalCombined = totalMeli + totalShopee;
  const topDay = mockData.reduce((prev, current) =>
    current.meli + current.shopee > prev.meli + prev.shopee ? current : prev,
  );
  const averageDaily = Math.round(totalCombined / mockData.length);
  const channelGap = totalMeli - totalShopee;

  return (
    <Card className="shadow-card">
      <CardHeader className="space-y-1">
        <CardTitle className="text-lg font-semibold">Vendas por Dia</CardTitle>
        <CardDescription>
          Semana atual • {topDay.day} liderou com {formatCurrency(topDay.meli + topDay.shopee)}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Faturamento total
            </p>
            <p className="mt-2 text-2xl font-semibold text-primary">{formatCurrency(totalCombined)}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Mercado Livre {formatCurrency(totalMeli)} • Shopee {formatCurrency(totalShopee)}
            </p>
          </div>
          <div className="rounded-lg border border-accent/30 bg-gradient-to-br from-accent/10 via-background to-background p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Pico da semana
            </p>
            <p className="mt-2 text-2xl font-semibold text-foreground">
              {topDay.day} — {formatCurrency(topDay.meli + topDay.shopee)}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Meli {formatCurrency(topDay.meli)} • Shopee {formatCurrency(topDay.shopee)}
            </p>
          </div>
          <div className="rounded-lg border border-success/30 bg-success/5 p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Canal em destaque
            </p>
            <p className="mt-2 text-2xl font-semibold text-success">
              {channelGap >= 0
                ? `Mercado Livre +${formatCurrency(Math.abs(channelGap))}`
                : `Shopee +${formatCurrency(Math.abs(channelGap))}`}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              {channelGap >= 0 ? "frente à Shopee" : "frente ao Mercado Livre"}
            </p>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={mockData}
            margin={{
              top: 20,
              left: 0,
              right: 20,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient id="meliGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
                <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="shopeeGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(var(--success))" stopOpacity={0.4} />
                <stop offset="100%" stopColor="hsl(var(--success))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="4 8" stroke="hsl(var(--border))" vertical={false} />
            <XAxis
              dataKey="day"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickFormatter={(value) => formatCurrency(Number(value))}
              width={80}
              tickLine={false}
              axisLine={false}
            />
            <ReferenceLine
              y={averageDaily}
              stroke="hsl(var(--muted-foreground))"
              strokeDasharray="4 4"
              label={{
                value: `Média diária ${formatCurrency(averageDaily)}`,
                position: "insideTopRight",
                fill: "hsl(var(--muted-foreground))",
                fontSize: 11,
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                boxShadow: "0 10px 30px -12px rgba(0,0,0,0.25)",
              }}
              formatter={(value) => formatCurrency(Number(value))}
              labelStyle={{ fontWeight: 600 }}
            />
            <Legend
              verticalAlign="top"
              align="right"
              iconType="circle"
              wrapperStyle={{ paddingBottom: 16 }}
            />
            <Line
              type="monotone"
              dataKey="meli"
              stroke="hsl(var(--primary))"
              strokeWidth={3}
              name="Mercado Livre"
              dot={{ fill: "hsl(var(--primary))", r: 4 }}
              activeDot={{ r: 6, stroke: "hsl(var(--primary))", strokeWidth: 2 }}
              fill="url(#meliGradient)"
              connectNulls
            />
            <Line
              type="monotone"
              dataKey="shopee"
              stroke="hsl(var(--success))"
              strokeWidth={3}
              name="Shopee"
              dot={{ fill: "hsl(var(--success))", r: 4 }}
              activeDot={{ r: 6, stroke: "hsl(var(--success))", strokeWidth: 2 }}
              fill="url(#shopeeGradient)"
              connectNulls
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
