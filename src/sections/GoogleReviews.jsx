import Section from "../components/Section.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import Carousel from "../components/Carousel.jsx";
import { links } from "../data/links.js";

// The review cards. Replace each one with a genuine review
// copied from the official WayForSky Google Business Profile.
const reviews = [
  { text: "Paste genuine Google review excerpt here.", name: "Reviewer name from Google", date: "Google review · Date" },
  { text: "Paste genuine Google review excerpt here.", name: "Reviewer name from Google", date: "Google review · Date" },
  { text: "Paste genuine Google review excerpt here.", name: "Reviewer name from Google", date: "Google review · Date" },
  { text: "Paste genuine Google review excerpt here.", name: "Reviewer name from Google", date: "Google review · Date" },
  { text: "Paste genuine Google review excerpt here.", name: "Reviewer name from Google", date: "Google review · Date" },
  { text: "Paste genuine Google review excerpt here.", name: "Reviewer name from Google", date: "Google review · Date" },
];

function GoogleReviews() {
  return (
    <Section id="google-review-highlights" className="border-y border-[#ddeaf3] bg-[#edf5fb]">
      <SectionHeading
        className="mb-10"
        eyebrow="Parent & Student Feedback"
        title="What people say about WayForSky."
        text="Swipe through the review cards. Each card should contain a genuine review copied from the official WayForSky Google Business Profile."
      />

      <Carousel label="Google review cards">
        {reviews.map((review, index) => (
          <article
            key={index}
            className="min-h-[220px] w-72 shrink-0 snap-start rounded-2xl border border-line bg-white p-5 shadow-[0_8px_24px_rgba(7,29,54,0.05)] sm:w-80"
          >
            <div className="text-[13px] font-extrabold text-[#5f6b75]">
              <b className="mr-1 text-[19px] text-[#4285f4]">G</b> Google
            </div>
            <div className="my-2.5 text-[19px] text-[#f5b400]">★★★★★</div>
            <p className="min-h-[54px] text-[13px] text-ink">{review.text}</p>
            <strong className="mt-3 block text-xs text-navy">{review.name}</strong>
            <small className="text-[11px] text-muted">{review.date}</small>
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
