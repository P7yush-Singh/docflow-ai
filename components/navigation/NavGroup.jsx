import NavItem from "./NavItem";

export default function NavGroup({ section }) {
  return (
    <div className="mb-8">
      <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-zinc-500">
        {section.title}
      </h3>

      <div className="space-y-1">
        {section.pages.map((page) => (
          <NavItem
            key={page.href}
            page={page}
          />
        ))}
      </div>
    </div>
  );
}