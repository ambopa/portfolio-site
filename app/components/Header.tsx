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
          Алексей Шайхелисламов
        </a>
      </div>

      <div ref={col2Ref}>
        <p>Строю дизайн-стратегию под бизнес-цели и дизайн-системы с нуля до масштаба всей линейки.</p>
        <p>Координирую команды, приоритизирую через RICE и AARRR, провожу UX-исследования (JTBD, CustDev)</p>
        <p>и перевожу инсайты в измеримый результат.</p>
        <p className="mt-3">Principal Product Designer / Lead Designer</p>
        <p>Москва, Россия · Готов к переезду</p>
      </div>

      <div ref={col3Ref} className="shrink-0">
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
