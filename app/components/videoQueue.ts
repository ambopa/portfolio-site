// Decides which grid videos may download right now.
//
// On a slow connection every video downloading at once shares the bandwidth and all of them
// start late, so only a few load at a time. The order is by distance to what is on screen now,
// not by position on the page: a visitor who scrolls fast gets the cards in front of them first.
// A video that left the area around the screen is dropped: an unfinished download is cancelled to
// free the line, a finished one gives its decoder memory back (Safari reloads a page that keeps
// a dozen decoded videos). Coming back costs nothing: the file is still in the HTTP cache.

const MAX_LOADING = 3;
// A slow file stops holding a slot after this long; it keeps downloading in the background
const SLOT_MS = 5000;
// "Near" = within one screen height above or below the viewport: downloads start there
const NEAR_MARGIN = "100% 0px";
// A downloaded video is dropped only farther than three screens: scrolling back and forth
// never restarts the videos around the screen
const KEEP_MARGIN = "300% 0px";

type Entry = {
  setLoad: (load: boolean) => void;
  near: boolean;
  keep: boolean;
  // The observer has reported this card's position at least once
  seen: boolean;
  state: "idle" | "loading" | "done";
  timer?: ReturnType<typeof setTimeout>;
};

const entries = new Map<Element, Entry>();
let observer: IntersectionObserver | null = null;
let keepObserver: IntersectionObserver | null = null;

function distanceToViewport(el: Element) {
  const r = el.getBoundingClientRect();
  if (r.bottom > 0 && r.top < window.innerHeight) return 0;
  return r.top >= window.innerHeight ? r.top - window.innerHeight : -r.bottom;
}

function release(entry: Entry, state: Entry["state"]) {
  clearTimeout(entry.timer);
  entry.state = state;
}

// Images first: until the page has loaded its pictures, videos would only slow them down
let pageLoaded = false;

function pump() {
  if (!pageLoaded) return;
  let loading = 0;
  for (const entry of entries.values()) {
    if (entry.state === "idle") continue;
    if (entry.seen && (entry.state === "loading" ? !entry.near : !entry.keep)) {
      release(entry, "idle");
      entry.setLoad(false);
    } else if (entry.state === "loading") loading++;
  }
  const waiting = [...entries]
    .filter(([, e]) => e.state === "idle" && e.near)
    .sort(([a], [b]) => distanceToViewport(a) - distanceToViewport(b));
  // A card on screen must not wait behind downloads for cards that are not: cancel the farthest
  const onScreenWaiting = waiting.filter(([el]) => distanceToViewport(el) === 0).length;
  const offScreenLoading = [...entries]
    .filter(([el, e]) => e.state === "loading" && distanceToViewport(el) > 0)
    .sort(([a], [b]) => distanceToViewport(b) - distanceToViewport(a));
  for (let i = 0; i < onScreenWaiting && loading >= MAX_LOADING && i < offScreenLoading.length; i++) {
    const [, entry] = offScreenLoading[i];
    release(entry, "idle");
    entry.setLoad(false);
    loading--;
  }
  for (const [, entry] of waiting) {
    if (loading >= MAX_LOADING) break;
    loading++;
    entry.state = "loading";
    entry.timer = setTimeout(() => {
      release(entry, "done");
      pump();
    }, SLOT_MS);
    entry.setLoad(true);
  }
}

function getObserver() {
  if (!observer) {
    if (document.readyState === "complete") pageLoaded = true;
    else
      window.addEventListener(
        "load",
        () => {
          pageLoaded = true;
          pump();
        },
        { once: true }
      );
  }
  observer ??= new IntersectionObserver(
    (records) => {
      for (const r of records) {
        const entry = entries.get(r.target);
        if (!entry) continue;
        entry.near = r.isIntersecting;
        entry.seen = true;
      }
      pump();
    },
    { rootMargin: NEAR_MARGIN }
  );
  keepObserver ??= new IntersectionObserver(
    (records) => {
      for (const r of records) {
        const entry = entries.get(r.target);
        // A card hidden by a filter has no size: keep its video, the filter will bring it back
        if (entry) entry.keep = r.isIntersecting || r.boundingClientRect.height === 0;
      }
      pump();
    },
    { rootMargin: KEEP_MARGIN }
  );
  return observer;
}

// `el` is the card (observing the card, not the video inside it)
export function registerVideo(el: Element, setLoad: (load: boolean) => void) {
  const entry: Entry = { setLoad, near: false, keep: false, seen: false, state: "idle" };
  entries.set(el, entry);
  getObserver().observe(el);
  keepObserver?.observe(el);
  return () => {
    const entry = entries.get(el);
    if (entry) clearTimeout(entry.timer);
    entries.delete(el);
    observer?.unobserve(el);
    keepObserver?.unobserve(el);
    pump();
  };
}

export function videoBuffered(el: Element) {
  const entry = entries.get(el);
  if (!entry || entry.state === "done") return;
  release(entry, "done");
  pump();
}
