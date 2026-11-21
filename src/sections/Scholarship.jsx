import Section from "../components/Section.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import Button from "../components/Button.jsx";

// The four points under the paragraph (left side).
const scholarshipPoints = [
  { title: "100% Scholarship", text: "For all six ground-class subjects" },
  { title: "Merit-Based", text: "Selection through assessment" },
  { title: "Academic Support", text: "Structured instructor guidance" },
  { title: "Clear Pathway", text: "Understand your next aviation steps" },
];

// Dark blue section with the fee card on the right (id="scholarship").
function Scholarship() {
  return (
    <Section id="scholarship" className="bg-navy text-white">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        {/* ---------- Left side ---------- */}
        <div>
          <SectionHeading
            align="left"
            light
            eyebrow="The WayForSky Initiative"
            title="A genuine scholarship opportunity from the WayForSky Academy."
            text="This is a WayForSky scholarship initiative for aspiring pilots. 100 selected students will receive 100% scholarship coverage for all six DGCA Ground Classes subjects. Students complete the registration process and merit-based assessment before scholarship selection is confirmed."
          />

          <div className="mt-7 grid grid-cols-2 gap-5">
            {scholarshipPoints.map((point) => (
              <div key={point.title} className="border-t border-white/20 pt-3.5">
                <strong className="block text-[15px] text-white">{point.title}</strong>
                <span className="text-xs text-[#b8c9d8]">{point.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ---------- Right side: fee card ---------- */}
        <div className="rounded-2xl bg-white p-6 text-ink shadow-[0_20px_55px_rgba(0,0,0,0.16)] sm:p-8">
          <div className="text-[11px] font-extrabold tracking-wider text-[#64778a]">
            One-Time Programme Registration Fee
          </div>
          <div className="my-1 text-5xl font-extrabold tracking-tight text-navy">₹7,999</div>
          <p className="mb-5 text-[13px] text-muted">
            <strong>Important:</strong> ₹7,999 is the registration and administration fee
            only. It is not the tuition fee for the six DGCA Ground Classes subjects. The
            scholarship covers those six subjects for students selected under the official
            merit-based process.
          </p>
          <Button href="#register" className="w-full">
            Start Your Registration
          </Button>
        </div>
      </div>
    </Section>
  );
}

export default Scholarship;
