import { ContentView } from "@/components/organisms/ContentView";
import { notFound } from "next/navigation";
import { Markdown } from "@/components/atoms/Markdown";
import { client } from "@/sanity/client";
import { LAB_BY_SLUG_QUERY } from "@/sanity/lib/queries";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function LabPage({ params }: PageProps) {
  const { id } = await params;
  const lab = await client.fetch(LAB_BY_SLUG_QUERY, { slug: id });

  if (!lab) {
    notFound();
  }

  const content =
    lab.content ||
    `# ${lab.title}\n\n${lab.description || "No description available."}\n\n*Detailed documentation coming soon...*`;

  return (
    <ContentView className="p-1! md:p-8!">
      <div className="w-full max-w-3xl mx-auto p-8 overflow-y-auto custom-scrollbar">
        <article className="prose prose-invert prose-headings:font-mono prose-p:font-sans prose-a:text-primary max-w-none">
          <Markdown>{content}</Markdown>
        </article>
      </div>
    </ContentView>
  );
}

