import { useState } from "react";
import { Play, X } from "lucide-react";
import Section from "../components/Section.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import Carousel from "../components/Carousel.jsx";

// Public WayForSky YouTube Shorts.
const videos = [
  { type: "Captain Story", title: "Meet Captain Niyati", id: "vAzumSD2GhE" },
  { type: "Student Story", title: "Sindhu’s Pilot Journey", id: "jdkrE3Llbu0" },
  { type: "Scholarship Story", title: "Nishanth Wins DGCA Classes", id: "FM-f5DskY38" },
  { type: "Student Story", title: "Gagan’s Aviation Dream", id: "EJxlQcWVbDQ" },
  { type: "Captain Story", title: "Mrityunjay’s Captain Story", id: "Prpy6Hgc7uI" },
  { type: "Captain Story", title: "Straight From Captain Khalid", id: "tG5KTxr4SDU" },
  { type: "Captain Story", title: "Captain Navdeep’s Advice", id: "F9m0xmStO18" },
  { type: "Captain Story", title: "Captain Devashree’s Journey", id: "4Rc5naWY1Jk" },
  { type: "Student Story", title: "Daniya Shares Her Experience", id: "f2dt6yPpFd4" },
  { type: "Student Story", title: "Hajira Speaks About Her Journey", id: "n68JOgF2DXU" },
  { type: "Student Story", title: "Farida’s Journey to the Cockpit", id: "XCb_bgH2Q6g" },
  { type: "Student Story", title: "Junaid on Choosing WayForSky", id: "dUn17fLj9YU" },
  { type: "Scholarship Story", title: "Shiny Wins Free DGCA Classes", id: "6cxCaWU7GHc" },
  { type: "Scholarship Story", title: "Hannah Wins a Scholarship", id: "GIEYHhcJxxk" },
  { type: "Scholarship Story", title: "Surya’s Pilot Dream", id: "1a64-TgglaE" },
  { type: "Student Story", title: "Aishwarya Starts Her Journey", id: "6rO5_X0dIiA" },
  { type: "Scholarship Story", title: "Sharath Wins a Scholarship", id: "OuPhp3qdISY" },
  { type: "Student Story", title: "Noumith’s Scholarship Experience", id: "HQN6UedeWRI" },
  { type: "Student Story", title: "Javeriya Starts Her Journey", id: "ExiRqQtZK_w" },
  { type: "Pilot Story", title: "Pilot Reacts to the Initiative", id: "osiC6Oo2Hn4" },
  { type: "Scholarship Story", title: "Sharath Gets 100% Scholarship", id: "-EE1sGDLGhU" },
  { type: "Scholarship Story", title: "Noumith Wins DGCA Scholarship", id: "HqfWoOw8Hb0" },
  { type: "Scholarship Story", title: "Surya Gets 100% Scholarship", id: "4LBzwVQC4Ps" },
  { type: "Scholarship Story", title: "100% DGCA Scholarship Winner", id: "QXpUlod7GUo" },
];

function VideoTestimonials() {
  const [activeVideo, setActiveVideo] = useState(null);

  return (
    <Section id="testimonial-shorts" className="border-y border-[#e3ebf1] bg-white">
      <SectionHeading
        className="mb-8 sm:mb-10"
        eyebrow="Real Voices · Short Stories"
        title="Student, Parent And Captain Video Stories."
        text="Watch authentic WayForSky experiences shared through YouTube Shorts."
      />

      <Carousel label="WayForSky YouTube Shorts">
        {videos.map((video) => (
          <button
            key={video.id}
            onClick={() => setActiveVideo(video.id)}
            className="w-[178px] shrink-0 snap-start overflow-hidden rounded-2xl border border-line bg-white shadow-[0_7px_20px_rgba(7,29,54,0.05)] sm:w-48"
          >
            <div className="relative aspect-[9/16] overflow-hidden bg-navy">
              <img
                src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
                alt={video.title}
                loading="lazy"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent" />
              <span className="absolute left-1/2 top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/95 pl-0.5 text-[#155b91] shadow-xl">
                <Play size={19} fill="currentColor" />
              </span>
            </div>

            <div className="p-3.5">
              <span className="text-[9px] font-black tracking-wider text-[#4380ae] sm:text-[10px]">
                {video.type}
              </span>
              <h3 className="mt-1 text-[13px] font-bold leading-tight text-navy sm:text-sm">
                {video.title}
              </h3>
            </div>
          </button>
        ))}
      </Carousel>

      {activeVideo && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-[#061827]/90 p-3 backdrop-blur-sm"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="relative h-[min(88vh,720px)] w-full max-w-[405px] overflow-hidden rounded-2xl bg-black shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveVideo(null)}
              aria-label="Close video"
              className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-white text-navy shadow-lg"
            >
              <X size={18} />
            </button>

            <iframe
              className="h-full w-full"
              src={`https://www.youtube-nocookie.com/embed/${activeVideo}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
              title="WayForSky YouTube Short"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </Section>
  );
}

export default VideoTestimonials;
