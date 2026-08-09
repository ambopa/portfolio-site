import PageClient from "@/app/components/PageClient";
import { client } from "@/sanity/lib/client";
import { projectsQuery, type SanityProject } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import type { Lang } from "@/app/i18n";

const LANGS: Lang[] = ["ru", "en"];

export const revalidate = 60;

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!LANGS.includes(lang as Lang)) notFound();

  let sanityProjects: SanityProject[] = [];
  try {
    sanityProjects = await client.fetch(projectsQuery);
  } catch {
    // Fallback to static data if Sanity is unavailable
  }

  return (
    <main className="mx-auto max-w-[1440px] px-[10px]">
      <PageClient sanityProjects={sanityProjects} lang={lang as Lang} />
    </main>
  );
}
