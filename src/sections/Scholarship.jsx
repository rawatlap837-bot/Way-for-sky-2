import {
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle2,
  Compass,
  GraduationCap,
  Lock,
} from "lucide-react";
import Section from "../components/Section.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import Button from "../components/Button.jsx";
import { links } from "../data/links.js";

// The four points under the paragraph (left side).
const scholarshipPoints = [
  {
    icon: GraduationCap,
    title: "100% Scholarship",
    text: "For all six ground-class subjects",
  },
  {
    icon: Award,
    title: "Merit-Based",
    text: "Selection through assessment",
  },
  {
    icon: BookOpen,
    title: "Academic Support",
    text: "Structured instructor guidance",
  },
  {
    icon: Compass,
    title: "Clear Pathway",
    text: "Understand your next aviation steps",
  },
];

// Dark blue section with the fee card on the right (id="scholarship").
function Scholarship() {
  return (
    <Section
      id="scholarship"
      className="relative overflow-hidden bg-navy text-white"
    >
      {/* Subtle ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-[#1a5bd6]/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-[#2e78b7]/15 blur-3xl"
      />

      <div className="relative grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        {/* ---------- Left side ---------- */}
        <div>
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1 text-xs font-bold tracking-wide text-[#9fd0ff]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#f1bd32]" />
            The WayForSky Initiative
          </span>

          <SectionHeading
            align="left"
            light
            title="A genuine scholarship opportunity from the WayForSky Academy."
            text="This is a WayForSky scholarship initiative for aspiring pilots. 100 selected students will receive 100% scholarship coverage for all six DGCA Ground Classes subjects. Students complete the registration process and merit-based assessment before scholarship selection is confirmed."
          />

          <div className="mt-7 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
            {scholarshipPoints.map((point) => {
              const Icon = point.icon;
              return (
                <div
                  key={point.title}
                  className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur-sm transition hover:bg-white/[0.1]"
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[#1a5bd6]/30 text-[#8ec5ff]">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div>
                    <strong className="block text-[15px] font-bold text-white">
                      {point.title}
                    </strong>
                    <span className="text-xs leading-snug text-[#b8c9d8]">
                      {point.text}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ---------- Right side: fee card ---------- */}
        <div className="relative overflow-hidden rounded-3xl border border-white/20 bg-white p-6 text-ink shadow-[0_24px_60px_rgba(0,0,0,0.28)] sm:p-8">
          {/* Top gradient bar */}
          <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-[#0a3cb0] via-[#2e78b7] to-[#f1bd32]" />

          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#64778a]">
              One-Time Programme Registration Fee
            </span>
            <span className="rounded-full border border-[#f1bd32]/60 bg-[#fff9e6] px-2.5 py-0.5 text-[11px] font-extrabold text-[#8a6200]">
              100 Seats Only
            </span>
          </div>

          <div className="mt-2 flex items-baseline gap-2.5">
            <span className="text-5xl font-black tracking-tight text-navy">
              ₹7,999
            </span>
            <span className="text-xs font-semibold text-[#64778a]">
              / Registration &amp; Admin Fee
            </span>
          </div>

          {/* Key highlights */}
          <ul className="my-4 space-y-2 border-y border-[#e6eef5] py-4 text-[13px] font-medium text-[#2c3f54]">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
              Includes scholarship registration &amp; merit assessment
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
              100% tuition waiver on all 6 DGCA subjects upon selection
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
              Instant payment receipt &amp; confirmation
            </li>
          </ul>

          <p className="mb-5 rounded-xl border border-[#dce8f3] bg-[#f4f8fc] p-3.5 text-[12.5px] leading-relaxed text-[#42556b]">
            <strong className="font-bold text-navy">Important:</strong> ₹7,999 is the
            registration and administration fee only. It is not the tuition fee for the
            six DGCA Ground Classes subjects. The scholarship covers those six subjects for
            students selected under the official merit-based process.
          </p>

          <Button
            href={links.razorpay}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full rounded-xl bg-gradient-to-r from-[#0a3cb0] to-[#1a5bd6] py-3.5 text-base font-extrabold text-white shadow-[0_10px_24px_rgba(10,60,176,0.3)] hover:brightness-110"
          >
            Pay ₹7,999 &amp; Register Now
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </Button>

          <p className="mt-3 flex items-center justify-center gap-1.5 text-[11px] font-semibold text-[#64778a]">
            <Lock className="h-3.5 w-3.5 text-emerald-600" aria-hidden="true" />
            Secured by Razorpay · UPI, Cards &amp; NetBanking
          </p>
        </div>
      </div>
    </Section>
  );
}

export default Scholarship;
