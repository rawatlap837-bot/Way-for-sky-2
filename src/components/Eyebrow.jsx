// Small label with a gold line, shown above headings.
// light = true is used on dark (navy) backgrounds.
function Eyebrow({ children, light = false, className = "" }) {
  const colour = light ? "text-brand-light" : "text-brand-dark";

  return (
    <div
      className={`mb-4 inline-flex items-center gap-2 text-xs font-extrabold capitalize tracking-wider ${colour} ${className}`}
    >
      <span className="h-0.5 w-7 bg-gold" />
      {children}
    </div>
  );
}

export default Eyebrow;
