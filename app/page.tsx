import Link from "next/link";
import {
  BrainCircuit,
  ArrowRight,
  Sparkles,
  Target,
  FileText,
  HelpCircle,
  Clock,
  Layers,
  CheckCircle2,
  BookOpen,
  Calendar,
  AlertTriangle,
  ChevronRight,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground selection:bg-primary/20 selection:text-primary">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 w-full border-b border-border/80 bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-500/20 ring-1 ring-white/20">
              <BrainCircuit className="h-5 w-5" />
            </div>
            <span className="text-lg font-black tracking-tight text-foreground">
              StudyOS
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <a href="#how-it-works" className="hover:text-foreground transition-colors">
              How It Works
            </a>
            <a href="#features" className="hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#persona" className="hover:text-foreground transition-colors">
              Demo Persona
            </a>
            <a href="#faq" className="hover:text-foreground transition-colors">
              FAQ
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm" className="text-xs sm:text-sm">
                Sign In
              </Button>
            </Link>
            <Link href="/signup">
              <Button variant="gradient" size="sm" className="text-xs sm:text-sm gap-1.5 shadow-sm">
                <span>Get Started</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-20 sm:pt-24 sm:pb-28">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[450px] w-[700px] bg-gradient-to-tr from-indigo-500/15 via-blue-500/10 to-transparent blur-[120px] pointer-events-none" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3.5 py-1 text-xs font-semibold text-indigo-300 backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
            <span>Personal Academic Operating System</span>
          </div>

          <h1 className="mx-auto max-w-4xl text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl sm:leading-[1.15]">
            Study smarter. <br />
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">
              Know what to do next.
            </span>
          </h1>

          <p className="mx-auto max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed">
            StudyOS turns your scattered notes, syllabus, assignments, deadlines, and quiz performance into a personalized, adaptive academic action plan.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-4">
            <Link href="/signup" className="w-full sm:w-auto">
              <Button variant="gradient" size="lg" className="w-full gap-2 shadow-lg shadow-indigo-500/25">
                <span>Get Started Free</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/login" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full border-border/80 hover:bg-muted/80">
                Explore Demo Student
              </Button>
            </Link>
          </div>

          {/* Hero Recommendation Showcase Card */}
          <div className="mx-auto max-w-3xl pt-10 text-left">
            <Card className="relative overflow-hidden border-indigo-500/30 bg-card/90 p-6 sm:p-7 shadow-2xl backdrop-blur-lg">
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-md bg-indigo-500/20 text-indigo-400">
                    <Sparkles className="h-3.5 w-3.5" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">
                    Signature Capability • What Should I Do Next?
                  </span>
                </div>
                <Badge variant="high">HIGH Priority</Badge>
              </div>

              <h2 className="text-lg sm:text-xl font-bold text-foreground">
                Revise C Programming — Loops and Iterations
              </h2>

              <div className="mt-3 rounded-lg bg-muted/40 border border-border/60 p-3.5 text-xs sm:text-sm text-foreground/90">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1 flex items-center gap-1.5">
                  <AlertTriangle className="h-3 w-3 text-amber-400" />
                  Explainable Recommendation Reason:
                </div>
                Your recent quiz score was 55%, this topic is marked high priority in your syllabus, and your Mid-Semester exam is in 7 days.
              </div>

              <div className="mt-4 flex items-center justify-between pt-3 border-t border-border/60 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Clock className="h-3.5 w-3.5 text-indigo-400" />
                  <span>Estimated Time: <strong className="text-foreground">30 mins</strong></span>
                </div>
                <Link href="/login">
                  <Button variant="gradient" size="sm" className="gap-1.5 text-xs">
                    Start Session <ChevronRight className="h-3.5 w-3.5" />
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Problem vs Solution Section */}
      <section id="how-it-works" className="py-16 sm:py-24 border-t border-border/60 bg-muted/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <Badge variant="outline" className="text-xs">The Academic Problem</Badge>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-foreground">
              From Decision Overload to Prioritized Action
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              College students do not suffer from lack of information. They suffer from decision fatigue across disconnected folders, messages, and syllabi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {/* The Old Way */}
            <Card className="p-6 sm:p-8 border-destructive/20 bg-destructive/5 space-y-4">
              <div className="flex items-center gap-2 text-destructive font-bold text-sm uppercase tracking-wider">
                <AlertTriangle className="h-4 w-4" /> The Disconnected Status Quo
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-muted-foreground">
                <li className="flex items-start gap-2.5">
                  <span className="text-destructive font-bold">✕</span>
                  <span>Notes scattered across PDFs, PPTs, WhatsApp group chats, and college LMS portals.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-destructive font-bold">✕</span>
                  <span>Constantly wondering: &ldquo;What should I study first? What can I finish in 1 hour?&rdquo;</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-destructive font-bold">✕</span>
                  <span>Generic AI chatbots giving hallucinated exam predictions without student context.</span>
                </li>
              </ul>
            </Card>

            {/* The StudyOS Way */}
            <Card className="p-6 sm:p-8 border-emerald-500/30 bg-emerald-500/5 space-y-4">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm uppercase tracking-wider">
                <CheckCircle2 className="h-4 w-4" /> The StudyOS Adaptive Intelligence Loop
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-foreground/90">
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span><strong>Understand:</strong> Maps student material, syllabus units, deadlines, and exams.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span><strong>80/20 Prioritize:</strong> Identifies weak concepts that impact exam readiness most.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span><strong>Adapt:</strong> Quiz scores directly update topic priority and next-best actions.</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Core Features Grid */}
      <section id="features" className="py-16 sm:py-24 border-t border-border/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <Badge variant="outline" className="text-xs">System Capabilities</Badge>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-foreground">
              Built Specifically for Academic Mastery
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              Every tool in StudyOS feeds the central intelligence loop to keep you focused on what matters.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card glow className="p-6 space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                <BookOpen className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-foreground">Subject & Topic Hubs</h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Organize your academic life by subjects, units, syllabus concepts, and note archives.
              </p>
            </Card>

            <Card glow className="p-6 space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400">
                <Target className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-foreground">80/20 Study Prioritizer</h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Transparently scores topics based on exam proximity, quiz accuracy, and syllabus weight.
              </p>
            </Card>

            <Card glow className="p-6 space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400">
                <Layers className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-foreground">Active Recall Flashcards</h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Review flashcard decks generated directly from your class materials with confidence tracking.
              </p>
            </Card>

            <Card glow className="p-6 space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400">
                <HelpCircle className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-foreground">Adaptive Quizzes</h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Take quick 5, 10, or 20 question checks. Low accuracy automatically increases topic priority.
              </p>
            </Card>

            <Card glow className="p-6 space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
                <Clock className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-foreground">Time-Budgeted Planner</h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Tell StudyOS: &ldquo;I have 2 hours today,&rdquo; and get an optimized, editable study itinerary.
              </p>
            </Card>

            <Card glow className="p-6 space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-foreground">Strict Privacy & RLS</h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Database-enforced Row Level Security ensures complete isolation for every student&apos;s data.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Demo Persona Showcase */}
      <section id="persona" className="py-16 sm:py-24 border-t border-border/60 bg-muted/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <Badge variant="outline" className="text-xs border-indigo-500/30 text-indigo-300">
              Evaluation Persona
            </Badge>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-foreground">
              Pre-Configured Demo Persona: Surya
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              Experience StudyOS immediately with a realistic BCA Semester 1 curriculum (C Programming, Chemistry, Environment, English, Mathematics).
            </p>
          </div>

          <div className="mx-auto max-w-3xl rounded-xl border border-border bg-card p-6 sm:p-8 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-border/60">
              <div>
                <h3 className="text-base font-bold text-foreground">Student: Surya Demo</h3>
                <p className="text-xs text-muted-foreground">BCA • Semester 1 • National Institute of Technology</p>
              </div>
              <Link href="/login">
                <Button variant="gradient" size="sm" className="gap-1.5">
                  <span>Launch Demo Student Mode</span>
                  <Zap className="h-3.5 w-3.5" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="p-3 rounded-lg bg-muted/40 border border-border/40">
                <span className="text-lg font-bold text-foreground">5</span>
                <p className="text-[11px] text-muted-foreground">Enrolled Subjects</p>
              </div>
              <div className="p-3 rounded-lg bg-muted/40 border border-border/40">
                <span className="text-lg font-bold text-foreground">17</span>
                <p className="text-[11px] text-muted-foreground">Mapped Topics</p>
              </div>
              <div className="p-3 rounded-lg bg-muted/40 border border-border/40">
                <span className="text-lg font-bold text-amber-400">55%</span>
                <p className="text-[11px] text-muted-foreground">Loops Quiz Score</p>
              </div>
              <div className="p-3 rounded-lg bg-muted/40 border border-border/40">
                <span className="text-lg font-bold text-rose-400">7 Days</span>
                <p className="text-[11px] text-muted-foreground">To Mid-Sem Exam</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 sm:py-24 border-t border-border/60">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-3">
            <Badge variant="outline" className="text-xs">Common Questions</Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            <Card className="p-5 space-y-2">
              <h3 className="text-sm font-bold text-foreground">
                How does StudyOS know what I should study next?
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                StudyOS calculates priority based on your upcoming exam proximity, assignment deadlines, syllabus importance, and your recent quiz performance to recommend the highest-impact action.
              </p>
            </Card>

            <Card className="p-5 space-y-2">
              <h3 className="text-sm font-bold text-foreground">
                Does StudyOS make false claims about exam questions?
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Never. StudyOS strictly provides study prioritization based on available academic evidence. It never claims to predict secret exam papers.
              </p>
            </Card>

            <Card className="p-5 space-y-2">
              <h3 className="text-sm font-bold text-foreground">
                Is my academic data private?
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Yes. Every student account is isolated using PostgreSQL Row Level Security. No other student can see your notes, files, or performance.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA Banner */}
      <section className="py-16 sm:py-20 border-t border-border/60 bg-gradient-to-b from-card to-background">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground">
            Ready to master your academic semester?
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
            Take control of your studies with clear priorities and personalized academic intelligence.
          </p>
          <div className="pt-2">
            <Link href="/signup">
              <Button variant="gradient" size="lg" className="gap-2 shadow-xl shadow-indigo-500/20">
                <span>Create Your Free Account</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/80 bg-card/60 py-8 text-center text-xs text-muted-foreground">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-bold text-foreground">
            <BrainCircuit className="h-4 w-4 text-primary" />
            <span>StudyOS</span>
          </div>
          <p>© 2026 StudyOS • Personal Academic Operating System. Phase 1 Foundation.</p>
          <div className="flex items-center gap-4">
            <Link href="/login" className="hover:underline">Sign In</Link>
            <Link href="/signup" className="hover:underline">Sign Up</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
