import Section from "../components/Section.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import Carousel from "../components/Carousel.jsx";

// Audio extracted from the public WayForSky YouTube Shorts.
const audioFeedback = [
  { type: "Student", title: "Shruthi’s Pilot Journey", id: "aB6yQ9Ddhpo", src: "/audio/aB6yQ9Ddhpo.mp3" },
  { type: "Captain", title: "Meet Captain Niyati", id: "vAzumSD2GhE", src: "/audio/vAzumSD2GhE.mp3" },
  { type: "Student", title: "Sindhu’s Pilot Journey", id: "jdkrE3Llbu0", src: "/audio/jdkrE3Llbu0.mp3" },
  { type: "Scholarship", title: "Nishanth Wins DGCA Classes", id: "FM-f5DskY38", src: "/audio/FM-f5DskY38.mp3" },
  { type: "Student", title: "Gagan’s Aviation Dream", id: "EJxlQcWVbDQ", src: "/audio/EJxlQcWVbDQ.mp3" },
  { type: "Captain", title: "Mrityunjay’s Captain Story", id: "Prpy6Hgc7uI", src: "/audio/Prpy6Hgc7uI.mp3" },
  { type: "Captain", title: "Captain Khalid", id: "tG5KTxr4SDU", src: "/audio/tG5KTxr4SDU.mp3" },
  { type: "Captain", title: "Captain Navdeep’s Advice", id: "F9m0xmStO18", src: "/audio/F9m0xmStO18.mp3" },
  { type: "Captain", title: "Captain Devashree’s Journey", id: "4Rc5naWY1Jk", src: "/audio/4Rc5naWY1Jk.mp3" },
  { type: "Student", title: "Daniya Shares Her Experience", id: "f2dt6yPpFd4", src: "/audio/f2dt6yPpFd4.mp3" },
  { type: "Student", title: "Hajira Speaks About Her Journey", id: "n68JOgF2DXU", src: "/audio/n68JOgF2DXU.mp3" },
  { type: "Student", title: "Farida’s Journey to the Cockpit", id: "XCb_bgH2Q6g", src: "/audio/XCb_bgH2Q6g.mp3" },
  { type: "Student", title: "Junaid on Choosing WayForSky", id: "dUn17fLj9YU", src: "/audio/dUn17fLj9YU.mp3" },
  { type: "Student", title: "Benitha’s Honest Review", id: "JKV2JG2TESg", src: "/audio/JKV2JG2TESg.mp3" },
  { type: "Student", title: "Why Rayan Chose WayForSky", id: "bOVebXx5Xpk", src: "/audio/bOVebXx5Xpk.mp3" },
  { type: "Student", title: "Arshiya’s Honest Story", id: "AJq6mUPIx-8", src: "/audio/AJq6mUPIx-8.mp3" },
  { type: "Student", title: "Junaid’s One-Minute Review", id: "N9vmVesK5sc", src: "/audio/N9vmVesK5sc.mp3" },
  { type: "Student", title: "Kavya’s WayForSky Experience", id: "gR8KjqkhEbs", src: "/audio/gR8KjqkhEbs.mp3" },
  { type: "Student", title: "Adil Shares Honest Feedback", id: "vDSXvmXoJbg", src: "/audio/vDSXvmXoJbg.mp3" },
  { type: "Scholarship", title: "Shiny Wins Free DGCA Classes", id: "6cxCaWU7GHc", src: "/audio/6cxCaWU7GHc.mp3" },
  { type: "Scholarship", title: "Hannah Wins a Scholarship", id: "GIEYHhcJxxk", src: "/audio/GIEYHhcJxxk.mp3" },
  { type: "Scholarship", title: "Surya’s Pilot Dream", id: "1a64-TgglaE", src: "/audio/1a64-TgglaE.mp3" },
  { type: "Student", title: "Aishwarya Starts Her Journey", id: "6rO5_X0dIiA", src: "/audio/6rO5_X0dIiA.mp3" },
  { type: "Scholarship", title: "Sharath Wins a Scholarship", id: "OuPhp3qdISY", src: "/audio/OuPhp3qdISY.mp3" },
  { type: "Student", title: "Noumith’s Scholarship Experience", id: "HQN6UedeWRI", src: "/audio/HQN6UedeWRI.mp3" },
  { type: "Student", title: "Javeriya Starts Her Journey", id: "ExiRqQtZK_w", src: "/audio/ExiRqQtZK_w.mp3" },
  { type: "Pilot", title: "Pilot Reacts to the Initiative", id: "osiC6Oo2Hn4", src: "/audio/osiC6Oo2Hn4.mp3" },
  { type: "Scholarship", title: "Sharath Gets 100% Scholarship", id: "-EE1sGDLGhU", src: "/audio/-EE1sGDLGhU.mp3" },
  { type: "Scholarship", title: "Noumith Wins DGCA Scholarship", id: "HqfWoOw8Hb0", src: "/audio/HqfWoOw8Hb0.mp3" },
  { type: "Scholarship", title: "Surya Gets 100% Scholarship", id: "4LBzwVQC4Ps", src: "/audio/4LBzwVQC4Ps.mp3" },
  { type: "Scholarship", title: "100% DGCA Scholarship Winner", id: "QXpUlod7GUo", src: "/audio/QXpUlod7GUo.mp3" },
];

function AudioFeedback() {
  const uniqueAudioFeedback = audioFeedback.filter(
    (item, index, items) => items.findIndex((entry) => entry.id === item.id) === index
  );

  return (
    <Section id="audio-feedback" className="bg-white">
      <SectionHeading
        className="mb-10"
        eyebrow="Listen to Real Experiences"
        title="Student & parent audio feedback."
        text={`Listen to ${uniqueAudioFeedback.length} WayForSky student, captain and scholarship experiences directly inside the page.`}
      />

      <Carousel label="Audio feedback">
        {uniqueAudioFeedback.map((item, index) => (
          <article
            key={item.id}
            className="w-[178px] shrink-0 snap-start overflow-hidden rounded-2xl border border-line bg-white shadow-[0_8px_24px_rgba(7,29,54,0.07)] sm:w-48"
          >
            <div className="relative aspect-[9/16] overflow-hidden bg-navy">
              <img
                src={`https://i.ytimg.com/vi/${item.id}/hqdefault.jpg`}
                alt={item.title}
                loading="lazy"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-transparent to-transparent" />
              <span className="absolute bottom-3 left-3 rounded-full bg-white/95 px-2.5 py-1 text-[9px] font-black uppercase tracking-wider text-brand-dark">
                {item.type}
              </span>
            </div>

            <div className="p-3.5">
              <span className="text-[9px] font-black tracking-wider text-[#286b9f]">
                Audio {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mb-3 mt-1 min-h-[38px] text-[12px] font-extrabold leading-[1.25] text-navy sm:text-[13px]">
                {item.title}
              </h3>
              <audio
                controls
                preload="none"
                src={item.src}
                aria-label={item.title}
                className="h-9 w-full"
              >
                Your browser does not support audio playback.
              </audio>
            </div>
          </article>
        ))}
      </Carousel>
    </Section>
  );
}

export default AudioFeedback;
