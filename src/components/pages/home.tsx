import Container from "../atoms/container";
import Benefits from "../organisms/benefits";
import FeatureList from "../organisms/feature-list";
import Hero from "../organisms/hero";
import HowItWorks from "../organisms/how-it-work";
import Statistics from "../organisms/statistics";
import Testimonials from "../organisms/testimonials";

const Home = () => {
  return (
    <Container as="main" variant={"main"}>
      <Hero />
      <HowItWorks />
      <FeatureList />
      <Benefits />
      <Statistics />
      <Testimonials />
    </Container>
  );
};

export default Home;
