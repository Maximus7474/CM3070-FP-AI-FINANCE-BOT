import { memo } from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import { cn } from "@/lib/utils";

/**
 * Renders LLM/user message content as proper HTML:
 * - remark-breaks: single newlines become <br> (LLMs rarely emit blank lines
 *   between every sentence, so soft breaks must be preserved).
 * - remark-gfm: tables, strikethrough, task lists, autolinks.
 * - Every block element is explicitly styled so it looks right inside a
 *   chat bubble (and in dark mode) instead of using browser defaults.
 *
 * Only http(s)/mailto links are kept; every other URL scheme is stripped
 * so a crafted message can't produce javascript:/vbscript: links.
 */
const urlTransform = (url: string) =>
  /^(https?:|mailto:)/i.test(url) ? url : undefined;

const components: Components = {
  p: ({ children }) => (
    <p className="whitespace-normal last:mb-0 [&:not(:last-child)]:mb-2">
      {children}
    </p>
  ),
  h1: ({ children }) => (
    <h1 className="mb-2 text-lg font-semibold leading-tight first:mt-0 [&:not(:first-child)]:mt-3">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="mb-1.5 text-base font-semibold leading-tight first:mt-0 [&:not(:first-child)]:mt-3">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mb-1.5 text-sm font-semibold leading-tight first:mt-0 [&:not(:first-child)]:mt-2.5">
      {children}
    </h3>
  ),
  h4: ({ children }) => (
    <h4 className="mb-1 text-sm font-semibold leading-tight first:mt-0 [&:not(:first-child)]:mt-2">
      {children}
    </h4>
  ),
  h5: ({ children }) => (
    <h5 className="mb-1 text-sm font-semibold leading-tight first:mt-0 [&:not(:first-child)]:mt-2">
      {children}
    </h5>
  ),
  h6: ({ children }) => (
    <h6 className="mb-1 text-xs font-semibold uppercase tracking-wide leading-tight first:mt-0 [&:not(:first-child)]:mt-2">
      {children}
    </h6>
  ),
  ul: ({ children }) => (
    <ul className="my-1 list-disc space-y-0.5 pl-5 last:mb-0 [&:not(:last-child)]:mb-1.5">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="my-1 list-decimal space-y-0.5 pl-5 last:mb-0 [&:not(:last-child)]:mb-1.5">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
  strong: ({ children }) => (
    <strong className="font-semibold">{children}</strong>
  ),
  em: ({ children }) => <em className="italic">{children}</em>,
  del: ({ children }) => <del className="line-through opacity-70">{children}</del>,
  a: ({ children, href }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="font-medium underline underline-offset-2"
    >
      {children}
    </a>
  ),
  blockquote: ({ children }) => (
    <blockquote className="my-1.5 border-l-2 border-border pl-3 opacity-80 last:mb-0 [&:not(:last-child)]:mb-1.5">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="my-2 border-border" />,
  table: ({ children }) => (
    <div className="my-1.5 max-w-full overflow-x-auto last:mb-0 [&:not(:last-child)]:mb-1.5">
      <table className="w-full border-collapse text-xs">{children}</table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="border-b border-border">{children}</thead>
  ),
  tbody: ({ children }) => <tbody>{children}</tbody>,
  tr: ({ children }) => (
    <tr className="border-b border-border/60 last:border-b-0">{children}</tr>
  ),
  th: ({ children }) => (
    <th className="px-2 py-1 text-left font-semibold">{children}</th>
  ),
  td: ({ children }) => (
    <td className="px-2 py-1 align-top">{children}</td>
  ),
  code: ({ className, children }) => {
    const isBlock =
      typeof className === "string" && className.includes("language-");
    if (isBlock) {
      return (
        <code className="block overflow-x-auto bg-muted/70 p-2.5 font-mono text-xs leading-relaxed">
          {children}
        </code>
      );
    }
    return (
      <code className="rounded bg-muted/70 px-1 py-0.5 font-mono text-[0.85em]">
        {children}
      </code>
    );
  },
  pre: ({ children }) => (
    <pre className="my-1.5 max-w-full overflow-x-auto rounded-md border border-border bg-muted/40 p-0 last:mb-0 [&:not(:last-child)]:mb-1.5 [&_code]:block [&_code]:bg-transparent [&_code]:px-2.5 [&_code]:py-2 [&_code]:rounded-none [&_code]:text-xs">
      {children}
    </pre>
  ),
  img: ({ src, alt }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={typeof src === "string" ? src : undefined} alt={alt ?? ""} className="max-w-full rounded-md" />
  ),
  input: (props) => (
    <input {...props} disabled className="mr-1 align-middle" />
  ),
};

export const ChatMarkdown = memo(function ChatMarkdown({
  content,
  className,
}: {
  content: string;
  className?: string;
}) {
  return (
    <div className={cn("text-sm leading-relaxed break-words", className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkBreaks]}
        urlTransform={urlTransform}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
});
