"use client";

import {
  AboutSection,
  ClientsSection,
  ContactSection,
  Footer,
  FormulasSection,
  GallerySection,
  HeroSection,
  MarqueeStrip,
  PavillonSection,
  ServicesSection,
  StatsSection,
  TestimonialsSection,
  ValuesSection,
  getHomeImages,
  getHomePricing,
  useHomePageCMS,
} from "@/components/landing";

export default function Page() {
  const cms = useHomePageCMS();
  const images = getHomeImages(cms);
  const pricing = getHomePricing(cms);

  return (
    <main>
      <HeroSection images={images} />
      <MarqueeStrip />
      <AboutSection images={images} />
      <GallerySection images={images} />
      <ValuesSection images={images} />
      <StatsSection />
      <ClientsSection />
      <ServicesSection images={images} />
      <FormulasSection pricing={pricing} />
      <PavillonSection images={images} />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
