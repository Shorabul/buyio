import FeaturedProducts from "@/components/FeaturedProducts";
import HeroSlide from "@/components/HeroSlide/HeroSlide";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <main>
      <HeroSlide></HeroSlide>
      <FeaturedProducts></FeaturedProducts>
      <Testimonials></Testimonials>
    </main>
  );
}
