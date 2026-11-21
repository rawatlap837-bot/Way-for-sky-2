import { useState } from "react";
import { X } from "lucide-react";
import Section from "../components/Section.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import Button from "../components/Button.jsx";

const mediaCards = [
  {
    image: "https://i.ytimg.com/vi/qCruOgxaFro/hqdefault.jpg",
    alt: "WayForSky video",
    title: "WayForSky Journey",
    text: "Watch the WayForSky experience and discover the journey toward aviation.",
    embedId: "qCruOgxaFro",
  },
  {
    image: "https://i.ytimg.com/vi/VBGVS-Uu4Is/hqdefault.jpg",
    alt: "WayForSky video",
    title: "Inside WayForSky",
    text: "Explore aviation training, guidance and the people who make the journey possible.",
    embedId: "VBGVS-Uu4Is",
  },
  {
    image: "https://i.ytimg.com/vi/wLVvDp5yc4U/hqdefault.jpg",
    alt: "WayForSky video",
    title: "Aviation Success Stories",
    text: "Hear from the WayForSky community and learn about real aviation dreams.",
    embedId: "wLVvDp5yc4U",
  },
];

const cardClass =
  "overflow-hidden rounded-2xl border border-line bg-white shadow-[0_10px_30px_rgba(7,29,54,0.06)]";

function MediaHub() {
  const [activeVideo, setActiveVideo] = useState(null);

  return (
    <Section
      id="media"
      className="border-y border-[#173956] bg-[#071D36] text-white"
    >
      <SectionHeading
        className="mb-10"
        eyebrow="Explore WayForSky"
        title="Watch, listen and hear from the people behind aviation."
        text="Explore stories, academy insights and aviation journeys through WayForSky videos."
        light
      />

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {mediaCards.map((card) => (
          <article key={card.embedId} className={cardClass}>
            <img
              src={card.image}
              alt={card.alt}
              className="h-52 w-full bg-[#dce8f1] object-cover sm:h-64"
            />
            <div className="p-5">
              <h3 className="mb-2 text-xl font-bold text-navy">
                {card.title}
              </h3>
              <p className="mb-4 text-[13px] text-muted">
                {card.text}
              </p>

              <Button
                type="button"
                onClick={() => setActiveVideo(card)}
                className="w-full"
              >
                Start Video
              </Button>
            </div>
          </article>
        ))}
      </div>

      {activeVideo && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-[#061827]/90 p-3 backdrop-blur-sm"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="relative aspect-video w-full max-w-4xl overflow-hidden rounded-2xl bg-black shadow-2xl"
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
              src={`https://www.youtube-nocookie.com/embed/${activeVideo.embedId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
              title={activeVideo.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </Section>
  );
}

export default MediaHub;
