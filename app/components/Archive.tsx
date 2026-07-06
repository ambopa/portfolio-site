"use client";

import { useState, useCallback, useMemo } from "react";
import ArchiveItem from "./ArchiveItem";
import Lightbox from "./Lightbox";
import { PROJECTS, archiveItems as staticItems, type ArchiveItemType, type Project } from "@/app/data/items";
import type { SanityProject } from "@/sanity/lib/queries";

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
        poster: optimizeUrl(rawPoster, 1200),
        videoSrc: g.videoUrl || undefined,
      });
    }
  }
  return result;
}

type Props = { sanityProjects?: SanityProject[] };

export default function Archive({ sanityProjects }: Props) {
  const [columns, setColumns] = useState(3);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [lightboxItem, setLightboxItem] = useState<ArchiveItemType | null>(null);

  // Use Sanity data if available, fallback to static
  const allItems = useMemo<ArchiveItemType[]>(() => {
    if (sanityProjects && sanityProjects.length > 0) {
      return sanityToItems(sanityProjects);
    }
    return staticItems;
  }, [sanityProjects]);

  // Filters come from Sanity project titles, fallback to static PROJECTS
  const filterList = useMemo<string[]>(() => {
    if (sanityProjects && sanityProjects.length > 0) {
      return sanityProjects.map((p) => p.title);
    }
    return PROJECTS;
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

  return (
    <>
      <div className="relative z-10 bg-[var(--background)]">
        {/* Фильтры */}
        <div className="flex flex-wrap gap-2 py-4 text-[12px]">
          <button
            type="button"
            onClick={() => setActiveFilter(null)}
            className={`rounded-full px-3 py-1 transition-colors duration-200 ${
              activeFilter === null
                ? "bg-black text-white"
                : "bg-black/5 text-black/50 hover:bg-black/10 hover:text-black"
            }`}
          >
            Все проекты
          </button>
          {filterList.map((project) => (
            <button
              key={project}
              type="button"
              onClick={() => setActiveFilter(project === activeFilter ? null : project)}
              className={`rounded-full px-3 py-1 transition-colors duration-200 ${
                activeFilter === project
                  ? "bg-black text-white"
                  : "bg-black/5 text-black/50 hover:bg-black/10 hover:text-black"
              }`}
            >
              {project}
            </button>
          ))}
        </div>

        {/* Ползунок колонок */}
        <div className="flex items-center justify-end gap-3 pb-4 font-mono text-[12px]">
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

        {/* Сетка */}
        <div className="flex gap-3">
          {columnArrays.map((col, colIdx) => (
            <div key={colIdx} className="min-w-0 flex-1">
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
          <p className="py-16 text-center text-[12px] text-black/30">Нет проектов</p>
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
