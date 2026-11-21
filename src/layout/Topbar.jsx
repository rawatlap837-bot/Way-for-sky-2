import Container from "../components/Container.jsx";

// Thin dark strip at the very top of the page.
function Topbar() {
  return (
    <div className="bg-navy py-2 text-xs tracking-wide text-[#dce8f3]">
      <Container className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-center sm:justify-between sm:text-left">
        <span>WayForSky · Global Aviation Pathway</span>
        <span>100 Students · DGCA Ground Classes Scholarship</span>
      </Container>
    </div>
  );
}

export default Topbar;
