"use client";

import { useEffect, useRef } from "react";

export default function Header() {
  const col1Ref = useRef<HTMLDivElement>(null);
  const col2Ref = useRef<HTMLDivElement>(null);
  const col3Ref = useRef<HTMLDivElement>(null);

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
          {/* ЗАМЕНИТЕ: ваше имя */}
          Your Name
        </a>
      </div>

      <div ref={col2Ref}>
        {/* ЗАМЕНИТЕ: ваше описание и должность */}
        <p>A multidisciplinary designer</p>
        <p>based in [Your City], [Country].</p>
        <p className="mt-3">[Your Role] at [Company]</p>
      </div>

      <div ref={col3Ref} className="shrink-0">
        {/* ЗАМЕНИТЕ: ваши ссылки */}
        <p>
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-60 transition-opacity duration-200"
          >
            [Instagram]
          </a>
        </p>
        <p>
          <a
            href="https://twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-60 transition-opacity duration-200"
          >
            [Twitter]
          </a>
        </p>
        <p>
          <a
            href="https://www.threads.net/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-60 transition-opacity duration-200"
          >
            [Threads]
          </a>
        </p>
        {/* ЗАМЕНИТЕ: ваш email */}
        <p>
          <a
            href="mailto:you@yourdomain.com"
            className="hover:opacity-60 transition-opacity duration-200"
          >
            [you@yourdomain.com]
          </a>
        </p>
      </div>
    </header>
  );
}
