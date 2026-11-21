import { Check } from "lucide-react";
import Section from "../components/Section.jsx";
import Eyebrow from "../components/Eyebrow.jsx";
import studentsPhoto from "../assets/images/students-learning.jpg";

// The three concise learning benefits.
const classroomPoints = [
  "Instructor-Led Classes And Subject-Focused Learning",
  "Digital Learning Support And Structured Study Resources",
  "Guidance On Examinations And The Wider Pilot Pathway",
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
            Ground training is where aviation knowledge takes shape. Our learning
            approach is designed to help students understand concepts, build
            discipline and prepare systematically for their DGCA examinations.
          </p>

          <ul className="mt-5 grid gap-2.5 sm:mt-6 sm:gap-3.5">
            {classroomPoints.map((point) => (
              <li
                key={point}
                className="flex items-start gap-3 rounded-xl border border-[#dfe8ef] bg-white p-3 shadow-[0_6px_20px_rgba(7,29,54,0.05)] sm:p-4"
              >
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand text-white sm:h-7 sm:w-7">
                  <Check size={14} strokeWidth={3} />
                </span>
                <span className="text-[13px] leading-[1.45] text-[#33485d] sm:text-[15px]">
                  {point}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

export default Classroom;
