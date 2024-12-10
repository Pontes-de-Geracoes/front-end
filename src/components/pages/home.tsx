import Container from "../atoms/container";
import Benefits from "../organisms/benefits";
import CallToAction from "../organisms/call-to-action";
import FeatureList from "../organisms/feature-list";
import Hero from "../organisms/hero";
import HowItWorks from "../organisms/how-it-work";
import Statistics from "../organisms/statistics";
import Testimonials from "../organisms/testimonials";

const Home = () => {
  return (
    <Container as="main" variant={"main"}>
      <Hero />
      <FeatureList />
      <HowItWorks />
      <Benefits />
      <Statistics />
      <Testimonials />
      <CallToAction />
    </Container>
  );
};

export default Home;
