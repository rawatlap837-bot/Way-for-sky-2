import { links } from "../data/links.js";
import skymo from "../assets/images/skymo.jpg";

/* Every icon is drawn to fill its whole chip, so all four look the same size
   and sit exactly in the centre of their circle. */

function WhatsAppIcon({ className = "" }) {
  return (
    // Tight viewBox crops the empty margin so the badge fills the chip.
    <svg viewBox="2.6 2.6 26.8 26.8" aria-hidden="true" className={className}>
      <path
        fill="#25D366"
        d="M16 3A12.7 12.7 0 0 0 5.2 22.3L3.4 29l6.9-1.8A12.7 12.7 0 1 0 16 3Z"
      />
      <path
        fill="#fff"
        d="M16 6.1a9.6 9.6 0 0 0-8.2 14.6l.3.5-1.1 4.1 4.2-1.1.5.3A9.6 9.6 0 1 0 16 6.1Zm5.8 13.7c-.3.8-1.7 1.6-2.3 1.7-.6.1-1.3.2-2.1-.1-.5-.2-1.2-.4-2-.8-3.5-1.5-5.8-5.1-6-5.3-.2-.3-1.4-1.9-1.4-3.6 0-1.7.9-2.6 1.2-3 .3-.3.7-.4.9-.4h.7c.2 0 .5 0 .8.6.3.7 1 2.4 1.1 2.6.1.2.2.4 0 .7-.1.2-.2.4-.4.6l-.6.7c-.2.2-.4.4-.2.8.2.4 1 1.6 2.1 2.6 1.4 1.3 2.7 1.7 3.1 1.9.4.2.7.1.9-.1.3-.3.8-.9 1-1.2.2-.3.5-.2.8-.1.3.1 2 .9 2.4 1.1.3.2.6.3.7.4.1.2.1 1.1-.2 1.9Z"
      />
    </svg>
  );
}

function PhoneIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path
        d="M7.1 3.5 4.8 4.7c-.8.4-1.2 1.3-1 2.2 1.2 5.4 5 9.2 10.4 10.4.9.2 1.8-.2 2.2-1l1.2-2.3-4-1.7-1.3 1.5c-2-.8-3.7-2.5-4.5-4.5l1.5-1.3-2.2-4.5Z"
        fill="currentColor"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function InstagramIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={className}>
      <defs>
        <radialGradient id="instagram-gradient" cx="0.25" cy="1" r="1.2">
          <stop offset="0" stopColor="#FFD600" />
          <stop offset="0.25" stopColor="#FF7A00" />
          <stop offset="0.55" stopColor="#FF0169" />
          <stop offset="0.78" stopColor="#D300C5" />
          <stop offset="1" stopColor="#7638FA" />
        </radialGradient>
      </defs>
      <rect width="32" height="32" rx="8" fill="url(#instagram-gradient)" />
      <rect x="7.5" y="7.5" width="17" height="17" rx="5" fill="none" stroke="#fff" strokeWidth="2.2" />
      <circle cx="16" cy="16" r="4.2" fill="none" stroke="#fff" strokeWidth="2.2" />
      <circle cx="22.1" cy="10.2" r="1.3" fill="#fff" />
    </svg>
  );
}

function SkymoIcon({ className = "" }) {
  return (
    // White backing + object-contain keeps the whole cartoon visible (no cropping),
    // and object-center keeps it centred inside the circle.
    <span className={`flex items-center justify-center rounded-full bg-white ${className}`}>
      <img
        src={skymo}
        alt=""
        aria-hidden="true"
        draggable="false"
        className="h-full w-full scale-[1.12] object-contain object-center"
      />
    </span>
  );
}

// fill: the icon is its own badge and fills the entire chip.
// chip: circle behind icons that are not badges.
// pill: button colour on desktop (md and up).
const actions = [
  {
    label: "WhatsApp",
    href: links.whatsapp,
    icon: WhatsAppIcon,
    fill: true,
    pill: "md:bg-[#168b54]",
    external: true,
  },
  {
    label: "Request Call",
    href: "#register",
    icon: PhoneIcon,
    chip: "bg-[#155b9b] text-white",
    pill: "md:bg-[#155b9b]",
  },
  {
    label: "Instagram",
    href: links.instagram,
    icon: InstagramIcon,
    fill: true,
    pill: "md:bg-gradient-to-r md:from-[#f58529] md:via-[#dd2a7b] md:to-[#8134af]",
    external: true,
  },
  {
    label: "Ask Skymo",
    href: "#skymo",
    icon: SkymoIcon,
    fill: true,
    chip: "ring-1 ring-black/10",
    pill: "md:bg-navy-light",
  },
];

function FloatingActions() {
  return (
    <nav
      aria-label="Quick contact links"
      // inset-x-0 + mx-auto + w-fit centres the dock without the width squeeze
      // that left-1/2 causes. On desktop it docks to the bottom-right instead.
      className="fixed inset-x-0 bottom-[max(0.5rem,env(safe-area-inset-bottom))] z-50 mx-auto flex w-fit items-center justify-center gap-2.5 rounded-full border border-white/80 bg-white/95 px-3 py-2 shadow-[0_10px_26px_rgba(7,29,54,0.30)] backdrop-blur-md md:inset-x-auto md:bottom-5 md:right-3 md:mx-0 md:flex-col md:items-stretch md:gap-1.5 md:rounded-none md:border-0 md:bg-transparent md:p-0 md:shadow-none md:backdrop-blur-none"
    >
      {actions.map((action) => {
        const Icon = action.icon;

        return (
          <a
            key={action.label}
            href={action.href}
            aria-label={action.label}
            onClick={(event) => {
              if (action.href === "#register") {
                event.preventDefault();
                window.dispatchEvent(new Event("open-scholarship-popup"));
              }
            }}
            className={`flex shrink-0 items-center justify-center rounded-full transition active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#155b9b] md:justify-start md:gap-2 md:py-1 md:pl-1 md:pr-3 md:text-white md:shadow-md ${action.pill}`}
            {...(action.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            {/* 48px chip on phones, 30px on desktop */}
            <span
              className={`flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full md:h-[30px] md:w-[30px] ${action.chip ?? ""}`}
            >
              <Icon className={action.fill ? "h-full w-full" : "h-7 w-7 md:h-4 md:w-4"} />
            </span>
            <span className="hidden text-xs font-bold md:inline">{action.label}</span>
          </a>
        );
      })}
    </nav>
  );
}

export default FloatingActions;