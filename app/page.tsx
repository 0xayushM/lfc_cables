import { Hero } from "./components/home/Hero";
import { TrustedBy } from "./components/home/TrustedBy";
import { ProductsPreview } from "./components/home/ProductsPreview";
import { IndustriesServed } from "./components/home/IndustriesServed";
import { KeyIndicators } from "./components/home/KeyIndicators";
import { Pillars } from "./components/home/Pillars";
import { ProcessPreview } from "./components/home/ProcessPreview";
import { HomeCTA } from "./components/home/HomeCTA";

export default function HomePage() {
  return (
    <div className="overflow-hidden">
      <Hero />
      <TrustedBy />
      <ProductsPreview />
      <IndustriesServed />
      <KeyIndicators />
      <Pillars />
      <ProcessPreview />
      <HomeCTA />
    </div>
  );
}
