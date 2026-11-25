import Container from "../components/Container.jsx";
import { links } from "../data/links.js";

// Footer links. Add, remove or rename links here.
const footerLinks = [
  { label: "Scholarship", href: "#scholarship" },
  { label: "Training", href: "#training" },
  { label: "FAQs", href: "#faq" },
  { label: "Register", href: "#register" },
  { label: "Instagram", href: links.instagram, external: true },
  { label: "Contact & Reviews", href: "#contact" },
];

function Footer() {
  return (
    <footer className="bg-navy-dark py-9 text-[#b7c6d4]">
      <Container className="flex flex-wrap items-center justify-between gap-6">
        {/* Brand + tagline */}
        <div>
          <a href="#home" aria-label="WayForSky home" className="block w-fit">
            <img
              src="/logo2.png"
              alt="WayForSky – Global Aviation Pathway"
              className="h-10 w-auto"
            />
          </a>
          <p className="mt-3 max-w-xs text-xs text-[#879aaa]">
            Global Aviation Pathway · Helping aspiring pilots take informed next steps.
          </p>
        </div>

        {/* Links */}
        <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
          {footerLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="transition hover:text-white"
              {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <p className="w-full text-xs text-[#879aaa]">
          © {new Date().getFullYear()} WayForSky. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}

export default Footer;
