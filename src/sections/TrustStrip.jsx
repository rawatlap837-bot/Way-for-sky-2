import { BookOpen, Award, GraduationCap, Users } from "lucide-react";
import Container from "../components/Container.jsx";

// The four small highlights under the hero.
const trustItems = [
  { icon: BookOpen, title: "Six DGCA Subjects", text: "Complete ground-class coverage" },
  { icon: Award, title: "Merit-Based Selection", text: "Assessment-led scholarship process" },
  { icon: GraduationCap, title: "Instructor-Led Learning", text: "Structured academic guidance" },
  { icon: Users, title: "Collaborative Classroom", text: "Learn and grow with peers" },
];

function TrustStrip() {
  return (
    <div className="border-y border-line bg-white">
      <Container className="grid grid-cols-2 gap-2 py-3 sm:grid-cols-2 sm:gap-4 sm:py-6 lg:grid-cols-4">
        {trustItems.map((item) => {
          const Icon = item.icon;

          return (
            <div key={item.title} className="flex min-h-[96px] flex-col items-start rounded-xl border border-line bg-white p-2.5 sm:min-h-0 sm:flex-row sm:items-center sm:gap-3 lg:justify-center lg:border-0 lg:p-0">
              <span className="mb-1.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-ice text-brand sm:mb-0 sm:h-10 sm:w-10 sm:rounded-xl">
                <Icon size={20} />
              </span>
              <div className="min-w-0">
                <strong className="block text-[11px] leading-[1.25] text-navy sm:text-sm">{item.title}</strong>
                <small className="mt-0.5 block text-[9px] leading-[1.35] text-muted sm:mt-1 sm:text-xs">{item.text}</small>
              </div>
            </div>
          );
        })}
      </Container>
    </div>
  );
}

export default TrustStrip;
