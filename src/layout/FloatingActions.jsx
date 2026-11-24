import { links } from "../data/links.js";
import skymo from "../assets/images/skymo.jpg";

function WhatsAppIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className={className}>
      <circle cx="24" cy="24" r="24" fill="#25D366" />
      <g transform="translate(9 9) scale(1.25)">
        <path
          fill="#fff"
          d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"
        />
      </g>
    </svg>
  );
}

function PhoneIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path
        fill="currentColor"
        d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"
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
    // object-cover fills the whole circle; the zoom + top-biased position
    // frames the mascot's head and upper body instead of a tiny full figure.
    <span className={`block overflow-hidden rounded-full bg-[#e8f3fc] ${className}`}>
      <img
        src={skymo}
        alt=""
        aria-hidden="true"
        draggable="false"
        className="h-full w-full scale-[1.6] object-cover object-[50%_22%]"
      />
    </span>
  );
}

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
    href: links.phone,
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
              <Icon
                className={
                  action.fill
                    ? "h-full w-full"
                    : "h-[34px] w-[34px] md:h-[18px] md:w-[18px]"
                }
              />
            </span>
            <span className="hidden text-xs font-bold md:inline">{action.label}</span>
          </a>
        );
      })}
    </nav>
  );
}

export default FloatingActions;