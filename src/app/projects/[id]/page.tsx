import { ContentView } from "@/components/organisms/ContentView";
import { notFound } from "next/navigation";
import { Markdown } from "@/components/atoms/Markdown";
import { client } from "@/sanity/client";
import { PROJECT_BY_SLUG_QUERY } from "@/sanity/lib/queries";
import Image from "next/image";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProjectPage({ params }: PageProps) {
  const { id } = await params; // 'id' is actually the slug based on directory structure [id]
  const project = await client.fetch(PROJECT_BY_SLUG_QUERY, { slug: id });

  if (!project) {
    notFound();
  }

  const content =
    project.content ||
    `# ${project.title}\n\n${project.description || "No description available."}\n\n*Detailed project documentation coming soon...*`;

  return (
    <ContentView
      className="p-1! md:p-8!"
      title={`${project.title.toLowerCase().split(" ").join("-")}.md`}
    >
      <div className="w-full mx-auto p-8 overflow-y-auto custom-scrollbar">
        {project.preview?.image && (
          <div className="mb-8 relative w-full aspect-video rounded-xl overflow-hidden border border-surface-border">
            <Image
              src={project.preview.image}
              alt={project.title}
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

