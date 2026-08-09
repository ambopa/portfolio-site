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
  return {
    title: t.name,
    description: `${t.role}. ${t.location}.`,
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
