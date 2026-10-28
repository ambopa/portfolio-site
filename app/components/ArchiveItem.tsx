"use client";

import { useEffect, useRef, useState, useCallback, type CSSProperties } from "react";
import type { ArchiveItemType } from "@/app/data/items";
import LoopVideo from "./LoopVideo";
import { registerVideo, videoBuffered } from "./videoQueue";

type Props = {
  item: ArchiveItemType;
  onOpen: (item: ArchiveItemType) => void;
  // In the first row of the page as it loads; read once, at mount
  priority?: boolean;
  // false while a filter hides the card. A hidden card stays mounted, so its image, poster and
  // video are still there when the filter is switched back.
  shown?: boolean;
  style?: CSSProperties;
};

const REVEAL = "opacity 0.7s var(--ease-quint), transform 0.7s var(--ease-quint)";

export default function ArchiveItem({ item, onOpen, priority = false, shown = true, style }: Props) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [eager] = useState(priority);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [videoLoad, setVideoLoad] = useState(false);
  const [visible, setVisible] = useState(false);
  const wasShown = useRef(shown);

  // Scroll-based reveal animation. The first row is on screen at once and stays put:
  // fading it out and back in on hydration only makes the page look unfinished.
  useEffect(() => {
    const el = buttonRef.current;
    if (!el || eager) return;

    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = REVEAL;

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
  }, [eager]);

  // A card a filter brings back fades in the same way, photo or video alike
  useEffect(() => {
    const el = buttonRef.current;
    if (!el || shown === wasShown.current) return;
    wasShown.current = shown;
    if (!shown) return;
    el.style.transition = "none";
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    const frame = requestAnimationFrame(() => {
      el.style.transition = REVEAL;
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    });
    return () => cancelAnimationFrame(frame);
  }, [shown]);

  // Video: the queue decides when it downloads; it plays only while on screen
  useEffect(() => {
    const el = buttonRef.current;
    if (!el || !item.videoSrc) return;
    const unregister = registerVideo(el, setVideoLoad);
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => setVisible(entry.isIntersecting)),
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => {
      unregister();
      observer.disconnect();
    };
  }, [item.videoSrc]);

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
      aria-hidden={!shown}
      tabIndex={shown ? undefined : -1}
      className="block w-full cursor-pointer rounded-[12px] text-left outline-none focus-visible:ring-1 focus-visible:ring-black/30"
      style={{ ...style, display: shown ? undefined : "none" }}
    >
      <div
        // The shots are all on a near-black stage: a card that is still loading looks like one, not like a hole.
        // Own compositing layer: without it Safari can draw a video inside the rounded clip shifted.
        className="relative w-full overflow-hidden rounded-[12px] bg-[#0b0b0c] [transform:translateZ(0)]"
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
            loading={eager ? "eager" : "lazy"}
            fetchPriority={eager ? "high" : "auto"}
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
            posterPriority={eager}
            onBuffered={handleBuffered}
          />
        )}
      </div>
    </button>
  );
}
