import Container from "../components/Container.jsx";
import Eyebrow from "../components/Eyebrow.jsx";
import Button from "../components/Button.jsx";
import classroomPhoto from "../assets/images/hero-classroom.jpg";
import skymo from "../assets/images/skymo.jpg";

// First section of the page (id="home").
function Hero() {
  return (
    <section id="home" className="scroll-mt-20 overflow-hidden bg-gradient-to-br from-[#f5f9fc] via-white to-[#edf5fb] py-8 sm:py-12 lg:py-20">
      <Container className="grid items-center gap-8 md:grid-cols-[0.88fr_1.12fr] lg:gap-12">
        {/* ---------- Left side: text ---------- */}
        <div>
          <Eyebrow>WayForSky Aviation Academy</Eyebrow>

          <h1 className="mb-5 text-[clamp(2.25rem,4.8vw,4rem)] font-extrabold leading-[1.06] tracking-tight text-navy">
            Start your pilot journey in a{" "}
            <span className="text-brand">real learning environment.</span>
          </h1>

          <p className="mb-7 max-w-xl text-base text-[#536579] sm:text-[17px]">
            Join a focused aviation learning community. Learn with instructors, exchange
            ideas with fellow aspiring pilots and build your DGCA ground-school foundation
            through the WayForSky 100 Students Scholarship.
          </p>

          <div className="flex flex-wrap gap-3">
            <Button href="#register">Register for Scholarship</Button>
            <Button href="#training" variant="outline">
              Explore the Programme
            </Button>
          </div>

          <p className="mt-4 max-w-xl text-xs text-[#758496]">
            <strong>₹7,999 programme registration fee</strong> · Scholarship selection is
            merit-based · Registration does not guarantee selection
          </p>
        </div>

        {/* ---------- Right side: photo ---------- */}
        <div className="relative">
          {/* "100" badge on the top-left corner */}
          <div className="absolute -left-2 -top-3 z-10 max-w-[170px] rounded-2xl border border-line bg-white p-4 shadow-card sm:max-w-[205px]">
            <strong className="block text-3xl font-extrabold leading-tight text-navy">100</strong>
            <span className="text-xs text-muted">Scholarship opportunities for aspiring pilots</span>
          </div>

          <div className="relative overflow-hidden rounded-3xl border-[6px] border-white bg-ice shadow-card">
            <img
              src={classroomPhoto}
              alt="WayForSky aviation instructor teaching students in an interactive classroom"
              className="h-[300px] w-full object-cover sm:h-[360px] md:h-[380px] lg:h-[500px]"
            />

            {/* Dark fade so the text on the photo is readable */}
            <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent" />

            {/* Bottom strip: tagline + Skymo help card */}
            <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-3 p-4 sm:p-5">
              <p className="text-[13px] font-bold tracking-wide text-white">
                Ask Questions · Share Ideas · Learn Together
              </p>

              <a
                href="#skymo"
                className="flex max-w-[270px] items-center gap-3 rounded-2xl border border-line bg-white p-2.5 pr-4 shadow-card transition hover:-translate-y-0.5"
              >
                <img src={skymo} alt="Skymo, the WayForSky help desk mascot" className="h-14 w-14 object-contain" />
                <div className="flex flex-col leading-snug">
                  <strong className="text-sm text-navy">Need Help?</strong>
                  <span className="text-[11px] text-muted">Ask Skymo · Student Help Desk</span>
                  <span className="mt-0.5 text-xs font-extrabold text-brand">Get Assistance →</span>
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
