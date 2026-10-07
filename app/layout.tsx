import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AuthProvider } from "@/lib/auth/context";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#090d16",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: {
    default: "StudyOS — Personal Academic Operating System",
    template: "%s | StudyOS",
  },
  description:
    "Study smarter. Know what to do next. StudyOS turns your notes, syllabus, deadlines and learning performance into a personalized academic action plan.",
  keywords: [
    "StudyOS",
    "academic operating system",
    "study planner",
    "college workspace",
    "flashcards",
    "quiz",
    "notes",
  ],
  authors: [{ name: "StudyOS Team" }],
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground selection:bg-primary/20 selection:text-primary">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
