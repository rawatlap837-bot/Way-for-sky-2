import { useRef, useEffect, useState } from "react";

// All 14 pilot scholarship winner images
const pilotNumbers = [1, 2, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

const pilotImages = pilotNumbers.map((num, idx) => ({
  src: `/Pilots/pilot-${num}.jpeg`,
  alt: `WayForSky Scholarship Pilot ${idx + 1}`,
}));

function PilotCarousel() {
  const trackRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragState = useRef({ startX: 0, scrollLeft: 0 });

  // Auto-scroll slowly to the right
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let animId;
    let speed = 0.5; // px per frame

    const step = () => {
      if (!isDragging) {
        track.scrollLeft += speed;

        // Loop back when reaching the end
        if (track.scrollLeft >= track.scrollWidth - track.clientWidth - 1) {
          track.scrollLeft = 0;
        }
      }
      animId = requestAnimationFrame(step);
    };

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [isDragging]);

  // Mouse drag handlers
  const handleMouseDown = (e) => {
    setIsDragging(true);
    dragState.current.startX = e.pageX - trackRef.current.offsetLeft;
    dragState.current.scrollLeft = trackRef.current.scrollLeft;
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - trackRef.current.offsetLeft;
    const walk = (x - dragState.current.startX) * 1.5;
    trackRef.current.scrollLeft = dragState.current.scrollLeft - walk;
  };

  const handleMouseUp = () => setIsDragging(false);

  // Touch drag handlers
  const handleTouchStart = (e) => {
    setIsDragging(true);
    dragState.current.startX = e.touches[0].pageX - trackRef.current.offsetLeft;
    dragState.current.scrollLeft = trackRef.current.scrollLeft;
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - trackRef.current.offsetLeft;
    const walk = (x - dragState.current.startX) * 1.5;
    trackRef.current.scrollLeft = dragState.current.scrollLeft - walk;
  };

  const handleTouchEnd = () => setIsDragging(false);

  return (
    <section className="bg-navy py-10 sm:py-14 md:py-16">
      {/* Tagline */}
      <div className="mx-auto mb-8 max-w-3xl px-4 text-center sm:mb-10">
        <h2 className="text-xl font-extrabold leading-tight text-white sm:text-2xl md:text-3xl">
          100% Scholarship. 100% Dreams.
        </h2>
        <p className="mt-2 text-sm font-medium text-[#8fa8c1] sm:text-base md:text-lg">
          Meet the Next Generation of Pilots
        </p>
      </div>

      {/* Carousel */}
      <div
        ref={trackRef}
        className="flex gap-4 overflow-x-auto px-4 sm:gap-5 sm:px-6 md:gap-6 md:px-8"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
          cursor: isDragging ? "grabbing" : "grab",
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Render images twice for seamless loop feel */}
        {[...pilotImages, ...pilotImages].map((img, idx) => (
          <div
            key={idx}
            className="shrink-0 overflow-hidden rounded-xl shadow-lg sm:rounded-2xl"
          >
            <img
              src={img.src}
              alt={img.alt}
              draggable={false}
              loading="lazy"
              className="h-[260px] w-[200px] select-none object-cover sm:h-[320px] sm:w-[240px] md:h-[380px] md:w-[280px]"
            />
          </div>
        ))}
      </div>

      {/* Hide scrollbar globally for this component */}
      <style>{`
        div::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
}

export default PilotCarousel;
