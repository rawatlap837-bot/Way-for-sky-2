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
    <Section id="academy" className="bg-gradient-to-b from-[#f7fafc] to-white">
      <SectionHeading
        className="mb-6 sm:mb-10"
        eyebrow="More Than a Ground-Class Programme"
        title="One Academy. A Guided Pathway Towards Your Pilot Ambition."
        text="WayForSky brings aviation learning, counselling and pathway guidance together. Understand each stage before making important decisions."
      />

      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 xl:grid-cols-5">
        {academySteps.map((step, index) => {
          const Icon = step.icon;

          return (
            <article key={step.title} className="relative min-h-[170px] rounded-2xl border border-[#dbe7ef] bg-white p-3.5 shadow-[0_8px_24px_rgba(7,29,54,0.06)] sm:min-h-[210px] sm:p-5">
              <span className="absolute right-3 top-3 text-[9px] font-extrabold tracking-wider text-[#9aabba] sm:right-4 sm:top-3.5 sm:text-[11px]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="mb-3 grid h-9 w-9 place-items-center rounded-xl border border-[#d8e8f2] bg-ice text-brand sm:mb-4 sm:h-11 sm:w-11">
                <Icon size={19} strokeWidth={1.8} />
              </span>
              <h3 className="mb-1.5 pr-3 text-[12px] font-extrabold leading-[1.25] text-navy sm:mb-2 sm:text-[15px] sm:leading-snug">{step.title}</h3>
              <p className="text-[9.5px] leading-[1.45] text-muted sm:text-[13px] sm:leading-relaxed">{step.text}</p>
            </article>
          );
        })}
      </div>

      <div className="mt-4 rounded-2xl border border-[#dbe7ef] border-l-[3px] border-l-gold bg-white p-4 text-[11px] leading-[1.55] text-[#526579] shadow-[0_8px_24px_rgba(7,29,54,0.05)] sm:mt-5 sm:p-5 sm:text-[13px]">
        <strong>Our commitment:</strong> We take the pathway seriously. We explain the
        process, expectations and decisions clearly. A pilot career depends on individual
        eligibility, performance, medical fitness, training progress and regulatory
        requirements; no academy can guarantee a licence or airline job.
      </div>
    </Section>
  );
}

export default Academy;
