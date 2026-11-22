import Section from "../components/Section.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import Carousel from "../components/Carousel.jsx";
import { links } from "../data/links.js";

// Genuine Google review graphics from the public/reviews folder.
const reviews = [
  "/reviews/221d51f5-7c54-41aa-a2a3-1d02a30ec073.png",
  "/reviews/85367112-e2cf-41a6-a205-0fe26e6555bc.png",
  "/reviews/8b13bc50-307c-4161-a039-51b6716e98a9.png",
  "/reviews/99f9b36d-cf65-4757-b52e-92d9738385ee.png",
  "/reviews/b0f5bb8d-801b-4055-a8c9-dae48b486e8a.png",
  "/reviews/b27b0789-d71e-49bb-87f6-4a464038e16b.png",
  "/reviews/c49cc678-7daf-4a96-bb4c-63bebf490a17.png",
  "/reviews/d32e0679-faea-47bc-929c-79e04dd57dca.png",
];

function GoogleReviews() {
  return (
    <Section id="google-review-highlights" className="border-y border-[#ddeaf3] bg-[#edf5fb]">
      <SectionHeading
        className="mb-10"
        eyebrow="Parent & Student Feedback"
        title="What people say about WayForSky."
        text="Swipe through genuine Google review testimonials shared by WayForSky students and parents."
      />

      <Carousel label="Google review testimonials">
        {reviews.map((image, index) => (
          <article
            key={image}
            className="w-[260px] max-w-[82vw] shrink-0 snap-start overflow-hidden rounded-2xl border border-line bg-white shadow-[0_8px_24px_rgba(7,29,54,0.10)] sm:w-[320px]"
          >
            <img
              src={image}
              alt={`WayForSky Google review testimonial ${index + 1}`}
              loading="lazy"
              className="h-auto w-full object-cover"
            />
          </article>
        ))}
      </Carousel>

      <div className="mt-2 flex flex-col gap-2 text-xs text-muted sm:flex-row sm:justify-between">
        <span>Swipe to see more reviews →</span>
        <a
          href={links.googleReviews}
          target="_blank"
          rel="noopener noreferrer"
          className="font-extrabold text-[#23699d] hover:underline"
        >
          Read Original Reviews on Google
        </a>
      </div>
    </Section>
  );
}

export default GoogleReviews;
