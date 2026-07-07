"use client";

import { i18n, type Lang } from "@/app/i18n";

export default function Footer({ lang }: { lang: Lang }) {
  const year = new Date().getFullYear();
  const t = i18n[lang];

  return (
    <footer className="border-t border-black/5 py-6 text-[11px] text-black/30">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-black/40">{t.name}</p>
          <p>{t.footerCity}</p>
        </div>

        <div className="flex flex-col gap-1 md:items-end">
          <a
            href="mailto:aleksei@fleksit.ru"
            className="hover:text-black/60 transition-colors duration-200"
          >
            aleksei@fleksit.ru
          </a>
          <a
            href="https://t.me/AlekseiShai"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black/60 transition-colors duration-200"
          >
            Telegram
          </a>
          <a
            href="https://linkedin.com/in/alekseishaikhelislamov"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black/60 transition-colors duration-200"
          >
            LinkedIn
          </a>
        </div>

        <div className="md:text-right">
          <p>&copy; {year} {t.name}</p>
        </div>
      </div>
    </footer>
  );
}
