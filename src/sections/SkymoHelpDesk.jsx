import Section from "../components/Section.jsx";
import Button from "../components/Button.jsx";
import { links } from "../data/links.js";

// The small pills under the paragraph.
const helpTopics = ["Scholarship Details", "Registration Help", "Call Booking"];

// Skymo = the WayForSky mascot (id="skymo").
function SkymoHelpDesk() {
  return (
    <Section id="skymo" className="overflow-hidden bg-gradient-to-b from-white to-[#edf5fb]">
      <div className="mx-auto grid max-w-[930px] items-center gap-6 md:grid-cols-[260px_1fr] md:gap-10">
        {/* Mascot card with speech bubble */}
        <div className="relative mx-auto w-full max-w-[280px] rounded-[28px] border border-[#bcd7ea] bg-gradient-to-b from-[#eef8ff] to-white px-4 pb-4 pt-16 shadow-[0_18px_50px_rgba(7,29,54,0.12)] md:max-w-[260px]">
          <div className="absolute left-1/2 top-3 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-[#cfe3f2] bg-white px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.14em] text-brand-dark shadow-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_0_3px_rgba(16,185,129,0.12)]" />
            Help desk online
          </div>

          <div className="absolute right-4 top-12 z-10 -rotate-2 rounded-2xl rounded-bl-md border-2 border-[#78b9ed] bg-white px-3 py-2 text-center text-base font-black leading-tight text-navy shadow-lg md:text-xl">
            May I help
            <br />you?
            <span className="absolute -bottom-2 left-5 h-4 w-4 rotate-45 border-b-2 border-l-2 border-[#78b9ed] bg-white" />
          </div>

          <div className="mt-7 overflow-hidden rounded-[22px] bg-[radial-gradient(circle_at_center,#ffffff_0%,#e8f4fb_70%,#dcebf5_100%)]">
            <img
              src="/cartoon-removebg-preview.png"
              alt="Skymo, WayForSky help desk"
              className="mx-auto h-[220px] w-full object-contain mix-blend-multiply drop-shadow-md md:h-[250px]"
            />
          </div>
          <p className="mt-3 text-center text-[11px] font-extrabold uppercase tracking-[0.16em] text-brand-dark">
            WayForSky Help Desk
          </p>
        </div>

        {/* Text */}
        <div className="text-center md:text-left">
          <h2 className="mb-3 text-[clamp(1.8rem,8vw,2.6rem)] font-extrabold leading-[1.08] tracking-tight text-navy">
            Hi, I’m Skymo.
          </h2>
          <p className="mx-auto max-w-xl text-[15px] leading-[1.65] text-muted md:mx-0">
            Get guidance on scholarships, DGCA subjects, eligibility, registration or
            counselling calls. Choose an option and reach the right support channel.
          </p>

          <div className="mt-4 grid grid-cols-3 gap-1.5 sm:gap-2.5 md:justify-start">
            {helpTopics.map((topic, index) => (
              <div
                key={topic}
                className="flex min-h-[96px] flex-col items-center justify-center rounded-xl border border-[#dce8f1] bg-white px-1.5 py-2.5 text-center shadow-[0_6px_18px_rgba(7,29,54,0.05)] sm:min-h-14 sm:flex-row sm:items-center sm:px-3.5 sm:py-2.5 sm:text-left"
              >
                <span className="mb-1.5 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-ice text-[15px] font-black text-brand-dark sm:mb-0 sm:mr-3 sm:h-8 sm:w-8 sm:text-sm">
                  {index + 1}
                </span>
                <span className="text-[11px] font-extrabold leading-[1.25] text-navy sm:text-xs sm:leading-snug">{topic}</span>
              </div>
            ))}
          </div>

          <div className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2 md:flex md:flex-wrap">
            <Button href={links.whatsapp} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
              WhatsApp Help
            </Button>
            <Button href="#register" variant="outline" className="w-full sm:w-auto">
              Book a Call Slot
            </Button>
            <Button href={links.instagram} variant="outline" target="_blank" rel="noopener noreferrer" className="w-full sm:col-span-2 md:w-auto">
              Instagram
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}

export default SkymoHelpDesk;
