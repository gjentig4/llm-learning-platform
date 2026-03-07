"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { Cell } from "@/lib/cells";
import { TextCell } from "./text-cell";
import { InteractiveCell } from "./interactive-cell";
import { useProgress } from "@/hooks/use-progress";

interface NotebookPageProps {
  title: string;
  description?: string;
  cells: Cell[];
}

export function NotebookPage({ title, description, cells }: NotebookPageProps) {
  const pathname = usePathname();
  const { markVisited } = useProgress();

  useEffect(() => {
    markVisited(pathname);
  }, [pathname, markVisited]);

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 md:py-14">
      {/* Page header */}
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-serif text-foreground mb-3">{title}</h1>
        {description && (
          <p className="text-lg leading-relaxed text-muted-foreground">{description}</p>
        )}
      </div>

      {/* Cells */}
      <div className="space-y-8">
        {cells.map((cell) => {
          if (cell.type === "text") {
            return <TextCell key={cell.id} content={cell.content} />;
          }
          if (cell.type === "interactive") {
            return (
              <InteractiveCell
                key={cell.id}
                component={cell.component}
                props={cell.props}
              />
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}
