import { MessageCircle, Phone, Instagram, Sparkles } from "lucide-react";
import { links } from "../data/links.js";

// The round buttons fixed to the bottom-right corner of the screen.
// On phones only the icons show; on bigger screens the text shows too.
const actions = [
  { label: "WhatsApp", href: links.whatsapp, icon: MessageCircle, colour: "bg-[#168b54]", external: true },
  { label: "Request Call", href: "#register", icon: Phone, colour: "bg-[#155b9b]" },
  { label: "Instagram", href: links.instagram, icon: Instagram, colour: "bg-[#a43b83]", external: true },
  { label: "Ask Skymo", href: "#skymo", icon: Sparkles, colour: "bg-navy-light" },
];

function FloatingActions() {
  return (
    <div
      aria-label="Quick contact links"
      className="fixed bottom-[max(0.5rem,env(safe-area-inset-bottom))] left-3 right-3 z-50 grid grid-cols-4 items-center gap-1.5 rounded-[18px] border border-white/80 bg-white/95 p-1.5 shadow-[0_10px_35px_rgba(7,29,54,0.22)] backdrop-blur-md md:bottom-6 md:left-auto md:right-4 md:flex md:w-auto md:flex-col md:items-stretch md:rounded-none md:border-0 md:bg-transparent md:p-0 md:shadow-none md:backdrop-blur-none"
    >
      {actions.map((action) => {
        const Icon = action.icon;

        return (
          <a
            key={action.label}
            href={action.href}
            aria-label={action.label}
            className={`flex h-14 w-full flex-col items-center justify-center gap-0.5 rounded-xl p-1 text-white shadow-md transition active:scale-[0.96] md:h-auto md:min-w-[140px] md:flex-row md:gap-2 md:rounded-full md:px-4 md:py-2.5 ${action.colour}`}
            {...(action.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            <Icon size={16} />
            <span className="text-[8px] font-extrabold leading-none md:hidden">{action.label}</span>
            <span className="hidden text-xs font-extrabold md:inline">{action.label}</span>
          </a>
        );
      })}
    </div>
  );
}

export default FloatingActions;
