"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/cn";

export default function NavItem({ page }) {
  const pathname = usePathname();

  const active = pathname === page.href;

  return (
    <Link
      href={page.href}
      className={cn(
        "block rounded-lg px-3 py-2 text-sm transition-all",
        active
          ? "bg-blue-50 font-semibold text-blue-600"
          : "text-zinc-600 hover:bg-zinc-100 hover:text-black"
      )}
    >
      {page.title}
    </Link>
  );
}