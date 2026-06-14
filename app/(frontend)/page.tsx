"use client";

import {
  AboutSection,
  ClientsSection,
  FinalContactCTA,
  Footer,
  FormulasSection,
  GallerySection,
  HeroSection,
  MarqueeStrip,
  PavillonSection,
  ServiceAreasSection,
  ServicesSection,
  StatsSection,
  TestimonialsSection,
  ValuesSection,
  getHomeAbout,
  getHomeImages,
  getHomePricing,
  useHomePageCMS,
} from "@/components/landing";

export default function Page() {
  const cms = useHomePageCMS();
  const about = getHomeAbout(cms);
  const images = getHomeImages(cms);
  const pricing = getHomePricing(cms);

  return (
    <main>
      <HeroSection images={images} />
      <MarqueeStrip />
      <AboutSection about={about} images={images} />
      <GallerySection images={images} />
      <ValuesSection images={images} />
      <StatsSection />
      <ClientsSection />
      <ServicesSection images={images} />
      <ServiceAreasSection />
      <FormulasSection pricing={pricing} />
      <PavillonSection images={images} />
      <TestimonialsSection />
      <FinalContactCTA />
      <Footer />
    </main>
  );
}
