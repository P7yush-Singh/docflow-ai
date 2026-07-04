export default function RightSidebar() {
  return (
    <aside className="sticky top-16 hidden h-[calc(100vh-64px)] w-64 border-l border-zinc-200 p-6 xl:block">
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-zinc-500">
        On This Page
      </h3>

      <ul className="space-y-2 text-sm">
        <li>Introduction</li>
        <li>Installation</li>
        <li>Configuration</li>
        <li>Examples</li>
      </ul>
    </aside>
  );
}