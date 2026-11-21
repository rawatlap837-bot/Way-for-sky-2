import { Check } from "lucide-react";
import Section from "../components/Section.jsx";
import Eyebrow from "../components/Eyebrow.jsx";
import studentsPhoto from "../assets/images/students-learning.jpg";

// The three tick points.
const classroomPoints = [
  "Instructor-led classes and subject-focused learning",
  "Digital learning support and structured study resources",
  "Guidance on examinations and the wider pilot pathway",
];

function Classroom() {
  return (
    <Section className="bg-soft">
      <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="h-[270px] overflow-hidden rounded-2xl bg-[#dbe7ef] sm:h-[390px]">
          <img
            src={studentsPhoto}
            alt="Students in a learning environment"
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </div>

        <div>
          <Eyebrow>The Learning Experience</Eyebrow>
          <h2 className="mb-3 max-w-lg text-[clamp(1.75rem,3.5vw,2.6rem)] font-extrabold leading-tight tracking-tight text-navy">
            Focused learning. Experienced guidance. Real preparation.
          </h2>
          <p className="text-muted">
            Ground training is where aviation knowledge takes shape. Our learning approach
            is designed to help students understand concepts, build discipline and prepare
            systematically for their DGCA examinations.
          </p>

          <ul className="mt-6 grid gap-3.5">
            {classroomPoints.map((point) => (
              <li key={point} className="flex items-start gap-3 text-sm text-[#33485d]">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand text-white">
                  <Check size={13} strokeWidth={3} />
                </span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

export default Classroom;
