// Grid videos download a couple at a time, top of the page first: on a slow
// connection the first cards start playing quickly instead of every video
// sharing the bandwidth and all of them starting late.

const MAX_LOADING = 2;
const STALL_MS = 6000;

const waiting = new Set<HTMLVideoElement>();
let loading = 0;

function pump() {
  while (loading < MAX_LOADING && waiting.size > 0) {
    const next = [...waiting].sort(
      (a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top
    )[0];
    waiting.delete(next);
    start(next);
  }
}

function start(video: HTMLVideoElement) {
  loading++;
  let done = false;
  const finish = () => {
    if (done) return;
    done = true;
    loading--;
    clearTimeout(timer);
    video.removeEventListener("canplaythrough", finish);
    video.removeEventListener("error", finish, true);
    pump();
  };
  // A stalled download must not block the rest of the queue
  const timer = setTimeout(finish, STALL_MS);
  video.addEventListener("canplaythrough", finish);
  video.addEventListener("error", finish, true);
  video.preload = "auto";
  if (video.readyState >= HTMLMediaElement.HAVE_ENOUGH_DATA) finish();
}

export function queueVideo(video: HTMLVideoElement) {
  if (video.preload === "auto") {
    // First-row videos start from the HTML itself; count them while they still load
    if (video.readyState < HTMLMediaElement.HAVE_ENOUGH_DATA) start(video);
    return;
  }
  waiting.add(video);
  pump();
}

export function unqueueVideo(video: HTMLVideoElement) {
  waiting.delete(video);
}
