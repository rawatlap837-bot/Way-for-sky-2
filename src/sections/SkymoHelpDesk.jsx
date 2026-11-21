import Section from "../components/Section.jsx";
import Eyebrow from "../components/Eyebrow.jsx";
import Button from "../components/Button.jsx";
import skymo from "../assets/images/skymo.jpg";
import { links } from "../data/links.js";

// The small pills under the paragraph.
const helpTopics = ["Scholarship Details", "Registration Help", "Call Booking"];

// Skymo = the WayForSky mascot (id="skymo").
function SkymoHelpDesk() {
  return (
    <Section id="skymo" className="bg-white">
      <div className="mx-auto grid max-w-[930px] items-center gap-8 md:grid-cols-[260px_1fr] md:gap-10">
        {/* Mascot card with speech bubble */}
        <div className="relative mx-auto w-full max-w-[260px] rounded-3xl border border-line bg-[#f1f7fb] px-4 pb-4 pt-20">
          <div className="absolute right-3 top-4 max-w-[190px] -rotate-2 rounded-3xl rounded-bl-md border-2 border-[#78b9ed] bg-gradient-to-br from-white to-[#eaf6ff] px-4 py-3 text-center text-xl font-black leading-tight text-[#08264b] shadow-lg">
            May I help you?
            {/* little tail of the speech bubble */}
            <span className="absolute -bottom-2 left-6 h-4 w-4 rotate-45 border-b-2 border-l-2 border-[#78b9ed] bg-[#edf7ff]" />
          </div>

          <img
            src={skymo}
            alt="Skymo, WayForSky help desk"
            className="mx-auto h-[250px] w-full object-contain mix-blend-multiply"
          />
          <p className="mt-2 text-center text-xs font-extrabold tracking-wider text-brand-dark">
            WayForSky Help Desk
          </p>
        </div>

        {/* Text */}
        <div className="text-center md:text-left">
          <Eyebrow>Need help? Skymo is here.</Eyebrow>
          <h2 className="mb-3 block text-[clamp(1.75rem,3.5vw,2.6rem)] font-extrabold leading-tight tracking-tight text-navy">
            Hi, I’m Skymo.
          </h2>
          <p className="text-muted">
            Need help with the scholarship, DGCA subjects, eligibility, registration or
            booking a counselling call? Choose a help option below and Skymo will guide
            you to the right WayForSky support channel.
          </p>

          <div className="mt-5 flex flex-wrap justify-center gap-2.5 md:justify-start">
            {helpTopics.map((topic) => (
              <span
                key={topic}
                className="rounded-full border border-[#dce8f1] bg-[#eef5fa] px-3 py-2 text-xs font-bold text-brand-dark"
              >
                {topic}
              </span>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap justify-center gap-3 md:justify-start">
            <Button href={links.whatsapp} target="_blank" rel="noopener noreferrer">
              WhatsApp Help
            </Button>
            <Button href="#register" variant="outline">
              Book a Call Slot
            </Button>
            <Button href={links.instagram} variant="outline" target="_blank" rel="noopener noreferrer">
              Instagram
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}

export default SkymoHelpDesk;
