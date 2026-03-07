"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface TextCellProps {
  content: string;
}

export function TextCell({ content }: TextCellProps) {
  return (
    <div className="prose-custom">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          p: ({ children }) => (
            <p className="my-3 first:mt-0 last:mb-0 text-foreground/80 leading-[1.7]">{children}</p>
          ),
          ul: ({ children }) => (
            <ul className="my-3 ml-4 list-disc space-y-1 text-foreground/80 leading-[1.7]">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="my-3 ml-4 list-decimal space-y-1 text-foreground/80 leading-[1.7]">{children}</ol>
          ),
          li: ({ children }) => <li className="pl-1 text-foreground/80">{children}</li>,
          strong: ({ children }) => (
            <strong className="font-semibold text-foreground">{children}</strong>
          ),
          em: ({ children }) => <em className="italic text-foreground/60">{children}</em>,
          code: ({ children, className }) => {
            const isBlock = className?.includes("language-");
            return isBlock ? (
              <code className={`${className} block bg-muted p-4 rounded-lg overflow-x-auto text-sm text-foreground/70 border border-border`}>
                {children}
              </code>
            ) : (
              <code className="bg-secondary text-primary px-1.5 py-0.5 rounded text-sm">
                {children}
              </code>
            );
          },
          pre: ({ children }) => <pre className="my-3 first:mt-0 last:mb-0">{children}</pre>,
          a: ({ children, href }) => (
            <a
              href={href}
              className="text-primary hover:text-primary/80 underline decoration-primary/30 hover:decoration-primary/60 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </a>
          ),
          h1: ({ children }) => (
            <h1 className="text-3xl font-serif my-5 first:mt-0 text-foreground">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-2xl font-serif my-5 first:mt-0 text-foreground">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-xl font-semibold my-4 first:mt-0 text-foreground/90">{children}</h3>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-3 border-primary pl-4 my-3 italic text-foreground/60">
              {children}
            </blockquote>
          ),
          hr: () => <hr className="my-6 border-border" />,
          table: ({ children }) => (
            <div className="my-3 overflow-x-auto rounded-lg border border-border">
              <table className="w-full text-sm">{children}</table>
            </div>
          ),
          thead: ({ children }) => <thead className="bg-muted">{children}</thead>,
          th: ({ children }) => <th className="px-3 py-2 text-left font-medium text-foreground border-b border-border">{children}</th>,
          td: ({ children }) => <td className="px-3 py-2 text-foreground/80 border-b border-border">{children}</td>,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
