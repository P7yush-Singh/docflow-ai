import { docs } from "@/lib/docs/docs";
import AppLayout from "@/components/layout/AppLayout";
import DocRenderer from "@/components/docs/DocRenderer";
import { notFound } from "next/navigation";

export default async function Page({ params }) {

  const slug = params.slug?.join("/") || "introduction";

  const key = slug.split("/").pop();

  const doc = docs[key];

  if (!doc) {
    notFound();
  }

  return (
    <AppLayout>

      <DocRenderer doc={doc} />

    </AppLayout>
  );
}