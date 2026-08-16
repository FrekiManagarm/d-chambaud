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
  ServicesSection,
  StatsSection,
  TestimonialsSection,
  ValuesSection,
  getHomeAbout,
  getHomeClients,
  getHomeFinalCta,
  getHomeGalleryText,
  getHomeHero,
  getHomeImages,
  getHomeMarquee,
  getHomePavillonText,
  getHomePricing,
  getHomeServicesText,
  getHomeStats,
  getHomeTestimonials,
  getHomeValues,
  useHomePageCMS,
  useServiceBrochures,
} from "@/components/landing";

export default function Page() {
  const cms = useHomePageCMS();
  const about = getHomeAbout(cms);
  const images = getHomeImages(cms);
  const pricing = getHomePricing(cms);
  const hero = getHomeHero(cms);
  const marquee = getHomeMarquee(cms);
  const servicesText = getHomeServicesText(cms);
  const galleryText = getHomeGalleryText(cms);
  const pavillonText = getHomePavillonText(cms);
  const values = getHomeValues(cms);
  const stats = getHomeStats(cms);
  const clients = getHomeClients(cms);
  const testimonials = getHomeTestimonials(cms);
  const finalCta = getHomeFinalCta(cms);
  const serviceBrochures = useServiceBrochures();

  return (
    <main>
      <HeroSection content={hero} images={images} />
      <MarqueeStrip items={marquee} />
      <AboutSection about={about} images={images} />
      <GallerySection content={galleryText} images={images} />
      <ValuesSection content={values} images={images} />
      <StatsSection content={stats} />
      <ClientsSection content={clients} />
      <ServicesSection
        content={servicesText}
        images={images}
        serviceBrochures={serviceBrochures}
      />
      <FormulasSection pricing={pricing} />
      <PavillonSection content={pavillonText} images={images} />
      <TestimonialsSection content={testimonials} />
      <FinalContactCTA content={finalCta} />
      <Footer />
    </main>
  );
}
