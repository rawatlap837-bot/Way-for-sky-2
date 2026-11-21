// One button for the whole site.
//   variant = "primary" (dark blue), "outline" or "light"
//   Pass href to get a link, or leave it out to get a real <button>.
//   External links: add target="_blank" rel="noopener noreferrer"

const variants = {
  primary: "bg-navy text-white hover:bg-[#123b63]",
  outline: "border border-[#b8c8d8] bg-transparent text-navy hover:bg-white",
  light: "bg-white text-navy hover:bg-ice",
};

function Button({ href, variant = "primary", className = "", children, ...props }) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-[18px] font-bold capitalize transition duration-200 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${variants[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}

export default Button;
