import { Play } from "lucide-react";
import Section from "../components/Section.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import Button from "../components/Button.jsx";
import pilotImage from "../assets/images/pilot-conversations.jpg";
import brandFilmImage from "../assets/images/brand-film.jpg";
import podcastImage from "../assets/images/podcast.jpg";

// The three video / podcast cards.
// When you have the real YouTube / Instagram link, paste it in "link".
// A "Watch Now" button will appear automatically.
const mediaCards = [
  {
    image: pilotImage,
    alt: "Pilot conversations preview",
    title: "Pilot conversations",
    text: "Hear pilots discuss training, discipline, career realities and what aspiring pilots should know.",
    areaLabel: "Watch area:",
    areaText: "Pilot videos will play here once the official links are added.",
    note: "Pilot video library · Add official video links before launch",
    link: "",
  },
  {
    image: brandFilmImage,
    alt: "The WayForSky brand film preview",
    title: "The WayForSky brand film",
    text: "Get to know our vision, academy environment, scholarship initiative and approach to aviation guidance.",
    areaLabel: "Watch area:",
    areaText: "The official WayForSky brand film will play here once connected.",
    note: "Official WayForSky commercial · Video link to be connected",
    link: "",
  },
  {
    image: podcastImage,
    alt: "WayForSky podcast preview",
    title: "WayForSky podcast",
    text: "Listen to longer conversations with pilots, instructors and aviation professionals. Learn at your own pace.",
    areaLabel: "Listen area:",
    areaText: "Podcast episodes will be available here once the audio/video links are added.",
    note: "Podcast episodes · Audio/video links to be connected",
    link: "",
  },
];

const cardClass = "overflow-hidden rounded-2xl border border-line bg-white shadow-[0_10px_30px_rgba(7,29,54,0.06)]";

function MediaHub() {
  return (
    <Section id="media" className="bg-soft">
      <SectionHeading
        className="mb-10"
        eyebrow="Explore WayForSky"
        title="Watch, listen and hear from the people behind aviation."
        text="Each experience has its own space. Students and parents can explore the academy, learn from pilots, listen to conversations and hear genuine experiences."
      />

      <div className="grid gap-5 md:grid-cols-2">
        {/* Video + podcast cards */}
        {mediaCards.map((card) => (
          <article key={card.title} className={cardClass}>
            <img src={card.image} alt={card.alt} className="h-52 w-full bg-[#dce8f1] object-cover sm:h-64" />
            <div className="p-5">
              <h3 className="mb-2 text-xl font-bold text-navy">{card.title}</h3>
              <p className="mb-4 text-[13px] text-muted">{card.text}</p>

              {card.link ? (
                <Button href={card.link} target="_blank" rel="noopener noreferrer" className="w-full">
                  Watch Now
                </Button>
              ) : (
                <>
                  <div className="text-[12px] text-[#7a8997]">
                    <strong>{card.areaLabel}</strong> {card.areaText}
                  </div>
                  <div className="mt-2 text-[12px] text-[#7a8997]">{card.note}</div>
                </>
              )}
            </div>
          </article>
        ))}

        {/* Testimonial reels card */}
        <article className={cardClass}>
          <div className="flex h-52 flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#0b2947] to-[#1b5e91] text-white sm:h-64">
            <span className="grid h-14 w-14 place-items-center rounded-full bg-white pl-1 text-[#155b91] shadow-lg">
              <Play size={22} fill="currentColor" />
            </span>
            <span className="text-[11px] font-black tracking-wider">10 Testimonial Reels / Shorts</span>
          </div>
          <div className="p-5">
            <h3 className="mb-2 text-xl font-bold text-navy">Student & parent video testimonials</h3>
            <p className="mb-4 text-[13px] text-muted">
              Watch short-form student and parent stories from Instagram Reels and YouTube Shorts.
            </p>
            <Button href="#testimonial-shorts" variant="outline" className="w-full">
              View 10 Video Stories
            </Button>
            <div className="mt-2 text-[12px] text-[#7a8997]">
              10 separate video slots · Add official Reel or Shorts links
            </div>
          </div>
        </article>
      </div>
    </Section>
  );
}

export default MediaHub;
