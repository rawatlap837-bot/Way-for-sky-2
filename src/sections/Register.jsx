import { useState } from "react";
import Section from "../components/Section.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import Button from "../components/Button.jsx";

// ---------- Dropdown options (edit freely) ----------
const educationOptions = ["Class 12 – Appearing", "Class 12 – Completed", "Graduate", "Other"];

const pilotReasonOptions = [
  "My childhood dream",
  "Interested in aviation",
  "Career opportunity",
  "Family inspiration",
  "Still exploring",
];

const callTimeOptions = [
  "10:00 AM – 12:00 PM",
  "12:00 PM – 2:00 PM",
  "2:00 PM – 4:00 PM",
  "4:00 PM – 6:00 PM",
  "6:00 PM – 8:00 PM",
];

const callModeOptions = ["Phone call", "WhatsApp call", "WhatsApp message first"];

// ---------- Message shown after the form is submitted ----------
// IMPORTANT: this form is not connected to a CRM or booking system yet.
// Once you connect it (see handleSubmit below), change this message to a normal
// "Thank you, we will contact you soon" message.
const successMessage =
  "Your details have been checked in this browser. To receive applications and confirm real call slots, this form must be connected to WayForSky's CRM/booking system. Until that connection is made, no application or appointment is actually submitted.";

// ---------- Starting (empty) values of the form ----------
const emptyForm = {
  fullName: "",
  mobile: "",
  parentMobile: "",
  email: "",
  city: "",
  state: "",
  education: "",
  pilotReason: "",
  callDate: "",
  callTime: "",
  callMode: "",
  question: "",
  consent: false,
};

// Today's date as YYYY-MM-DD, so people cannot pick a date in the past.
function getTodayDate() {
  const now = new Date();
  const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 10);
}

// Same look for every text box and dropdown.
const inputClass =
  "w-full rounded-lg border border-[#ccd8e2] bg-white px-3 py-3 text-sm text-ink outline-none transition focus:border-brand focus:ring-4 focus:ring-brand/15";

// One label + one input, used for every field below.
function Field({ label, htmlFor, children }) {
  return (
    <div className="mb-3.5">
      <label htmlFor={htmlFor} className="mb-1.5 block text-xs font-bold text-[#34495d]">
        {label}
      </label>
      {children}
    </div>
  );
}

// Small heading that splits the form into parts.
function FormPart({ children }) {
  return (
    <div className="mb-3 mt-5 border-t border-line pt-4 text-[13px] font-extrabold text-navy">
      {children}
    </div>
  );
}

// Application form (id="register").
function Register() {
  const [formData, setFormData] = useState(emptyForm);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Runs every time someone types or selects something.
  function handleChange(event) {
    const { name, value, type, checked } = event.target;

    // Mobile numbers: keep digits only, maximum 10.
    if (name === "mobile" || name === "parentMobile") {
      setFormData({ ...formData, [name]: value.replace(/\D/g, "").slice(0, 10) });
      return;
    }

    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  }

  // Runs when the form is submitted.
  // The browser has already checked the required fields before we get here.
  function handleSubmit(event) {
    event.preventDefault();

    if (formData.mobile.length !== 10 || formData.parentMobile.length !== 10) {
      setErrorMessage("Please enter exactly 10 digits for both mobile numbers.");
      setIsSubmitted(false);
      return;
    }

    setErrorMessage("");

    // TODO: send "formData" to your CRM / booking system here.
    // Example:
    // fetch("https://your-api-url.com/applications", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(formData),
    // });

    setIsSubmitted(true);
  }

  return (
    <Section id="register" className="bg-navy text-white">
      <div className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
        {/* ---------- Left side: text ---------- */}
        <div>
          <SectionHeading
            align="left"
            light
            eyebrow="Application & Counselling Call"
            title="Take your first step towards the pilot pathway."
            text="Complete the student details and request a preferred counselling call slot. A WayForSky representative will contact you to confirm availability and explain the scholarship, selection process and official fee terms."
          />
          <p className="mt-6 text-xs text-[#a9bfd2]">
            100 scholarship opportunities · Merit-based selection · Six DGCA Ground Classes subjects
          </p>
          <div className="my-4 rounded-xl bg-[#eef5fa] p-3 text-[12px] text-[#35536d]">
            Your selected slot is a preference request, not a confirmed appointment. The
            academy team will confirm the final time with you.
          </div>
        </div>

        {/* ---------- Right side: form ---------- */}
        <form onSubmit={handleSubmit} className="rounded-2xl bg-white p-5 text-ink sm:p-7">
          <h3 className="mb-1 text-[21px] font-bold text-navy">WayForSky scholarship application</h3>
          <p className="mb-5 text-xs text-muted">
            Complete all required fields. Please provide a reachable mobile number.
          </p>

          {/* Part 1 */}
          <FormPart>1. Student information</FormPart>

          <Field label="Student full name *" htmlFor="fullName">
            <input
              id="fullName"
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="As per your school / ID records"
              maxLength={80}
              required
              className={inputClass}
            />
          </Field>

          <div className="grid gap-x-3 sm:grid-cols-2">
            <Field label="Student mobile number *" htmlFor="mobile">
              <input
                id="mobile"
                name="mobile"
                type="tel"
                inputMode="numeric"
                autoComplete="tel"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="10-digit mobile number"
                pattern="[0-9]{10}"
                required
                className={inputClass}
              />
            </Field>
            <Field label="Parent / guardian number *" htmlFor="parentMobile">
              <input
                id="parentMobile"
                name="parentMobile"
                type="tel"
                inputMode="numeric"
                value={formData.parentMobile}
                onChange={handleChange}
                placeholder="10-digit mobile number"
                pattern="[0-9]{10}"
                required
                className={inputClass}
              />
            </Field>
          </div>

          <Field label="Email address *" htmlFor="email">
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email address"
              required
              className={`${inputClass} normal-case`}
            />
          </Field>

          <div className="grid gap-x-3 sm:grid-cols-2">
            <Field label="City *" htmlFor="city">
              <input
                id="city"
                name="city"
                type="text"
                value={formData.city}
                onChange={handleChange}
                placeholder="Your city"
                maxLength={60}
                required
                className={inputClass}
              />
            </Field>
            <Field label="State *" htmlFor="state">
              <input
                id="state"
                name="state"
                type="text"
                value={formData.state}
                onChange={handleChange}
                placeholder="Your state"
                maxLength={60}
                required
                className={inputClass}
              />
            </Field>
          </div>

          <Field label="Current education *" htmlFor="education">
            <select
              id="education"
              name="education"
              value={formData.education}
              onChange={handleChange}
              required
              className={`${inputClass} capitalize`}
            >
              <option value="">Select your current education</option>
              {educationOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </Field>

          <Field label="Why do you want to become a pilot? *" htmlFor="pilotReason">
            <select
              id="pilotReason"
              name="pilotReason"
              value={formData.pilotReason}
              onChange={handleChange}
              required
              className={`${inputClass} capitalize`}
            >
              <option value="">Select one</option>
              {pilotReasonOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </Field>

          {/* Part 2 */}
          <FormPart>2. Request your counselling call slot</FormPart>

          <div className="grid gap-x-3 sm:grid-cols-2">
            <Field label="Preferred call date *" htmlFor="callDate">
              <input
                id="callDate"
                name="callDate"
                type="date"
                min={getTodayDate()}
                value={formData.callDate}
                onChange={handleChange}
                required
                className={inputClass}
              />
            </Field>
            <Field label="Preferred time *" htmlFor="callTime">
              <select
                id="callTime"
                name="callTime"
                value={formData.callTime}
                onChange={handleChange}
                required
                className={`${inputClass} capitalize`}
              >
                <option value="">Choose a time window</option>
                {callTimeOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </Field>
          </div>

          <Field label="Preferred contact method *" htmlFor="callMode">
            <select
              id="callMode"
              name="callMode"
              value={formData.callMode}
              onChange={handleChange}
              required
              className={`${inputClass} capitalize`}
            >
              <option value="">Choose contact method</option>
              {callModeOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </Field>

          <Field label="Any question you want us to address? (Optional)" htmlFor="question">
            <input
              id="question"
              name="question"
              type="text"
              value={formData.question}
              onChange={handleChange}
              placeholder="Fees, eligibility, training, pilot pathway..."
              maxLength={240}
              className={inputClass}
            />
          </Field>

          {/* Consent */}
          <label className="my-3 flex items-start gap-2.5 text-xs font-medium text-[#34495d]">
            <input
              id="consent"
              name="consent"
              type="checkbox"
              checked={formData.consent}
              onChange={handleChange}
              required
              className="mt-0.5 h-4 w-4 shrink-0 accent-navy"
            />
            <span>
              I agree that WayForSky may contact me about this application and counselling
              call request. *
            </span>
          </label>

          <Button type="submit" className="mt-1 w-full">
            Submit Application & Request Call Slot
          </Button>

          <p className="mt-3 text-[11px] text-[#7b8996]">
            ₹7,999 is the programme registration and administration fee only, not DGCA
            ground-class tuition. Scholarship selection is merit-based and not guaranteed
            by submitting this form. Review official fee, refund and scholarship terms
            before payment.
          </p>

          {/* Messages */}
          {errorMessage && (
            <div role="alert" className="mt-3.5 rounded-lg bg-red-50 p-3 text-[13px] leading-normal text-red-800">
              {errorMessage}
            </div>
          )}
          {isSubmitted && (
            <div role="status" className="mt-3.5 rounded-lg bg-[#edf7f0] p-3 text-[13px] leading-normal text-[#205c35]">
              {successMessage}
            </div>
          )}
        </form>
      </div>
    </Section>
  );
}

export default Register;
