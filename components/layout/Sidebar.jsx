import { navigation } from "@/lib/navigation";
import NavGroup from "@/components/navigation/NavGroup";

export default function Sidebar() {
  return (
    <aside className="sticky top-16 hidden h-[calc(100vh-64px)] w-72 overflow-y-auto border-r border-zinc-200 bg-white p-6 lg:block">
      <p className="mb-8 text-xs font-bold uppercase tracking-widest text-zinc-500">
        Documentation
      </p>

      {navigation.map((section) => (
        <NavGroup
          key={section.title}
          section={section}
        />
      ))}
    </aside>
  );
}