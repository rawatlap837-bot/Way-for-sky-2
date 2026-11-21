import Container from "./Container.jsx";

// Every section on the page uses this wrapper.
//   id        -> used by the menu links (#scholarship etc.)
//   className -> background colour, for example "bg-soft"
function Section({ id, className = "", children }) {
  return (
    <section id={id} className={`scroll-mt-20 py-16 sm:py-20 ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}

export default Section;
