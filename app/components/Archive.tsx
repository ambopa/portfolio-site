"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import ArchiveItem from "./ArchiveItem";
import Lightbox from "./Lightbox";
import { PROJECTS, archiveItems as staticItems, type ArchiveItemType, type Project } from "@/app/data/items";
import type { SanityProject } from "@/sanity/lib/queries";
import { i18n, type Lang } from "@/app/i18n";

function GridIcon2() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" className="text-black/30">
      <rect x="0" y="0" width="6" height="6" rx="1" fill="currentColor" />
      <rect x="8" y="0" width="6" height="6" rx="1" fill="currentColor" />
      <rect x="0" y="8" width="6" height="6" rx="1" fill="currentColor" />
      <rect x="8" y="8" width="6" height="6" rx="1" fill="currentColor" />
    </svg>
  );
}

function GridIcon5() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" className="text-black/30">
      <rect x="0" y="0" width="3.5" height="3.5" rx="0.5" fill="currentColor" />
      <rect x="5.25" y="0" width="3.5" height="3.5" rx="0.5" fill="currentColor" />
      <rect x="10.5" y="0" width="3.5" height="3.5" rx="0.5" fill="currentColor" />
      <rect x="0" y="5.25" width="3.5" height="3.5" rx="0.5" fill="currentColor" />
      <rect x="5.25" y="5.25" width="3.5" height="3.5" rx="0.5" fill="currentColor" />
      <rect x="10.5" y="5.25" width="3.5" height="3.5" rx="0.5" fill="currentColor" />
      <rect x="0" y="10.5" width="3.5" height="3.5" rx="0.5" fill="currentColor" />
      <rect x="5.25" y="10.5" width="3.5" height="3.5" rx="0.5" fill="currentColor" />
      <rect x="10.5" y="10.5" width="3.5" height="3.5" rx="0.5" fill="currentColor" />
    </svg>
  );
}

function optimizeUrl(url: string | undefined, width: number): string | undefined {
  if (!url || !url.includes("cdn.sanity.io")) return url;
  return `${url}?w=${width}&auto=format&q=82&fit=max`;
}

// Convert Sanity projects to flat ArchiveItemType list
function sanityToItems(projects: SanityProject[]): ArchiveItemType[] {
  let id = 1000;
  const result: ArchiveItemType[] = [];
  for (const p of projects) {
    const items = p.gallery ?? (p.coverImage ? [p.coverImage] : []);
    for (const g of items) {
      const rawUrl = g.videoUrl ? undefined : g.url;
      const rawPoster = g.videoUrl ? g.url : undefined;
      result.push({
        id: id++,
        label: g.caption || p.title,
        project: p.title,
        aspectW: g.width || 1920,
        aspectH: g.height || 1080,
        imageSrc: optimizeUrl(rawUrl, 1200),
        fullSrc: optimizeUrl(rawUrl, 2800),
        poster: optimizeUrl(rawPoster, 1200),
        videoSrc: g.videoUrl || undefined,
      });
    }
  }
  return result;
}

type MdProps = { children?: React.ReactNode };
type MdAProps = { children?: React.ReactNode; href?: string };
const mdComponents = {
  h1: ({ children }: MdProps) => <h1 style={{ fontWeight: 500, marginBottom: "0.25rem", marginTop: "1.25rem" }}>{children}</h1>,
  h2: ({ children }: MdProps) => <h2 style={{ fontWeight: 500, marginBottom: "0.25rem", marginTop: "1.25rem" }}>{children}</h2>,
  h3: ({ children }: MdProps) => <h3 style={{ fontWeight: 500, marginBottom: "0.25rem", marginTop: "1rem" }}>{children}</h3>,
  h4: ({ children }: MdProps) => <h4 style={{ fontWeight: 500, marginBottom: "0.25rem", marginTop: "1rem" }}>{children}</h4>,
  h5: ({ children }: MdProps) => <h5 style={{ fontWeight: 500, marginBottom: "0.25rem", marginTop: "1rem" }}>{children}</h5>,
  h6: ({ children }: MdProps) => <h6 style={{ fontWeight: 500, marginBottom: "0.25rem", marginTop: "1rem" }}>{children}</h6>,
  p: ({ children }: MdProps) => <p style={{ marginBottom: "0.5rem" }}>{children}</p>,
  strong: ({ children }: MdProps) => <strong style={{ fontWeight: 500 }}>{children}</strong>,
  em: ({ children }: MdProps) => <em style={{ fontStyle: "italic" }}>{children}</em>,
  ul: ({ children }: MdProps) => <ul style={{ listStyleType: "disc", paddingLeft: "1rem", marginBottom: "0.5rem" }}>{children}</ul>,
  ol: ({ children }: MdProps) => <ol style={{ listStyleType: "decimal", paddingLeft: "1rem", marginBottom: "0.5rem" }}>{children}</ol>,
  li: ({ children }: MdProps) => <li style={{ marginBottom: "0.25rem" }}>{children}</li>,
  a: ({ children, href }: MdAProps) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block mt-2 rounded-full bg-black px-4 py-1.5 text-[11px] text-white hover:opacity-70 transition-opacity duration-200"
    >
      {children}
    </a>
  ),
};

function DescriptionCard({ project, lang }: { project: SanityProject; lang: Lang }) {
  const text = lang === "en" && project.descriptionEn ? project.descriptionEn : project.description;
  return (
    <div className="mb-3 min-w-0 overflow-hidden flex flex-col gap-4 rounded-[12px] bg-black/[0.03] p-5">
      <p className="text-[11px] font-light leading-[1.5] text-black/40">
        {lang === "en" && project.titleEn ? project.titleEn : project.title}
      </p>
      <div
        className="text-[12px] font-light leading-[1.5] text-black/80"
        style={{ overflowWrap: "break-word", wordBreak: "break-word" }}
      >
        <ReactMarkdown components={mdComponents}>{text}</ReactMarkdown>
      </div>
    </div>
  );
}

type Props = { sanityProjects?: SanityProject[]; lang: Lang };

export default function Archive({ sanityProjects, lang }: Props) {
  const [columns, setColumns] = useState(3);
  const [isMobile, setIsMobile] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [lightboxItem, setLightboxItem] = useState<ArchiveItemType | null>(null);

  useEffect(() => {
    const check = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (mobile) setColumns((prev) => Math.min(prev, 2));
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Use Sanity data if available, fallback to static
  const allItems = useMemo<ArchiveItemType[]>(() => {
    if (sanityProjects && sanityProjects.length > 0) {
      return sanityToItems(sanityProjects);
    }
    return staticItems;
  }, [sanityProjects]);

  // Filters come from Sanity projects; keep title as internal ID, titleEn for display
  const filterList = useMemo<{ title: string; titleEn?: string }[]>(() => {
    if (sanityProjects && sanityProjects.length > 0) {
      return sanityProjects.map((p) => ({ title: p.title, titleEn: p.titleEn }));
    }
    return PROJECTS.map((t) => ({ title: t }));
  }, [sanityProjects]);

  const filteredItems = useMemo(
    () => (activeFilter ? allItems.filter((i) => i.project === activeFilter) : allItems),
    [activeFilter, allItems]
  );

  const openLightbox = useCallback((item: ArchiveItemType) => setLightboxItem(item), []);
  const closeLightbox = useCallback(() => setLightboxItem(null), []);

  const goToPrev = useCallback(() => {
    if (!lightboxItem) return;
    const idx = filteredItems.findIndex((i) => i.id === lightboxItem.id);
    if (idx > 0) setLightboxItem(filteredItems[idx - 1]);
  }, [lightboxItem, filteredItems]);

  const goToNext = useCallback(() => {
    if (!lightboxItem) return;
    const idx = filteredItems.findIndex((i) => i.id === lightboxItem.id);
    if (idx < filteredItems.length - 1) setLightboxItem(filteredItems[idx + 1]);
  }, [lightboxItem, filteredItems]);

  const columnArrays: ArchiveItemType[][] = Array.from({ length: columns }, () => []);
  filteredItems.forEach((item, idx) => {
    columnArrays[idx % columns].push(item);
  });

  const activeProject = activeFilter
    ? (sanityProjects ?? []).find((p) => p.title === activeFilter)
    : null;

  return (
    <>
      <div className="relative z-10 bg-[var(--background)]">
        {/* Фильтры + ползунок */}
        <div className="flex flex-col gap-2 py-4 text-[12px] md:flex-row md:items-center md:justify-between md:gap-3">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setActiveFilter(null)}
              className={`rounded-full px-3 py-1 transition-colors duration-200 ${
                activeFilter === null
                  ? "bg-black text-white"
                  : "bg-black/5 text-black/50 hover:bg-black/10 hover:text-black"
              }`}
            >
              {i18n[lang].allProjects}
            </button>
            {filterList.map(({ title, titleEn }) => (
              <button
                key={title}
                type="button"
                onClick={() => setActiveFilter(title === activeFilter ? null : title)}
                className={`rounded-full px-3 py-1 transition-colors duration-200 ${
                  activeFilter === title
                    ? "bg-black text-white"
                    : "bg-black/5 text-black/50 hover:bg-black/10 hover:text-black"
                }`}
              >
                {lang === "en" && titleEn ? titleEn : title}
              </button>
            ))}
          </div>
          <div className="flex shrink-0 items-center gap-3 font-mono py-6 md:py-0">
            <GridIcon2 />
            <input
              type="range"
              min={1}
              max={5}
              step={1}
              value={columns}
              onChange={(e) => setColumns(Number(e.target.value))}
              aria-label="Количество колонок"
              className="w-20 accent-black"
            />
            <GridIcon5 />
          </div>
        </div>

        {/* Карточка описания на мобильном — над сеткой, на всю ширину */}
        {isMobile && activeProject?.description && (
          <DescriptionCard project={activeProject} lang={lang} />
        )}

        {/* Сетка */}
        <div className="flex gap-3">
          {columnArrays.map((col, colIdx) => (
            <div key={colIdx} className="min-w-0 flex-1">
              {colIdx === 0 && !isMobile && activeProject?.description && (
                <DescriptionCard project={activeProject} lang={lang} />
              )}
              {col.map((item, itemIdx) => (
                <ArchiveItem
                  key={item.id}
                  item={item}
                  onOpen={openLightbox}
                  priority={colIdx === 0 && itemIdx === 0}
                />
              ))}
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <p className="py-16 text-center text-[12px] text-black/30">{i18n[lang].noProjects}</p>
        )}
      </div>

      <Lightbox
        item={lightboxItem}
        items={filteredItems}
        onClose={closeLightbox}
        onPrev={goToPrev}
        onNext={goToNext}
      />
    </>
  );
}
