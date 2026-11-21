import { useState } from "react";
import { Menu, X } from "lucide-react";
import Container from "../components/Container.jsx";
import Button from "../components/Button.jsx";
import logo from "../assets/images/logo.jpg";

// Menu links. Add, remove or rename links here.
// "href" must match the id of a section (for example id="faq" -> "#faq").
const navLinks = [
  { label: "Scholarship", href: "#scholarship" },
  { label: "Academy", href: "#academy" },
  { label: "Roadmap", href: "#career-pathway" },
  { label: "Videos & Podcast", href: "#media" },
  { label: "Testimonials", href: "#testimonial-shorts" },
  { label: "Reviews", href: "#google-review-highlights" },
  { label: "FAQs", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

function Header() {
  // Controls the mobile menu (opens when the menu icon is tapped).
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-white/95 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-3 sm:h-[72px]">
        {/* Logo */}
        <a href="#home" aria-label="WayForSky home" className="shrink-0">
          <img
            src={logo}
            alt="WayForSky – Global Aviation Pathway"
            className="h-9 w-auto sm:h-[54px]"
          />
        </a>

        {/* Desktop menu */}
        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-6 text-sm font-semibold text-[#415368] xl:flex"
        >
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="transition hover:text-brand">
              {link.label}
            </a>
          ))}
        </nav>

        {/* Apply button + mobile menu button */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Button href="#register" className="whitespace-nowrap px-3 py-2 text-xs sm:px-5 sm:py-2.5 sm:text-sm">
            <span className="sm:hidden">Apply</span>
            <span className="hidden sm:inline">Apply Now</span>
          </Button>

          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-line text-navy xl:hidden"
          >
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </Container>

      {/* Mobile menu */}
      {menuOpen && (
        <nav
          aria-label="Mobile navigation"
          className="border-t border-line bg-white xl:hidden"
        >
          <Container className="grid grid-cols-2 gap-x-4 py-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="border-b border-line py-3 text-sm font-semibold text-[#415368] hover:text-brand"
              >
                {link.label}
              </a>
            ))}
          </Container>
        </nav>
      )}
    </header>
  );
}

export default Header;
