import { Hero } from "./components/home/Hero";
import { TrustedBy } from "./components/home/TrustedBy";
import { ProductsShowcase } from "./components/home/ProductsShowcase";
import { IndustriesServed } from "./components/home/IndustriesServed";
import { KeyIndicators } from "./components/home/KeyIndicators";
import { Pillars } from "./components/home/Pillars";
import { ProcessPreview } from "./components/home/ProcessPreview";
import { HomeCTA } from "./components/home/HomeCTA";

export default function HomePage() {
  return (
    <div className="overflow-x-clip">
      <Hero />
      <KeyIndicators />
      <TrustedBy />
      <ProductsShowcase />
      <IndustriesServed />
      <Pillars />
      <ProcessPreview />
      <HomeCTA />
    </div>
  );
}
