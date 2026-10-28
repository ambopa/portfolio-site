"use client";

import { useEffect, useRef, useState } from "react";

// AV1 main profile, level 4.0, 8-bit: browsers without an AV1 decoder skip to the H.264 source
export const AV1_TYPE = 'video/mp4; codecs="av01.0.08M.08"';

type Props = {
  // First frame of the video. It sits on top until the video is really playing, so a visitor
  // always sees the picture at once and never sees an empty box or the browser's play button.
  poster?: string;
  alt: string;
  h264: string;
  av1?: string;
  // Attach the sources (starts the download). Off again cancels a download that is no longer needed.
  load: boolean;
  play: boolean;
  // Sources are in the server HTML, so the download starts before any JS runs
  eager?: boolean;
  // Safari in Low Power Mode refuses every video, muted or not, but still animates an MP4
  // given to <img>. Use that when playback is refused.
  imageFallback?: boolean;
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
  imageFallback = true,
  onPlaying,
  onBuffered,
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [refused, setRefused] = useState(false);
  const [fallbackShown, setFallbackShown] = useState(false);
  const attached = useRef(eager);

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
    if (!video || !load || refused) return;
    if (!play) {
      video.pause();
      return;
    }
    video.play().catch((err: DOMException) => {
      if (err.name === "NotAllowedError") setRefused(true);
    });
  }, [play, load, refused]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !onBuffered) return;
    if (video.readyState >= HTMLMediaElement.HAVE_ENOUGH_DATA) onBuffered();
    video.addEventListener("canplaythrough", onBuffered);
    return () => video.removeEventListener("canplaythrough", onBuffered);
  }, [onBuffered]);

  const showPoster = !playing && !fallbackShown;

  return (
    <>
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        muted
        loop
        playsInline
        autoPlay={eager}
        preload={eager ? "auto" : "none"}
        onPlaying={() => {
          setPlaying(true);
          onPlaying?.();
        }}
      >
        {av1 && <source src={load ? av1 : undefined} type={AV1_TYPE} />}
        <source src={load ? h264 : undefined} type="video/mp4" />
      </video>
      {refused && imageFallback && (
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src={h264}
          alt=""
          aria-hidden
          onLoad={() => setFallbackShown(true)}
        />
      )}
      {poster && (
        <img
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${showPoster ? "opacity-100" : "pointer-events-none opacity-0"}`}
          src={poster}
          alt={alt}
          decoding="async"
          fetchPriority={eager ? "high" : "auto"}
          loading={eager ? "eager" : "lazy"}
        />
      )}
    </>
  );
}
