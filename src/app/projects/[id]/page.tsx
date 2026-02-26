import { ContentView } from "@/components/organisms/ContentView";
import { notFound } from "next/navigation";
import { Markdown } from "@/components/atoms/Markdown";
import { client } from "@/sanity/client";
import { PROJECT_BY_SLUG_QUERY } from "@/sanity/lib/queries";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProjectPage({ params }: PageProps) {
  const { id } = await params; // 'id' is actually the slug based on directory structure [id]
  const project = await client.fetch(PROJECT_BY_SLUG_QUERY, { slug: id });

  if (!project) {
    notFound();
  }

  const content = project.content || 
    `# ${project.title}\n\n${project.description || "No description available."}\n\n*Detailed project documentation coming soon...*`;

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

