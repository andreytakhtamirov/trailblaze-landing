import { Metadata } from "next";
import Hero from "@/components/Hero";
import Feature from "@/components/Features";
import CTA from "@/components/CTA";
import FAQ from "@/components/FAQ";

export const metadata: Metadata = {
  title: "Trailblaze - Explore Scenic Routes and Trails",
  description:
    "Discover and customize scenic routes with Trailblaze. Avoid busy roads, find trails for hiking, cycling, and more. Enjoy outdoor adventures with our easy-to-use app available on iOS and Android.",
};

export default function Home() {
  return (
    <main>
      <Hero />
      <CTA />
      {/* <Brands /> */}
      <Feature />
      {/* <About /> */}
      {/* <FeaturesTab /> */}
      {/* <FunFact /> */}
      {/* <Integration /> */}
      <FAQ />
      {/* <Testimonial /> */}
      {/* <Pricing /> */}
      {/* <Contact /> */}
      {/* <Blog /> */}
    </main>
  );
}
