import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import Section from "../components/Section.jsx";
import SectionHeading from "../components/SectionHeading.jsx";

// ---------- Auto-scroll settings ----------
const autoScrollSpeed = 45; // how fast it glides (pixels per second)
const autoScrollDirection = 1; // 1 = next videos come in from the right, -1 = from the left
const resumeAfter = 2000; // starts gliding again this long (milliseconds) after the user stops

// Public WayForSky YouTube Shorts.
const videos = [
  { type: "Captain Story", title: "Meet Captain Niyati", id: "vAzumSD2GhE" },
  { type: "Student Story", title: "Sindhu’s Pilot Journey", id: "jdkrE3Llbu0" },
  { type: "Scholarship Story", title: "Nishanth Wins DGCA Classes", id: "FM-f5DskY38" },
  { type: "Student Story", title: "Gagan’s Aviation Dream", id: "EJxlQcWVbDQ" },
  { type: "Captain Story", title: "Mrityunjay’s Captain Story", id: "Prpy6Hgc7uI" },
  { type: "Captain Story", title: "Straight From Captain Khalid", id: "tG5KTxr4SDU" },
  { type: "Captain Story", title: "Captain Navdeep’s Advice", id: "F9m0xmStO18" },
  { type: "Captain Story", title: "Captain Devashree’s Journey", id: "4Rc5naWY1Jk" },
  { type: "Student Story", title: "Daniya Shares Her Experience", id: "f2dt6yPpFd4" },
  { type: "Student Story", title: "Hajira Speaks About Her Journey", id: "n68JOgF2DXU" },
  { type: "Student Story", title: "Farida’s Journey to the Cockpit", id: "XCb_bgH2Q6g" },
  { type: "Student Story", title: "Junaid on Choosing WayForSky", id: "dUn17fLj9YU" },
  { type: "Scholarship Story", title: "Shiny Wins Free DGCA Classes", id: "6cxCaWU7GHc" },
  { type: "Scholarship Story", title: "Hannah Wins a Scholarship", id: "GIEYHhcJxxk" },
  { type: "Scholarship Story", title: "Surya’s Pilot Dream", id: "1a64-TgglaE" },
  { type: "Student Story", title: "Aishwarya Starts Her Journey", id: "6rO5_X0dIiA" },
  { type: "Scholarship Story", title: "Sharath Wins a Scholarship", id: "OuPhp3qdISY" },
  { type: "Student Story", title: "Noumith’s Scholarship Experience", id: "HQN6UedeWRI" },
  { type: "Student Story", title: "Javeriya Starts Her Journey", id: "ExiRqQtZK_w" },
  { type: "Pilot Story", title: "Pilot Reacts to the Initiative", id: "osiC6Oo2Hn4" },
  { type: "Scholarship Story", title: "Sharath Gets 100% Scholarship", id: "-EE1sGDLGhU" },
  { type: "Scholarship Story", title: "Noumith Wins DGCA Scholarship", id: "HqfWoOw8Hb0" },
  { type: "Scholarship Story", title: "Surya Gets 100% Scholarship", id: "4LBzwVQC4Ps" },
  { type: "Scholarship Story", title: "100% DGCA Scholarship Winner", id: "QXpUlod7GUo" },
];

// The list is shown twice in a row, so when the first copy ends the second copy
// looks exactly the same and the slider can jump back without anyone noticing.
const loopedVideos = [...videos, ...videos];

// Width of one full copy of the list (used for the endless loop)
function getLoopWidth(scroller) {
  const cards = scroller.children;
  return cards[videos.length].offsetLeft - cards[0].offsetLeft;
}

// Width of one card plus the gap (used by the arrow buttons)
function getStep(scroller) {
  const cards = scroller.children;
  return cards[1].offsetLeft - cards[0].offsetLeft;
}

function VideoTestimonials() {
  const [activeVideo, setActiveVideo] = useState(null);

  const wrapperRef = useRef(null);
  const scrollerRef = useRef(null);

  // Notes for the auto-scroll. Changing these does not redraw the page.
  const control = useRef({
    hovering: false, // mouse is over the slider
    pressing: false, // finger or mouse button is down
    focused: false, // a card is selected with the keyboard
    inView: false, // slider is visible on screen
    videoOpen: false, // video popup is open
    lastInteraction: 0, // time of the last touch, scroll, click or key press
  });

  // Call this whenever the user does something with the slider
  function markInteraction() {
    control.current.lastInteraction = performance.now();
  }

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
        state.hovering || state.pressing || state.focused || state.videoOpen || !state.inView || waiting;

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

  // While a video popup is open: stop the slider, and let Escape close the popup
  useEffect(() => {
    control.current.videoOpen = Boolean(activeVideo);
    markInteraction();

    if (!activeVideo) return;

    function handleEscape(event) {
      if (event.key === "Escape") setActiveVideo(null);
    }

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [activeVideo]);

  // Arrow buttons: direction is -1 (back) or 1 (forward)
  function moveBy(direction) {
    markInteraction();
    const scroller = scrollerRef.current;
    const distance = getStep(scroller) * 2;

    // At the very start, jump to the same spot in the second copy, then go back
    if (direction < 0 && scroller.scrollLeft < distance) {
      scroller.scrollTo({ left: scroller.scrollLeft + getLoopWidth(scroller), behavior: "instant" });
    }

    scroller.scrollBy({ left: direction * distance, behavior: "smooth" });
  }

  return (
    <Section id="testimonial-shorts" className="overflow-hidden border-y border-[#e3ebf1] bg-white">
      <SectionHeading
        className="mb-8 sm:mb-10"
        eyebrow="Real Voices · Short Stories"
        title="Student, Parent And Captain Video Stories."
        text="Watch authentic WayForSky experiences shared through YouTube Shorts."
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
          aria-label="WayForSky YouTube Shorts"
          className="-mx-4 flex gap-3 overflow-x-auto overscroll-x-contain px-4 pb-4 [scroll-behavior:auto] [scrollbar-width:none] sm:-mx-5 sm:px-5 md:mx-0 md:px-0 [&::-webkit-scrollbar]:hidden"
        >
          {loopedVideos.map((video, index) => {
            // The second copy is only there for the endless loop
            const isCopy = index >= videos.length;

            return (
              <button
                key={`${video.id}-${index}`}
                type="button"
                tabIndex={isCopy ? -1 : 0}
                aria-hidden={isCopy}
                onClick={() => setActiveVideo(video.id)}
                aria-label={`Play video: ${video.title}`}
                className="w-[178px] shrink-0 overflow-hidden rounded-2xl border border-line bg-white text-left shadow-[0_7px_20px_rgba(7,29,54,0.05)] sm:w-48"
              >
                <div className="relative aspect-[9/16] overflow-hidden bg-navy">
                  <img
                    src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
                    alt={isCopy ? "" : video.title}
                    loading="lazy"
                    draggable="false"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent" />
                  <span className="absolute left-1/2 top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/95 pl-0.5 text-[#155b91] shadow-xl">
                    <Play size={19} fill="currentColor" />
                  </span>
                </div>

                <div className="p-3.5">
                  <span className="text-[9px] font-black tracking-wider text-[#4380ae] sm:text-[10px]">
                    {video.type}
                  </span>
                  <h3 className="mt-1 text-[13px] font-bold leading-tight text-navy sm:text-sm">
                    {video.title}
                  </h3>
                </div>
              </button>
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

      {activeVideo && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="WayForSky YouTube Short"
          className="fixed inset-0 z-[70] flex items-center justify-center bg-[#061827]/90 p-3 backdrop-blur-sm"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="relative h-[min(88vh,720px)] w-full max-w-[405px] overflow-hidden rounded-2xl bg-black shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveVideo(null)}
              aria-label="Close video"
              className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-white text-navy shadow-lg"
            >
              <X size={18} />
            </button>

            <iframe
              className="h-full w-full"
              src={`https://www.youtube-nocookie.com/embed/${activeVideo}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
              title="WayForSky YouTube Short"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </Section>
  );
}

export default VideoTestimonials;