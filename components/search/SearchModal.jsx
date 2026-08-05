"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  X,
  FileText,
  Loader2,
  ArrowRight,
} from "lucide-react";

export default function SearchModal({
  open,
  onClose,
}) {
  const router = useRouter();

  const inputRef = useRef(null);

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Focus input whenever modal opens
  useEffect(() => {
    if (!open) return;

    setTimeout(() => {
      inputRef.current?.focus();
    }, 50);
  }, [open]);

  // Search API with debounce
  useEffect(() => {
    if (!open) return;

    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      setResults([]);
      setLoading(false);
      return;
    }

    const controller = new AbortController();

    const timeout = setTimeout(async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `/api/search?q=${encodeURIComponent(trimmedQuery)}`,
          {
            signal: controller.signal,
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Search failed"
          );
        }

        setResults(data.results || []);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error(
            "Search request failed:",
            error
          );

          setResults([]);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }, 300);

    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, [query, open]);

  function handleResultClick(slug) {
    onClose();

    setQuery("");
    setResults([]);

    router.push(`/docs/${slug}`);
  }

  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-100 flex items-start justify-center bg-black/40 px-4 pt-[12vh] backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="w-full max-w-2xl overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xl">
        {/* Search Input */}

        <div className="flex items-center gap-3 border-b border-zinc-200 px-5">
          <Search
            size={20}
            className="shrink-0 text-zinc-400"
          />

          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(event) =>
              setQuery(event.target.value)
            }
            placeholder="Search documentation..."
            className="h-16 w-full bg-transparent text-base text-zinc-900 outline-none placeholder:text-zinc-400"
          />

          {loading && (
            <Loader2
              size={18}
              className="animate-spin text-zinc-400"
            />
          )}

          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1.5 text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-900"
            aria-label="Close search"
          >
            <X size={18} />
          </button>
        </div>

        {/* Results */}

        <div className="max-h-[420px] overflow-y-auto p-2">
          {!query.trim() && (
            <div className="px-4 py-10 text-center">
              <Search
                size={28}
                className="mx-auto mb-3 text-zinc-300"
              />

              <p className="text-sm text-zinc-500">
                Search the DocFlow AI documentation.
              </p>

              <p className="mt-1 text-xs text-zinc-400">
                Try Redis, Docker, installation...
              </p>
            </div>
          )}

          {query.trim() &&
            !loading &&
            results.length === 0 && (
              <div className="px-4 py-10 text-center">
                <p className="text-sm font-medium text-zinc-700">
                  No results found
                </p>

                <p className="mt-1 text-sm text-zinc-400">
                  No documentation matched "
                  {query}".
                </p>
              </div>
            )}

          {results.length > 0 && (
            <div className="space-y-1">
              {results.map((result) => (
                <button
                  key={result.id || result.slug}
                  type="button"
                  onClick={() =>
                    handleResultClick(result.slug)
                  }
                  className="group flex w-full items-start gap-3 rounded-xl px-4 py-3 text-left transition hover:bg-zinc-100"
                >
                  <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-zinc-200 bg-white">
                    <FileText
                      size={17}
                      className="text-zinc-500"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-zinc-900">
                      {result.title}
                    </p>

                    {result.description && (
                      <p className="mt-1 line-clamp-2 text-sm leading-5 text-zinc-500">
                        {result.description}
                      </p>
                    )}

                    <p className="mt-1.5 text-xs text-zinc-400">
                      /docs/{result.slug}
                    </p>
                  </div>

                  <ArrowRight
                    size={16}
                    className="mt-2 shrink-0 text-zinc-300 transition group-hover:translate-x-0.5 group-hover:text-zinc-600"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}

        <div className="flex items-center justify-between border-t border-zinc-200 bg-zinc-50 px-4 py-2.5">
          <span className="text-xs text-zinc-400">
            Powered by Redis Search
          </span>

          <span className="text-xs text-zinc-400">
            ESC to close
          </span>
        </div>
      </div>
    </div>
  );
}