"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BrainCircuit, ArrowRight, AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { AuthService } from "@/lib/auth/auth-service";
import { signupSchema } from "@/lib/validation/auth";

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [course, setCourse] = React.useState("BCA");
  const [semester, setSemester] = React.useState("1");

  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [serverError, setServerError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);
    setErrors({});

    const validation = signupSchema.safeParse({
      name,
      email,
      password,
      course,
      semester: parseInt(semester, 10) || 1,
    });

    if (!validation.success) {
      const fieldErrors: Record<string, string> = {};
      validation.error.issues.forEach((issue) => {
        if (issue.path[0]) fieldErrors[issue.path[0].toString()] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsLoading(true);
    const res = await AuthService.signup({
      name,
      email,
      password,
      course,
      semester: parseInt(semester, 10) || 1,
    });

    if (!res.success) {
      setServerError(res.error || "Could not complete signup. Please try again.");
      setIsLoading(false);
      return;
    }

    setIsSuccess(true);
    setIsLoading(false);
    setTimeout(() => {
      router.push("/dashboard");
    }, 1500);
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
            Create your academic workspace
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Get personalized priorities and recommendations for your semester
          </p>
        </div>

        <Card className="p-6 sm:p-8 space-y-5 border-border/80 bg-card/90 shadow-xl">
          {serverError && (
            <div className="flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-xs text-destructive">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
              <span>{serverError}</span>
            </div>
          )}

          {isSuccess && (
            <div className="flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs text-emerald-400">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              <span>Account created successfully! Entering StudyOS…</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Full Name"
              type="text"
              placeholder="e.g. Surya Sharma"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={errors.name}
              required
            />

            <Input
              label="College Email"
              type="email"
              placeholder="surya@college.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
              autoComplete="email"
              required
            />

            <Input
              label="Password (min. 6 characters)"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
              autoComplete="new-password"
              required
            />

            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Course / Degree"
                type="text"
                placeholder="BCA, B.Tech, etc."
                value={course}
                onChange={(e) => setCourse(e.target.value)}
              />
              <Input
                label="Semester"
                type="number"
                min={1}
                max={12}
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
              />
            </div>

            <Button
              type="submit"
              variant="gradient"
              className="w-full font-semibold shadow-md"
              isLoading={isLoading}
              disabled={isSuccess}
            >
              <span>{isSuccess ? "Redirecting…" : "Create Student Account"}</span>
              {!isSuccess && <ArrowRight className="h-4 w-4 ml-1.5" />}
            </Button>
          </form>
        </Card>

        {/* Footer */}
        <div className="text-center text-xs text-muted-foreground">
          <p>
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
