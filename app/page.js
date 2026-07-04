import Navbar from "@/components/layout/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-20">
        <h1 className="text-5xl font-bold">
          Welcome to DocFlow AI
        </h1>

        <p className="mt-6 max-w-2xl text-zinc-600">
          AI-powered documentation platform built with
          Next.js, Redis, Docker, and Vector Search.
        </p>
      </main>
    </>
  );
}