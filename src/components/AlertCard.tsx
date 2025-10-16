import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface AlertCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  impact?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  variant: "info" | "success" | "warning" | "danger";
}

export function AlertCard({ icon: Icon, title, description, impact, action, variant }: AlertCardProps) {
  const variantStyles = {
    info: "border-l-4 border-l-primary bg-primary/5",
    success: "border-l-4 border-l-success bg-success/5",
    warning: "border-l-4 border-l-warning bg-warning/5",
    danger: "border-l-4 border-l-destructive bg-destructive/5",
  };

  const iconStyles = {
    info: "text-primary",
    success: "text-success",
    warning: "text-warning",
    danger: "text-destructive",
  };

  return (
    <Card className={`shadow-card ${variantStyles[variant]}`}>
      <CardContent className="p-4">
        <div className="flex gap-3">
          <div className={`mt-0.5 ${iconStyles[variant]}`}>
            <Icon className="h-5 w-5" />
          </div>
          <div className="flex-1 space-y-1">
            <h4 className="font-semibold text-sm text-foreground">{title}</h4>
            <p className="text-sm text-muted-foreground">{description}</p>
            {impact && (
              <p className="text-xs font-medium text-foreground mt-1">
                💰 Impacto: {impact}
              </p>
            )}
            {action && (
              <Button
                size="sm"
                variant="outline"
                onClick={action.onClick}
                className="mt-2 h-8 text-xs"
              >
                {action.label}
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
