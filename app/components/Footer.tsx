"use client";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-black/5 py-6 text-[11px] text-black/30">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          {/* ЗАМЕНИТЕ: ваше имя */}
          <p className="text-black/40">Your Name</p>
          {/* ЗАМЕНИТЕ: ваше местоположение */}
          <p>[Your City], [Country]</p>
        </div>

        <div className="flex flex-col gap-1 md:items-end">
          {/* ЗАМЕНИТЕ: ваши контакты */}
          <a
            href="mailto:you@yourdomain.com"
            className="hover:text-black/60 transition-colors duration-200"
          >
            you@yourdomain.com
          </a>
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black/60 transition-colors duration-200"
          >
            Instagram
          </a>
          <a
            href="https://twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black/60 transition-colors duration-200"
          >
            Twitter
          </a>
        </div>

        <div className="md:text-right">
          <p>&copy; {year} Your Name. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
