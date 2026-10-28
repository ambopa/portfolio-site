import type { Metadata } from "next";
import { i18n, type Lang } from "@/app/i18n";
import { notFound } from "next/navigation";

const LANGS: Lang[] = ["ru", "en"];

export async function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!LANGS.includes(lang as Lang)) return {};
  const t = i18n[lang as Lang];
  // The same text as on the page, so a shared link reads like the site
  const description = t.bio.replace(/\s*\n+\s*/g, " ");
  // Square favicon picture: link previews show it as a small icon next to the text
  const image = { url: "/og.png", width: 600, height: 600, alt: t.name };
  return {
    title: t.name,
    description,
    alternates: { canonical: `/${lang}`, languages: { ru: "/ru", en: "/en" } },
    openGraph: {
      type: "website",
      url: `/${lang}`,
      siteName: t.name,
      title: t.name,
      description,
      locale: lang === "ru" ? "ru_RU" : "en_US",
      images: [image],
    },
    twitter: { card: "summary", title: t.name, description, images: [image] },
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!LANGS.includes(lang as Lang)) notFound();
  return <>{children}</>;
}
