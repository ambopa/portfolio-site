"use client";

import { useEffect, useRef } from "react";
import { i18n, type Lang } from "@/app/i18n";

type Props = { lang: Lang; onToggleLang: (lang: Lang) => void };

export default function Header({ lang, onToggleLang }: Props) {
  const col1Ref = useRef<HTMLDivElement>(null);
  const col2Ref = useRef<HTMLDivElement>(null);
  const col3Ref = useRef<HTMLDivElement>(null);
  const t = i18n[lang];

  useEffect(() => {
    const els = [col1Ref.current, col2Ref.current, col3Ref.current];
    const delays = [0, 60, 120];

    els.forEach((el, i) => {
      if (!el) return;
      el.style.opacity = "0";
      el.style.transform = "translateY(12px)";
      el.style.transition = "opacity 0.7s var(--ease-quint), transform 0.7s var(--ease-quint)";

      setTimeout(() => {
        if (!el) return;
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      }, delays[i]);
    });
  }, []);

  return (
    <header className="flex flex-col gap-6 py-6 text-[12px] font-light leading-[1.4] md:flex-row md:items-start md:gap-8">
      <div ref={col1Ref} className="shrink-0">
        <a href="/" className="hover:opacity-60 transition-opacity duration-200">
          {t.name}
        </a>
      </div>

      <div ref={col2Ref} className="max-w-[400px]">
        <p>{t.bio}</p>
        <p className="mt-3">{t.role}</p>
        <p>{t.location}</p>
      </div>

      <div ref={col3Ref} className="shrink-0">
        <div className="flex items-center gap-0 mb-3 font-mono text-[11px]">
          <button
            type="button"
            onClick={() => onToggleLang("ru")}
            className={`flex items-center justify-center min-w-[40px] min-h-[40px] transition-opacity duration-200 ${lang === "ru" ? "text-black" : "text-black/30 hover:text-black/60"}`}
          >
            RU
          </button>
          <span className="text-black/20">/</span>
          <button
            type="button"
            onClick={() => onToggleLang("en")}
            className={`flex items-center justify-center min-w-[40px] min-h-[40px] transition-opacity duration-200 ${lang === "en" ? "text-black" : "text-black/30 hover:text-black/60"}`}
          >
            EN
          </button>
        </div>
        <p className="mb-3">
          <a
            href="/cv.pdf"
            download="Алексей Шайхелисламов — CV.pdf"
            className="inline-block rounded-full bg-black px-4 py-1.5 text-[13px] text-white hover:opacity-70 transition-opacity duration-200"
          >
            {t.downloadCv}
          </a>
        </p>
        <p>
          <a
            href="https://t.me/AlekseiShai"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-60 transition-opacity duration-200"
          >
            [Telegram]
          </a>
        </p>
        <p>
          <a
            href="https://linkedin.com/in/alekseishaikhelislamov"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-60 transition-opacity duration-200"
          >
            [LinkedIn]
          </a>
        </p>
        <p>
          <a
            href="mailto:aleksei@fleksit.ru"
            className="hover:opacity-60 transition-opacity duration-200"
          >
            [aleksei@fleksit.ru]
          </a>
        </p>
      </div>
    </header>
  );
}
