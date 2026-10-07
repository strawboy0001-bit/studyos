"use client";

import * as React from "react";
import Link from "next/link";
import { BrainCircuit, ArrowLeft, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { AuthService } from "@/lib/auth/auth-service";
import { forgotPasswordSchema } from "@/lib/validation/auth";

export default function ForgotPasswordPage() {
  const [email, setEmail] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const validation = forgotPasswordSchema.safeParse({ email });
    if (!validation.success) {
      setError(validation.error.issues[0]?.message || "Invalid email");
      return;
    }

    setIsLoading(true);
    const res = await AuthService.forgotPassword({ email });

    if (!res.success) {
      setError(res.error || "Could not send reset password link. Please try again.");
      setIsLoading(false);
      return;
    }

    setIsSuccess(true);
    setIsLoading(false);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-12 selection:bg-primary/20 selection:text-primary">
      <div className="w-full max-w-md space-y-6">
        <div className="flex flex-col items-center text-center space-y-2">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-500/20 ring-1 ring-white/20">
              <BrainCircuit className="h-5 w-5" />
            </div>
            <span className="text-2xl font-black tracking-tight text-foreground">
              StudyOS
            </span>
          </Link>
          <h1 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
            Reset your password
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Enter your email to receive a password recovery link
          </p>
        </div>

        <Card className="p-6 sm:p-8 space-y-5 border-border/80 bg-card/90 shadow-xl">
          {error && (
            <div className="flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-xs text-destructive">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {isSuccess ? (
            <div className="space-y-4 text-center py-2">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <h3 className="text-base font-bold text-foreground">
                Recovery Link Sent
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                If an account exists for <strong className="text-foreground">{email}</strong>, you will receive password reset instructions shortly.
              </p>
              <Link href="/login">
                <Button variant="outline" size="sm" className="w-full mt-2">
                  Return to Sign In
                </Button>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Student Email"
                type="email"
                placeholder="you@college.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={error || undefined}
                required
              />

              <Button
                type="submit"
                variant="gradient"
                className="w-full font-semibold shadow-md"
                isLoading={isLoading}
              >
                Send Reset Link
              </Button>
            </form>
          )}
        </Card>

        <div className="text-center text-xs text-muted-foreground">
          <Link href="/login" className="inline-flex items-center gap-1.5 font-medium text-primary hover:underline">
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to Sign In</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
