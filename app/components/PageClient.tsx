"use client";

import { useEffect } from "react";
import Header from "./Header";
import Archive from "./Archive";
import Footer from "./Footer";
import type { SanityProject } from "@/sanity/lib/queries";
import type { Lang } from "@/app/i18n";

type Props = { sanityProjects: SanityProject[]; lang: Lang };

export default function PageClient({ sanityProjects, lang }: Props) {
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <>
      <Header lang={lang} />
      <Archive sanityProjects={sanityProjects} lang={lang} />
      <Footer lang={lang} />
    </>
  );
}
