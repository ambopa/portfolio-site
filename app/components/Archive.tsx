"use client";

import { useState, useCallback } from "react";
import ArchiveItem from "./ArchiveItem";
import Lightbox from "./Lightbox";
import { archiveItems, type ArchiveItemType } from "@/app/data/items";

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

export default function Archive() {
  const [columns, setColumns] = useState(2);
  const [lightboxItem, setLightboxItem] = useState<ArchiveItemType | null>(null);

  const openLightbox = useCallback((item: ArchiveItemType) => {
    setLightboxItem(item);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxItem(null);
  }, []);

  const goToPrev = useCallback(() => {
    if (!lightboxItem) return;
    const idx = archiveItems.findIndex((i) => i.id === lightboxItem.id);
    if (idx > 0) setLightboxItem(archiveItems[idx - 1]);
  }, [lightboxItem]);

  const goToNext = useCallback(() => {
    if (!lightboxItem) return;
    const idx = archiveItems.findIndex((i) => i.id === lightboxItem.id);
    if (idx < archiveItems.length - 1) setLightboxItem(archiveItems[idx + 1]);
  }, [lightboxItem]);

  // Distribute items into N columns (left-to-right, top-to-bottom like masonry)
  const columnArrays: ArchiveItemType[][] = Array.from({ length: columns }, () => []);
  archiveItems.forEach((item, idx) => {
    columnArrays[idx % columns].push(item);
  });

  return (
    <>
      <div className="relative z-10 bg-[var(--background)]">
        {/* Toolbar */}
        <div className="flex items-center justify-between py-4 font-mono text-[12px]">
          <span className="text-black/40">Archives</span>
          <div className="flex items-center gap-3">
            <GridIcon2 />
            <input
              type="range"
              min={1}
              max={5}
              step={1}
              value={columns}
              onChange={(e) => setColumns(Number(e.target.value))}
              aria-label="Archive column count"
              className="w-20 accent-black"
            />
            <GridIcon5 />
          </div>
        </div>

        {/* Grid */}
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
      </div>

      <Lightbox
        item={lightboxItem}
        items={archiveItems}
        onClose={closeLightbox}
        onPrev={goToPrev}
        onNext={goToNext}
      />
    </>
  );
}
