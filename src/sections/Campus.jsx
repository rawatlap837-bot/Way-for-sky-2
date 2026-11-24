import { useEffect, useRef, useState } from "react";
import Section from "../components/Section.jsx";
import SectionHeading from "../components/SectionHeading.jsx";

const campusImages = [
  "/campus-optimized/WhatsApp Image 2026-11-23 at 4.03.49 PM.webp",
  "/campus-optimized/WhatsApp Image 2026-11-23 at 4.03.50 PM.webp",
  "/campus-optimized/WhatsApp Image 2026-11-23 at 4.03.50 PM (1).webp",
  "/campus-optimized/WhatsApp Image 2026-11-23 at 4.03.50 PM (2).webp",
  "/campus-optimized/WhatsApp Image 2026-11-23 at 4.03.51 PM.webp",
  "/campus-optimized/WhatsApp Image 2026-11-23 at 4.03.51 PM (1).webp",
  "/campus-optimized/WhatsApp Image 2026-11-23 at 4.03.51 PM (2).webp",
  "/campus-optimized/WhatsApp Image 2026-11-23 at 4.03.52 PM.webp",
  "/campus-optimized/WhatsApp Image 2026-11-23 at 4.03.52 PM (1).webp",
  "/campus-optimized/WhatsApp Image 2026-11-23 at 4.03.52 PM (2).webp",
  "/campus-optimized/WhatsApp Image 2026-11-23 at 4.03.53 PM.webp",
  "/campus-optimized/WhatsApp Image 2026-11-23 at 4.03.53 PM (1).webp",
  "/campus-optimized/WhatsApp Image 2026-11-23 at 4.08.41 PM.webp",
  "/campus-optimized/WhatsApp Image 2026-11-23 at 4.08.42 PM.webp",
  "/campus-optimized/WhatsApp Image 2026-11-23 at 4.08.42 PM (1).webp",
  "/campus-optimized/WhatsApp Image 2026-11-23 at 4.08.42 PM (2).webp",
];

// Big classroom photo with a caption (id="campus").
function Campus() {
  const [activeIndex, setActiveIndex] = useState(0);
  const timeoutRef = useRef(null);

  function showSlide(index) {
    setActiveIndex((index + campusImages.length) % campusImages.length);
  }

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      showSlide(activeIndex + 1);
    }, 4200);

    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, [activeIndex]);

  return (
    <Section id="campus" className="border-y border-[#173956] bg-[#071D36] text-white">
      <SectionHeading
        className="mb-10"
        eyebrow="Inside the Academy"
        title="A learning space built around aviation."
        text="Give students and parents a closer look at the classroom environment, learning tools and the way lessons are delivered."
        light
      />

      <div className="relative h-[290px] overflow-hidden rounded-3xl shadow-card sm:h-[400px] lg:h-[480px]">
        {campusImages.map((image, index) => (
          <img
            key={image}
            src={image}
            alt={`WayForSky Academy campus view ${index + 1}`}
            loading={index === 0 ? "eager" : "lazy"}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${index === activeIndex ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
          />
        ))}

        <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col gap-1 bg-gradient-to-t from-navy/80 via-navy/25 to-transparent px-6 pb-5 pt-14 text-white sm:px-8 sm:pb-7">
          <strong className="text-lg sm:text-xl">WayForSky Aviation Academy</strong>
          <span className="text-xs text-[#d7e4ef]">
            Classroom environment · Digital learning · DGCA subject preparation
          </span>
        </div>
      </div>
    </Section>
  );
}

export default Campus;
