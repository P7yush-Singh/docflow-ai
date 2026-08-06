"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";

import Logo from "@/components/ui/Logo";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import SearchModal from "@/components/search/SearchModal";

export default function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false);

  // Ctrl + K / Cmd + K and Escape keyboard shortcuts
  useEffect(() => {
    function handleKeyDown(event) {
      // Open/close search with Ctrl + K
      // Cmd + K also works on macOS
      if (
        (event.ctrlKey || event.metaKey) &&
        event.key.toLowerCase() === "k"
      ) {
        event.preventDefault();

        setSearchOpen((current) => !current);
      }

      // Close search with Escape
      if (event.key === "Escape") {
        setSearchOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/80 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/80">
        <Container>
          <nav className="flex h-16 items-center justify-between">
            {/* Left */}

            <div className="flex items-center gap-10">
              <Logo />

              <div className="hidden items-center gap-6 md:flex">
                <Link
                  href="/docs/introduction"
                  className="text-sm font-medium text-zinc-600 transition hover:text-black dark:text-zinc-400 dark:hover:text-white"
                >
                  Docs
                </Link>

                <Link
                  href="/blog"
                  className="text-sm font-medium text-zinc-600 transition hover:text-black dark:text-zinc-400 dark:hover:text-white"
                >
                  Blog
                </Link>

                <Link
                  href="/showcase"
                  className="text-sm font-medium text-zinc-600 transition hover:text-black dark:text-zinc-400 dark:hover:text-white"
                >
                  Showcase
                </Link>
              </div>
            </div>

            {/* Right */}

            <div className="flex items-center gap-3">
              <Button
                variant="secondary"
                className="hidden md:flex"
                onClick={() => setSearchOpen(true)}
              >
                <Search className="mr-2 h-4 w-4" />

                Search

                <kbd className="ml-3 rounded border px-1.5 text-xs">
                  Ctrl K
                </kbd>
              </Button>
            </div>
          </nav>
        </Container>
      </header>

      {/* Redis-powered documentation search */}

      <SearchModal
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
      />
    </>
  );
}