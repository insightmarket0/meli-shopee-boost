import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface KPICardProps {
  title: string;
  value: string;
  subtitle?: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  icon: LucideIcon;
  variant?: "default" | "success" | "danger" | "warning";
}

export function KPICard({ title, value, subtitle, trend, icon: Icon, variant = "default" }: KPICardProps) {
  const variantStyles = {
    default: "border-l-4 border-l-primary",
    success: "border-l-4 border-l-success",
    danger: "border-l-4 border-l-destructive",
    warning: "border-l-4 border-l-warning",
  };

  const iconStyles = {
    default: "bg-primary/10 text-primary",
    success: "bg-success/10 text-success",
    danger: "bg-destructive/10 text-destructive",
    warning: "bg-warning/10 text-warning",
  };

  return (
    <Card className={`shadow-card hover:shadow-elevated transition-shadow ${variantStyles[variant]}`}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
            <h3 className="text-2xl font-bold text-foreground mb-1">{value}</h3>
            {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
            {trend && (
              <div className="mt-2 flex items-center gap-1">
                <span
                  className={`text-xs font-semibold ${
                    trend.isPositive ? "text-success" : "text-destructive"
                  }`}
                >
                  {trend.isPositive ? "↑" : "↓"} {trend.value}
                </span>
                <span className="text-xs text-muted-foreground">vs. período anterior</span>
              </div>
            )}
          </div>
          <div className={`rounded-lg p-3 ${iconStyles[variant]}`}>
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
