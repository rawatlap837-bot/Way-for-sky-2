import Topbar from "./layout/Topbar.jsx";
import Header from "./layout/Header.jsx";
import Footer from "./layout/Footer.jsx";
import FloatingActions from "./layout/FloatingActions.jsx";

import Hero from "./sections/Hero.jsx";
import TrustStrip from "./sections/TrustStrip.jsx";
import SkymoHelpDesk from "./sections/SkymoHelpDesk.jsx";
import Scholarship from "./sections/Scholarship.jsx";
import PilotCarousel from "./sections/PilotCarousel.jsx";
import Subjects from "./sections/Subjects.jsx";
import Academy from "./sections/Academy.jsx";
import Campus from "./sections/Campus.jsx";
import Classroom from "./sections/Classroom.jsx";
import MediaHub from "./sections/MediaHub.jsx";
import WhyWayForSky from "./sections/WhyWayForSky.jsx";
import Roadmap from "./sections/Roadmap.jsx";
import VideoTestimonials from "./sections/VideoTestimonials.jsx";
import AudioFeedback from "./sections/AudioFeedback.jsx";
import Contact from "./sections/Contact.jsx";
import GoogleReviews from "./sections/GoogleReviews.jsx";
import Faq from "./sections/Faq.jsx";
import Register from "./sections/Register.jsx";

// The whole page, top to bottom.
// To change the order of sections, just move the lines inside <main>.
function App() {
  return (
    <div>
      <Topbar />
      <Header />

      <main>
        <Hero />
        <TrustStrip />
        <SkymoHelpDesk />
        <Scholarship />
        <PilotCarousel />
        <Subjects />
        <Academy />
        <Campus />
        <Classroom />
        <MediaHub />
        <WhyWayForSky />
        <Roadmap />
        <VideoTestimonials />
        <AudioFeedback />
        <Contact />
        <GoogleReviews />
        <Faq />
        <Register />
      </main>

      <Footer />
      <FloatingActions />
    </div>
  );
}

export default App;
