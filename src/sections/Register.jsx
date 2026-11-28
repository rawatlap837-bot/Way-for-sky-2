import { useCallback, useEffect, useRef, useState } from "react";
import Section from "../components/Section.jsx";
import SectionHeading from "../components/SectionHeading.jsx";

/* ------------------------------------------------------------------ */
/* Config                                                              */
/* ------------------------------------------------------------------ */

// Deployed Google Apps Script web app (/exec URL).
// Can be overridden with VITE_REGISTER_URL in your .env file.
const GOOGLE_SHEET_WEB_APP_URL =
  import.meta.env?.VITE_REGISTER_URL ||
  "https://script.google.com/macros/s/AKfycbyWJZKxWuaFGX9XEd0asxy_bNt5ho0j0r5PjW166fGwhP46FgiAQIrV2CQl-PCzAavN/exec";

const REQUEST_TIMEOUT_MS = 20000;

const WHATSAPP_REDIRECT_URL = `https://wa.me/917019903800?text=${encodeURIComponent(
  "I want to know more about this scholarship."
)}`;

const emptyForm = {
  fullName: "",
  mobile: "",
  email: "",
  city: "",
  education: "",
  counsellingTime: "",
};

const inputClass =
  "w-full rounded-lg border border-[#ccd8e2] bg-white px-3 py-3 text-sm text-ink outline-none transition focus:border-brand focus:ring-4 focus:ring-brand/15";

// Text fields rendered in the form, in order.
// `type: "datetime-local"` gets its minimum value added at render time.
const fields = [
  { name: "fullName", label: "Name", type: "text", placeholder: "Your full name", maxLength: 80, autoFocus: true, autoComplete: "name" },
  { name: "mobile", label: "Mobile number", type: "tel", placeholder: "10-digit mobile number", inputMode: "numeric", pattern: "[0-9]{10}", autoComplete: "tel" },
  { name: "email", label: "Email address", type: "email", placeholder: "Enter your email address", maxLength: 100, autoComplete: "email" },
  { name: "city", label: "City", type: "text", placeholder: "Your city", maxLength: 60, autoComplete: "address-level2" },
  {
    name: "education",
    label: "Current Education",
    type: "select",
    options: ["12th pass", "Currently in 12th", "Graduate", "Other"],
  },
  { name: "counsellingTime", label: "Preferred Counselling Date & Time", type: "datetime-local" },
];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

// Example: "23 Nov 2026, 10:30 am"
function formatCounsellingTime(value) {
  return new Date(value).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

// Current local time in the "YYYY-MM-DDTHH:mm" format datetime-local expects.
function getMinimumCounsellingTime() {
  const now = new Date();
  return new Date(now.getTime() - now.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 16);
}

// Returns an error message, or "" when the form is valid.
function validate(form) {
  if (!form.fullName.trim() || !form.city.trim() || !form.education.trim()) {
    return "Please fill in all the required fields.";
  }
  if (form.mobile.length !== 10) {
    return "Please enter exactly 10 digits for your mobile number.";
  }
  if (!EMAIL_PATTERN.test(form.email.trim())) {
    return "Please enter a valid email address.";
  }
  const time = new Date(form.counsellingTime).getTime();
  if (Number.isNaN(time) || time <= Date.now()) {
    return "Please choose a future date and time for your counselling call.";
  }
  return "";
}

// Generates a unique event ID for Meta Pixel + CAPI deduplication.
function createEventId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `lead_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

// Sends the form to the Apps Script and resolves only on a confirmed success.
async function submitRegistration(form, eventId) {
  const payload = new URLSearchParams({
    fullName: form.fullName.trim(),
    mobile: form.mobile,
    email: form.email.trim(),
    city: form.city.trim(),
    education: form.education.trim(),
    counsellingTime: formatCounsellingTime(form.counsellingTime),
    eventId,
  });

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(GOOGLE_SHEET_WEB_APP_URL, {
      method: "POST",
      body: payload,
      signal: controller.signal,
      redirect: "follow",
    });

    const text = await response.text();

    let result = null;
    try {
      result = JSON.parse(text);
    } catch (_error) {
      // Non-JSON (for example a Google error or login page) is treated as a failure below.
    }

    if (!response.ok || !result || result.success !== true) {
      throw new Error(result?.message || "Submission failed");
    }

    return result;
  } finally {
    clearTimeout(timeoutId);
  }
}

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

function Register() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState(emptyForm);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submittingRef = useRef(false); // blocks double taps before state updates

  const openPopup = useCallback(() => {
    setIsOpen(true);
    setErrorMessage("");
    setIsSubmitted(false);
  }, []);

  const closePopup = useCallback(() => setIsOpen(false), []);

  // Floating "Request Call" button opens the popup through this event.
  useEffect(() => {
    window.addEventListener("open-scholarship-popup", openPopup);
    return () => window.removeEventListener("open-scholarship-popup", openPopup);
  }, [openPopup]);

  // Lock page scroll and allow Escape to close while the popup is open.
  useEffect(() => {
    if (!isOpen) return undefined;

    document.body.style.overflow = "hidden";
    const closeOnEscape = (event) => {
      if (event.key === "Escape") closePopup();
    };
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen, closePopup]);

  function handleChange(event) {
    const { name, value } = event.target;
    const newValue = name === "mobile" ? value.replace(/\D/g, "").slice(0, 10) : value;
    setFormData((current) => ({ ...current, [name]: newValue }));
    if (errorMessage) setErrorMessage("");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (submittingRef.current) return;

    const problem = validate(formData);
    if (problem) {
      setErrorMessage(problem);
      return;
    }

    submittingRef.current = true;
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      const eventId = createEventId();
      await submitRegistration(formData, eventId);
      if (typeof window.fbq === "function") {
        window.fbq(
          "track",
          "Lead",
          { content_name: "WayForSky Scholarship Registration" },
          { eventID: eventId }
        );
      }
      setIsSubmitted(true);
      setFormData(emptyForm);
      window.location.href = WHATSAPP_REDIRECT_URL;
    } catch (error) {
      console.error("Registration failed:", error);
      setErrorMessage(
        error.name === "AbortError"
          ? "This is taking too long. Please check your internet and try again."
          : "Your application could not be submitted. Please try again."
      );
    } finally {
      submittingRef.current = false;
      setIsSubmitting(false);
    }
  }

  const minimumCounsellingTime = getMinimumCounsellingTime();

  return (
    <>
      <Section id="register" className="bg-navy text-white">
        <div className="mx-auto max-w-3xl text-center">
          <SectionHeading
            align="center"
            light
            eyebrow="Application & Counselling Call"
            title="Take Your First Step Towards The Pilot Pathway"
            text="Request a preferred counselling call and a WayForSky representative will contact you to explain the scholarship, selection process and official fee terms."
          />
          <button
            type="button"
            onClick={openPopup}
            className="mt-7 rounded-lg bg-white px-6 py-3 text-sm font-bold text-navy shadow-lg transition hover:-translate-y-0.5"
          >
            Register for Scholarship
          </button>
        </div>
      </Section>

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="popup-title"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#07182b]/75 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closePopup();
          }}
        >
          <div className="relative max-h-[calc(100dvh-2rem)] w-full max-w-md overflow-y-auto rounded-2xl bg-white p-6 text-ink shadow-2xl sm:p-7">
            <button
              type="button"
              aria-label="Close application form"
              onClick={closePopup}
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-[#edf3f7] text-xl leading-none text-navy transition hover:bg-[#dfeaf2]"
            >
              ×
            </button>

            {isSubmitted ? (
              <div role="status" className="py-6 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#edf7f0] text-2xl font-bold text-[#205c35]">
                  ✓
                </div>
                <h3 id="popup-title" className="text-xl font-bold text-navy">
                  Application Submitted
                </h3>
                <p className="mb-6 mt-2 text-sm text-muted">
                  Thank you. Redirecting you to WhatsApp...
                </p>
                <a
                  href={WHATSAPP_REDIRECT_URL}
                  className="mb-3 block w-full rounded-lg bg-[#25D366] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#1ebe5d]"
                >
                  Open WhatsApp
                </a>
                <button
                  type="button"
                  onClick={closePopup}
                  className="w-full rounded-lg bg-navy px-5 py-3 text-sm font-bold text-white transition hover:bg-[#123b63]"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <h3 id="popup-title" className="pr-10 text-xl font-bold text-navy">
                  Scholarship application
                </h3>
                <p className="mb-5 mt-1 text-xs text-muted">
                  Enter your details and our team will contact you.
                </p>

                <form onSubmit={handleSubmit} noValidate>
                  {fields.map((field) => {
                    const id = `popup-${field.name}`;
                    const isLast = field.name === "counsellingTime";

                    return (
                      <div key={field.name} className={isLast ? "mb-5" : "mb-4"}>
                        <label htmlFor={id} className="mb-1.5 block text-xs font-bold text-[#34495d]">
                          {field.label} *
                        </label>
                        {field.type === "select" ? (
                          <select
                            id={id}
                            name={field.name}
                            value={formData[field.name]}
                            onChange={handleChange}
                            required
                            className={inputClass}
                          >
                            <option value="" disabled>
                              Select your option
                            </option>
                            {field.options.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <input
                            id={id}
                            name={field.name}
                            type={field.type}
                            value={formData[field.name]}
                            onChange={handleChange}
                            placeholder={field.placeholder}
                            maxLength={field.maxLength}
                            inputMode={field.inputMode}
                            pattern={field.pattern}
                            autoComplete={field.autoComplete}
                            autoFocus={field.autoFocus}
                            min={isLast ? minimumCounsellingTime : undefined}
                            required
                            className={inputClass}
                          />
                        )}
                      </div>
                    );
                  })}

                  {errorMessage && (
                    <div role="alert" className="mb-3 rounded-lg bg-red-50 p-3 text-sm text-red-800">
                      {errorMessage}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-lg bg-navy px-5 py-3 text-sm font-bold text-white transition hover:bg-[#123b63] disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isSubmitting ? "Submitting..." : "Submit application"}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Register;