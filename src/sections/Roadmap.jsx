import Section from "../components/Section.jsx";

// ---------- Easy-to-edit content ----------
// number   -> shown automatically (01, 02, 03 ...)
// tag      -> the yellow pill at the top of the card
// title    -> the bold card heading
// text     -> the short grey description
// supports -> the blue text under the divider line (after "WayForSky supports:")
const steps = [
  {
    tag: "Starting point",
    title: "DGCA Ground Classes",
    text: "Build strong aviation fundamentals and prepare for the six DGCA theory subjects.",
    supports:
      "ground-class learning, instructor guidance, study structure and exam preparation support.",
  },
  {
    tag: "Optional · Recommended",
    title: "Aviation-Related Degree",
    text: "Explore a recognised aviation or management degree alongside your career plan.",
    supports:
      "information and guidance on suitable academic pathways. Admission depends on institution criteria.",
  },
  {
    tag: "Flight training stage",
    title: "CPL Flight Training",
    text: "Progress to practical flight training and work towards the Commercial Pilot Licence requirements.",
    supports:
      "pathway counselling, academic coordination and guidance on documentation and next steps.",
  },
  {
    tag: "Career planning",
    title: "Choose Your Career Direction",
    text: "Explore airline pilot, flight instructor, charter pilot and other aviation career options.",
    supports:
      "one-to-one pathway discussions to help you understand routes, requirements and choices.",
  },
  {
    tag: "Optional · Specialisation",
    title: "Instructor Rating",
    text: "For students interested in becoming a certified flight instructor, explore the required rating.",
    supports:
      "information on training routes and eligibility. This stage is optional and subject to requirements.",
  },
  {
    tag: "Build experience",
    title: "Experience & Opportunities",
    text: "Explore relevant opportunities to build flying experience and develop your professional profile.",
    supports:
      "career guidance and sharing relevant opportunities when available. Roles depend on vacancies and eligibility.",
  },
  {
    tag: "Career preparation",
    title: "Airline Readiness",
    text: "Prepare for airline selection through interview practice, communication and technical preparation.",
    supports:
      "readiness guidance, preparation resources and interview practice where offered.",
  },
  {
    tag: "Advanced pathway",
    title: "Cadet Programme & Type Rating",
    text: "Explore cadet programmes and aircraft-specific type rating routes where suitable.",
    supports:
      "explaining programme options and application steps. Selection, licensing and employment are not guaranteed.",
  },
];

// One roadmap card
function StepCard({ step, number }) {
  return (
    <article className="relative z-10 flex flex-col items-center rounded-3xl border border-[#dbe7ef] bg-white px-5 pb-6 pt-10 text-center shadow-[0_8px_24px_rgba(7,29,54,0.06)]">
      {/* Number badge sitting on the top edge of the card */}
      <span className="absolute left-1/2 top-0 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-gradient-to-b from-[#1a5bd6] to-[#0a2a7a] text-[16px] font-black text-white shadow-[0_0_0_4px_#e4effc,0_6px_14px_rgba(10,42,122,0.30)]">
        {String(number).padStart(2, "0")}
      </span>

      <span className="mb-3 inline-block rounded-full bg-[#fdf0b8] px-3 py-1 text-[12px] font-extrabold text-[#8a5a00]">
        {step.tag}
      </span>

      <h3 className="mb-2 text-[19px] font-extrabold leading-tight text-[#0a1f5c]">
        {step.title}
      </h3>

      <p className="mb-4 text-[14px] leading-relaxed text-[#5b6f86]">{step.text}</p>

      {/* Divider + support text stay at the bottom of the card */}
      <p className="mt-auto w-full border-t border-[#e0eaf4] pt-4 text-[12.5px] font-bold leading-relaxed text-[#15558b]">
        WayForSky supports: {step.supports}
      </p>
    </article>
  );
}

// Roadmap section: "From your first class to your aviation career pathway."
// Desktop: 4 cards per row with a road strip between the two rows.
// Tablet: 2 cards per row. Phone: 1 card per row (road strip hidden).
function Roadmap() {
  const firstRow = steps.slice(0, 4);
  const secondRow = steps.slice(4);

  return (
    <Section id="roadmap" className="bg-gradient-to-b from-[#f8fbfd] to-[#eaf3fc]">
      {/* Heading */}
      <div className="mx-auto mb-10 max-w-[900px] text-center sm:mb-14">
        <h2 className="text-[32px] font-black leading-[1.1] tracking-[-0.03em] text-[#0a1f5c] sm:text-[44px] lg:text-[52px]">
          From your first class to your aviation career pathway.
        </h2>
        <p className="mx-auto mt-6 max-w-[760px] text-[15px] leading-relaxed text-[#5b6f86] sm:text-[16px]">
          When you join WayForSky, we guide you through the stages, explain what comes next
          and support you in planning each step. Follow the road map below to see how the
          journey can progress.
        </p>
      </div>

      {/* pt-6 leaves room for the number badges that stick out above the first row */}
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 pt-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-y-0">
        {firstRow.map((step, i) => (
          <StepCard key={step.title} step={step} number={i + 1} />
        ))}

        {/* Road strip between the two rows (desktop only) */}
        <div
          aria-hidden="true"
          className="relative z-0 hidden h-10 items-center rounded-full bg-gradient-to-b from-[#8fa1b5] to-[#5f7389] px-6 shadow-[inset_0_2px_4px_rgba(0,0,0,0.25)] lg:col-span-4 lg:mx-[7%] lg:flex"
        >
          <div className="w-full border-t-4 border-dashed border-[#ffdc3d]" />
        </div>

        {secondRow.map((step, i) => (
          <StepCard key={step.title} step={step} number={i + firstRow.length + 1} />
        ))}
      </div>

      {/* Banner under the roadmap */}
      <div className="mx-auto mt-12 max-w-[1125px] rounded-3xl bg-[#0a2a5c] px-5 py-6 text-center shadow-[0_12px_28px_rgba(10,42,92,0.25)] sm:mt-14">
        <p className="text-[15px] font-extrabold uppercase leading-snug tracking-wide text-[#ffdc3d] sm:text-[20px]">
          Zero to Hero — we guide the journey, step by step.
        </p>
      </div>
    </Section>
  );
}

export default Roadmap;