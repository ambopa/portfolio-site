"use client";

import { useEffect, useRef, useCallback } from "react";
import type { ArchiveItemType } from "@/app/data/items";

type Props = {
  item: ArchiveItemType | null;
  items: ArchiveItemType[];
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
};

export default function Lightbox({ item, items, onClose, onPrev, onNext }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Lock scroll while open
  useEffect(() => {
    if (!item) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [item]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!item) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [item, onClose, onPrev, onNext]);

  // Play video when opened
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (item?.videoSrc) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [item]);

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === overlayRef.current) onClose();
    },
    [onClose]
  );

  if (!item) return null;

  const hasVideo = !!item.videoSrc;
  const currentIndex = items.findIndex((i) => i.id === item.id);

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-[9000] flex items-center justify-center bg-black/90 backdrop-blur-sm"
      role="dialog"
      aria-modal
      aria-label={item.label}
    >
      {/* Close button */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute top-6 right-6 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/50 hover:text-white transition-colors duration-200"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      {/* Prev button */}
      {currentIndex > 0 && (
        <button
          type="button"
          onClick={onPrev}
          aria-label="Previous"
          className="absolute left-6 top-1/2 -translate-y-1/2 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/50 hover:text-white transition-colors duration-200"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M9 1L3 7l6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}

      {/* Next button */}
      {currentIndex < items.length - 1 && (
        <button
          type="button"
          onClick={onNext}
          aria-label="Next"
          className="absolute right-6 top-1/2 -translate-y-1/2 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/50 hover:text-white transition-colors duration-200"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M5 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}

      {/* Media */}
      <div className="relative max-w-[90vw] max-h-[85vh] flex items-center justify-center">
        {hasVideo ? (
          <video
            ref={videoRef}
            key={item.id}
            className="max-w-[90vw] max-h-[85vh] rounded-[12px] shadow-2xl"
            poster={item.poster}
            muted
            loop
            playsInline
            controls={false}
            style={{ aspectRatio: `${item.aspectW} / ${item.aspectH}` }}
          >
            <source src={item.videoSrc} />
          </video>
        ) : (item.fullSrc || item.imageSrc) ? (
          <img
            key={item.id}
            src={item.fullSrc || item.imageSrc}
            alt={item.label}
            className="max-w-[90vw] max-h-[85vh] rounded-[12px] shadow-2xl object-contain"
          />
        ) : (
          <div
            className="rounded-[12px] bg-black/5 shadow-2xl"
            style={{
              aspectRatio: `${item.aspectW} / ${item.aspectH}`,
              width: "min(90vw, 800px)",
            }}
          />
        )}

        {/* Label */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center">
          <span className="rounded-full bg-black/90 px-[10px] py-1 text-[11px] text-white/50">
            {item.label}
          </span>
        </div>
      </div>
    </div>
  );
}
