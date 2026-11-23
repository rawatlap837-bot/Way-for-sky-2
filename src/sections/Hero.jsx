import Container from "../components/Container.jsx";
import Button from "../components/Button.jsx";

// First section of the page (id="home").
function Hero() {
  return (
    <section
      id="home"
      className="relative scroll-mt-20 overflow-hidden bg-white md:min-h-[620px] md:bg-[#f5f9fd]"
    >
      {/* Soft background only for desktop */}
      <div className="absolute inset-0 hidden bg-[radial-gradient(circle_at_82%_42%,rgba(46,120,183,0.12),transparent_24%),linear-gradient(135deg,#f8fbfe_0%,#eef5fb_100%)] md:block" />

      {/* ---------- Mobile layout (built for 360px, works up to 480px) ---------- */}
      <div className="relative mx-auto h-[572px] w-full max-w-[480px] overflow-hidden md:hidden">
        {/* Mascot on the road: right-anchored, sits behind the text.
            The left edge fades into the white page so there is no hard cut. */}
        <img
          src="/background.png"
          alt="Skymo, the WayForSky aviation mascot"
          className="pointer-events-none absolute right-[-17px] top-[96px] z-0 h-[270px] w-[275px] max-w-none object-contain object-bottom"
          style={{
            WebkitMaskImage: "linear-gradient(to right, transparent 0%, #000 22%)",
            maskImage: "linear-gradient(to right, transparent 0%, #000 22%)",
          }}
        />

        {/* Heading */}
        <h1 className="absolute left-[18px] top-[16px] z-20 text-[28px] font-black italic leading-[1] tracking-[-0.05em] text-[#0a1f5c]">
          <span className="block whitespace-nowrap">Start Your Pilot</span>
          <span className="block whitespace-nowrap">
            Journey In A <span className="text-[#1a5bd6]">Real</span>
          </span>
          <span className="block whitespace-nowrap text-[#1a5bd6]">Learning</span>
          <span className="block whitespace-nowrap text-[#1a5bd6]">Environment.</span>
        </h1>

        {/* Yellow swoosh under the heading */}
        <svg
          viewBox="0 0 140 12"
          className="absolute left-[42px] top-[128px] z-20 h-[12px] w-[130px]"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M2 9 C 40 2, 100 2, 138 6"
            stroke="#f1c94b"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        </svg>

        {/* Paragraph (kept narrow so the mascot never covers it) */}
        <p className="absolute left-[18px] top-[150px] z-20 w-[150px] text-[10.5px] font-medium leading-[1.3] text-[#1f2f45]">
          Join A Focused Aviation Learning Community. Learn With Instructors,
          Exchange Ideas With Fellow Aspiring Pilots And Build Your DGCA
          Ground-School Foundation Through The WayForSky 100 Students Scholarship.
        </p>

        {/* Buttons */}
        <div className="absolute left-[18px] right-[18px] top-[362px] z-30 grid gap-[5px]">
          <a
            href="#register"
            onClick={(event) => {
              event.preventDefault();
              window.dispatchEvent(new Event("open-scholarship-popup"));
            }}
            className="flex h-[37px] cursor-pointer items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#0a3cb0] to-[#0e57d6] text-[14px] font-bold text-white shadow-[0_6px_14px_rgba(10,60,176,0.25)]"
          >
            Register For Scholarship
            <span aria-hidden="true" className="text-[17px] leading-none">→</span>
          </a>

          <a
            href="#training"
            className="flex h-[37px] items-center justify-center gap-2 rounded-full border-2 border-[#0a1f5c] bg-white text-[14px] font-bold text-[#0a1f5c]"
          >
            <span className="grid h-[18px] w-[18px] place-items-center rounded-full border-2 border-[#0a1f5c] text-[7px] leading-none">
              ▶
            </span>
            Explore The Programme
          </a>
        </div>

        {/* Fine print */}
        <p className="absolute left-[18px] right-[18px] top-[446px] z-30 text-center text-[9.5px] font-medium leading-[1.5] text-[#3b4a5e]">
          ₹7,999 Programme Registration Fee <span className="mx-0.5">·</span>
          Scholarship Selection Is Merit-Based <span className="mx-0.5">·</span>
          Registration Does Not Guarantee Selection
        </p>

        {/* 100 Scholarship card */}
        <div className="absolute left-[18px] right-[18px] top-[486px] z-30 flex h-[62px] items-center rounded-2xl border-2 border-[#f5d23a] bg-white px-3">
          <svg
            viewBox="0 0 48 48"
            className="h-[40px] w-[40px] shrink-0 text-[#0a1f5c]"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinejoin="round"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M5 18 24 8l19 10-19 10L5 18Z" />
            <path d="M10 21v10c8 5 20 5 28 0V21M24 28v12" />
          </svg>

          <span className="ml-2 text-[42px] font-black italic leading-none tracking-[-0.04em] text-[#1450c8]">
            100
          </span>

          <span className="mx-2 h-[36px] w-[2px] rotate-[15deg] bg-[#f5d23a]" />

          <span className="text-[12px] font-extrabold leading-[1.2] text-[#0a1f5c]">
            Scholarship<br />Opportunities For<br />Aspiring Pilots
          </span>
        </div>
      </div>

      {/* ---------- Desktop layout ---------- */}
      <Container className="relative hidden md:grid md:min-h-[620px] md:items-center md:py-10 md:grid-cols-[0.92fr_1.08fr] lg:gap-8">
        <div className="relative z-10 text-left">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#f1bd32] bg-[#fffdf4] px-4 py-1.5 text-xs font-extrabold text-navy shadow-sm">
            <span className="text-[#e9ad16]">◆</span>
            100 Scholarships
          </div>

          <h1 className="mb-5 max-w-[650px] text-[56px] font-extrabold leading-[0.98] tracking-[-0.045em] text-navy lg:text-[64px]">
            Start Your Pilot Journey In A{" "}
            <span className="text-[#2e78b7]">Real Learning Environment.</span>
          </h1>

          <p className="mb-6 max-w-[540px] text-base leading-[1.55] text-[#536579]">
            Join a focused aviation learning community. Learn with instructors,
            exchange ideas with fellow aspiring pilots and build your DGCA
            ground-school foundation through the WayForSky 100 Students Scholarship.
          </p>

          <div className="flex flex-wrap gap-3">
            <Button href="#register" className="rounded-xl px-6 py-3 text-base">
              Register For Scholarship
              <span aria-hidden="true">→</span>
            </Button>
            <Button href="#training" variant="outline" className="rounded-xl bg-white/80 px-6 py-3 text-base">
              Explore The Programme
            </Button>
          </div>

          <p className="mt-4 max-w-[540px] text-xs leading-[1.45] text-[#758496]">
            <strong className="font-bold">₹7,999 programme registration fee</strong> ·
            Scholarship selection is merit-based · Registration does not guarantee selection
          </p>

          <div className="mt-5 flex max-w-[470px] items-center rounded-2xl border border-[#f0bf36] bg-white/95 px-5 py-3 text-left shadow-[0_12px_30px_rgba(7,29,54,0.08)]">
            <svg viewBox="0 0 48 48" className="mr-3 h-11 w-11 shrink-0 text-navy" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
              <path d="M5 18 24 8l19 10-19 10L5 18Z" />
              <path d="M10 21v10c8 5 20 5 28 0V21M24 28v12" />
            </svg>
            <div className="flex items-center border-l border-[#d9e2ea] pl-3">
              <span className="mr-3 text-[38px] font-black leading-[0.9] text-[#2e78b7]">100</span>
              <span className="text-sm font-extrabold leading-tight text-navy">Scholarship Opportunities<br />For Aspiring Pilots</span>
            </div>
          </div>
        </div>

        <div className="relative min-h-[520px]">
          <img
            src="/background.png"
            alt="Skymo, the WayForSky aviation mascot"
            className="absolute bottom-[-40px] right-[-18px] h-[590px] w-[590px] object-contain"
          />
        </div>
      </Container>
    </section>
  );
}

export default Hero;