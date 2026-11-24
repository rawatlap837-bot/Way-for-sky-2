import Section from "../components/Section.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import Button from "../components/Button.jsx";
import { links } from "../data/links.js";

function WhatsAppIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className={className}>
      <circle cx="24" cy="24" r="24" fill="#25D366" />
      <path fill="#fff" d="M24.1 10.2A13.7 13.7 0 0 0 12.4 31l-1.5 5.7 5.9-1.5A13.7 13.7 0 1 0 24.1 10.2Zm0 24.7a11 11 0 0 1-5.6-1.5l-.4-.2-3.5.9.9-3.4-.3-.4A11 11 0 1 1 24.1 34.9Zm6-8.2c-.3-.2-2-.9-2.3-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-2-.9-3.2-1.7-4.5-3.8-.3-.6.3-.6.9-1.9.1-.2.1-.4 0-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.2-1.2 2.9s1.2 3.3 1.4 3.5c.2.2 2.4 3.7 5.8 5.1 2.2.9 3.1.9 4.2.8.7-.1 2-.8 2.3-1.6.3-.8.3-1.5.2-1.6-.1-.2-.3-.3-.6-.5Z" />
    </svg>
  );
}

function InstagramIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className={className}>
      <defs>
        <radialGradient id="contact-instagram-gradient" cx="30%" cy="107%" r="112%">
          <stop offset="0" stopColor="#FDF497" />
          <stop offset="0.28" stopColor="#FD5949" />
          <stop offset="0.62" stopColor="#D6249F" />
          <stop offset="1" stopColor="#285AEB" />
        </radialGradient>
      </defs>
      <rect x="2" y="2" width="44" height="44" rx="12" fill="url(#contact-instagram-gradient)" />
      <rect x="11" y="11" width="26" height="26" rx="8" fill="none" stroke="#fff" strokeWidth="3" />
      <circle cx="24" cy="24" r="7" fill="none" stroke="#fff" strokeWidth="3" />
      <circle cx="33.5" cy="14.8" r="2.2" fill="#fff" />
    </svg>
  );
}

function GoogleIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className={className}>
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3A12 12 0 1 1 31.8 13l5.7-5.7A20 20 0 1 0 44 24c0-1.2-.1-2.4-.4-3.5Z" />
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8A12 12 0 0 1 24 12c3.1 0 5.9 1.2 8.1 3.1l5.7-5.7A20 20 0 0 0 6.3 14.7Z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-1.8 13.4-4.8l-6.2-5.2A12 12 0 0 1 12.9 29l-6.6 5.1A20 20 0 0 0 24 44Z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3a12 12 0 0 1-4.1 5.5l6.2 5.2C36.9 39.2 44 34 44 24c0-1.2-.1-2.4-.4-3.5Z" />
    </svg>
  );
}

const cardClass = "rounded-2xl border border-[#dfe8ef] bg-white p-5 shadow-[0_8px_24px_rgba(7,29,54,0.06)] transition duration-300 hover:-translate-y-1 hover:border-[#bfd2e1] hover:shadow-[0_14px_32px_rgba(7,29,54,0.10)] sm:p-6";

// Three contact cards + a "request a call" box (id="contact").
function Contact() {
  return (
    <Section id="contact" className="border-y border-[#e3ebf1] bg-white">
      <SectionHeading
        className="mb-10"
        eyebrow="Official WayForSky Channels"
        title="Connect with us. Check our public presence."
        text="Choose the channel that is easiest for you. For personal guidance, request a call from the academy team."
      />

      <div className="grid gap-4 md:grid-cols-3">
        {/* WhatsApp */}
        <article className={cardClass}>
          <div className="mb-4 grid h-12 w-12 place-items-center rounded-xl bg-[#edf9f2] ring-1 ring-[#d7ecdf]">
            <WhatsAppIcon className="h-8 w-8" />
          </div>
          <h3 className="mb-2 text-[17px] font-extrabold text-navy">WhatsApp</h3>
          <p className="mb-4 min-h-[40px] text-[13px] font-medium leading-[1.6] text-[#64778a]">
            Message the academy for scholarship details, registration support and follow-up.
          </p>
          <Button href={links.whatsappScholarship} target="_blank" rel="noopener noreferrer" className="w-full">
            Chat on WhatsApp
          </Button>
        </article>

        {/* Instagram */}
        <article className={cardClass}>
          <div className="mb-4 grid h-12 w-12 place-items-center rounded-xl bg-[#fdf2f8] ring-1 ring-[#f1d9e8]">
            <InstagramIcon className="h-8 w-8" />
          </div>
          <h3 className="mb-2 text-[17px] font-extrabold text-navy">Instagram</h3>
          <p className="mb-4 min-h-[40px] text-[13px] font-medium leading-[1.6] text-[#64778a]">
            Follow our official page for aviation content, academy updates and student stories.
          </p>
          <Button href={links.instagram} variant="outline" target="_blank" rel="noopener noreferrer" className="w-full">
            Follow @wayforskyofficial
          </Button>
        </article>

        {/* Google reviews */}
        <article className={cardClass}>
          <div className="mb-4 grid h-12 w-12 place-items-center rounded-xl bg-[#eef4fb] ring-1 ring-[#dbe6f2]">
            <GoogleIcon className="h-8 w-8" />
          </div>
          <h3 className="mb-2 text-[17px] font-extrabold text-navy">Google reviews</h3>
          <p className="mb-2 text-[13px] font-medium leading-[1.6] text-[#64778a]">
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
