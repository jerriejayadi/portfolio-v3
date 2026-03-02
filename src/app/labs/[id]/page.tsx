import { ContentView } from "@/components/organisms/ContentView";
import { notFound } from "next/navigation";
import { Markdown } from "@/components/atoms/Markdown";
import { client } from "@/sanity/client";
import { LAB_BY_SLUG_QUERY } from "@/sanity/lib/queries";
import Image from "next/image";

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
    <ContentView
      className="p-1! md:p-8!"
      title={`${lab.title.toLowerCase().split(" ").join("-")}.md`}
    >
      <div className="w-full mx-auto p-8 overflow-y-auto custom-scrollbar">
        {lab.preview?.image && (
          <div className="mb-8 relative w-full aspect-video rounded-xl overflow-hidden border border-surface-border">
            <Image
              src={lab.preview.image}
              alt={lab.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}
        <article className="prose prose-invert prose-headings:font-mono prose-p:font-sans prose-a:text-primary max-w-none">
          <Markdown>{content}</Markdown>
        </article>
      </div>
    </ContentView>
  );
}

