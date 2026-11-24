import { GraduationCap, MonitorCheck, Compass } from "lucide-react";
import Section from "../components/Section.jsx";
import studentsPhoto from "../assets/images/students-learning.jpg";

// The three concise learning benefits.
const classroomPoints = [
  {
    icon: GraduationCap,
    title: "Instructor-Led Classes",
    text: "Subject-Focused Learning",
  },
  {
    icon: MonitorCheck,
    title: "Digital Learning Support",
    text: "Structured Study Resources",
  },
  {
    icon: Compass,
    title: "Exam & Career Guidance",
    text: "Wider Pilot Pathway",
  },
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
          <h2 className="mb-3 max-w-lg text-[clamp(1.75rem,3.5vw,2.6rem)] font-extrabold leading-tight tracking-tight text-navy">
            Focused learning. Experienced guidance. Real preparation.
          </h2>
          <p className="text-[14px] font-medium leading-[1.7] text-[#536579] sm:text-[15px]">
            <strong className="font-extrabold text-navy underline decoration-[#f1c94b] decoration-2 underline-offset-4">
              Ground training
            </strong>{" "}
            is where{" "}
            <strong className="font-extrabold text-navy underline decoration-[#f1c94b] decoration-2 underline-offset-4">
              aviation knowledge
            </strong>{" "}
            takes shape. Our{" "}
            <strong className="font-extrabold text-navy underline decoration-[#f1c94b] decoration-2 underline-offset-4">
              learning approach
            </strong>{" "}
            is designed to help students understand concepts, build discipline
            and prepare systematically for their{" "}
            <strong className="font-extrabold text-navy underline decoration-[#f1c94b] decoration-2 underline-offset-4">
              DGCA examinations
            </strong>.
          </p>

          <ul className="mt-5 grid gap-2.5 sm:mt-6 sm:gap-3.5">
            {classroomPoints.map(({ icon: Icon, title, text }) => (
              <li
                key={title}
                className="group flex items-center gap-3 rounded-xl border border-[#dfe8ef] bg-white p-3.5 shadow-[0_6px_20px_rgba(7,29,54,0.06)] transition hover:-translate-y-0.5 hover:border-[#b9cfe1] hover:shadow-[0_10px_24px_rgba(7,29,54,0.10)] sm:p-4"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#eaf3fa] text-brand ring-1 ring-[#d2e3ef] sm:h-11 sm:w-11">
                  <Icon size={20} strokeWidth={2.3} />
                </span>
                <div>
                  <span className="block text-[13px] font-extrabold leading-[1.35] text-navy sm:text-[15px]">
                    {title}
                  </span>
                  <span className="mt-0.5 block text-[12px] font-semibold leading-[1.45] text-[#64778a] sm:text-[13px]">
                    {text}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

export default Classroom;
