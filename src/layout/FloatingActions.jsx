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
      className="fixed bottom-[max(0.75rem,env(safe-area-inset-bottom))] left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-2xl border border-line bg-white/95 p-2 shadow-lg backdrop-blur md:bottom-6 md:left-auto md:right-4 md:translate-x-0 md:flex-col md:items-stretch md:rounded-none md:border-0 md:bg-transparent md:p-0 md:shadow-none md:backdrop-blur-none"
    >
      {actions.map((action) => {
        const Icon = action.icon;

        return (
          <a
            key={action.label}
            href={action.href}
            aria-label={action.label}
            className={`flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-full p-3 text-xs font-extrabold text-white shadow-lg transition hover:-translate-y-0.5 md:min-w-[140px] md:justify-start md:px-4 md:py-2.5 ${action.colour}`}
            {...(action.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            <Icon size={18} />
            <span className="hidden md:inline">{action.label}</span>
          </a>
        );
      })}
    </div>
  );
}

export default FloatingActions;
