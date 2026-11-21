import { GraduationCap, BookOpenCheck, Compass } from "lucide-react";
import Section from "../components/Section.jsx";
import SectionHeading from "../components/SectionHeading.jsx";

// The three "why" cards.
const reasons = [
  {
    icon: GraduationCap,
    label: "Training",
    title: "Experienced instructors",
    text: "Learn through subject-focused sessions led by an experienced teaching team.",
  },
  {
    icon: BookOpenCheck,
    label: "Learning",
    title: "Structured academic support",
    text: "Build a consistent study routine with guided learning and digital resources.",
  },
  {
    icon: Compass,
    label: "Guidance",
    title: "Career pathway counselling",
    text: "Understand the stages, requirements and decisions involved in pilot training.",
  },
];

function WhyWayForSky() {
  return (
    <Section id="why">
      <SectionHeading
        className="mb-10"
        eyebrow="Why WayForSky"
        title="Aviation guidance beyond the classroom."
        text="We bring learning, counselling and pathway guidance together so students can make informed decisions about their aviation journey."
      />

      <div className="grid gap-4 md:grid-cols-3">
        {reasons.map((reason) => {
          const Icon = reason.icon;

          return (
            <div key={reason.title} className="rounded-2xl border border-line p-6">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-ice text-brand">
                  <Icon size={20} />
                </span>
                <span className="text-xs font-extrabold tracking-wider text-brand">{reason.label}</span>
              </div>
              <h3 className="mb-2 mt-4 text-[17px] font-bold text-navy">{reason.title}</h3>
              <p className="text-[13px] text-muted">{reason.text}</p>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

export default WhyWayForSky;
