"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import type { ArchiveItemType } from "@/app/data/items";
import LoopVideo from "./LoopVideo";
import { registerVideo, videoBuffered } from "./videoQueue";

type Props = {
  item: ArchiveItemType;
  onOpen: (item: ArchiveItemType) => void;
  priority?: boolean;
};

export default function ArchiveItem({ item, onOpen, priority = false }: Props) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [videoLoad, setVideoLoad] = useState(priority);
  const [visible, setVisible] = useState(false);

  // Scroll-based reveal animation. The first row is on screen at once and stays put:
  // fading it out and back in on hydration only makes the page look unfinished.
  useEffect(() => {
    const el = buttonRef.current;
    if (!el || priority) return;

    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.7s var(--ease-quint), transform 0.7s var(--ease-quint)";

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

  // Video: the queue decides when it downloads; it plays only while on screen
  useEffect(() => {
    const el = buttonRef.current;
    if (!el || !item.videoSrc) return;
    const unregister = registerVideo(el, setVideoLoad, priority);
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => setVisible(entry.isIntersecting)),
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => {
      unregister();
      observer.disconnect();
    };
  }, [item.videoSrc, priority]);

  const handleBuffered = useCallback(() => {
    if (buttonRef.current) videoBuffered(buttonRef.current);
  }, []);

  const handleImageLoad = useCallback(() => {
    setImgLoaded(true);
  }, []);

  // Если картинка уже в кеше — onLoad не сработает, проверяем вручную
  useEffect(() => {
    if (imgRef.current?.complete) setImgLoaded(true);
  }, []);

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={() => onOpen(item)}
      aria-label={item.label}
      className="mb-3 block w-full cursor-pointer rounded-[12px] text-left outline-none focus-visible:ring-1 focus-visible:ring-black/30"
    >
      <div
        // The shots are all on a near-black stage: a card that is still loading looks like one, not like a hole
        className="relative w-full overflow-hidden rounded-[12px] bg-[#0b0b0c]"
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
            fetchPriority={priority ? "high" : "auto"}
            decoding="async"
            onLoad={handleImageLoad}
          />
        )}

        {item.videoSrc && (
          <LoopVideo
            poster={item.poster}
            alt={item.label}
            h264={item.videoSrc}
            av1={item.videoAv1Src}
            load={videoLoad}
            play={visible}
            eager={priority}
            onBuffered={handleBuffered}
          />
        )}
      </div>
    </button>
  );
}
