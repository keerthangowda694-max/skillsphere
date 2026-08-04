import Navbar from "../../components/layout/Navbar";
import AIFeatures from "./AIFeatures";
import CTA from "./CTA";
import Footer from "./Footer";
import Hero from "./Hero";
import HowItWorks from "./HowItWorks";
import PlatformHighlights from "./PlatformHighlights";
import PopularServices from "./PopularServices";
import Statistics from "./Statistics";
import Testimonials from "./Testimonials";

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <PlatformHighlights/>
      <HowItWorks/>
      <PopularServices/>
      <AIFeatures/>
      <Statistics/>
      <Testimonials/>
      <CTA/>
      <Footer/>
    </>
  );
};

export default LandingPage;
