import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import RightSidebar from "./RightSidebar";

export default function AppLayout({
  children,
  headings = [],
}) {
  return (
    <>
      <Navbar />

      <main className="mx-auto flex max-w-[1600px]">
        <Sidebar />

        <section className="min-h-screen flex-1 px-10 py-8">
          {children}
        </section>

        <RightSidebar headings={headings} />
      </main>
    </>
  );
}