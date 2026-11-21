import Container from "../components/Container.jsx";
import Eyebrow from "../components/Eyebrow.jsx";
import Button from "../components/Button.jsx";
import classroomPhoto from "../assets/images/hero-classroom.jpg";
import skymo from "../assets/images/skymo.jpg";

// First section of the page (id="home").
function Hero() {
  return (
    <section id="home" className="scroll-mt-20 overflow-hidden bg-gradient-to-br from-[#f5f9fc] via-white to-[#edf5fb] py-4 sm:py-12 lg:py-20">
      <Container className="grid items-center gap-5 md:grid-cols-[0.88fr_1.12fr] lg:gap-12">
        {/* ---------- Left side: text ---------- */}
        <div>
          <Eyebrow>WayForSky Aviation Academy</Eyebrow>

          <h1 className="mb-3 text-[clamp(2.5rem,9vw,4rem)] font-extrabold leading-[1.05] tracking-tight text-navy sm:mb-5">
            Start your pilot journey in a{" "}
            <span className="text-brand">real learning environment.</span>
          </h1>

          <p className="mb-4 max-w-xl text-[13px] leading-[1.55] text-[#536579] sm:mb-7 sm:text-[17px]">
            Join a focused aviation learning community. Learn with instructors, exchange
            ideas with fellow aspiring pilots and build your DGCA ground-school foundation
            through the WayForSky 100 Students Scholarship.
          </p>

          <div className="grid grid-cols-1 gap-2 sm:flex sm:flex-wrap sm:gap-3">
            <Button href="#register" className="w-full px-3 py-2.5 text-xs sm:w-auto sm:px-5 sm:py-3 sm:text-sm">Register for Scholarship</Button>
            <Button href="#training" variant="outline" className="w-full px-3 py-2.5 text-xs sm:w-auto sm:px-5 sm:py-3 sm:text-sm">
              Explore the Programme
            </Button>
          </div>

          <p className="mt-2.5 max-w-xl text-[10px] leading-[1.45] text-[#758496] sm:mt-4 sm:text-xs">
            <strong>₹7,999 programme registration fee</strong> · Scholarship selection is
            merit-based · Registration does not guarantee selection
          </p>
        </div>

        {/* ---------- Right side: photo ---------- */}
        <div className="relative">
          {/* "100" badge on the top-left corner */}
          <div className="absolute -left-1 -top-3 z-10 max-w-[112px] rounded-lg border border-line bg-white p-2 shadow-card sm:max-w-[205px] sm:rounded-2xl sm:p-4">
            <strong className="block text-xl font-extrabold leading-tight text-navy sm:text-3xl">100</strong>
            <span className="block text-[9px] leading-[1.25] text-muted sm:text-xs">Scholarship opportunities for aspiring pilots</span>
          </div>

          <div className="relative overflow-hidden rounded-3xl border-[6px] border-white bg-ice shadow-card">
            <img
              src={classroomPhoto}
              alt="WayForSky aviation instructor teaching students in an interactive classroom"
              className="h-[210px] w-full object-cover sm:h-[360px] md:h-[380px] lg:h-[500px]"
            />

            {/* Dark fade so the text on the photo is readable */}
            <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent" />

            {/* Bottom strip: tagline + Skymo help card */}
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-end p-3 sm:flex-wrap sm:justify-between sm:gap-3 sm:p-5">
              <p className="hidden text-[13px] font-bold tracking-wide text-white sm:block">
                Ask Questions · Share Ideas · Learn Together
              </p>

              <a
                href="#skymo"
                className="flex max-w-[210px] items-center gap-1.5 rounded-xl border border-line bg-white p-1.5 pr-2.5 shadow-card transition hover:-translate-y-0.5 sm:max-w-[270px] sm:gap-3 sm:rounded-2xl sm:p-2.5 sm:pr-4"
              >
                <img src={skymo} alt="Skymo, the WayForSky help desk mascot" className="h-9 w-9 object-contain sm:h-14 sm:w-14" />
                <div className="flex flex-col leading-[1.2]">
                  <strong className="text-[11px] text-navy sm:text-sm">Need Help?</strong>
                  <span className="text-[9px] text-muted sm:text-[11px]">Ask Skymo · Student Help Desk</span>
                  <span className="mt-0.5 text-[10px] font-extrabold text-brand sm:text-xs">Get Assistance →</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default Hero;
