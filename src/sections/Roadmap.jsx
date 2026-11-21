import Section from "../components/Section.jsx";
import SectionHeading from "../components/SectionHeading.jsx";

// The eight stops on the road map.
//   tag     -> small yellow label
//   support -> "WayForSky supports..." line at the bottom of the card
const roadmapStops = [
  {
    tag: "Starting point",
    title: "DGCA Ground Classes",
    text: "Build strong aviation fundamentals and prepare for the six DGCA theory subjects.",
    support: "WayForSky supports: ground-class learning, instructor guidance, study structure and exam preparation support.",
  },
  {
    tag: "Optional · Recommended",
    title: "Aviation-Related Degree",
    text: "Explore a recognised aviation or management degree alongside your career plan.",
    support: "WayForSky supports: information and guidance on suitable academic pathways. Admission depends on institution criteria.",
  },
  {
    tag: "Flight training stage",
    title: "CPL Flight Training",
    text: "Progress to practical flight training and work towards the Commercial Pilot Licence requirements.",
    support: "WayForSky supports: pathway counselling, academy coordination and guidance on documentation and next steps.",
  },
  {
    tag: "Career planning",
    title: "Choose Your Career Direction",
    text: "Explore airline pilot, flight instructor, charter pilot and other aviation career options.",
    support: "WayForSky supports: one-to-one pathway discussions to help you understand routes, requirements and choices.",
  },
  {
    tag: "Optional · Specialisation",
    title: "Instructor Rating",
    text: "For students interested in becoming a certified flight instructor, explore the required rating.",
    support: "WayForSky supports: information on training routes and eligibility. This stage is optional and subject to requirements.",
  },
  {
    tag: "Build experience",
    title: "Experience & Opportunities",
    text: "Explore relevant opportunities to build flying experience and develop your professional profile.",
    support: "WayForSky supports: career guidance and sharing relevant opportunities when available. Roles depend on vacancies and eligibility.",
  },
  {
    tag: "Career preparation",
    title: "Airline Readiness",
    text: "Prepare for airline selection through interview practice, communication and technical preparation.",
    support: "WayForSky supports: readiness guidance, preparation resources and interview practice where offered.",
  },
  {
    tag: "Advanced pathway",
    title: "Cadet Programme & Type Rating",
    text: "Explore cadet programmes and aircraft-specific type rating routes where suitable.",
    support: "WayForSky supports: explaining programme options and application steps. Selection, licensing and employment are not guaranteed.",
  },
];

// "Zero to Hero" road map (id="career-pathway").
// On desktop the stops sit on a grey road in two rows of four.
// On phones the road runs down the left side.
function Roadmap() {
  return (
    <Section id="career-pathway" className="overflow-hidden bg-gradient-to-b from-[#f5faff] to-[#e7f3ff]">
      <SectionHeading
        className="mb-5"
        eyebrow="Zero to Hero · Your WayForSky Journey"
        title="From your first class to your aviation career pathway."
      />

      <p className="mx-auto mb-10 max-w-[850px] text-center text-sm text-muted">
        When you join WayForSky, we guide you through the stages, explain what comes next
        and support you in planning each step. Follow the road map below to see how the
        journey can progress.
      </p>

      <div
        aria-label="WayForSky aviation career pathway road map"
        className="relative grid gap-5 py-4 md:grid-cols-4 md:gap-x-4 md:gap-y-14 md:pb-4 md:pt-10"
      >
        {/* Road on mobile: one vertical strip on the left */}
        <div className="absolute bottom-6 left-[12px] top-6 w-6 rounded-full bg-gradient-to-r from-slate-400 to-slate-600 md:hidden" />
        <div className="absolute bottom-7 left-[22px] top-7 border-l-4 border-dashed border-yellow-300 md:hidden" />

        {roadmapStops.map((stop, index) => {
          // On desktop every card carries its own piece of road along its top edge.
          // The pieces touch each other, so each row looks like one long road.
          const isRowStart = index % 4 === 0;
          const isRowEnd = index % 4 === 3;
          const roadShape = `${isRowStart ? "left-0 rounded-l-full" : "-left-[9px]"} ${isRowEnd ? "right-0 rounded-r-full" : "-right-[9px]"}`;
          const dashShape = `${isRowStart ? "left-3" : "-left-[9px]"} ${isRowEnd ? "right-3" : "-right-[9px]"}`;

          return (
            <article
              key={stop.title}
              className="relative ml-6 rounded-2xl border border-[#c9dced] bg-white p-4 pl-8 shadow-[0_10px_24px_rgba(19,68,108,0.09)] md:ml-0 md:min-h-[230px] md:p-4 md:pt-9"
            >
              {/* Road piece + yellow dashed line (desktop only) */}
              <span
                aria-hidden="true"
                className={`absolute -top-[17px] hidden h-[34px] bg-gradient-to-b from-slate-400 to-slate-600 shadow-inner md:block ${roadShape}`}
              />
              <span
                aria-hidden="true"
                className={`absolute -top-[2px] hidden border-t-4 border-dashed border-yellow-300 md:block ${dashShape}`}
              />

              {/* Stop number: left of the card on mobile, on the road on desktop */}
              <span className="absolute -left-5 top-4 grid h-10 w-10 place-items-center rounded-full border-4 border-[#edf7ff] bg-gradient-to-br from-[#1477c4] to-[#082d59] text-sm font-black text-white shadow-md md:-top-6 md:left-1/2 md:h-12 md:w-12 md:-translate-x-1/2 md:border-[5px] md:text-[15px]">
                {String(index + 1).padStart(2, "0")}
              </span>

              <span className="mb-2 block w-fit max-w-full rounded-full bg-[#fff5cb] px-2.5 py-1 text-[11px] font-extrabold text-[#966900] md:mx-auto">
                {stop.tag}
              </span>
              <h3 className="mb-2 text-[15px] font-bold text-navy md:text-center">{stop.title}</h3>
              <p className="text-[13px] text-muted md:text-center">{stop.text}</p>
              <span className="mt-3 block border-t border-[#e5eef6] pt-2.5 text-xs font-bold leading-snug text-[#15558b] md:text-center">
                {stop.support}
              </span>
            </article>
          );
        })}
      </div>

      {/* Dark banner under the road */}
      <div className="mx-auto mt-6 max-w-[900px] rounded-2xl bg-[#082d59] px-6 py-5 text-center text-white shadow-[0_12px_25px_rgba(8,45,89,0.15)]">
        <strong className="text-[#ffdc45]">Zero to Hero — We Guide the Journey, Step by Step.</strong>
        <p className="mt-2 text-[13px] text-[#d8e9f8]">
          From your first DGCA ground class to exploring advanced aviation career routes,
          WayForSky helps you understand the path, prepare for each stage and make
          informed decisions.
        </p>
      </div>

      <p className="mx-auto mt-4 max-w-[900px] text-center text-[12px] text-[#64788b]">
        The pathway is individual. Durations, costs, eligibility, licensing requirements
        and outcomes vary by student, training academy, regulator and employer. Optional
        stages may not apply to every student.
      </p>
    </Section>
  );
}

export default Roadmap;
