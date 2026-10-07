import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utilities/cn";

const badgeVariants = cva(
  "inline-flex items-center rounded-none border-2 px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary/15 text-primary border-primary/20",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground",
        destructive:
          "border-transparent bg-destructive/15 text-destructive border-destructive/30",
        outline: "text-foreground border-border",
        high: "border-transparent bg-rose-500/15 text-rose-400 border-rose-500/30",
        medium: "border-transparent bg-amber-500/15 text-amber-400 border-amber-500/30",
        low: "border-transparent bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
        cyan: "border-transparent bg-cyan-500/15 text-cyan-400 border-cyan-500/30",
        indigo: "border-transparent bg-indigo-500/15 text-indigo-400 border-indigo-500/30",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
