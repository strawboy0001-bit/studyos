import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utilities/cn";

export interface LoadingStateProps {
  type?: "cards" | "list" | "page" | "table";
  count?: number;
  className?: string;
}

export function LoadingState({
  type = "cards",
  count = 3,
  className,
}: LoadingStateProps) {
  if (type === "page") {
    return (
      <div className={cn("space-y-6 w-full animate-pulse", className)}>
        <div className="space-y-2">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-96" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Skeleton className="h-32 rounded-xl" />
          <Skeleton className="h-32 rounded-xl" />
          <Skeleton className="h-32 rounded-xl" />
        </div>
        <Skeleton className="h-72 rounded-xl w-full" />
      </div>
    );
  }

  if (type === "list") {
    return (
      <div className={cn("space-y-3 w-full", className)}>
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="flex items-center space-x-4 rounded-xl border border-border/60 bg-card/60 p-4"
          >
            <Skeleton className="h-10 w-10 rounded-lg" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-3 w-1/2" />
            </div>
            <Skeleton className="h-6 w-16 rounded-full" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full",
        className
      )}
    >
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="flex flex-col justify-between space-y-4 rounded-xl border border-border/60 bg-card/60 p-5"
        >
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-5 w-14 rounded-full" />
            </div>
            <Skeleton className="h-5 w-4/5" />
            <Skeleton className="h-3.5 w-full" />
            <Skeleton className="h-3.5 w-2/3" />
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-border/40">
            <Skeleton className="h-3.5 w-20" />
            <Skeleton className="h-8 w-20 rounded-md" />
          </div>
        </div>
      ))}
    </div>
  );
}
