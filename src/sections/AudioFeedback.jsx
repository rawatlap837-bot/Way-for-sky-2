import Section from "../components/Section.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import Carousel from "../components/Carousel.jsx";

// The ten audio cards.
// Put your MP3 / M4A files inside the "public/audio" folder, then write the path in "src".
// Example:  src: "/audio/student-1.mp3"
const audioFeedback = [
  { type: "Student", title: "Student audio feedback 1", src: "" },
  { type: "Student", title: "Student audio feedback 2", src: "" },
  { type: "Student", title: "Student audio feedback 3", src: "" },
  { type: "Student", title: "Student audio feedback 4", src: "" },
  { type: "Student", title: "Student audio feedback 5", src: "" },
  { type: "Parent", title: "Parent audio feedback 1", src: "" },
  { type: "Parent", title: "Parent audio feedback 2", src: "" },
  { type: "Parent", title: "Parent audio feedback 3", src: "" },
  { type: "Parent", title: "Parent audio feedback 4", src: "" },
  { type: "Parent", title: "Parent audio feedback 5", src: "" },
];

function AudioFeedback() {
  return (
    <Section id="audio-feedback" className="bg-white">
      <SectionHeading
        className="mb-10"
        eyebrow="Listen to Real Experiences"
        title="Student & parent audio feedback."
        text="Hear directly from people who have experienced the WayForSky counselling and learning journey."
      />

      <Carousel label="Audio feedback">
        {audioFeedback.map((item, index) => (
          <article
            key={item.title}
            className="w-72 shrink-0 snap-start rounded-2xl border border-line bg-white p-4 shadow-[0_8px_24px_rgba(7,29,54,0.05)] sm:w-80"
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="text-[11px] font-black tracking-wider text-[#286b9f]">
                Audio {String(index + 1).padStart(2, "0")}
              </span>
              <span className="rounded-full bg-[#edf5fb] px-2.5 py-1 text-[11px] font-extrabold text-brand-dark">
                {item.type}
              </span>
            </div>

            <h3 className="mb-3 text-[15px] font-bold text-navy">{item.title}</h3>

            <audio
              controls
              preload="none"
              src={item.src || undefined}
              aria-label={item.title}
              className="h-10 w-full"
            >
              Your browser does not support audio playback.
            </audio>

            <p className="mt-2.5 text-[11px] text-muted">
              Add the approved MP3 or M4A recording for this feedback.
            </p>
          </article>
        ))}
      </Carousel>
    </Section>
  );
}

export default AudioFeedback;
