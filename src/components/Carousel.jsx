import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Horizontal scrolling row with previous / next arrows.
// Put the cards inside it. Each card should have "shrink-0 snap-start"
// and a fixed width, for example "w-72".
function Carousel({ label, children }) {
  const trackRef = useRef(null);

  function scrollCards(direction) {
    const track = trackRef.current;
    // Move about 80% of the visible width each click.
    track.scrollBy({ left: direction * track.clientWidth * 0.8, behavior: "smooth" });
  }

  const arrowClass =
    "grid h-10 w-10 place-items-center rounded-full border border-line bg-white text-navy transition hover:bg-navy hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand";

  return (
    <div>
      <div
        ref={trackRef}
        aria-label={label}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-0.5 pb-4 pt-1 [scrollbar-width:thin]"
      >
        {children}
      </div>

      <div className="mt-2 flex justify-end gap-2">
        <button type="button" onClick={() => scrollCards(-1)} className={arrowClass} aria-label="Previous">
          <ChevronLeft size={20} />
        </button>
        <button type="button" onClick={() => scrollCards(1)} className={arrowClass} aria-label="Next">
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}

export default Carousel;
