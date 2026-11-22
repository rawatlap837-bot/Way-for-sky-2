import { useCallback, useEffect, useState } from "react";
import Section from "../components/Section.jsx";
import SectionHeading from "../components/SectionHeading.jsx";

const GOOGLE_SHEET_WEB_APP_URL = "https://script.google.com/macros/s/AKfycbzLbYJ7wybY9v5MvddOSZMKEbXWnHZB4DcnnjMQuAUrcaX-3FrXmc_VEirhdrKDsrdh/exec";

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

function Register() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState(emptyForm);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const openPopup = useCallback(() => {
    setIsOpen(true);
    setErrorMessage("");
    setIsSubmitted(false);
  }, []);

  function closePopup() {
    setIsOpen(false);
  }

  useEffect(() => {
    window.addEventListener("open-scholarship-popup", openPopup);
    return () => window.removeEventListener("open-scholarship-popup", openPopup);
  }, [openPopup]);

  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen]);

  function handleChange(event) {
    const { name, value } = event.target;
    const newValue = name === "mobile" ? value.replace(/\D/g, "").slice(0, 10) : value;
    setFormData((current) => ({ ...current, [name]: newValue }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (isSubmitting) return;

    if (
      !formData.fullName.trim() ||
      !formData.city.trim() ||
      !formData.education.trim()
    ) {
      setErrorMessage("Please fill in all the required fields.");
      return;
    }

    if (formData.mobile.length !== 10) {
      setErrorMessage("Please enter exactly 10 digits for your mobile number.");
      return;
    }

    if (new Date(formData.counsellingTime).getTime() <= Date.now()) {
      setErrorMessage("Please choose a future date and time for your counselling call.");
      return;
    }

    setErrorMessage("");
    setIsSubmitting(true);

    const payload = new URLSearchParams({
      fullName: formData.fullName.trim(),
      mobile: formData.mobile,
      email: formData.email.trim(),
      city: formData.city.trim(),
      education: formData.education.trim(),
      counsellingTime: formatCounsellingTime(formData.counsellingTime),
    });

    // Stop waiting after 20 seconds
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 20000);

    try {
      const response = await fetch(GOOGLE_SHEET_WEB_APP_URL, {
        method: "POST",
        body: payload,
        signal: controller.signal,
      });

      // The Apps Script replies with { success: true } or { success: false, message }
      const result = await response.json();
      if (!result.success) throw new Error(result.message || "Submission failed");

      setIsSubmitted(true);
      setFormData(emptyForm);
    } catch (error) {
      console.error("Registration failed:", error);
      setErrorMessage(
        error.name === "AbortError"
          ? "This is taking too long. Please check your internet and try again."
          : "Your application could not be submitted. Please try again."
      );
    } finally {
      clearTimeout(timeoutId);
      setIsSubmitting(false);
    }
  }

  const minimumCounsellingTime = new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 16);

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
          <div className="relative max-h-[calc(100vh-2rem)] w-full max-w-md overflow-y-auto rounded-2xl bg-white p-6 text-ink shadow-2xl sm:p-7">
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
                  Thank you. WayForSky will contact you soon.
                </p>
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

                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="popup-fullName" className="mb-1.5 block text-xs font-bold text-[#34495d]">
                      Name *
                    </label>
                    <input
                      id="popup-fullName"
                      name="fullName"
                      type="text"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Your full name"
                      maxLength={80}
                      required
                      autoFocus
                      className={inputClass}
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="popup-mobile" className="mb-1.5 block text-xs font-bold text-[#34495d]">
                      Mobile number *
                    </label>
                    <input
                      id="popup-mobile"
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
                  </div>

                  <div className="mb-4">
                    <label htmlFor="popup-email" className="mb-1.5 block text-xs font-bold text-[#34495d]">
                      Email address *
                    </label>
                    <input
                      id="popup-email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email address"
                      required
                      className={inputClass}
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="popup-city" className="mb-1.5 block text-xs font-bold text-[#34495d]">
                      City *
                    </label>
                    <input
                      id="popup-city"
                      name="city"
                      type="text"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Your city"
                      maxLength={60}
                      required
                      className={inputClass}
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="popup-education" className="mb-1.5 block text-xs font-bold text-[#34495d]">
                      Current Education *
                    </label>
                    <input
                      id="popup-education"
                      name="education"
                      type="text"
                      value={formData.education}
                      onChange={handleChange}
                      placeholder="Your current education"
                      maxLength={80}
                      required
                      className={inputClass}
                    />
                  </div>

                  <div className="mb-5">
                    <label htmlFor="popup-counsellingTime" className="mb-1.5 block text-xs font-bold text-[#34495d]">
                      Preferred Counselling Date & Time *
                    </label>
                    <input
                      id="popup-counsellingTime"
                      name="counsellingTime"
                      type="datetime-local"
                      value={formData.counsellingTime}
                      onChange={handleChange}
                      required
                      min={minimumCounsellingTime}
                      className={inputClass}
                    />
                  </div>

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