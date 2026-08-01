import { codeToHtml } from "shiki";
import CopyButton from "./CopyButton";

export default async function CodeBlock({
  children,
  language = "text",
}) {
  const code = String(children).trim();

  const html = await codeToHtml(code, {
    lang: language,
    theme: "github-dark",
  });

  return (
    <div className="my-8 overflow-hidden rounded-xl border border-zinc-800 bg-[#0d1117]">
      {/* Code Header */}

      <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-2">
        <span className="text-xs font-medium uppercase tracking-wider text-zinc-400">
          {language}
        </span>

        <CopyButton code={code} />
      </div>

      {/* Highlighted Code */}

      <div
        className="
          overflow-x-auto
          text-sm
          [&_pre]:!m-0
          [&_pre]:!bg-transparent
          [&_pre]:p-5
          [&_pre]:leading-7
          [&_code]:font-mono
        "
        dangerouslySetInnerHTML={{
          __html: html,
        }}
      />
    </div>
  );
}