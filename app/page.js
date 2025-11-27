import FeaturedProducts from "@/components/FeaturedProducts";
import HeroSlide from "@/components/HeroSlide/HeroSlide";
import ServiceHighlights from "@/components/ServiceHighlights";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <main>
      <HeroSlide></HeroSlide>
      <ServiceHighlights></ServiceHighlights>
      <FeaturedProducts></FeaturedProducts>
      <Testimonials></Testimonials>
    </main>
  );
}
