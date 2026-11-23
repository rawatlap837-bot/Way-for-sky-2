import { useEffect, useRef, useState } from "react";
import {
  BarChart3,
  BookOpen,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  Clock,
  Compass,
  CloudSun,
  Layers,
  MessageSquare,
  MonitorPlay,
  Plane,
  Radio,
  Scale,
  Settings,
  Target,
  Video,
  Wrench,
} from "lucide-react";
import Section from "../components/Section.jsx";
import SectionHeading from "../components/SectionHeading.jsx";

// ---------- Easy-to-edit settings ----------
// The button opens your Register popup (same link the Hero buttons use).
const applyLink = "#register";

// Same on every subject card
const learningMode = "Online | Offline | Hybrid";
const classSchedule = "Weekday & Weekend Batches";

// Training inclusions are the same for most subjects
const standardInclusions = [
  "Live Interactive Classes",
  "Comprehensive Study Notes",
  "Practice Questions & Mock Tests",
  "Doubt-Clearing Sessions",
  "DGCA Exam Preparation & Guidance",
];

// The six subject cards.
// icon -> the big faded icon in the blue header of the card
const subjects = [
  {
    name: "Air Regulations",
    icon: Scale,
    about: "Understand The Rules, Laws And Regulations That Govern Safe, Legal And Efficient Aviation Operations.",
    duration: "6 – 8 Weeks",
    learn: [
      "Aviation Law & Regulatory Framework",
      "ICAO Annexes & SARPs",
      "DGCA Rules & Civil Aviation Requirements (CAR)",
      "Personnel, Aircraft & Operations Regulations",
      "Safety, Compliance & Legal Responsibilities",
    ],
    inclusions: standardInclusions,
  },
  {
    name: "Technical Specific",
    icon: Wrench,
    about: "Gain In-Depth Knowledge Of Aircraft Systems, Components And Their Operation For A Specific Aircraft Type (Class/Category).",
    duration: "6 – 8 Weeks",
    learn: [
      "In-Depth Aircraft Systems (Type Specific)",
      "System Components & Operation",
      "Normal & Abnormal Procedures",
      "Troubleshooting & Fault Isolation",
      "Maintenance Practices & Safety Requirements",
    ],
    inclusions: standardInclusions,
  },
  {
    name: "Technical General",
    icon: Settings,
    about: "Learn The Fundamentals Of Aircraft Systems, Components And Their Operation For Safe And Efficient Flight.",
    duration: "6 – 8 Weeks",
    learn: [
      "Aircraft Structure & Materials",
      "Powerplant (Engine) Basics",
      "Systems – Electrical, Hydraulic, Pneumatic & Fuel",
      "Instruments & Cockpit Systems",
      "Aircraft Maintenance & Safety Practices",
    ],
    inclusions: standardInclusions,
  },
  {
    name: "Radio Telephony",
    icon: Radio,
    about: "Learn Professional Aviation Communication For Safe, Clear And Standardised Flight Operations.",
    duration: "4 – 6 Weeks",
    learn: [
      "Aviation Communication Procedures",
      "Standard R/T Phraseology",
      "ATC Communication – VFR & IFR",
      "Emergency & Non-Normal Calls",
      "Communication Etiquette & DGCA/ICAO Requirements",
    ],
    inclusions: [
      "Live Interactive Classes",
      "RT Phraseology Study Notes",
      "ATC Simulation & Practice Calls",
      "Mock R/T Tests & Assessments",
      "DGCA Exam Preparation & Guidance",
    ],
  },
  {
    name: "Meteorology",
    icon: CloudSun,
    about: "Learn The Science Of Weather And Its Impact On Flight Planning, Performance And Safety.",
    duration: "6 – 8 Weeks",
    learn: [
      "Structure Of The Atmosphere",
      "Weather Systems & Forecasting",
      "Clouds, Precipitation & Visibility",
      "Wind, Pressure & Temperature",
      "Aviation Weather Reports (METAR, TAF)",
      "Weather Hazards & Flight Safety",
    ],
    inclusions: standardInclusions,
  },
  {
    name: "Air Navigation",
    icon: Compass,
    about: "Learn The Art And Science Of Aircraft Navigation — From Route Planning To In-Flight Navigation And Position Determination.",
    duration: "6 – 8 Weeks",
    learn: [
      "Principles Of Navigation",
      "Flight Planning & Performance",
      "Charts, Maps & Navigation Aids",
      "Position Determination & Tracking",
      "Radio Navigation (VOR, NDB, GNSS)",
      "Navigation Calculations & In-Flight Procedures",
    ],
    inclusions: standardInclusions,
  },
];

// One small icon per inclusion line (same order as the list)
const inclusionIcons = [Video, BookOpen, ClipboardCheck, MessageSquare, BarChart3];

// ---------- Small pieces used inside every card ----------

// One row of the "Course Duration / Learning Mode / Class Schedule" box
function Stat({ Icon, label, value }) {
  return (
    <div className="flex items-center gap-3 px-3 py-2.5">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#e4effc] text-[#1a5bd6]">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <p className="text-[12px] font-semibold leading-tight text-[#5b6f86]">{label}</p>
        <p className="text-[14px] font-extrabold leading-tight text-[#0a1f5c]">{value}</p>
      </div>
    </div>
  );
}

// A blue title pill with a list underneath ("What You'll Learn" / "Training Inclusions")
function ListBlock({ Icon, title, children }) {
  return (
    <div className="rounded-2xl border border-[#d6e3ef] bg-white p-3 shadow-sm">
      <h4 className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#0a3cb0] to-[#1a5bd6] px-3 py-1.5 text-[13px] font-bold italic text-white">
        <Icon className="h-4 w-4" aria-hidden="true" />
        {title}
      </h4>
      <ul className="space-y-2">{children}</ul>
    </div>
  );
}

// "DGCA Ground Classes" subject slider (id="subjects").
// Phones: swipe sideways, the next card peeks in from the right.
// Desktop: three cards visible, use the arrows or the subject tabs.
function Subjects() {
  const scrollerRef = useRef(null);
  const tabsRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const lastIndex = subjects.length - 1;

  // Work out which card is at the left edge while scrolling
  function handleScroll() {
    const scroller = scrollerRef.current;
    const cards = scroller.children;
    const step = cards[1].offsetLeft - cards[0].offsetLeft;
    const atEnd = scroller.scrollLeft + scroller.clientWidth >= scroller.scrollWidth - 4;
    const index = atEnd ? lastIndex : Math.round(scroller.scrollLeft / step);
    setActiveIndex(Math.min(Math.max(index, 0), lastIndex));
  }

  // Slide to a card by its number
  function goTo(index) {
    const scroller = scrollerRef.current;
    const card = scroller.children[index];
    scroller.scrollTo({
      left: card.offsetLeft - scroller.children[0].offsetLeft,
      behavior: "smooth",
    });
  }

  // Left / right arrow keys also move between cards
  function handleKeyDown(event) {
    if (event.key === "ArrowRight") goTo(Math.min(activeIndex + 1, lastIndex));
    if (event.key === "ArrowLeft") goTo(Math.max(activeIndex - 1, 0));
  }

  // Keep the selected subject tab in view
  useEffect(() => {
    const tabs = tabsRef.current;
    const tab = tabs.children[activeIndex];
    tabs.scrollTo({
      left: tab.offsetLeft - (tabs.clientWidth - tab.clientWidth) / 2,
      behavior: "smooth",
    });
  }, [activeIndex]);

  return (
    <Section id="subjects" className="overflow-hidden bg-gradient-to-b from-white to-[#f1f7fd]">
      <SectionHeading
        className="mb-5"
        eyebrow="Six DGCA Ground Classes"
        title="Choose Your Subject. Swipe To See All Six."
      />

      <p className="mx-auto mb-6 max-w-[760px] text-center text-sm text-muted">
        Every subject has its own live classes, study notes, mock tests and doubt-clearing
        sessions. Pick a subject below or swipe through the cards.
      </p>

      {/* Subject tabs: tap a name to jump straight to that card */}
      <div
        ref={tabsRef}
        className="relative -mx-4 mb-5 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:-mx-5 sm:px-5 md:mx-0 md:justify-center md:px-0 [&::-webkit-scrollbar]:hidden"
        aria-label="Choose a subject"
      >
        {subjects.map((subject, index) => (
          <button
            key={subject.name}
            type="button"
            onClick={() => goTo(index)}
            aria-current={index === activeIndex}
            className={`shrink-0 rounded-full border px-4 py-2 text-[13px] font-bold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0a3cb0] ${index === activeIndex
              ? "border-[#0a3cb0] bg-[#0a3cb0] text-white shadow-md"
              : "border-[#c9dced] bg-white text-[#0a1f5c] hover:bg-[#edf4fa]"
              }`}
          >
            {subject.name}
          </button>
        ))}
      </div>

      {/* The slider. -mx and px let the next card peek in from the screen edge.
          scroll-px keeps a snapped card inside the page padding instead of touching the edge. */}
      <div
        ref={scrollerRef}
        onScroll={handleScroll}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        className="relative -mx-4 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto scroll-smooth px-4 pb-4 outline-none [scrollbar-width:none] sm:-mx-5 sm:scroll-px-5 sm:px-5 md:mx-0 md:scroll-px-0 md:px-0 [&::-webkit-scrollbar]:hidden"
        aria-label="DGCA ground class subjects. Use the left and right arrow keys to move between subjects."
      >
        {subjects.map((subject) => {
          const SubjectIcon = subject.icon;

          return (
            <article
              key={subject.name}
              className="flex w-[88%] max-w-[380px] shrink-0 snap-start flex-col overflow-hidden rounded-3xl border border-[#c9dced] bg-white shadow-[0_12px_28px_rgba(19,68,108,0.10)] md:w-[360px]"
            >
              {/* Blue header: subject name and short text */}
              <div className="relative overflow-hidden bg-gradient-to-br from-[#0a2a7a] via-[#0a3cb0] to-[#1a6fe0] px-4 pb-5 pt-4">
                <SubjectIcon
                  className="absolute -right-4 -top-4 h-32 w-32 text-white/10"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />

                <span className="relative inline-block rounded-full bg-[#ffdc3d] px-3 py-1 text-[11px] font-extrabold text-[#0a1f5c]">
                  DGCA Subject
                </span>
                <h3 className="relative mt-3 text-[26px] font-black italic leading-[1.05] tracking-[-0.02em] text-white">
                  {subject.name}
                </h3>
                <p className="relative mt-2 text-[13px] font-medium leading-relaxed text-white/90">
                  {subject.about}
                </p>
              </div>

              <div className="flex flex-1 flex-col gap-3 p-3.5">
                {/* Duration / mode / schedule */}
                <div className="divide-y divide-[#e0eaf4] rounded-2xl border border-[#d6e3ef] bg-white shadow-sm">
                  <Stat Icon={CalendarDays} label="Course Duration" value={subject.duration} />
                  <Stat Icon={MonitorPlay} label="Learning Mode" value={learningMode} />
                  <Stat Icon={Clock} label="Class Schedule" value={classSchedule} />
                </div>

                {/* What You'll Learn */}
                <ListBlock Icon={Target} title="What You’ll Learn">
                  {subject.learn.map((item) => (
                    <li key={item} className="flex gap-2 text-[13px] font-semibold leading-snug text-[#0a1f5c]">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#1a5bd6]" strokeWidth={3} aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ListBlock>

                {/* Training Inclusions */}
                <ListBlock Icon={Layers} title="Training Inclusions">
                  {subject.inclusions.map((item, i) => {
                    const Icon = inclusionIcons[i];
                    return (
                      <li key={item} className="flex gap-2 text-[13px] font-semibold leading-snug text-[#0a1f5c]">
                        <Icon className="mt-0.5 h-4 w-4 shrink-0 text-[#1a5bd6]" aria-hidden="true" />
                        {item}
                      </li>
                    );
                  })}
                </ListBlock>

                {/* Button: opens the Register popup (always at the bottom of the card) */}
                <div className="mt-auto grid gap-2.5 pt-2">
                  <a
                    href={applyLink}
                    onClick={(event) => {
                      event.preventDefault();
                      window.dispatchEvent(new Event("open-scholarship-popup"));
                    }}
                    aria-label={`Apply For ${subject.name}`}
                    className="flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#0a3cb0] to-[#0e57d6] px-4 py-2 text-[15px] font-extrabold italic text-white shadow-[0_6px_14px_rgba(10,60,176,0.25)] transition active:scale-[0.98] hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0a3cb0]"
                  >
                    <Plane className="h-5 w-5 shrink-0" aria-hidden="true" />
                    <span className="flex-1 text-center">Apply For This Subject</span>
                    <ChevronRight className="h-5 w-5 shrink-0" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Arrows + dots */}
      <div className="mt-2 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => goTo(activeIndex - 1)}
          disabled={activeIndex === 0}
          aria-label="Previous subject"
          className="grid h-10 w-10 place-items-center rounded-full border border-[#c9dced] bg-white text-[#0a3cb0] shadow-sm transition hover:bg-[#edf4fa] disabled:opacity-40"
        >
          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
        </button>

        <div className="flex items-center gap-2">
          {subjects.map((subject, index) => (
            <button
              key={subject.name}
              type="button"
              onClick={() => goTo(index)}
              aria-label={`Show ${subject.name}`}
              aria-current={index === activeIndex}
              className={`h-2 rounded-full transition-all ${index === activeIndex ? "w-6 bg-[#0a3cb0]" : "w-2 bg-[#b8cde0]"
                }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => goTo(activeIndex + 1)}
          disabled={activeIndex === lastIndex}
          aria-label="Next subject"
          className="grid h-10 w-10 place-items-center rounded-full border border-[#c9dced] bg-white text-[#0a3cb0] shadow-sm transition hover:bg-[#edf4fa] disabled:opacity-40"
        >
          <ChevronRight className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      <p className="mt-3 text-center text-xs font-bold text-[#15558b]">
        {activeIndex + 1} / {subjects.length} · {subjects[activeIndex].name}
      </p>
      {activeIndex === 0 && (
        <p className="mt-1 text-center text-[11px] font-semibold text-[#64788b] md:hidden">
          Swipe Left To See More Subjects
        </p>
      )}
    </Section>
  );
}

export default Subjects;