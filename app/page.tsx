import Header from "@/app/components/Header";
import Archive from "@/app/components/Archive";
import Footer from "@/app/components/Footer";
import { client } from "@/sanity/lib/client";
import { projectsQuery, type SanityProject } from "@/sanity/lib/queries";

export const revalidate = 60; // обновлять данные каждые 60 секунд

export default async function Home() {
  let sanityProjects: SanityProject[] = [];

  try {
    sanityProjects = await client.fetch(projectsQuery);
  } catch {
    // Если Sanity недоступен — используем статические данные
  }

  return (
    <main className="mx-auto max-w-[1440px] px-[10px]">
      <Header />
      <Archive sanityProjects={sanityProjects} />
      <Footer />
    </main>
  );
}
