"use client";

import { useEffect, useRef, useState } from "react";

// AV1 main profile, level 4.0, 8-bit: browsers without an AV1 decoder skip to the H.264 source
export const AV1_TYPE = 'video/mp4; codecs="av01.0.08M.08"';

// Where each clip last played, by clock id (the H.264 URL unless set): the lightbox continues
// from the card's frame
const clock = new Map<string, number>();
export const clipTime = (src: string) => clock.get(src) ?? 0;

type Props = {
  // First frame of the video, shown until the video is really playing
  poster?: string;
  alt: string;
  h264: string;
  av1?: string;
  // Attach the sources (starts the download). Off again drops the video and frees its memory.
  load: boolean;
  play: boolean;
  // Sources are in the server HTML, so the download starts before any JS runs
  eager?: boolean;
  // The poster is on screen as the page loads: fetch it first
  posterPriority?: boolean;
  // Clock this video reports its time to (default: its H.264 URL)
  clockId?: string;
  // Clock to start from and, for a copy taking over from another, to match before showing
  syncWith?: string;
  onPlaying?: () => void;
  onBuffered?: () => void;
};

export default function LoopVideo({
  poster,
  alt,
  h264,
  av1,
  load,
  play,
  eager = false,
  posterPriority = eager,
  clockId = h264,
  syncWith,
  onPlaying,
  onBuffered,
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  // Safari in Low Power Mode refuses every video, muted or not: it either rejects play() or
  // reports "playing" and pauses at once at 0 s. The poster then stays.
  const [refused, setRefused] = useState(false);
  const attached = useRef(eager);
  const synced = useRef(false);
  // A copy taking over from another one (the HD video in the lightbox). It downloads a little
  // ahead of where the other copy plays and starts only when that copy reaches that point: on a
  // slow connection it could never catch up by playing from behind.
  const follower = !!syncWith && syncWith !== h264 && syncWith !== clockId;
  const [caughtUp, setCaughtUp] = useState(!follower);

  // Attach or detach the sources; <source> changes only take effect after load()
  useEffect(() => {
    const video = videoRef.current;
    if (!video || load === attached.current) return;
    attached.current = load;
    video.preload = load ? "auto" : "none";
    video.load();
  }, [load]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !syncWith || caughtUp) return;
    const check = () => {
      const target = clipTime(syncWith) + 0.05;
      for (let i = 0; i < video.buffered.length; i++) {
        if (video.buffered.start(i) <= target && target + 1 <= video.buffered.end(i)) {
          video.currentTime = target;
          setCaughtUp(true);
        }
      }
    };
    const timer = setInterval(check, 100);
    return () => clearInterval(timer);
  }, [syncWith, caughtUp]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !load || refused || !caughtUp) return;
    if (!play) {
      video.pause();
      return;
    }
    video.play().catch((err: DOMException) => {
      if (err.name === "NotAllowedError") setRefused(true);
    });
  }, [play, load, refused, caughtUp]);

  // A refused video may start from a user gesture: retry on the first click or key press
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !refused) return;
    const retry = () => {
      video.play().then(() => setRefused(false), () => {});
    };
    const opts = { once: true, capture: true } as const;
    document.addEventListener("pointerdown", retry, opts);
    document.addEventListener("keydown", retry, opts);
    return () => {
      document.removeEventListener("pointerdown", retry, opts);
      document.removeEventListener("keydown", retry, opts);
    };
  }, [refused]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !onBuffered) return;
    if (video.readyState >= HTMLMediaElement.HAVE_ENOUGH_DATA) onBuffered();
    video.addEventListener("canplaythrough", onBuffered);
    return () => video.removeEventListener("canplaythrough", onBuffered);
  }, [onBuffered]);

  return (
    <>
      {/* Transparent until it plays: a video that cannot start shows neither an empty frame nor
          Safari's play button. Opacity only: toggling visibility makes Safari draw the video shifted. */}
      <video
        ref={videoRef}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${playing ? "opacity-100" : "opacity-0"}`}
        muted
        loop
        playsInline
        autoPlay={eager && !follower}
        preload={eager ? "auto" : "none"}
        // Shown only once time really moves: Safari can report "playing" for a video it never starts
        onTimeUpdate={(e) => {
          const v = e.currentTarget;
          if (!v.paused) clock.set(clockId, v.currentTime);
          if (playing || v.paused || v.currentTime === 0) return;
          // A copy that takes over from another one is shown only when it is on the same frame,
          // so the swap never jumps. Behind (it buffered): seek ahead once that part is downloaded.
          if (follower && syncWith) {
            const target = clipTime(syncWith);
            if (Math.abs(target - v.currentTime) > 0.1) {
              const ahead = target + 0.1;
              for (let i = 0; i < v.buffered.length; i++) {
                if (v.buffered.start(i) <= ahead && ahead + 0.5 <= v.buffered.end(i)) v.currentTime = ahead;
              }
              return;
            }
          }
          setPlaying(true);
          onPlaying?.();
        }}
        onPause={(e) => {
          // Paused at 0 s although we asked it to play: the browser refused it
          if (play && !playing && e.currentTarget.currentTime === 0) setRefused(true);
        }}
        onEmptied={() => setPlaying(false)}
        // Start on the frame the other copy is on; a follower starts downloading 2.5 s ahead of it
        onLoadedMetadata={(e) => {
          if (!syncWith || synced.current) return;
          synced.current = true;
          const v = e.currentTarget;
          v.currentTime = follower ? (clipTime(syncWith) + 2.5) % v.duration : clipTime(syncWith);
        }}
      >
        {av1 && <source src={load ? av1 : undefined} type={AV1_TYPE} />}
        <source src={load ? h264 : undefined} type="video/mp4" />
      </video>
      {poster && (
        <img
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${playing ? "pointer-events-none opacity-0" : "opacity-100"}`}
          src={poster}
          alt={alt}
          decoding="async"
          fetchPriority={posterPriority ? "high" : "auto"}
          loading={posterPriority ? "eager" : "lazy"}
        />
      )}
    </>
  );
}
