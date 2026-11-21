import { MessageCircle, Instagram } from "lucide-react";
import Section from "../components/Section.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import Button from "../components/Button.jsx";
import { links } from "../data/links.js";

const cardClass = "rounded-2xl border border-line bg-white p-6";
const iconClass = "mb-3 grid h-11 w-11 place-items-center rounded-full bg-[#edf5fb] text-[#2478b8]";

// Three contact cards + a "request a call" box (id="contact").
function Contact() {
  return (
    <Section id="contact" className="bg-soft">
      <SectionHeading
        className="mb-10"
        eyebrow="Official WayForSky Channels"
        title="Connect with us. Check our public presence."
        text="Choose the channel that is easiest for you. For personal guidance, request a call from the academy team."
      />

      <div className="grid gap-4 md:grid-cols-3">
        {/* WhatsApp */}
        <article className={cardClass}>
          <div className={iconClass}>
            <MessageCircle size={22} />
          </div>
          <h3 className="mb-2 text-[17px] font-bold text-navy">WhatsApp</h3>
          <p className="mb-4 min-h-[40px] text-[13px] text-muted">
            Message the academy for scholarship details, registration support and follow-up.
          </p>
          <Button href={links.whatsappScholarship} target="_blank" rel="noopener noreferrer" className="w-full">
            Chat on WhatsApp
          </Button>
        </article>

        {/* Instagram */}
        <article className={cardClass}>
          <div className={iconClass}>
            <Instagram size={22} />
          </div>
          <h3 className="mb-2 text-[17px] font-bold text-navy">Instagram</h3>
          <p className="mb-4 min-h-[40px] text-[13px] text-muted">
            Follow our official page for aviation content, academy updates and student stories.
          </p>
          <Button href={links.instagram} variant="outline" target="_blank" rel="noopener noreferrer" className="w-full">
            Follow @wayforskyofficial
          </Button>
        </article>

        {/* Google reviews */}
        <article className={cardClass}>
          <div className="mb-3 text-lg font-extrabold text-[#555]">
            <span className="mr-1 text-[26px] text-[#4285f4]">G</span>Google
          </div>
          <h3 className="mb-2 text-[17px] font-bold text-navy">Google reviews</h3>
          <p className="mb-2 text-[13px] text-muted">
            Scroll through review highlights, then open Google to read the original reviews.
          </p>
          <div className="my-2 text-[26px] leading-tight tracking-[3px] text-[#f5b400]" aria-label="Google star graphic">
            ★★★★★
          </div>
          <div className="mb-3 text-[11px] font-extrabold text-[#496477]">WayForSky on Google</div>
          <Button href={links.googleReviews} variant="outline" target="_blank" rel="noopener noreferrer" className="w-full">
            View All Google Reviews
          </Button>
        </article>
      </div>

      {/* Request a call */}
      <div className="mt-5 flex flex-col gap-4 rounded-2xl border border-line bg-white px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <strong className="text-[17px] text-navy">Would you prefer a phone call?</strong>
          <p className="mt-1 text-[13px] text-muted">
            Request a counselling call and select your preferred date and time. Our team
            will contact you to confirm.
          </p>
        </div>
        <Button href="#register" className="shrink-0">
          Request a Call Back
        </Button>
      </div>

      <p className="mt-4 text-center text-[12px] text-[#7b8996]">
        The star graphic is a visual link cue, not a claimed WayForSky rating. The live
        Google page shows the current rating and verified public reviews.
      </p>
    </Section>
  );
}

export default Contact;
