import Section from "../components/Section.jsx";
import SectionHeading from "../components/SectionHeading.jsx";

// The six DGCA ground-class subjects.
const subjects = [
  { title: "Air Navigation", text: "Navigation principles and planning" },
  { title: "Aviation Meteorology", text: "Weather knowledge for pilots" },
  { title: "Air Regulations", text: "Aviation rules and procedures" },
  { title: "Technical General", text: "Aircraft systems and principles" },
  { title: "Technical Specific", text: "Aircraft-specific knowledge" },
  { title: "Radio Telephony", text: "Communication and RT procedures" },
];

function Subjects() {
  return (
    <Section id="training">
      <SectionHeading
        className="mb-10"
        eyebrow="Your Academic Foundation"
        title="Six subjects. A stronger ground-school foundation."
        text="Selected students receive scholarship coverage for all six DGCA Ground Classes subjects."
      />

      <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
        {subjects.map((subject, index) => (
          <div
            key={subject.title}
            className="flex items-center gap-3.5 rounded-xl border border-line bg-white p-5 transition hover:border-brand/40 hover:shadow-md"
          >
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-ice text-xs font-extrabold text-brand">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div>
              <strong className="text-sm text-navy">{subject.title}</strong>
              <small className="block text-[12px] text-muted">{subject.text}</small>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

export default Subjects;
