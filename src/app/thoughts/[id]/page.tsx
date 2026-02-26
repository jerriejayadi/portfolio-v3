import { ContentView } from "@/components/organisms/ContentView";
import { Markdown } from "@/components/atoms/Markdown";
import { client } from "@/sanity/client";
import { THOUGHT_BY_SLUG_QUERY } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ThoughtsPage({ params }: PageProps) {
  const { id } = await params;
  const thought = await client.fetch(THOUGHT_BY_SLUG_QUERY, { slug: id });

  if (!thought) {
    notFound();
  }

  const content = thought.content || thought.snippet || "*Content placeholder*";

  return (
    <ContentView title={`${thought.title.split(" ").join("_")}.md`} className="p-1! md:p-8!">
      <div className="w-full mx-auto p-3 md:p-8 overflow-y-auto custom-scrollbar">
        <article className="prose prose-invert prose-headings:font-mono prose-p:font-sans prose-a:text-primary max-w-none">
          <Markdown>{content}</Markdown>
        </article>
      </div>
    </ContentView>
  );
}

