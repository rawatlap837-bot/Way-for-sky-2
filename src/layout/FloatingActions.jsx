import { Phone, Instagram, Sparkles } from "lucide-react";
import { links } from "../data/links.js";

function WhatsAppIcon({ size = 18, className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M12.04 2a9.86 9.86 0 0 0-8.4 15.04L2.1 22l5.1-1.48A9.92 9.92 0 1 0 12.04 2Zm0 17.98a8.05 8.05 0 0 1-4.1-1.13l-.29-.17-3.02.88.89-2.95-.19-.3a8.03 8.03 0 1 1 6.71 3.67Zm4.41-6.02c-.24-.12-1.43-.7-1.65-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.43-1.34-1.67-.14-.24-.01-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.29-.74-1.77-.2-.47-.4-.41-.54-.42h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.69 2.58 4.1 3.62.57.25 1.02.39 1.37.5.58.18 1.1.16 1.52.1.46-.07 1.43-.58 1.63-1.15.2-.56.2-1.04.14-1.15-.06-.1-.22-.16-.46-.28Z" />
    </svg>
  );
}

// The round buttons fixed to the bottom-right corner of the screen.
// On phones only the icons show; on bigger screens the text shows too.
const actions = [
  { label: "WhatsApp", href: links.whatsapp, icon: WhatsAppIcon, colour: "bg-[#168b54]", external: true },
  { label: "Request Call", href: "#register", icon: Phone, colour: "bg-[#155b9b]" },
  { label: "Instagram", href: links.instagram, icon: Instagram, colour: "bg-[#a43b83]", external: true },
  { label: "Ask Skymo", href: "#skymo", icon: Sparkles, colour: "bg-navy-light" },
];

function FloatingActions() {
  return (
    <div
      aria-label="Quick contact links"
      className="fixed bottom-[max(0.65rem,env(safe-area-inset-bottom))] left-1/2 z-50 flex w-fit -translate-x-1/2 items-center gap-1.5 rounded-full border border-white/80 bg-white/95 p-1.5 shadow-[0_8px_24px_rgba(7,29,54,0.22)] backdrop-blur-md md:bottom-6 md:left-auto md:right-4 md:w-auto md:translate-x-0 md:flex-col md:items-stretch md:rounded-none md:border-0 md:bg-transparent md:p-0 md:shadow-none md:backdrop-blur-none"
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
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white shadow-md transition active:scale-[0.96] md:h-auto md:w-auto md:min-w-[140px] md:flex-row md:gap-2 md:rounded-full md:px-4 md:py-2.5 ${action.colour}`}
            {...(action.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            <Icon size={18} className="md:w-[16px]" />
            <span className="hidden text-xs font-extrabold md:inline">{action.label}</span>
          </a>
        );
      })}
    </div>
  );
}

export default FloatingActions;
