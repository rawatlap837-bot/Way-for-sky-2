import { ChevronDown } from "lucide-react";
import Section from "../components/Section.jsx";
import SectionHeading from "../components/SectionHeading.jsx";

// Questions and answers. To add one, copy a block and change the text.
const faqs = [
  {
    question: "What does the 100% scholarship cover?",
    answer: "For students selected under the programme, the scholarship covers the six DGCA Ground Classes subjects, subject to the official scholarship terms.",
  },
  {
    question: "Why is there a ₹7,999 registration fee?",
    answer: "The ₹7,999 is the programme registration and administration fee. It is not the ground-class tuition fee. Please read the official fee and refund terms before making payment.",
  },
  {
    question: "How are the 100 students selected?",
    answer: "Selection is merit-based and follows the assessment and eligibility criteria communicated by the WayForSky academy team.",
  },
  {
    question: "Does registration guarantee a scholarship?",
    answer: "No. Registration is the first step. Scholarship selection is subject to the programme's assessment, eligibility criteria and available places.",
  },
  {
    question: "Can I book a call after submitting my details?",
    answer: "Yes. Choose your preferred date and time in the registration form. This is a call-slot request; the academy team will confirm the available slot by phone or WhatsApp.",
  },
  {
    question: "Who can apply?",
    answer: "Students interested in a pilot career may submit an application. The academy team will explain the current eligibility and assessment criteria during the counselling call.",
  },
  {
    question: "Is the ₹7,999 amount refundable?",
    answer: "Please review the official written fee and refund terms shared by WayForSky before making any payment. Do not pay to a personal account or unofficial contact.",
  },
  {
    question: "How can I verify WayForSky?",
    answer: "Use the official Instagram page and Google search/reviews links on this page. You can also request a counselling call and ask the academy team for programme documents and clarification.",
  },
  {
    question: "How do I proceed after submitting the form?",
    answer: "After you submit the form and request a call slot, the academy team will contact you to confirm the time, explain the programme and guide you through the official next steps.",
  },
];

function Faq() {
  return (
    <Section id="faq" className="bg-soft">
      <SectionHeading
        className="mb-10"
        eyebrow="Need Clarity?"
        title="Frequently asked questions."
        text="Important details about the scholarship and registration."
      />

      <div className="mx-auto grid max-w-[820px] gap-2.5">
        {faqs.map((faq) => (
          // <details> opens and closes by itself - no extra code needed.
          <details key={faq.question} className="group rounded-xl border border-line bg-white px-5 py-4">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-bold text-navy [&::-webkit-details-marker]:hidden">
              {faq.question}
              <ChevronDown size={18} className="shrink-0 text-brand transition group-open:rotate-180" />
            </summary>
            <p className="mt-3 text-[13px] text-muted">{faq.answer}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}

export default Faq;
