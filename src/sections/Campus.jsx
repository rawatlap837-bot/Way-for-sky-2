import Section from "../components/Section.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import classroom from "../assets/images/academy-classroom.jpg";

// Big classroom photo with a caption (id="campus").
function Campus() {
  return (
    <Section id="campus" className="border-y border-[#173956] bg-[#071D36] text-white">
      <SectionHeading
        className="mb-10"
        eyebrow="Inside the Academy"
        title="A learning space built around aviation."
        text="Give students and parents a closer look at the classroom environment, learning tools and the way lessons are delivered."
        light
      />

      <div className="relative h-[290px] overflow-hidden rounded-3xl shadow-card sm:h-[400px] lg:h-[480px]">
        <img
          src={classroom}
          alt="WayForSky aviation classroom with digital learning display and student workstations"
          loading="lazy"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1 bg-gradient-to-t from-navy/90 to-transparent px-6 pb-6 pt-16 text-white sm:px-8">
          <strong className="text-lg sm:text-xl">WayForSky Aviation Academy</strong>
          <span className="text-xs text-[#d7e4ef]">
            Classroom environment · Digital learning · DGCA subject preparation
          </span>
        </div>
      </div>
    </Section>
  );
}

export default Campus;
