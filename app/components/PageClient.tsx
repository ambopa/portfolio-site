"use client";

import { useState, useEffect } from "react";
import Header from "./Header";
import Archive from "./Archive";
import Footer from "./Footer";
import type { SanityProject } from "@/sanity/lib/queries";
import type { Lang } from "@/app/i18n";

type Props = { sanityProjects: SanityProject[] };

export default function PageClient({ sanityProjects }: Props) {
  const [lang, setLang] = useState<Lang>("ru");

  useEffect(() => {
    const stored = localStorage.getItem("lang") as Lang | null;
    if (stored === "en") setLang("en");
  }, []);

  const toggleLang = (next: Lang) => {
    setLang(next);
    localStorage.setItem("lang", next);
  };

  return (
    <>
      <Header lang={lang} onToggleLang={toggleLang} />
      <Archive sanityProjects={sanityProjects} lang={lang} />
      <Footer lang={lang} />
    </>
  );
}
