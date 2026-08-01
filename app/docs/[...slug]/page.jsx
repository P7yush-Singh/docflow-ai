import { notFound } from "next/navigation";

import AppLayout from "@/components/layout/AppLayout";
import MDXRenderer from "@/components/mdx/MDXRenderer";

import { getDoc } from "@/lib/mdx/getDoc";
import { getHeadings } from "@/lib/mdx/getHeadings";

export default async function Page({ params }) {
  // Next.js 16 params is asynchronous
  const { slug } = await params;

  // Convert:
  // ["redis", "caching"]
  // into:
  // "redis/caching"
  const docSlug = slug?.join("/") || "introduction";

  // Get MDX document
  const doc = getDoc(docSlug);

  // Show Next.js 404 page if document doesn't exist
  if (!doc) {
    notFound();
  }

  // Extract ## and ### headings from MDX
  // These will be displayed inside "On This Page"
  const headings = getHeadings(doc.content);

  return (
    <AppLayout headings={headings}>
      <article className="w-full max-w-5xl">
        {/* Document Title */}
        <header className="mb-10 border-b border-zinc-200 pb-8">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-950 md:text-5xl">
            {doc.frontmatter.title}
          </h1>

          {doc.frontmatter.description && (
            <p className="mt-4 max-w-3xl text-lg leading-8 text-zinc-600">
              {doc.frontmatter.description}
            </p>
          )}
        </header>

        {/* MDX Content */}
        <MDXRenderer source={doc.content} />
      </article>
    </AppLayout>
  );
}