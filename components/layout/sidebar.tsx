"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useProgress } from "@/hooks/use-progress";
import { ApiKeyInput } from "@/components/shared/api-key-input";
import { BalanceDisplay } from "@/components/shared/balance-display";
import { useTheme } from "@/components/providers/theme-provider";
import {
  BookOpen, Code, MessageSquare, BarChart3,
  HardDrive, Wrench, Database, Check, Menu, X, Brain, Sun, Moon, Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

const TOPICS = [
  { path: "/", label: "Home", icon: BookOpen },
  { path: "/api-basics", label: "API Basics", icon: Code },
  { path: "/system-prompts", label: "System Prompts", icon: MessageSquare },
  { path: "/observability", label: "Observability", icon: BarChart3 },
  { path: "/prompt-caching", label: "Prompt Caching", icon: HardDrive },
  { path: "/tool-calling", label: "Tool Calling", icon: Wrench },
  { path: "/rag", label: "RAG", icon: Database },
  { path: "/reasoning", label: "Reasoning", icon: Brain },
  { path: "/security", label: "Security", icon: Shield },
];

export function Sidebar() {
  const pathname = usePathname();
  const { isVisited } = useProgress();
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const nav = (
    <div className="flex flex-col h-full">
      <div className="p-4 pb-2">
        <Link href="/" className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
          <span className="text-3xl font-serif tracking-tight text-[--sidebar-foreground]">
            FLOSSK
          </span>
          <span className="text-xs text-[--sidebar-foreground]/50">LLM Workshop</span>
        </Link>
      </div>

      <Separator className="bg-[--sidebar-border]" />

      <ScrollArea className="flex-1 px-2 py-2">
        <nav className="space-y-0.5">
          {TOPICS.map((topic) => {
            const Icon = topic.icon;
            const isActive = pathname === topic.path;
            const visited = isVisited(topic.path);

            return (
              <Link
                key={topic.path}
                href={topic.path}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                  isActive
                    ? "bg-[--sidebar-accent] text-[--sidebar-accent-foreground] font-medium"
                    : "text-[--sidebar-foreground]/60 hover:text-[--sidebar-foreground] hover:bg-[--sidebar-accent]"
                )}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="flex-1">{topic.label}</span>
                {visited && topic.path !== "/" && (
                  <Check className="w-3 h-3 text-green-600 shrink-0" />
                )}
              </Link>
            );
          })}
        </nav>
      </ScrollArea>

      <Separator className="bg-[--sidebar-border]" />

      <div className="p-4 space-y-3">
        <ApiKeyInput />
        <BalanceDisplay />
        <button
          onClick={toggleTheme}
          className="flex items-center gap-2 w-full px-2 py-1.5 rounded-md text-xs text-[--sidebar-foreground]/60 hover:text-[--sidebar-foreground] hover:bg-[--sidebar-accent] transition-colors"
        >
          {theme === "dark" ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
          {theme === "dark" ? "Light mode" : "Dark mode"}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile hamburger */}
      <Button
        variant="ghost"
        size="sm"
        className="fixed top-3 left-3 z-50 md:hidden h-9 w-9 p-0"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </Button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-30 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-40 h-screen w-60 bg-[--sidebar] border-r border-[--sidebar-border] transition-transform md:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        {nav}
      </aside>
    </>
  );
}
