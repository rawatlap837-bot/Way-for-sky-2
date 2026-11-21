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
      <Container className="grid gap-5 py-6 sm:grid-cols-2 lg:grid-cols-4">
        {trustItems.map((item) => {
          const Icon = item.icon;

          return (
            <div key={item.title} className="flex items-center gap-3 lg:justify-center">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-ice text-brand">
                <Icon size={20} />
              </span>
              <div>
                <strong className="block text-sm text-navy">{item.title}</strong>
                <small className="block text-xs text-muted">{item.text}</small>
              </div>
            </div>
          );
        })}
      </Container>
    </div>
  );
}

export default TrustStrip;
