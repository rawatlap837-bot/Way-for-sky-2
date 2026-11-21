import { Play } from "lucide-react";
import Section from "../components/Section.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import Carousel from "../components/Carousel.jsx";

// The ten video slots. Paste the Instagram Reel / YouTube Shorts link in "link".
// The card becomes clickable as soon as a link is added.
const videos = [
  { type: "Student story", title: "Student story 1", link: "" },
  { type: "Student story", title: "Student story 2", link: "" },
  { type: "Student story", title: "Student story 3", link: "" },
  { type: "Student story", title: "Student story 4", link: "" },
  { type: "Student story", title: "Student story 5", link: "" },
  { type: "Student story", title: "Student story 6", link: "" },
  { type: "Parent story", title: "Parent story 1", link: "" },
  { type: "Parent story", title: "Parent story 2", link: "" },
  { type: "Parent story", title: "Parent story 3", link: "" },
  { type: "Parent story", title: "Parent story 4", link: "" },
];

function VideoTestimonials() {
  return (
    <Section id="testimonial-shorts" className="bg-soft">
      <SectionHeading
        className="mb-10"
        eyebrow="Real Voices · Short Stories"
        title="Student & parent video testimonials."
        text="Ten dedicated spaces for Instagram Reels or YouTube Shorts. Each story will have its own video preview."
      />

      <Carousel label="Video testimonials">
        {videos.map((video, index) => {
          // If there is a link, the card is a link. If not, it is a plain box.
          const Wrapper = video.link ? "a" : "div";
          const linkProps = video.link
            ? { href: video.link, target: "_blank", rel: "noopener noreferrer" }
            : {};

          return (
            <Wrapper
              key={video.title}
              {...linkProps}
              className="w-44 shrink-0 snap-start overflow-hidden rounded-2xl border border-line bg-white shadow-[0_7px_20px_rgba(7,29,54,0.05)] sm:w-48"
            >
              {/* 9:16 video frame */}
              <div className="flex aspect-[9/16] items-center justify-center bg-gradient-to-br from-[#102e4e] to-[#286c9e] p-2.5">
                <div className="flex h-full w-full flex-col items-center justify-center gap-2.5 rounded-lg border border-dashed border-white/50 text-center text-white">
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-white pl-0.5 text-[#155b91] shadow-lg">
                    <Play size={18} fill="currentColor" />
                  </span>
                  <b className="text-[13px] tracking-wider">Video {String(index + 1).padStart(2, "0")}</b>
                  <small className="px-2 text-[11px] text-[#d4e6f5]">Instagram Reel / YouTube Short</small>
                </div>
              </div>

              <div className="p-3.5">
                <span className="text-[10px] font-black tracking-wider text-[#4380ae]">{video.type}</span>
                <h3 className="my-1 text-sm font-bold text-navy">{video.title}</h3>
                <p className="text-[11px] text-muted">
                  Connect the approved public Reel or YouTube Shorts link here.
                </p>
              </div>
            </Wrapper>
          );
        })}
      </Carousel>
    </Section>
  );
}

export default VideoTestimonials;
