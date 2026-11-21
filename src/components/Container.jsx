// Keeps content centred with the same side spacing on every section.
function Container({ children, className = "" }) {
  return (
    <div className={`mx-auto w-full max-w-[1160px] px-4 sm:px-5 ${className}`}>
      {children}
    </div>
  );
}

export default Container;
