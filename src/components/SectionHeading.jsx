import Eyebrow from "./Eyebrow.jsx";

// Eyebrow + big heading + short paragraph.
//   align = "center" (default) or "left"
//   light = true for dark backgrounds
function SectionHeading({
  eyebrow,
  title,
  text,
  align = "center",
  light = false,
  className = "",
}) {
  const isCentered = align === "center";

  return (
    <div
      className={`max-w-3xl ${isCentered ? "mx-auto text-center" : ""} ${className}`}
    >
      {eyebrow && (
        <Eyebrow light={light} className={isCentered ? "justify-center" : ""}>
          {eyebrow}
        </Eyebrow>
      )}

      <h2
        className={`mb-3 text-[clamp(1.75rem,3.5vw,2.6rem)] font-extrabold leading-tight tracking-tight ${
          light ? "text-white" : "text-navy"
        }`}
      >
        {title}
      </h2>

      {text && (
        <p className={`text-base ${light ? "text-[#c3d1df]" : "text-muted"}`}>
          {text}
        </p>
      )}
    </div>
  );
}

export default SectionHeading;
