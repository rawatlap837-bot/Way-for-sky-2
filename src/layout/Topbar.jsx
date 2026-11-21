import Container from "../components/Container.jsx";

// Thin dark strip at the very top of the page.
function Topbar() {
  return (
    <div className="bg-navy py-1.5 text-[10px] leading-4 tracking-wide text-[#dce8f3] sm:py-2 sm:text-xs">
      <Container className="flex items-center justify-between gap-2 text-left sm:flex-wrap sm:justify-between">
        <span className="truncate">WayForSky · Global Aviation Pathway</span>
        <span className="hidden text-right sm:inline">
          100 Students · DGCA Ground Classes Scholarship
        </span>
        <span className="shrink-0 font-bold text-brand-light sm:hidden">
          100 Scholarships
        </span>
      </Container>
    </div>
  );
}

export default Topbar;
