import { useEffect, useState } from "react";
import Section from "../components/Section.jsx";
import SectionHeading from "../components/SectionHeading.jsx";

function Register() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ fullName: "", mobile: "", email: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const openPopup = () => {
      setIsOpen(true);
      setErrorMessage("");
      setIsSubmitted(false);
    };

    window.addEventListener("open-scholarship-popup", openPopup);
    return () => window.removeEventListener("open-scholarship-popup", openPopup);
  }, []);

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
    if (name === "mobile") {
      setFormData({ ...formData, mobile: value.replace(/\D/g, "").slice(0, 10) });
      return;
    }
    setFormData({ ...formData, [name]: value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (formData.mobile.length !== 10) {
      setErrorMessage("Please enter exactly 10 digits for your mobile number.");
      setIsSubmitted(false);
      return;
    }

    setErrorMessage("");
    setIsSubmitted(true);
  }

  function closePopup() {
    setIsOpen(false);
  }

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
            onClick={() => setIsOpen(true)}
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
          <div className="relative w-full max-w-md rounded-2xl bg-white p-6 text-ink shadow-2xl sm:p-7">
            <button
              type="button"
              aria-label="Close application form"
              onClick={closePopup}
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-[#edf3f7] text-xl leading-none text-navy transition hover:bg-[#dfeaf2]"
            >
              ×
            </button>

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
                  className="w-full rounded-lg border border-[#ccd8e2] bg-white px-3 py-3 text-sm text-ink outline-none transition focus:border-brand focus:ring-4 focus:ring-brand/15"
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
                  className="w-full rounded-lg border border-[#ccd8e2] bg-white px-3 py-3 text-sm text-ink outline-none transition focus:border-brand focus:ring-4 focus:ring-brand/15"
                />
              </div>

              <div className="mb-5">
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
                  className="w-full rounded-lg border border-[#ccd8e2] bg-white px-3 py-3 text-sm text-ink outline-none transition focus:border-brand focus:ring-4 focus:ring-brand/15"
                />
              </div>

              {errorMessage && (
                <div role="alert" className="mb-3 rounded-lg bg-red-50 p-3 text-sm text-red-800">
                  {errorMessage}
                </div>
              )}
              {isSubmitted && (
                <div role="status" className="mb-3 rounded-lg bg-[#edf7f0] p-3 text-sm text-[#205c35]">
                  Thank you. WayForSky will contact you soon.
                </div>
              )}

              <button
                type="submit"
                className="w-full rounded-lg bg-navy px-5 py-3 text-sm font-bold text-white transition hover:bg-[#123b63]"
              >
                Submit application
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Register;
