import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Section from "../components/Section.jsx";
import SectionHeading from "../components/SectionHeading.jsx";

// ---------- Auto-scroll settings ----------
const autoScrollSpeed = 45; // how fast it glides (pixels per second)
const autoScrollDirection = 1; // 1 = next videos come in from the right, -1 = from the left
const resumeAfter = 2000; // starts gliding again this long (milliseconds) after the user stops

// Public WayForSky YouTube Shorts.
const videoFeedback = [
  { title: "Shruthi’s Pilot Journey", id: "aB6yQ9Ddhpo" },
  { title: "Benitha’s Honest Review", id: "JKV2JG2TESg" },
  { title: "Why Rayan Chose WayForSky", id: "bOVebXx5Xpk" },
  { title: "Arshiya’s Honest Story", id: "AJq6mUPIx-8" },
  { title: "Junaid’s One-Minute Review", id: "N9vmVesK5sc" },
  { title: "Kavya’s WayForSky Experience", id: "gR8KjqkhEbs" },
  { title: "Adil Shares Honest Feedback", id: "vDSXvmXoJbg" },
];

// Remove any video that is listed twice
const uniqueVideoFeedback = videoFeedback.filter(
  (item, index, items) => items.findIndex((entry) => entry.id === item.id) === index
);

// The list is shown three times in a row, so when one copy ends the next copy
// looks exactly the same and the slider can jump back without anyone noticing.
const loopedVideos = [...uniqueVideoFeedback, ...uniqueVideoFeedback, ...uniqueVideoFeedback];

// Width of one full copy of the list (used for the endless loop)
function getLoopWidth(scroller) {
  const cards = scroller.children;
  return cards[uniqueVideoFeedback.length].offsetLeft - cards[0].offsetLeft;
}

// Width of one card plus the gap (used by the arrow buttons)
function getStep(scroller) {
  const cards = scroller.children;
  return cards[1].offsetLeft - cards[0].offsetLeft;
}

/* ---------- Load the YouTube player script only once ---------- */
let youTubeApiPromise;

function loadYouTubeApi() {
  if (window.YT && window.YT.Player) return Promise.resolve(window.YT);

  if (!youTubeApiPromise) {
    youTubeApiPromise = new Promise((resolve) => {
      const previousCallback = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (previousCallback) previousCallback();
        resolve(window.YT);
      };
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(script);
    });
  }

  return youTubeApiPromise;
}

/* ---------- Small icons ---------- */
function PlayIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function PauseIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
    </svg>
  );
}

function SoundIcon({ muted, className = "" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      {muted ? (
        <path d="M16.5 12a4.5 4.5 0 0 0-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51A8.8 8.8 0 0 0 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06a8.99 8.99 0 0 0 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
      ) : (
        <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3a4.5 4.5 0 0 0-2.5-4.03v8.05A4.5 4.5 0 0 0 16.5 12z" />
      )}
    </svg>
  );
}

/* ---------- The player: tap anywhere to pause or play ---------- */
// onBusyChange tells the slider when a video is loading or playing,
// so the slider does not move away from a video that is being watched.
function VideoPlayer({ id, title, onBusyChange }) {
  const wrapRef = useRef(null);
  const hostRef = useRef(null);
  const playerRef = useRef(null);

  const [status, setStatus] = useState("loading"); // loading | playing | paused
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0);

  // Tell the slider whether this video is busy (loading or playing)
  useEffect(() => {
    onBusyChange(status !== "paused");
  }, [status, onBusyChange]);

  // When this player is removed, the slider is free to move again
  useEffect(() => {
    return () => onBusyChange(false);
  }, [onBusyChange]);

  // Create the YouTube player
  useEffect(() => {
    let cancelled = false;
    const host = hostRef.current;
    const mount = document.createElement("div");
    host.appendChild(mount);

    loadYouTubeApi().then((YT) => {
      if (cancelled) return;

      playerRef.current = new YT.Player(mount, {
        videoId: id,
        host: "https://www.youtube-nocookie.com",
        width: "100%",
        height: "100%",
        playerVars: {
          autoplay: 1,
          controls: 0,
          rel: 0,
          playsinline: 1,
          modestbranding: 1,
          disablekb: 1,
          fs: 0,
          iv_load_policy: 3,
        },
        events: {
          onReady: (event) => event.target.playVideo(),
          onStateChange: (event) => {
            if (event.data === YT.PlayerState.PLAYING) setStatus("playing");
            if (event.data === YT.PlayerState.PAUSED) setStatus("paused");
            if (event.data === YT.PlayerState.ENDED) setStatus("paused");
          },
        },
      });
    });

    return () => {
      cancelled = true;
      if (playerRef.current && playerRef.current.destroy) playerRef.current.destroy();
      playerRef.current = null;
      host.replaceChildren();
    };
  }, [id]);

  // Update the progress bar while the video plays
  useEffect(() => {
    if (status !== "playing") return;
    const timer = setInterval(() => {
      const player = playerRef.current;
      if (!player || !player.getDuration) return;
      const duration = player.getDuration();
      if (duration > 0) setProgress((player.getCurrentTime() / duration) * 100);
    }, 250);
    return () => clearInterval(timer);
  }, [status]);

  // Pause (do not close) the video when it is scrolled out of view
  useEffect(() => {
    if (!wrapRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const player = playerRef.current;
        if (entry.intersectionRatio < 0.3 && player && player.pauseVideo) {
          player.pauseVideo();
        }
      },
      { threshold: [0.3] }
    );
    observer.observe(wrapRef.current);
    return () => observer.disconnect();
  }, []);

  const togglePlay = () => {
    const player = playerRef.current;
    if (!player) return;
    if (status === "playing") player.pauseVideo();
    else player.playVideo();
  };

  const toggleMute = () => {
    const player = playerRef.current;
    if (!player) return;
    if (muted) player.unMute();
    else player.mute();
    setMuted(!muted);
  };

  const handleSeek = (event) => {
    const player = playerRef.current;
    const value = Number(event.target.value);
    setProgress(value);
    if (player && player.getDuration) player.seekTo((player.getDuration() * value) / 100, true);
  };

  return (
    <div ref={wrapRef} className="absolute inset-0 bg-black">
      {/* YouTube video (controls are hidden, we use our own) */}
      <div
        ref={hostRef}
        className="absolute inset-0 [&_iframe]:h-full [&_iframe]:w-full"
        aria-hidden="true"
      />

      {/* Thumbnail and loader until the video starts */}
      {status === "loading" && (
        <div className="absolute inset-0">
          <img
            src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
            alt=""
            className="h-full w-full object-cover"
          />
          <span className="absolute inset-0 flex items-center justify-center bg-navy/40">
            <span className="h-10 w-10 animate-spin rounded-full border-4 border-white/40 border-t-white" />
          </span>
        </div>
      )}

      {/* Big tap area: tap anywhere on the video to pause or play */}
      <button
        type="button"
        onClick={togglePlay}
        aria-label={status === "playing" ? `Pause video: ${title}` : `Play video: ${title}`}
        className="absolute inset-0 h-full w-full focus:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-white"
      >
        {status === "paused" && (
          <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-xl ring-4 ring-white/40">
            <PlayIcon className="ml-1 h-7 w-7 fill-navy" />
          </span>
        )}
      </button>

      {/* Mute button */}
      <button
        type="button"
        onClick={toggleMute}
        aria-label={muted ? "Unmute video" : "Mute video"}
        className="absolute right-2.5 top-2.5 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/55 transition hover:bg-black/75"
      >
        <SoundIcon muted={muted} className="h-5 w-5 fill-white" />
      </button>

      {/* Bottom bar: pause or play button and progress bar */}
      <div className="absolute inset-x-0 bottom-0 z-10 flex items-center gap-2 bg-gradient-to-t from-black/70 to-transparent px-2.5 pb-2.5 pt-8">
        <button
          type="button"
          onClick={togglePlay}
          aria-label={status === "playing" ? "Pause video" : "Play video"}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/90 transition hover:bg-white"
        >
          {status === "playing" ? (
            <PauseIcon className="h-4 w-4 fill-navy" />
          ) : (
            <PlayIcon className="ml-0.5 h-4 w-4 fill-navy" />
          )}
        </button>

        <input
          type="range"
          min="0"
          max="100"
          step="0.1"
          value={progress}
          onChange={handleSeek}
          aria-label="Video progress"
          className="h-1 w-full cursor-pointer accent-white"
        />
      </div>
    </div>
  );
}

/* ---------- One card ---------- */
// cardKey is different for every card, even for the repeated copies,
// so only the card you tapped turns into a player.
function VideoCard({ item, number, cardKey, isCopy, isPlaying, onPlay, onBusyChange }) {
  const cardRef = useRef(null);

  const handlePlay = () => {
    onPlay(cardKey);
    // Bring the clicked card to the center of the slider.
    if (cardRef.current) {
      cardRef.current.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  };

  return (
    <article
      ref={cardRef}
      aria-hidden={isCopy && !isPlaying}
      className="w-[200px] shrink-0 overflow-hidden rounded-2xl border border-line bg-white shadow-[0_8px_24px_rgba(7,29,54,0.07)] sm:w-[240px]"
    >
      <div className="relative aspect-[9/16] w-full bg-navy">
        {isPlaying ? (
          <VideoPlayer id={item.id} title={item.title} onBusyChange={onBusyChange} />
        ) : (
          <button
            type="button"
            onClick={handlePlay}
            tabIndex={isCopy ? -1 : 0}
            aria-label={`Play video: ${item.title}`}
            className="group absolute inset-0 h-full w-full focus:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-white"
          >
            <img
              src={`https://i.ytimg.com/vi/${item.id}/hqdefault.jpg`}
              alt={isCopy ? "" : item.title}
              loading="lazy"
              draggable="false"
              className="h-full w-full object-cover"
            />
            <span className="absolute inset-0 bg-navy/25 transition group-hover:bg-navy/10" />

            {/* Card number, so cards with the same thumbnail are easy to tell apart */}
            <span className="absolute left-2.5 top-2.5 rounded-full bg-navy/80 px-2 py-0.5 text-[10px] font-extrabold text-white">
              {String(number).padStart(2, "0")}
            </span>

            <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-xl ring-4 ring-white/40 transition group-hover:scale-110">
              <PlayIcon className="ml-1 h-6 w-6 fill-navy" />
            </span>
          </button>
        )}
      </div>

      <div className="p-3.5">
        <h3 className="min-h-[38px] text-[12px] font-extrabold leading-[1.25] text-navy sm:text-[13px]">
          {item.title}
        </h3>
        <a
          href={`https://www.youtube.com/shorts/${item.id}`}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={isCopy ? -1 : 0}
          className="mt-1 inline-block text-[11px] font-bold text-navy/60 underline-offset-2 hover:text-navy hover:underline"
        >
          Watch On YouTube
        </a>
      </div>
    </article>
  );
}

/* ---------- Section ---------- */
function AudioFeedback() {
  const [playingKey, setPlayingKey] = useState(null);

  const wrapperRef = useRef(null);
  const scrollerRef = useRef(null);

  // Notes for the auto-scroll. Changing these does not redraw the page.
  const control = useRef({
    hovering: false, // mouse is over the slider
    pressing: false, // finger or mouse button is down
    focused: false, // a card is selected with the keyboard
    inView: false, // slider is visible on screen
    videoBusy: false, // a video is loading or playing
    lastInteraction: 0, // time of the last touch, scroll, click or key press
  });

  // Call this whenever the user does something with the slider
  function markInteraction() {
    control.current.lastInteraction = performance.now();
  }

  // The video player uses this to say "a video is loading or playing"
  const handleBusyChange = useCallback((busy) => {
    control.current.videoBusy = busy;
    control.current.lastInteraction = performance.now();
  }, []);

  // The auto-scroll loop
  useEffect(() => {
    // People who turned on "reduce motion" on their device get no auto-scroll
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const scroller = scrollerRef.current;
    let position = scroller.scrollLeft;
    let lastTime = performance.now();
    let frame;

    function move(now) {
      // Time since the last frame (limited, so coming back to the tab does not jump)
      const seconds = Math.min(now - lastTime, 50) / 1000;
      lastTime = now;
      const state = control.current;

      // If the slider is not where we left it, the user moved it (swipe, arrows, keys)
      if (Math.abs(scroller.scrollLeft - position) > 2) {
        state.lastInteraction = now;
        position = scroller.scrollLeft;
      }

      const waiting = now - state.lastInteraction < resumeAfter;
      const stopped =
        state.hovering || state.pressing || state.focused || state.videoBusy || !state.inView || waiting;

      if (!stopped) {
        const loopWidth = getLoopWidth(scroller);
        position += autoScrollSpeed * autoScrollDirection * seconds;
        if (position >= loopWidth) position -= loopWidth;
        if (position < 0) position += loopWidth;
        scroller.scrollTo({ left: position, behavior: "instant" });
      }

      frame = requestAnimationFrame(move);
    }

    // A finger or mouse button lifted anywhere on the page
    function release() {
      control.current.pressing = false;
      control.current.lastInteraction = performance.now();
    }

    frame = requestAnimationFrame(move);
    window.addEventListener("pointerup", release);
    window.addEventListener("pointercancel", release);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointerup", release);
      window.removeEventListener("pointercancel", release);
    };
  }, []);

  // Find out when the slider is on screen (no need to move it when nobody sees it)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        control.current.inView = entry.isIntersecting;
      },
      { threshold: 0.2 }
    );
    observer.observe(wrapperRef.current);
    return () => observer.disconnect();
  }, []);

  // Arrow buttons: direction is -1 (back) or 1 (forward)
  function moveBy(direction) {
    markInteraction();
    const scroller = scrollerRef.current;
    const distance = getStep(scroller) * 2;

    // At the very start, jump to the same spot in the next copy, then go back
    if (direction < 0 && scroller.scrollLeft < distance) {
      scroller.scrollTo({ left: scroller.scrollLeft + getLoopWidth(scroller), behavior: "instant" });
    }

    scroller.scrollBy({ left: direction * distance, behavior: "smooth" });
  }

  return (
    <Section id="audio-feedback" className="overflow-hidden border-y border-[#ddeaf3] bg-[#edf5fb]">
      <SectionHeading
        className="mb-10"
        eyebrow="Watch Real Experiences"
        title="Student & parent video feedback."
        text={`Watch ${uniqueVideoFeedback.length} WayForSky student experiences directly inside the page.`}
      />

      <div
        ref={wrapperRef}
        className="relative"
        onPointerEnter={(event) => {
          if (event.pointerType === "mouse") control.current.hovering = true;
        }}
        onPointerLeave={(event) => {
          if (event.pointerType === "mouse") {
            control.current.hovering = false;
            markInteraction();
          }
        }}
        onPointerDown={() => {
          control.current.pressing = true;
          markInteraction();
        }}
        onTouchMove={markInteraction}
        onWheel={markInteraction}
        onKeyDown={markInteraction}
        onFocus={(event) => {
          if (event.target.matches(":focus-visible")) control.current.focused = true;
        }}
        onBlur={() => {
          control.current.focused = false;
          markInteraction();
        }}
      >
        {/* The slider: glides by itself, swipe it or use the arrows any time */}
        <div
          ref={scrollerRef}
          aria-label="Video feedback"
          className="-mx-4 flex gap-3 overflow-x-auto overscroll-x-contain px-4 pb-4 [scroll-behavior:auto] [scrollbar-width:none] sm:-mx-5 sm:px-5 md:mx-0 md:px-0 [&::-webkit-scrollbar]:hidden"
        >
          {loopedVideos.map((item, index) => {
            const cardKey = `${item.id}-${index}`;

            return (
              <VideoCard
                key={cardKey}
                item={item}
                number={(index % uniqueVideoFeedback.length) + 1}
                cardKey={cardKey}
                isCopy={index >= uniqueVideoFeedback.length}
                isPlaying={playingKey === cardKey}
                onPlay={setPlayingKey}
                onBusyChange={handleBusyChange}
              />
            );
          })}
        </div>

        {/* Arrow buttons (tablet and desktop) */}
        <button
          type="button"
          onClick={() => moveBy(-1)}
          aria-label="Previous videos"
          className="absolute left-2 top-[40%] z-10 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-line bg-white text-navy shadow-lg transition hover:bg-[#edf4fa] sm:grid"
        >
          <ChevronLeft size={22} aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => moveBy(1)}
          aria-label="Next videos"
          className="absolute right-2 top-[40%] z-10 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-line bg-white text-navy shadow-lg transition hover:bg-[#edf4fa] sm:grid"
        >
          <ChevronRight size={22} aria-hidden="true" />
        </button>
      </div>
    </Section>
  );
}

export default AudioFeedback;