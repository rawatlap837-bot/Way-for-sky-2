import { Compass, CloudSun, Scale, Wrench, Plane, Radio } from "lucide-react";
import Section from "../components/Section.jsx";
import SectionHeading from "../components/SectionHeading.jsx";

// The six DGCA ground-class subjects.
const subjects = [
  { title: "Air Navigation", text: "Navigation principles and planning", icon: Compass },
  { title: "Aviation Meteorology", text: "Weather knowledge for pilots", icon: CloudSun },
  { title: "Air Regulations", text: "Aviation rules and procedures", icon: Scale },
  { title: "Technical General", text: "Aircraft systems and principles", icon: Wrench },
  { title: "Technical Specific", text: "Aircraft-specific knowledge", icon: Plane },
  { title: "Radio Telephony", text: "Communication and RT procedures", icon: Radio },
];

function Subjects() {
  return (
    <Section id="training" className="bg-gradient-to-b from-[#f8fbfd] to-white">
      <SectionHeading
        className="mb-6 sm:mb-10"
        eyebrow="Your Academic Foundation"
        title="Six Subjects. A Stronger Ground-School Foundation."
        text="Selected students receive scholarship coverage for all six DGCA Ground Classes subjects."
      />

      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
        {subjects.map((subject, index) => {
          const Icon = subject.icon;

          return (
            <article
              key={subject.title}
              className="group relative min-h-[128px] overflow-hidden rounded-2xl border border-[#dbe7ef] bg-white p-3.5 shadow-[0_8px_24px_rgba(7,29,54,0.06)] transition duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-[0_14px_32px_rgba(7,29,54,0.11)] sm:min-h-0 sm:p-5"
            >
              <span className="absolute right-3 top-3 text-[10px] font-black tracking-wider text-[#b7c7d4] sm:text-xs">
                {String(index + 1).padStart(2, "0")}
              </span>

              <div className="mb-3 grid h-10 w-10 place-items-center rounded-xl border border-[#d8e8f2] bg-[#eef6fb] text-brand transition group-hover:bg-navy group-hover:text-white sm:h-11 sm:w-11">
                <Icon size={20} strokeWidth={1.8} />
              </div>

              <h3 className="mb-1 pr-5 text-[13px] font-extrabold leading-[1.25] text-navy sm:text-[15px]">
                {subject.title}
              </h3>
              <p className="text-[10px] leading-[1.45] text-muted sm:text-[12px]">
                {subject.text}
              </p>
            </article>
          );
        })}
      </div>
    </Section>
  );
}

export default Subjects;
