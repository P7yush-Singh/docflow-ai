import CodeBlock from "./CodeBlock";

export const mdxComponents = {
  h2: (props) => (
    <h2
      className="mt-12 scroll-mt-24 text-3xl font-semibold tracking-tight"
      {...props}
    />
  ),

  h3: (props) => (
    <h3
      className="mt-10 scroll-mt-24 text-2xl font-semibold tracking-tight"
      {...props}
    />
  ),

  p: (props) => (
    <p
      className="mt-5 text-base leading-8 text-zinc-700"
      {...props}
    />
  ),

  ul: (props) => (
    <ul
      className="my-5 list-disc space-y-2 pl-6 text-zinc-700"
      {...props}
    />
  ),

  ol: (props) => (
    <ol
      className="my-5 list-decimal space-y-2 pl-6 text-zinc-700"
      {...props}
    />
  ),

  li: (props) => (
    <li
      className="leading-7"
      {...props}
    />
  ),

  a: (props) => (
    <a
      className="font-medium text-blue-600 underline underline-offset-4 hover:text-blue-700"
      {...props}
    />
  ),

  blockquote: (props) => (
    <blockquote
      className="my-6 border-l-4 border-blue-500 pl-5 italic text-zinc-600"
      {...props}
    />
  ),

  hr: (props) => (
    <hr
      className="my-10 border-zinc-200"
      {...props}
    />
  ),

  code: ({ children, className, ...props }) => {
    /*
     * Fenced Markdown:
     *
     * ```javascript
     * const name = "DocFlow";
     * ```
     *
     * usually gives us:
     *
     * className="language-javascript"
     */

    if (className?.startsWith("language-")) {
      const language = className.replace(
        "language-",
        ""
      );

      return (
        <CodeBlock language={language}>
          {children}
        </CodeBlock>
      );
    }

    // Inline code: `npm install`
    return (
      <code
        className="rounded-md bg-zinc-100 px-1.5 py-0.5 font-mono text-sm text-zinc-800"
        {...props}
      >
        {children}
      </code>
    );
  },

  pre: ({ children }) => <>{children}</>,
};