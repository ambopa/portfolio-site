"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import type { ArchiveItemType } from "@/app/data/items";

type Props = {
  item: ArchiveItemType;
  onOpen: (item: ArchiveItemType) => void;
  priority?: boolean;
};

export default function ArchiveItem({ item, onOpen, priority = false }: Props) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  // Scroll-based reveal animation
  useEffect(() => {
    const el = buttonRef.current;
    if (!el) return;

    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.7s var(--ease-quint), transform 0.7s var(--ease-quint)";

    if (priority) {
      // First few items animate immediately
      const timer = setTimeout(() => {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      }, 100);
      return () => clearTimeout(timer);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [priority]);

  // Video play/pause on intersection
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !item.videoSrc) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [item.videoSrc]);

  const handleImageLoad = useCallback(() => {
    setImgLoaded(true);
  }, []);

  // Если картинка уже в кеше — onLoad не сработает, проверяем вручную
  useEffect(() => {
    if (imgRef.current?.complete) setImgLoaded(true);
  }, []);

  const handleVideoCanPlay = useCallback(() => {
    setVideoReady(true);
  }, []);

  const hasMedia = item.imageSrc || item.videoSrc || item.poster;
  const estimatedHeight =
    Math.round((item.aspectH / item.aspectW) * 360);

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={() => onOpen(item)}
      aria-label={item.label}
      className="mb-3 block w-full cursor-pointer rounded-[12px] text-left outline-none focus-visible:ring-1 focus-visible:ring-black/30"
      style={{
        contentVisibility: "auto",
        containIntrinsicSize: `auto ${estimatedHeight}px`,
      }}
    >
      <div
        className="relative w-full overflow-hidden rounded-[12px] bg-black/[0.03]"
        style={{ aspectRatio: `${item.aspectW} / ${item.aspectH}` }}
      >
        {/* Static image */}
        {item.imageSrc && (
          <img
            ref={imgRef}
            className={`block w-full transition-opacity duration-500 ${imgLoaded ? "opacity-100" : "opacity-0"}`}
            src={item.imageSrc}
            alt={item.label}
            width={item.aspectW}
            height={item.aspectH}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            onLoad={handleImageLoad}
          />
        )}

        {/* Video with poster */}
        {(item.videoSrc || item.poster) && (
          <>
            {item.poster && (
              <img
                className={`block w-full transition-opacity duration-500 ${imgLoaded ? "opacity-100" : "opacity-0"}`}
                src={item.poster}
                alt={item.label}
                width={item.aspectW}
                height={item.aspectH}
                loading={priority ? "eager" : "lazy"}
                decoding="async"
                onLoad={handleImageLoad}
              />
            )}
            {item.videoSrc && (
              <video
                ref={videoRef}
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${videoReady ? "opacity-100" : "opacity-0"}`}
                poster={item.poster}
                muted
                loop
                playsInline
                preload="none"
                onCanPlay={handleVideoCanPlay}
              >
                <source src={item.videoSrc} />
              </video>
            )}
          </>
        )}
      </div>
    </button>
  );
}
