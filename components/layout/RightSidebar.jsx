export default function RightSidebar({ headings = [] }) {
  if (!headings.length) {
    return null;
  }

  return (
    <aside className="sticky top-16 hidden h-[calc(100vh-64px)] w-72 shrink-0 border-l border-zinc-200 px-6 py-8 xl:block">
      <p className="mb-5 text-xs font-bold uppercase tracking-wider text-zinc-500">
        On This Page
      </p>

      <nav>
        <ul className="space-y-3">
          {headings.map((heading) => (
            <li
              key={heading.id}
              className={
                heading.level === 3
                  ? "pl-4"
                  : ""
              }
            >
              <a
                href={`#${heading.id}`}
                className="text-sm text-zinc-600 transition hover:text-blue-600"
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}