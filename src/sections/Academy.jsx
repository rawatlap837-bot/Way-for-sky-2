import { Plane, Compass, TrendingUp, ShieldCheck, GraduationCap, MonitorPlay, ClipboardCheck, MessagesSquare, Users, Briefcase } from "lucide-react";
import Section from "../components/Section.jsx";
import SectionHeading from "../components/SectionHeading.jsx";

// The ten academy cards. To add a card, copy one line and change the text.
const academySteps = [
  { icon: Plane, title: "Start with DGCA ground training", text: "Build your aviation theory foundation through six subject-focused ground classes and structured academic support." },
  { icon: Compass, title: "Understand your pilot pathway", text: "Get guidance on the stages involved in becoming a pilot, including eligibility, medicals, documentation and training choices." },
  { icon: TrendingUp, title: "Plan your next training step", text: "Explore suitable flight-training pathways and understand the practical, financial and academic commitments before proceeding." },
  { icon: ShieldCheck, title: "Stay guided through the journey", text: "Access counselling and support to help you make informed decisions at each stage of your aviation journey." },
  { icon: GraduationCap, title: "Meet your faculty", text: "Understand who teaches you, their subject expertise and how instructors support your learning." },
  { icon: MonitorPlay, title: "Digital learning resources", text: "Use structured digital materials and classroom resources to reinforce concepts beyond each lesson." },
  { icon: ClipboardCheck, title: "Practice and progress checks", text: "Build confidence through revision, practice questions and progress reviews aligned with the teaching plan." },
  { icon: MessagesSquare, title: "Peer learning and discussion", text: "Discuss aviation topics, ask questions and learn alongside other students with similar ambitions." },
  { icon: Users, title: "Parent and family clarity", text: "Help families understand the course, the pilot-training stages, responsibilities and expected costs." },
  { icon: Briefcase, title: "Career pathway counselling", text: "Explore training options and next steps with clear guidance, without promises of guaranteed licences or jobs." },
];

function Academy() {
  return (
    <Section id="academy" className="bg-[#f7fafc]">
      <SectionHeading
        className="mb-10"
        eyebrow="More than a ground-class programme"
        title="One academy. A guided pathway towards your pilot ambition."
        text="WayForSky brings aviation learning, counselling and pathway guidance together. Students and parents can understand each stage before making important decisions."
      />

      <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {academySteps.map((step, index) => {
          const Icon = step.icon;

          return (
            <article key={step.title} className="relative rounded-2xl border border-line bg-white p-5">
              <span className="absolute right-4 top-3.5 text-[11px] font-extrabold text-[#9aabba]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-ice text-brand">
                <Icon size={22} />
              </span>
              <h3 className="mb-2 text-[15px] font-bold leading-snug text-navy">{step.title}</h3>
              <p className="text-[13px] text-muted">{step.text}</p>
            </article>
          );
        })}
      </div>

      <div className="mt-5 border-l-[3px] border-gold bg-white p-5 text-[13px] text-[#526579]">
        <strong>Our commitment:</strong> We take the pathway seriously. We explain the
        process, expectations and decisions clearly. A pilot career depends on individual
        eligibility, performance, medical fitness, training progress and regulatory
        requirements; no academy can guarantee a licence or airline job.
      </div>
    </Section>
  );
}

export default Academy;
