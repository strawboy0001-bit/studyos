"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BrainCircuit, Sparkles, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { AuthService } from "@/lib/auth/auth-service";
import { useAuth } from "@/lib/auth/context";
import { loginSchema } from "@/lib/validation/auth";

export default function LoginPage() {
  const router = useRouter();
  const { loginAsDemo } = useAuth();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errors, setErrors] = React.useState<{ email?: string; password?: string }>({});
  const [serverError, setServerError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleDemoFill = () => {
    loginAsDemo();
    if (typeof window !== "undefined") {
      localStorage.setItem("studyos_demo_auth", "true");
    }
    router.push("/dashboard");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);
    setErrors({});

    const validation = loginSchema.safeParse({ email, password });
    if (!validation.success) {
      const fieldErrors: { email?: string; password?: string } = {};
      validation.error.issues.forEach((issue) => {
        if (issue.path[0] === "email") fieldErrors.email = issue.message;
        if (issue.path[0] === "password") fieldErrors.password = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsLoading(true);
    const res = await AuthService.login({ email, password });

    if (!res.success) {
      setServerError(res.error || "Invalid credentials. Please verify your email and password.");
      setIsLoading(false);
      return;
    }

    setIsLoading(false);
    router.push("/dashboard");
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-12 selection:bg-primary/20 selection:text-primary">
      <div className="w-full max-w-md space-y-6">
        {/* Brand Header */}
        <div className="flex flex-col items-center text-center space-y-2">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-500/20 ring-1 ring-white/20 group-hover:scale-105 transition-transform">
              <BrainCircuit className="h-5 w-5" />
            </div>
            <span className="text-2xl font-black tracking-tight text-foreground">
              StudyOS
            </span>
          </Link>
          <h1 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
            Welcome back to StudyOS
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Sign in to access your personalized academic workspace
          </p>
        </div>

        {/* Demo Persona Quick Fill Banner */}
        <Card className="border-indigo-500/30 bg-indigo-500/10 p-4 space-y-3 text-left">
          <div className="flex items-start gap-2.5">
            <Sparkles className="h-4 w-4 text-indigo-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-indigo-300">
                Hackathon / Evaluation Quick Access
              </p>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                Test immediately as Surya (BCA Sem 1 Demo Student with seeded subjects &amp; priority items).
              </p>
            </div>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleDemoFill}
            className="w-full text-xs font-semibold border-indigo-500/40 text-indigo-200 hover:bg-indigo-500/20"
          >
            Launch as Demo Student
          </Button>
        </Card>

        {/* Main Login Form */}
        <Card className="p-6 sm:p-8 space-y-5 border-border/80 bg-card/90 shadow-xl">
          {serverError && (
            <div className="flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-xs text-destructive">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
              <span>{serverError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Student Email"
              type="email"
              placeholder="you@college.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
              autoComplete="email"
              required
            />

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Password
                </span>
                <Link
                  href="/forgot-password"
                  className="text-xs text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={errors.password}
                autoComplete="current-password"
                required
              />
            </div>

            <Button
              type="submit"
              variant="gradient"
              className="w-full font-semibold shadow-md"
              isLoading={isLoading}
            >
              Sign In to Workspace
            </Button>
          </form>
        </Card>

        {/* Footer */}
        <div className="text-center text-xs text-muted-foreground space-y-2">
          <p>
            Don&apos;t have an account yet?{" "}
            <Link href="/signup" className="font-semibold text-primary hover:underline">
              Create student account
            </Link>
          </p>
          <p className="text-[11px] text-muted-foreground/80">
            Protected by PostgreSQL Row Level Security.
          </p>
        </div>
      </div>
    </div>
  );
}
