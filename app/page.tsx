import PageClient from "@/app/components/PageClient";
import { client } from "@/sanity/lib/client";
import { projectsQuery, type SanityProject } from "@/sanity/lib/queries";

export const revalidate = 60;

export default async function Home() {
  let sanityProjects: SanityProject[] = [];

  try {
    sanityProjects = await client.fetch(projectsQuery);
  } catch {
    // Fallback to static data if Sanity is unavailable
  }

  return (
    <main className="mx-auto max-w-[1440px] px-[10px]">
      <PageClient sanityProjects={sanityProjects} />
    </main>
  );
}
