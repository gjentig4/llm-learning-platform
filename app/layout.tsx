import type { Metadata } from "next";
import { DM_Sans, Instrument_Serif, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ApiKeyProvider } from "@/components/providers/api-key-provider";
import { ModelProvider } from "@/components/providers/model-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Sidebar } from "@/components/layout/sidebar";
import { Toaster } from "@/components/ui/sonner";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  weight: "400",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Building with LLMs — FLOSSK",
  description:
    "Interactive FLOSSK workshop for building with LLMs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.variable} ${instrumentSerif.variable} ${geistMono.variable} font-sans antialiased min-h-screen`}
      >
        <ThemeProvider>
          <ApiKeyProvider>
            <ModelProvider>
              <Sidebar />
              <main className="md:ml-60 min-h-screen">
                {children}
              </main>
              <Toaster />
            </ModelProvider>
          </ApiKeyProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
